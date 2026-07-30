"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SignupLayout } from "@/components/signup/SignupLayout";
import { createClient } from "@/lib/supabase/client";

/**
 * LEARNING OBJECTIVE MAPPING:
 * - [Frontend Authentication Flow]: Step 1 of onboarding flow (Account creation).
 * - [Password Hashing]: Plaintext password sent over TLS/HTTPS is hashed server-side before storage.
 * - [Email Verification]: `signUp` triggers verification email / OTP sent to user email address.
 */

function SignUpFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [occupation, setOccupation] = useState<string>("freelancer");

  useEffect(() => {
    const urlOccupation = searchParams.get("occupation");
    if (urlOccupation) {
      setOccupation(urlOccupation);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("selected_occupation", urlOccupation);
      }
    } else if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("selected_occupation");
      if (stored) {
        setOccupation(stored);
      }
    }
  }, [searchParams]);

  // [Frontend Authentication Flow] Registration submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Client-side password complexity validation
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      // [Email Verification] & [Password Hashing]:
      // Creates auth user, hashes password server-side, and dispatches email verification redirect token
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: occupation,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Send OTP Email via Resend API Route
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "signup" }),
      });

      // Store user email in sessionStorage for verify-otp page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("signup_email", email);
      }

      // Navigate ONLY to /verify-otp after sign-up
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupLayout>
      <div className="w-full h-full pt-[69px] px-[88px]">
        {/* Title */}
        <h1 className="font-poppins text-[27px] font-bold text-[#050A62] mb-[35px]">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[27px]">
          {error && (
            <div className="w-[413px] bg-[#FDE7E7] border border-[#F25C5C] text-[#EA3B3B] px-[16px] py-[10px] rounded-[10px] text-[13px] font-poppins font-medium">
              {error}
            </div>
          )}

          {/* Email Address */}
          <div className="flex flex-col gap-[7px]">
            <label className="font-poppins text-[16px] font-semibold text-[#050A62] ml-[7px]">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-[413px] h-[53px] rounded-[13px] bg-[#F3F7FF] border-[1.33px] border-[#D2DCFF] px-[20px] font-poppins text-[16px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[7px]">
            <label className="font-poppins text-[16px] font-semibold text-[#050A62] ml-[7px]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-[413px] h-[53px] rounded-[13px] bg-[#F3F7FF] border-[1.33px] border-[#D2DCFF] px-[20px] font-poppins text-[16px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-[7px]">
            <label className="font-poppins text-[16px] font-semibold text-[#050A62] ml-[7px]">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-[413px] h-[53px] rounded-[13px] bg-[#F3F7FF] border-[1.33px] border-[#D2DCFF] px-[20px] font-poppins text-[16px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
            />
            {/* Helper Text */}
            <p className="font-poppins text-[12px] text-[#A6B2D0] leading-[18px] max-w-[350px] mt-[4px]">
              <span className="text-[#4ADF86]">*</span>Password must contain 8 characters, uppercase letters, lower case letters, numbers, symbols
            </p>
          </div>

          {/* Sign Up Button */}
          <div className="flex justify-center mt-[13px]">
            <button
              type="submit"
              disabled={loading}
              className="w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Sign In Text */}
        <div className="absolute top-[679px] left-0 right-0 flex justify-center">
          <p className="font-poppins text-[17px] font-normal text-[#070E66] text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#3038BD] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </SignupLayout>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <SignupLayout>
        <div className="w-full h-full flex items-center justify-center font-poppins text-[#050A62]">
          Loading...
        </div>
      </SignupLayout>
    }>
      <SignUpFormContent />
    </Suspense>
  );
}
