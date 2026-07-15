"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, ChangeEvent } from "react";
import { StepperLayout } from "@/components/stepper/StepperLayout";

export default function UploadResumePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadMessage(`Successfully uploaded: ${file.name}`);
        // Add a slight delay for the user to see the success message before navigating
        setTimeout(() => {
          router.push("/setup-profile?mode=parsed");
        }, 1000);
      } else {
        setUploadMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setUploadMessage("An error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <StepperLayout currentStep={1}>
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center pt-[100px] px-[40px]">
        
        {/* Upload Container */}
        <div className="w-full max-w-[1020px] h-[480px] border-[1.5px] border-dashed border-[#D2DCFF] rounded-[24px] flex flex-col items-center justify-center bg-transparent relative">
          
          {/* Main Illustration */}
          <div className="mb-[15px]">
            <Image
              src="/assets/Group%2037791.png"
              alt="Upload documents illustration"
              width={260}
              height={200}
              unoptimized
              priority
              style={{ width: "auto", height: "200px", objectFit: "contain" }}
            />
          </div>

          {/* Helper Text */}
          <p className="font-poppins text-[13px] text-[#A6B2D0] mt-[5px] mb-[30px]">
            <span className="text-[#18CD94] mr-[4px] font-bold text-[16px]">*</span>
            You can upload any PDF or Word File
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-[15px]">
            <div className="flex gap-[25px]">
              
              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,image/*"
              />

              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-[185px] h-[48px] rounded-full bg-[#3038BD] text-[#FFFFFF] font-poppins text-[14px] font-medium flex items-center justify-center gap-[10px] hover:bg-[#252b99] transition-colors shadow-[0_8px_16px_rgba(48,56,189,0.15)] focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Upload Resume"}
                {!isUploading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              <button 
                onClick={() => router.push("/setup-profile?mode=manual")}
                className="w-[185px] h-[48px] rounded-full bg-[#F7FAFF] border-[1.5px] border-[#3038BD] text-[#3038BD] font-poppins text-[14px] font-medium flex items-center justify-center hover:bg-[#EEF2FF] transition-colors focus:outline-none"
              >
                Create Manually
              </button>
            </div>

            {/* Status Message */}
            {uploadMessage && (
              <p className={`text-[13px] font-medium ${uploadMessage.includes('error') || uploadMessage.includes('failed') ? 'text-red-500' : 'text-[#18CD94]'}`}>
                {uploadMessage}
              </p>
            )}
          </div>
        </div>
      </main>
    </StepperLayout>
  );
}
