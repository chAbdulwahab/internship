"use client";

import { StepperLayout } from "@/components/stepper/StepperLayout";
import { useRef, useState, ChangeEvent } from "react";

import { ProfilePreviewModal } from "@/components/profile/ProfilePreviewModal";

export default function CompleteProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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
        setUploadedImage(`/assets/${file.name}`);
        setUploadMessage("");
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
    <StepperLayout currentStep={5}>
      <main className="flex-1 flex flex-col pt-[70px] pb-[100px] px-[80px]">
        <div className="w-full max-w-[900px] mx-auto flex flex-col h-full relative items-center">
          
          {/* Header Section */}
          <div className="mb-[50px] text-center flex flex-col items-center">
            <h1 className="text-[28px] font-bold text-[#050A62] mb-[10px]">
              Complete Profile
            </h1>
            <p className="text-[14px] text-[#050A62] font-medium">
              Upload your photo and write about your work to start your Greelance journey.
            </p>
          </div>

          {/* Upload Profile Picture Box */}
          <div className="flex flex-col items-center mb-[50px] w-full">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".jpg,.jpeg,.png,image/*"
            />
            
            {uploadedImage ? (
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Profile" 
                  className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-[#F3F7FF] shadow-sm"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center border border-[#D2DCFF] shadow-sm hover:bg-gray-50 focus:outline-none"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5l13.732-13.732z" stroke="#050A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`w-[280px] h-auto hover:scale-[1.02] transition-transform focus:outline-none ${isUploading ? 'opacity-50' : ''}`}
              >
                <img 
                  src="/assets/Upload%20File.png" 
                  alt="Upload Profile Picture" 
                  className="w-full h-auto object-contain block"
                />
              </button>
            )}

            {uploadMessage && (
              <p className={`text-[11px] font-medium mt-[10px] ${uploadMessage.includes('failed') || uploadMessage.includes('error') ? 'text-red-500' : 'text-[#18CD94]'}`}>
                {uploadMessage}
              </p>
            )}
            
            {!uploadedImage && (
              <p className="text-[11px] font-medium text-[#18CD94] mt-[10px]">
                <span className="font-bold text-[14px]">*</span>You can upload any JPEG or PNG
              </p>
            )}
          </div>

          {/* About Section */}
          <div className="w-full max-w-[800px] flex flex-col">
            <div className="flex justify-between items-center mb-[10px]">
              <label className="text-[14px] font-bold text-[#050A62]">
                About
              </label>
              <button className="h-[24px] px-[15px] rounded-full border-[1px] border-[#3038BD] text-[#3038BD] text-[10px] font-semibold hover:bg-[#F3F7FF] transition-colors focus:outline-none">
                Modify With AI
              </button>
            </div>
            
            <textarea 
              placeholder="Write text here"
              className="w-full h-[150px] rounded-[10px] bg-[#F7FAFF] border-[1.5px] border-[#D2DCFF] p-[20px] text-[13px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors resize-none mb-[40px]"
            ></textarea>
            
            {/* Centered Preview Button */}
            <div className="flex justify-center">
              <button 
                onClick={() => setShowPreviewModal(true)}
                className="w-[120px] h-[36px] rounded-full bg-[#3038BD] text-white text-[12px] font-bold hover:bg-[#252b99] transition-colors focus:outline-none shadow-md"
              >
                Preview
              </button>
            </div>
          </div>
          
        </div>
      </main>

      {/* Profile Preview Modal Overlay */}
      {showPreviewModal && (
        <ProfilePreviewModal 
          onClose={() => setShowPreviewModal(false)} 
          uploadedImage={uploadedImage}
        />
      )}
    </StepperLayout>
  );
}
