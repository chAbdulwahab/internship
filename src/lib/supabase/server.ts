import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database";

/**
 * LEARNING OBJECTIVE MAPPING:
 * - [Secure Cookies]: Server-side cookie adapter ensuring HttpOnly, Secure, and SameSite auth cookies.
 * - [Session Management]: Reads and persists session state on the server using Next.js `cookies()` headers.
 */

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // [Session Management] Retrieves auth token cookies sent from client
        getAll() {
          return cookieStore.getAll();
        },
        // [Secure Cookies] Writes encrypted, HttpOnly session cookies onto server response headers
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if middleware is refreshing user sessions.
          }
        },
      },
    }
  );
}

