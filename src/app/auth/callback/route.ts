import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * LEARNING OBJECTIVE MAPPING:
 * - [Email Verification]: Confirms email verification callback links sent during sign-up or password reset.
 * - [Refresh Tokens] & [Access Tokens]: Exchanges standard PKCE auth `code` for an active Access & Refresh Token pair.
 * - [CSRF Protection]: PKCE flow prevents authorization code interception and CSRF attacks during auth flow callbacks.
 */

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code"); // PKCE Authorization code
  const next = searchParams.get("next") ?? "/upload-resume";

  if (code) {
    const supabase = await createClient();
    // [Access Tokens], [Refresh Tokens], & [Email Verification]:
    // Securely exchange temporary OAuth/PKCE authorization code for persistent user tokens & cookies
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Return the user to an error page or sign-in page if code exchange fails
  return NextResponse.redirect(`${origin}/sign-in?error=auth-callback-failed`);
}

