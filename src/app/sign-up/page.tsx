"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupLayout } from "@/components/signup/SignupLayout";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <SignupLayout>
      <div className="w-full h-full pt-[69px] px-[88px]">
        {/* Title */}
        <h1 className="font-poppins text-[27px] font-bold text-[#050A62] mb-[35px]">
          Create Account
        </h1>

        <form className="flex flex-col gap-[27px]">
          {/* Email Address */}
          <div className="flex flex-col gap-[7px]">
            <label className="font-poppins text-[16px] font-semibold text-[#050A62] ml-[7px]">
              Email Address
            </label>
            <input
              type="email"
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
              type="button"
              onClick={() => router.push('/verify-otp')}
              className="w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none"
            >
              Sign Up
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
