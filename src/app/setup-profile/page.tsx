"use client";

import { useState, Suspense } from "react";
import { StepperLayout } from "@/components/stepper/StepperLayout";
import { useRouter, useSearchParams } from "next/navigation";

function SetupProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isParsed = mode === "parsed";

  // State to manage whether each section's form is open
  const [isEducationOpen, setIsEducationOpen] = useState(isParsed);
  const [isExperienceOpen, setIsExperienceOpen] = useState(isParsed);
  const [isCertificationOpen, setIsCertificationOpen] = useState(isParsed);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(isParsed);

  // Helper component for standard labels
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[11px] font-bold text-[#050A62] mb-[6px] ml-[10px]">
      {children}
    </label>
  );

  // Helper component for standard input
  const Input = ({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) => (
    <input
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
    />
  );

  // Reusable component for the collapsed Add Button
  const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="bg-[#18CD94] text-white h-[28px] px-[15px] rounded-full flex items-center justify-center gap-[6px] hover:bg-[#15b381] transition-colors focus:outline-none w-max"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );

  return (
    <StepperLayout currentStep={2}>
      <main className="flex-1 flex flex-col pt-[50px] pb-[100px] px-[80px]">
        <div key={isParsed ? "parsed" : "manual"} className="w-full max-w-[1200px] mx-auto flex flex-col h-full relative">
          
          {/* PERSONAL INFORMATION */}
          <section className="mb-[40px]">
            <h2 className="text-[18px] font-bold text-[#050A62] mb-[15px] flex items-center">
              Personal Information<span className="text-[#EA3B3B] ml-[2px] text-[20px] leading-none">*</span>
            </h2>
            <div className="grid grid-cols-4 gap-[20px] pr-[10px]">
              <div>
                <Label>First Name</Label>
                <Input defaultValue={isParsed ? "Jon" : ""} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input defaultValue={isParsed ? "Snow" : ""} />
              </div>
              <div>
                <Label>Country of Residence</Label>
                <Input defaultValue={isParsed ? "United States" : ""} />
              </div>
              <div>
                <Label>Country of Citizenship</Label>
                <Input defaultValue={isParsed ? "United States" : ""} />
              </div>
              
              <div className="col-span-1">
                <Label>Phone Number</Label>
                <div className="flex h-[42px] rounded-full border-[1.5px] border-[#D2DCFF] bg-transparent overflow-hidden focus-within:border-[#3038BD] transition-colors">
                  <div className="flex items-center px-[15px] border-r-[1.5px] border-[#D2DCFF] bg-transparent">
                    <span className="text-[16px] mr-[5px]">🇺🇸</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#050A62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    defaultValue="+1 "
                    className="flex-1 h-full px-[15px] text-[13px] text-[#050A62] font-medium bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <Label>English Proficiency</Label>
                <div className="relative">
                  <select className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#A6B2D0] appearance-none focus:outline-none focus:border-[#3038BD] transition-colors">
                    <option>Select</option>
                  </select>
                  <div className="absolute right-[20px] top-[18px] pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#050A62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <Label>Notice period to resign from current job</Label>
                <div className="relative">
                  <select className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#A6B2D0] appearance-none focus:outline-none focus:border-[#3038BD] transition-colors">
                    <option>Select</option>
                  </select>
                  <div className="absolute right-[20px] top-[18px] pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#050A62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <Label>Which type of job commitment do you prefer?</Label>
                <div className="relative">
                  <select className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#A6B2D0] appearance-none focus:outline-none focus:border-[#3038BD] transition-colors">
                    <option>Select</option>
                  </select>
                  <div className="absolute right-[20px] top-[18px] pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#050A62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <Label>What's your preferred hourly rate in U.S. dollars?</Label>
                <Input />
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="mb-[20px] pb-[20px] border-b-[1.5px] border-[#F3F7FF]">
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[16px] font-bold text-[#050A62]">Education</h2>
              {isEducationOpen && (
                <AddButton label="Add Education" onClick={() => {}} />
              )}
            </div>
            {!isEducationOpen ? (
              <AddButton label="Add Education" onClick={() => setIsEducationOpen(true)} />
            ) : (
              <div className="bg-[#EEF2FF] w-[70%] rounded-[20px] p-[30px] relative">
                <button onClick={() => setIsEducationOpen(false)} className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="grid grid-cols-2 gap-[20px] pr-[10px]">
                  <div>
                    <Label>School</Label>
                    <Input defaultValue={isParsed ? "University of Winterfell" : ""} />
                  </div>
                  <div>
                    <Label>Degree</Label>
                    <Input defaultValue={isParsed ? "Bachelor of Science" : ""} />
                  </div>
                  <div>
                    <Label>Field of study</Label>
                    <Input defaultValue={isParsed ? "Computer Science" : ""} />
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="flex-1">
                      <Label>Start date</Label>
                      <Input />
                    </div>
                    <div className="flex-1">
                      <Label>End date</Label>
                      <Input />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* EXPERIENCE */}
          <section className="mb-[20px] pb-[20px] border-b-[1.5px] border-[#F3F7FF]">
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[16px] font-bold text-[#050A62]">Experience</h2>
              {isExperienceOpen && (
                <AddButton label="Add Experience" onClick={() => {}} />
              )}
            </div>
            {!isExperienceOpen ? (
              <AddButton label="Add Experience" onClick={() => setIsExperienceOpen(true)} />
            ) : (
              <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative">
                <button onClick={() => setIsExperienceOpen(false)} className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="flex gap-[20px] mb-[20px] pr-[10px]">
                  <div className="flex-1">
                    <Label>Title</Label>
                    <Input defaultValue={isParsed ? "Senior Developer" : ""} />
                  </div>
                  <div className="flex-1">
                    <Label>Company name</Label>
                    <Input defaultValue={isParsed ? "Stark Industries" : ""} />
                  </div>
                  <div className="flex-1 flex gap-[10px]">
                    <div className="flex-1">
                      <Label>Start date</Label>
                      <Input />
                    </div>
                    <div className="flex-1">
                      <Label>End date</Label>
                      <Input />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea 
                    defaultValue={isParsed ? "Worked on building cutting-edge web applications." : ""}
                    placeholder="Type your comments..."
                    className="w-full h-[80px] rounded-[15px] bg-[#FFFFFF] border-[1.5px] border-[#D2DCFF] p-[20px] text-[13px] text-[#A6B2D0] focus:outline-none focus:border-[#3038BD] transition-colors resize-none"
                  ></textarea>
                </div>
              </div>
            )}
          </section>

          {/* CERTIFICATIONS */}
          <section className="mb-[20px] pb-[20px] border-b-[1.5px] border-[#F3F7FF]">
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[16px] font-bold text-[#050A62]">Certifications</h2>
              {isCertificationOpen && (
                <AddButton label="Add Certification" onClick={() => {}} />
              )}
            </div>
            {!isCertificationOpen ? (
              <AddButton label="Add Certification" onClick={() => setIsCertificationOpen(true)} />
            ) : (
              <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative">
                <button onClick={() => setIsCertificationOpen(false)} className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="flex flex-col gap-[20px] pr-[10px]">
                  <div className="flex gap-[20px]">
                    <div className="w-[300px]">
                      <Label>Certificate name</Label>
                      <Input defaultValue={isParsed ? "AWS Certified" : ""} />
                    </div>
                    <div className="w-[400px]">
                      <Label>Certificate Link</Label>
                      <Input defaultValue={isParsed ? "https://aws.amazon.com" : ""} />
                    </div>
                  </div>
                  <div>
                    <button className="w-[220px] h-[48px] rounded-full bg-white border-[1.5px] border-dashed border-[#D2DCFF] flex items-center justify-between px-[20px] text-[#050A62] hover:border-[#3038BD] transition-colors">
                      <div className="flex items-center gap-[10px]">
                        <div className="w-[20px] h-[20px] bg-[#EEF2FF] rounded-[4px] flex items-center justify-center">
                          <span className="text-[8px]">📎</span>
                        </div>
                        <span className="text-[12px] font-semibold">Upload Certificate</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* PORTFOLIO */}
          <section className="mb-[20px] pb-[20px] border-b-[1.5px] border-[#F3F7FF]">
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[16px] font-bold text-[#050A62]">Portfolio</h2>
              {isPortfolioOpen && (
                <AddButton label="Add Portfolio" onClick={() => {}} />
              )}
            </div>
            {!isPortfolioOpen ? (
              <AddButton label="Add Portfolio" onClick={() => setIsPortfolioOpen(true)} />
            ) : (
              <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative">
                <button onClick={() => setIsPortfolioOpen(false)} className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="grid grid-cols-4 gap-[20px] items-start pr-[10px] mb-[20px]">
                  <div className="col-span-1">
                    <Label>Title</Label>
                    <Input defaultValue={isParsed ? "My Project" : ""} />
                  </div>
                  <div className="col-span-2">
                    <Label>Portfolio Link</Label>
                    <Input defaultValue={isParsed ? "https://github.com/jon" : ""} />
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <button className="w-[100%] h-[48px] mt-[10px] rounded-[15px] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex items-center justify-between px-[15px] text-[#050A62] hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-[10px]">
                        <div className="w-[20px] h-[20px] bg-[#E2F7EE] rounded-[4px] flex items-center justify-center">
                          <span className="text-[#18CD94] text-[10px] font-bold">📄</span>
                        </div>
                        <span className="text-[12px] font-bold">Upload Portfolio</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea 
                    defaultValue={isParsed ? "Here is some sample code." : ""}
                    placeholder="Type your comments..."
                    className="w-full h-[80px] rounded-[15px] bg-[#FFFFFF] border-[1.5px] border-[#D2DCFF] p-[20px] text-[13px] text-[#A6B2D0] focus:outline-none focus:border-[#3038BD] transition-colors resize-none"
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Final Next Button */}
            <div className="flex justify-end mt-[40px]">
              <button 
                onClick={() => router.push("/choose-skill")}
                className="w-[140px] h-[36px] rounded-full bg-[#3038BD] text-white text-[12px] font-bold hover:bg-[#252b99] transition-colors focus:outline-none shadow-[0_8px_16px_rgba(48,56,189,0.15)]"
              >
                Next
              </button>
            </div>
          </section>

        </div>
      </main>
    </StepperLayout>
  );
}

export default function SetupProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFF] flex items-center justify-center">Loading...</div>}>
      <SetupProfileContent />
    </Suspense>
  );
}
