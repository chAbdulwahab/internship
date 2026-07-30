"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SignupLayout } from "@/components/signup/SignupLayout";
import { createClient } from "@/lib/supabase/client";

/**
 * LEARNING OBJECTIVE MAPPING:
 * - [Password Reset]: Final step of recovery flow updating password via `supabase.auth.updateUser`.
 * - [Password Hashing]: Updated password is encrypted/hashed server-side using bcrypt before persisting.
 * - [Frontend Authentication Flow]: Password validation and redirecting back to `/sign-in`.
 */

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // [Password Reset] Save new password submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      // [Password Reset] & [Password Hashing]: Updates current authenticated user password
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SignupLayout>
      <div className="w-full h-full pt-[90px] px-[88px] relative">
        {/* Title */}
        <h1 className="font-poppins text-[27px] font-bold text-[#050A62] mb-[35px]">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[27px]">
          {error && (
            <div className="w-[413px] bg-[#FDE7E7] border border-[#F25C5C] text-[#EA3B3B] px-[16px] py-[10px] rounded-[10px] text-[13px] font-poppins font-medium">
              {error}
            </div>
          )}

          {/* New Password */}
          <div className="flex flex-col gap-[7px]">
            <label className="font-poppins text-[13px] font-semibold text-[#050A62] ml-[7px]">
              New Password
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
            <label className="font-poppins text-[13px] font-semibold text-[#050A62] ml-[7px]">
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

          {/* Save Button */}
          <div className="flex justify-center mt-[13px]">
            <button
              type="submit"
              disabled={loading}
              className="w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>

        {/* Success Message Text */}
        {isSuccess && (
          <div className="absolute top-[520px] left-0 right-0 flex justify-center">
            <p className="font-poppins text-[13px] font-medium text-[#4ADF86] text-center">
              Your Password has been changed successfully. Redirecting to sign in...
            </p>
          </div>
        )}
      </div>
    </SignupLayout>
  );
}
