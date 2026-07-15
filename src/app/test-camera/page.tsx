"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TestCameraPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F7FAFF] flex flex-col font-poppins">
      {/* Header */}
      <header className="h-[80px] bg-white flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0">
        <div className="flex items-center h-full">
          <button 
            onClick={() => router.back()}
            className="w-[80px] h-full bg-[#18CD94] flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <img 
            src="/assets/greelance-logo.png" 
            alt="Greelance" 
            className="h-[24px] ml-[30px]"
          />
        </div>
        <div className="pr-[40px]">
          <button className="w-[40px] h-[40px] rounded-full border-[1.5px] border-[#D2DCFF] flex items-center justify-center hover:bg-[#F3F7FF] transition-colors focus:outline-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="#050A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 17L15 12L10 7" stroke="#050A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12H3" stroke="#050A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full p-[40px] flex flex-col items-center justify-center">
        
        {/* Main Card */}
        <div className="bg-white w-full max-w-[700px] rounded-[20px] shadow-sm p-[40px] flex flex-col items-center">
          <h1 className="text-[28px] font-bold text-[#050A62] mb-[30px]">UI / UX Test</h1>
          
          {/* Camera Viewport */}
          <div className="w-full h-[320px] rounded-[15px] relative overflow-hidden bg-gray-900 group">
            {/* Mock Camera Feed */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
            
            {/* Face Alignment Oval */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[220px] border-[2.5px] border-dashed border-white rounded-[100%] shadow-[0_0_0_9999px_rgba(0,0,0,0.1)]"></div>
            
            {/* Camera Icon */}
            <div className="absolute bottom-[15px] left-[15px] text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-[20px] mt-[30px]">
            <button className="w-[140px] h-[40px] rounded-full bg-[#3038BD] text-white text-[12px] font-bold hover:bg-[#252b99] transition-colors focus:outline-none shadow-md">
              Join
            </button>
            <button className="w-[140px] h-[40px] rounded-full border-[1.5px] border-[#3038BD] bg-[#F3F7FF] text-[#3038BD] text-[12px] font-bold hover:bg-[#E5ECF6] transition-colors focus:outline-none">
              Cancel
            </button>
          </div>
        </div>

        {/* Reminder Alert */}
        <div className="w-full max-w-[500px] mt-[20px] bg-[#EEF2FF] rounded-[10px] p-[20px]">
          <div className="flex items-center gap-[5px] mb-[5px]">
            <span className="text-[12px] font-bold text-[#3038BD]">Reminder</span>
            <div className="w-[14px] h-[14px] rounded-full bg-[#3038BD] text-white flex items-center justify-center text-[10px] font-bold">i</div>
          </div>
          <p className="text-[11px] font-medium text-[#A6B2D0]">
            Show clients the best version of yourself! Set your face in the circle
          </p>
        </div>

      </div>
    </main>
  );
}
