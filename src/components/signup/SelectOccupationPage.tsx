"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Occupation } from "@/types/occupation";
import { OccupationSelector } from "./OccupationSelector";
import { SocialLoginButtons } from "./SocialLoginButtons";

import { SignupLayout } from "./SignupLayout";

export function SelectOccupationPage() {
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation>("Freelancer");
  const router = useRouter();

  const handleNext = () => {
    if (!selectedOccupation) return;
    const slug = selectedOccupation.toLowerCase().replace(/ /g, "-");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selected_occupation", slug);
    }
    router.push(`/sign-up?occupation=${encodeURIComponent(slug)}`);
  };

  return (
    <SignupLayout>
      {/* Card Intro Text */}
      <div className="absolute top-[38px] left-0 right-0 flex justify-center px-4">
        <p className="font-poppins text-[17px] font-medium leading-[24px] text-[#050A62] text-center max-w-[447px]">
          Thanks for your interest in Greelance! Before we get started, how do you want to sign up in Greelance?
        </p>
      </div>

      {/* Options List */}
      <div className="absolute top-[102px] left-[107px]">
        <OccupationSelector 
          selectedOccupation={selectedOccupation}
          onSelectOccupation={setSelectedOccupation}
        />
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute top-[616px] left-1/2 -translate-x-1/2 w-[132px] h-[37.5px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[12px] font-medium leading-none hover:bg-[#252b99] active:opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 border-none"
      >
        Next
      </button>

      {/* Sign In Text */}
      <div className="absolute top-[679px] left-0 right-0 flex justify-center">
        <p className="font-poppins text-[17px] font-normal text-[#070E66] text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#3038BD] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">
            Sign In
          </Link>
        </p>
      </div>
    </SignupLayout>
  );
}
