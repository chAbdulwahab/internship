import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { createClient } from '@/lib/supabase/server';

/**
 * LEARNING OBJECTIVE MAPPING:
 * - [CORS]: Handled via OPTIONS preflight response & Access-Control headers.
 * - [CSRF]: Origin header validation prevents cross-site upload requests.
 * - [Secure API Design]: Input validation (file presence, MIME types, size limits) + proper HTTP status codes.
 * - [Authentication & Authorization]: Server-side session verification via Supabase `getUser()`.
 */

// Allowed origins for CORS check
const ALLOWED_ORIGINS = [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'];

// Allowed MIME types for secure file uploads
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg'
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// [CORS] Handle OPTIONS preflight request
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

// [Secure API Design] Main POST handler for protected file uploads
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    // 1. [CSRF] Verify Request Origin against expected domain
    if (origin && !ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'CSRF Protection: Invalid request origin.' },
        { status: 403, headers: corsHeaders }
      );
    }

    // 2. [Authentication & Authorization] Server-side Session Check
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid authentication session required.' },
        { status: 401, headers: corsHeaders }
      );
    }

    // 3. [Secure API Design] Request payload parsing and input validation
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Validation Error: No file received.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Validation Error: Invalid file type.' },
        { status: 415, headers: corsHeaders }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Validation Error: File size exceeds 10MB limit.' },
        { status: 413, headers: corsHeaders }
      );
    }

    // 4. File storage handling
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicAssetsPath = path.join(process.cwd(), 'public', 'assets');
    const safeFileName = `${user.id}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(publicAssetsPath, safeFileName);

    await writeFile(filePath, buffer);

    return NextResponse.json(
      { message: 'Upload successful', fileName: safeFileName, userId: user.id },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error during upload.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

