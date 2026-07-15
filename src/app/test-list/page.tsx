"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TestListPage() {
  const router = useRouter();

  const tests = [
    { topic: 'UI UX', questions: 6, time: '28 Minute' },
    { topic: 'UI UX', questions: 6, time: '28 Minute' }
  ];

  return (
    <main className="min-h-screen bg-[#F7FAFF] flex flex-col font-poppins">
      {/* Header */}
      <header className="h-[80px] bg-white flex items-center justify-between shadow-sm sticky top-0 z-10">
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
      <div className="flex-1 w-full max-w-[1000px] mx-auto py-[50px] px-[20px] flex flex-col items-center">
        
        {/* Title Section */}
        <div className="text-center mb-[40px]">
          <h1 className="text-[32px] font-bold text-[#050A62] mb-[10px]">Test List</h1>
          <p className="text-[13px] font-medium text-[#050A62] max-w-[400px] mx-auto leading-relaxed">
            Your profile is all set. Now you have to go through following tests to get onboard
          </p>
        </div>

        {/* Table Area */}
        <div className="w-full mb-[20px]">
          {/* Table Header */}
          <div className="bg-[#E5ECF6] rounded-t-[10px] grid grid-cols-5 px-[30px] py-[15px]">
            <span className="text-[11px] font-bold text-[#050A62]">Topic</span>
            <span className="text-[11px] font-bold text-[#050A62]">Number of Questions</span>
            <span className="text-[11px] font-bold text-[#050A62]">Time</span>
            <span className="text-[11px] font-bold text-[#050A62]">Start</span>
            <span className="text-[11px] font-bold text-[#050A62]">Remove</span>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-[10px] mt-[10px]">
            {tests.map((test, index) => (
              <div key={index} className="bg-white rounded-[10px] grid grid-cols-5 px-[30px] py-[20px] items-center shadow-sm border border-transparent hover:border-[#D2DCFF] transition-colors">
                <span className="text-[12px] font-bold text-[#A6B2D0]">{test.topic}</span>
                <span className="text-[12px] font-bold text-[#A6B2D0]">{test.questions}</span>
                <span className="text-[12px] font-bold text-[#A6B2D0]">{test.time}</span>
                <div>
                  <button 
                    onClick={() => router.push('/test-camera')}
                    className="w-[80px] h-[32px] rounded-full bg-[#3038BD] text-white text-[11px] font-bold hover:bg-[#252b99] transition-colors focus:outline-none"
                  >
                    Start
                  </button>
                </div>
                <div>
                  <button className="text-[#3038BD] hover:opacity-70 focus:outline-none ml-[10px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Notes */}
        <div className="w-full text-left mt-[10px]">
          <p className="text-[11px] font-medium text-[#D2DCFF] mb-[20px]">
            You can also take it within two days by following the link sent to your mail. <a href="#" className="text-[#18CD94] font-bold hover:underline">Prepare For Test</a>
          </p>
          <button 
            onClick={() => router.push('/test-camera')}
            className="h-[36px] px-[25px] rounded-full border-[1.5px] border-[#3038BD] text-[#3038BD] text-[12px] font-bold hover:bg-[#F3F7FF] transition-colors focus:outline-none"
          >
            Skip Test
          </button>
        </div>

        {/* Instructions Video Section */}
        <div className="w-full flex flex-col items-center mt-[80px]">
          <h2 className="text-[28px] font-bold text-[#050A62] mb-[30px]">Instructions</h2>
          
          {/* Custom Video Player Mock */}
          <div className="relative w-full max-w-[800px] aspect-video bg-gray-900 rounded-[15px] overflow-hidden shadow-lg group">
            {/* Fake Video Thumbnail (Dark) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50"></div>
            
            {/* Custom Video Controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-[10px]">
              {/* Progress Bar */}
              <div className="w-full h-[4px] bg-white/30 rounded-full relative cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-[30%] bg-[#18CD94] rounded-full"></div>
                {/* Thumb */}
                <div className="absolute left-[30%] top-[50%] -translate-y-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rounded-full shadow-sm"></div>
              </div>
              
              {/* Controls */}
              <div className="flex justify-between items-center mt-[5px]">
                <div className="flex items-center gap-[15px]">
                  <button className="text-white hover:text-[#18CD94] focus:outline-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <button className="text-white hover:text-[#18CD94] focus:outline-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  </button>
                  <span className="text-[12px] text-white font-medium ml-[5px]">01:20 / 2:36</span>
                </div>
                <div className="flex items-center gap-[15px]">
                  <button className="text-white hover:text-[#18CD94] focus:outline-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.54 8.46002C16.4774 9.39766 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="text-white hover:text-[#18CD94] focus:outline-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15A1.65 1.65 0 0 0 19 16.7l.6.6a2 2 0 0 1 0 2.8l-1.4 1.4a2 2 0 0 1-2.8 0l-.6-.6a1.65 1.65 0 0 0-1.7-.4 1.65 1.65 0 0 0-1 1.5v.8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-.8a1.65 1.65 0 0 0-1-1.5 1.65 1.65 0 0 0-1.7.4l-.6.6a2 2 0 0 1-2.8 0L2.5 19a2 2 0 0 1 0-2.8l.6-.6a1.65 1.65 0 0 0 .4-1.7 1.65 1.65 0 0 0-1.5-1v-.8a2 2 0 0 1 2-2H9a2 2 0 0 1 2-2v.8a1.65 1.65 0 0 0 1 1.5 1.65 1.65 0 0 0 1.7-.4l.6-.6a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8l-.6.6a1.65 1.65 0 0 0-.4 1.7 1.65 1.65 0 0 0 1.5 1v.8a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
