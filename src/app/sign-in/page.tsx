"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SignupLayout } from "@/components/signup/SignupLayout";

export default function SignInPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        router.push("/upload-resume"); // Routing to the next step
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVerified, router]);

  if (isVerified) {
    return (
      <main className="w-[100vw] h-[100vh] bg-[var(--background-right)] flex items-center justify-center relative overflow-hidden m-0 p-0 max-w-none">
        <div className="bg-[#FFFFFF] w-full max-w-[1245px] h-[665px] rounded-[33px] shadow-[0_16px_47px_rgba(65,211,223,0.07),0_5px_21px_rgba(20,45,120,0.025)] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          
          {/* Green Checkmark Circle */}
          <div className="w-[155px] h-[155px] rounded-full bg-gradient-to-br from-[#E2F7EE] to-[#C9EEDB] flex items-center justify-center mb-[45px] shadow-[inset_0_-8px_15px_rgba(74,223,134,0.1),0_15px_25px_rgba(74,223,134,0.15)]">
            <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 28.5L24 46.5L63 5.5" stroke="#4ADF86" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className="font-poppins font-bold text-[36px] text-[#050A62] mb-[5px]">
            Verified
          </h1>
          
          <p className="font-poppins font-semibold text-[15px] text-[#3038BD] mb-[45px]">
            Login Successful
          </p>
        </div>
      </main>
    );
  }

  return (
    <SignupLayout>
      <div className="w-full h-full pt-[69px] px-[88px] relative flex flex-col items-center">
        <div className="w-full">
          {/* Title */}
          <h1 className="font-poppins text-[27px] font-bold text-[#050A62] mb-[35px]">
            Sign In
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
              <div className="flex justify-end w-[413px] mt-[4px]">
                <Link href="/forget-password" className="font-poppins text-[13px] font-medium text-[#3038BD] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center mt-[13px]">
              <button
                type="button"
                onClick={() => setIsVerified(true)}
                className="w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign Up Text */}
          <div className="absolute top-[679px] left-0 right-0 flex justify-center">
            <p className="font-poppins text-[17px] font-normal text-[#070E66] text-center">
              Don't have an account?{" "}
              <Link href="/" className="text-[#3038BD] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SignupLayout>
  );
}
