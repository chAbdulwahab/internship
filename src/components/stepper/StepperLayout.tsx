"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface StepperLayoutProps {
  children: ReactNode;
  currentStep: number; // 1 to 5
}

export function StepperLayout({ children, currentStep }: StepperLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
    router.push("/sign-in");
  };

  const steps = [
    { number: 1, title: "Upload Resume" },
    { number: 2, title: "Setup Profile" },
    { number: 3, title: "Choose Skill" },
    { number: 4, title: "Connect Wallet" },
    { number: 5, title: "Complete Profile" },
  ];

  // Adjust progress bar width
  const progressWidth = `${currentStep * 20}%`;

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#F7FAFF] flex flex-col font-poppins m-0 p-0 overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full h-[90px] bg-white flex shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative z-10">
        
        {/* Left Back Arrow Button */}
        <button 
          onClick={() => router.back()}
          className="w-[90px] h-full bg-[#18CD94] flex items-center justify-center shrink-0 hover:bg-[#15b381] transition-colors focus:outline-none cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Stepper Container */}
        <div className="flex-1 flex items-center relative overflow-hidden px-[10px]">
          
          {/* Progress Bar Line Background */}
          <div 
            className="absolute top-0 left-0 h-[4px] bg-[#18CD94] z-10 transition-all duration-300 ease-in-out" 
            style={{ width: progressWidth }}
          ></div>
          
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            const bgColor = isActive ? "bg-[#EEF2FF]" : "bg-transparent";
            const numColor = (isActive || isCompleted) ? "text-[#18CD94]" : "text-[#A6B2D0]";
            const titleColor = (isActive || isCompleted) ? "text-[#3038BD]" : "text-[#A6B2D0]";

            return (
              <div key={step.number} className={`h-full flex flex-col justify-center px-[35px] relative ${bgColor} transition-colors duration-300`}>
                <span className={`text-[13px] font-bold ${numColor}`}>Step {step.number}</span>
                <span className={`text-[16px] font-bold mt-[2px] ${titleColor}`}>{step.title}</span>
              </div>
            );
          })}

        </div>

        {/* Right Exit / Logout Button */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="w-[90px] h-full flex items-center justify-center shrink-0 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 16L21 12M21 12L17 8M21 12H9M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#050A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {/* MAIN CONTENT */}
      {children}
    </div>
  );
}
