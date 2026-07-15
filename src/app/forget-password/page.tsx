"use client";

import { useRouter } from "next/navigation";
import { SignupLayout } from "@/components/signup/SignupLayout";

export default function ForgetPasswordPage() {
  const router = useRouter();

  return (
    <SignupLayout leftImage="/assets/Forget-Password.png" showSocial={false}>
      <div className="w-full h-full pt-[90px] px-[88px] relative">
        {/* Title */}
        <h1 className="font-poppins text-[27px] font-bold text-[#050A62] mb-[10px]">
          Forget Password
        </h1>

        {/* Subtitle */}
        <p className="font-poppins text-[14px] font-medium text-[#3038BD] mb-[45px] max-w-[390px] leading-[22px]">
          Please enter your email address so we can send you verification code to reset your password
        </p>

        <form className="flex flex-col gap-[27px]">
          {/* Email Address */}
          <div className="flex flex-col gap-[7px]">
            <label className="font-poppins text-[13px] font-semibold text-[#050A62] ml-[7px]">
              Email Address
            </label>
            <input
              type="email"
              className="w-[413px] h-[53px] rounded-[13px] bg-[#F3F7FF] border-[1.33px] border-[#D2DCFF] px-[20px] font-poppins text-[16px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
            />
          </div>

          {/* Reset Password Button */}
          <div className="absolute top-[480px] left-0 right-0 flex justify-center">
            <button
              type="button"
              onClick={() => router.push('/verify-otp')}
              className="w-[170px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </SignupLayout>
  );
}
