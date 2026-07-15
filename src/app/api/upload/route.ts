import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to the public/assets directory
    const publicAssetsPath = path.join(process.cwd(), 'public', 'assets');
    const filePath = path.join(publicAssetsPath, file.name);

    await writeFile(filePath, buffer);
    console.log(`Successfully saved file to ${filePath}`);

    return NextResponse.json({ message: "Success", fileName: file.name });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
