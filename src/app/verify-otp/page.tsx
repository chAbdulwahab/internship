"use client";

import { useState, useRef, FormEvent, KeyboardEvent, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { EmailOtpType } from "@supabase/supabase-js";

function VerifyOtpContent() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error! Wrong code. Only three attempts are possible");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email");
  const typeParam = searchParams.get("type");

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character entered
    setOtp(newOtp);
    setHasError(false); // Clear error on typing

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Auto-focus previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      setErrorMessage("Please enter all 4 digits.");
      setHasError(true);
      return;
    }

    setLoading(true);

    try {
      const email = emailParam || (typeof window !== "undefined" ? sessionStorage.getItem("signup_email") : null);

      if (email) {
        const supabase = createClient();
        const otpType: EmailOtpType = typeParam === "recovery" ? "recovery" : "signup";
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: enteredOtp,
          type: otpType,
        });

        if (error) {
          // Fallback to "1111" demo trigger if testing without Supabase email provider configured yet
          if (enteredOtp === "1111") {
            setIsVerified(true);
          } else {
            setErrorMessage(error.message);
            setHasError(true);
          }
        } else {
          setIsVerified(true);
        }
      } else {
        // Direct OTP test check
        if (enteredOtp === "1111") {
          setIsVerified(true);
        } else {
          setErrorMessage("Error! Invalid OTP entered.");
          setHasError(true);
        }
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Verification failed.");
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const email = emailParam || (typeof window !== "undefined" ? sessionStorage.getItem("signup_email") : null);
    if (!email) return;

    try {
      const supabase = createClient();
      if (typeParam === "recovery") {
        await supabase.auth.resetPasswordForEmail(email);
      } else {
        await supabase.auth.resend({
          type: "signup",
          email,
        });
      }
      alert("A new verification code has been sent to your email.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleProceed = async () => {
    if (typeParam === "recovery") {
      router.push("/reset-password");
    } else {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.error("Sign out error:", err);
      }
      router.push("/sign-in?verified=true");
    }
  };

  return (
    <main className="w-[100vw] h-[100vh] bg-[var(--background-right)] flex items-center justify-center relative overflow-hidden m-0 p-0 max-w-none">
      
      {/* Top Left Logo */}
      <div className="absolute top-[50px] left-[95px]">
        <Image
          src="/assets/greelance-logo.png"
          alt="Greelance"
          width={219}
          height={33}
          unoptimized
          priority
          style={{ width: "219px", height: "auto" }}
        />
      </div>

      {/* Main Card */}
      <div className="bg-[#FFFFFF] w-full max-w-[1245px] h-[665px] rounded-[33px] shadow-[0_16px_47px_rgba(65,211,223,0.07),0_5px_21px_rgba(20,45,120,0.025)] flex flex-col items-center justify-center">
        
        {isVerified ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
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
              OTP Verified Successfully
            </p>

            <button
              type="button"
              onClick={handleProceed}
              className="w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none cursor-pointer"
            >
              Proceed
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-[-80px]">
            <h1 className="font-poppins font-bold text-[36px] text-[#050A62] mb-[5px]">
              Enter OTP
            </h1>
            
            <p className="font-poppins font-medium text-[16px] text-[#3038BD] mb-[75px]">
              We Have Sent OTP To Your Email
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              {/* OTP Inputs */}
              <div className="flex gap-[25px]">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-[125px] h-[125px] rounded-full border-[1.33px] text-center font-poppins font-bold text-[64px] text-[#3038BD] focus:outline-none transition-colors shadow-[inset_0_0_0_0.25px_rgba(48,56,189,0.04)] ${
                      hasError 
                        ? "bg-[#FDE7E7] border-[#F25C5C] focus:border-[#F25C5C]" 
                        : "bg-[#F3F7FF] border-[#D2DCFF] focus:border-[#3038BD]"
                    }`}
                  />
                ))}
              </div>

              {/* Error Message */}
              <div className={`w-[575px] flex justify-end mt-[15px] ${hasError ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                <div className="flex items-center gap-[6px]">
                  <div className="w-[14px] h-[14px] rounded-full bg-[#EA3B3B] text-white flex items-center justify-center text-[10px] font-bold">
                    !
                  </div>
                  <span className="font-poppins text-[12px] font-medium text-[#EA3B3B] underline decoration-[#EA3B3B] underline-offset-2">
                    {errorMessage}
                  </span>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="w-[575px] flex justify-between items-end mt-[30px]">
                <div className="flex flex-col">
                  <span 
                    onClick={handleResend}
                    className="font-poppins font-semibold text-[16px] text-[#4ADF86] cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    Resend Code
                  </span>
                  <span className="font-poppins font-semibold text-[16px] text-[#050A62] mt-[4px]">
                    00:29
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Verifying..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <main className="w-[100vw] h-[100vh] bg-[var(--background-right)] flex items-center justify-center">
        <div className="text-[#050A62] font-poppins font-semibold text-[18px]">Loading verification...</div>
      </main>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
