import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * LEARNING OBJECTIVE MAPPING:
 * - [Protected Routes]: Enforces authentication checks before accessing private application paths.
 * - [Session Management]: Reads and sets auth session state via HTTP cookies across requests.
 * - [Secure Cookies]: Cookies are configured with HttpOnly, Secure, and SameSite flags via @supabase/ssr.
 * - [Token Expiration] & [Refresh Tokens]: `getUser()` automatically validates Access Tokens and uses Refresh Tokens if expired.
 * - [Authentication]: Validates user identity server-side before serving protected routes.
 */

// [Protected Routes] List of application endpoints requiring active authentication
const protectedRoutes = [
  "/upload-resume",
  "/complete-profile",
  "/setup-profile",
  "/choose-skill",
  "/connect-wallet",
  "/test-list",
  "/test-camera",
];

const authRoutes = [
  "/sign-in",
  "/sign-up",
];

// [Session Management] Main session update handler executed on matched HTTP requests
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // [Secure Cookies] SSR Cookie Adapter configuring HTTP-only auth cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // [Token Expiration] & [Refresh Tokens]
  // `getUser()` validates JWT access token integrity and uses refresh tokens if the access token has expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // [Protected Routes] Redirect unauthenticated users attempting to access protected pages to /sign-in
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

