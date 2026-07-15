"use client";

import { StepperLayout } from "@/components/stepper/StepperLayout";
import { useRouter } from "next/navigation";

export default function SetupProfilePage() {
  const router = useRouter();

  // Helper component for labels
  const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-[11px] font-bold text-[#050A62] mb-[6px] ml-[10px]">
      {children}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  // Helper component for standard input
  const Input = ({ placeholder, defaultValue }: { placeholder?: string; defaultValue?: string }) => (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] placeholder-[#A6B2D0] focus:outline-none focus:border-[#3038BD] transition-colors"
    />
  );

  // Helper component for select
  const Select = ({ placeholder, defaultValue, className = "" }: { placeholder?: string; defaultValue?: string, className?: string }) => (
    <div className="relative w-full">
      <select
        defaultValue={defaultValue || ""}
        className={`w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#A6B2D0] appearance-none focus:outline-none focus:border-[#3038BD] transition-colors ${className}`}
      >
        <option value="" disabled>{placeholder || "Select"}</option>
        {defaultValue && <option value={defaultValue}>{defaultValue}</option>}
        {/* Placeholder options */}
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </select>
      <div className="absolute right-[15px] top-[14px] pointer-events-none">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="#3038BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );

  return (
    <StepperLayout currentStep={2}>
      <main className="flex-1 flex flex-col items-center pt-[40px] pb-[100px] px-[40px]">
        <div className="w-full max-w-[1200px] flex flex-col gap-[40px]">
          
          {/* PERSONAL INFORMATION */}
          <section>
            <h2 className="text-[18px] font-bold text-[#050A62] mb-[20px] flex items-start">
              Personal Information<span className="text-[#EA3B3B] text-[20px] leading-none ml-[2px]">*</span>
            </h2>
            
            <div className="grid grid-cols-4 gap-x-[20px] gap-y-[25px]">
              <div>
                <Label>First Name</Label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Network Support Engineer"
                    className="w-full h-[42px] rounded-full bg-transparent border-[2px] border-[#8146FF] px-[20px] text-[13px] text-[#050A62] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <Label>Last Name</Label>
                <Input />
              </div>
              <div>
                <Label>Country Of Residence</Label>
                <Input />
              </div>
              <div>
                <Label>Country Of Citizenship</Label>
                <Input />
              </div>
              
              <div>
                <Label>Phone Number</Label>
                <div className="flex w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] items-center px-[5px]">
                  <div className="flex items-center gap-[5px] px-[10px] border-r border-[#D2DCFF] cursor-pointer">
                    <span className="text-[14px]">🇺🇸</span>
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L4 4L7 1" stroke="#3038BD" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#050A62] font-medium ml-[10px]">+1</span>
                  <input type="text" placeholder="(201) 555-0123" className="flex-1 bg-transparent border-none text-[13px] text-[#A6B2D0] px-[10px] focus:outline-none" />
                </div>
              </div>
              <div>
                <Label>English Proficiency</Label>
                <Select placeholder="Select" />
              </div>
              <div>
                <Label>Notice period to resign from current job</Label>
                <Select placeholder="Select" />
              </div>
              <div>
                <Label>Which type of job commitment do you prefer?</Label>
                <Select placeholder="Select" />
              </div>

              <div>
                <Label>What's your preferred hourly rate in U.S. dollars?</Label>
                <Input />
              </div>
              <div>
                <Label>Time Zone</Label>
                <Select placeholder="Select" />
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[18px] font-bold text-[#050A62]">Education</h2>
              <button className="bg-[#18CD94] text-white h-[32px] px-[15px] rounded-full flex items-center justify-center gap-[6px] hover:bg-[#15b381] transition-colors focus:outline-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[11px] font-semibold">Add Education</span>
              </button>
            </div>
            
            <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative">
              <button className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="grid grid-cols-4 gap-[20px] pr-[10px]">
                <div>
                  <Label>Degree</Label>
                  <Select defaultValue="Bachelor In UX Designing" className="text-[#050A62]" />
                </div>
                <div>
                  <Label>University</Label>
                  <Input defaultValue="University Of Punjab College of Art & Design" />
                </div>
                <div>
                  <Label>Starting from</Label>
                  <div className="flex gap-[10px]">
                    <Select defaultValue="September" className="text-[#050A62]" />
                    <Select defaultValue="2013" className="text-[#050A62]" />
                  </div>
                </div>
                <div>
                  <Label>Ending</Label>
                  <div className="flex gap-[10px]">
                    <Select defaultValue="September" className="text-[#050A62]" />
                    <Select defaultValue="2015" className="text-[#050A62]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[18px] font-bold text-[#050A62]">Experience</h2>
              <button className="bg-[#18CD94] text-white h-[32px] px-[15px] rounded-full flex items-center justify-center gap-[6px] hover:bg-[#15b381] transition-colors focus:outline-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[11px] font-semibold">Add Experience</span>
              </button>
            </div>

            {/* Experience Card 1 */}
            <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative mb-[20px]">
              <div className="grid grid-cols-4 gap-[20px] items-end pr-[10px] mb-[20px]">
                <div>
                  <Label>Position</Label>
                  <Select defaultValue="Network Support Engineer" className="text-[#A6B2D0]" />
                </div>
                <div>
                  <Label>Work Place</Label>
                  <Input defaultValue="Central Texas College" />
                </div>
                <div>
                  <Label>Starting from</Label>
                  <div className="flex gap-[10px]">
                    <Select defaultValue="September" className="text-[#050A62]" />
                    <Select defaultValue="2015" className="text-[#050A62]" />
                  </div>
                </div>
                <div className="pb-[10px]">
                  <label className="flex items-center gap-[8px] cursor-pointer">
                    <div className="w-[16px] h-[16px] rounded-[4px] bg-[#18CD94] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4.5L3.5 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[12px] font-semibold text-[#050A62]">Currently Working</span>
                  </label>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <textarea 
                  placeholder="Type your comments..."
                  className="w-full h-[80px] rounded-[15px] bg-[#FFFFFF] border-[1.5px] border-[#D2DCFF] p-[20px] text-[13px] text-[#A6B2D0] focus:outline-none focus:border-[#3038BD] transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative">
              <div className="grid grid-cols-4 gap-[20px] items-end pr-[10px] mb-[20px]">
                <div>
                  <Label>Position</Label>
                  <Select defaultValue="Network Support Engineer" className="text-[#A6B2D0]" />
                </div>
                <div>
                  <Label>Work Place</Label>
                  <Input defaultValue="Central Texas College" />
                </div>
                <div>
                  <Label>Starting from</Label>
                  <div className="flex gap-[10px]">
                    <Select defaultValue="September" className="text-[#050A62]" />
                    <Select defaultValue="2015" className="text-[#050A62]" />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex gap-[10px]">
                    <div className="w-1/2">
                      <Label>Ending</Label>
                      <Select defaultValue="September" className="text-[#050A62]" />
                    </div>
                    <div className="w-1/2 flex items-end">
                      <Select defaultValue="2015" className="text-[#050A62]" />
                    </div>
                  </div>
                  <label className="flex items-center gap-[8px] cursor-pointer ml-[5px]">
                    <div className="w-[16px] h-[16px] rounded-[4px] border-[1.5px] border-[#D2DCFF] bg-white"></div>
                    <span className="text-[12px] font-semibold text-[#050A62]">Currently Working</span>
                  </label>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <textarea 
                  placeholder="Type your comments..."
                  className="w-full h-[80px] rounded-[15px] bg-[#FFFFFF] border-[1.5px] border-[#D2DCFF] p-[20px] text-[13px] text-[#A6B2D0] focus:outline-none focus:border-[#3038BD] transition-colors resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section>
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[18px] font-bold text-[#050A62]">Certifications</h2>
              <button className="bg-[#18CD94] text-white h-[32px] px-[15px] rounded-full flex items-center justify-center gap-[6px] hover:bg-[#15b381] transition-colors focus:outline-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[11px] font-semibold">Add Certification</span>
              </button>
            </div>
            
            <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative">
              <button className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="flex flex-col gap-[20px] pr-[10px]">
                <div className="flex gap-[20px]">
                  <div className="w-[300px]">
                    <Label>Certificate name</Label>
                    <Input defaultValue="Certificate Of Appreciation" />
                  </div>
                  <div className="w-[400px]">
                    <Label>Certificate Link</Label>
                    <Input defaultValue="http://shdsiucdgjcjkndckjwchduwhjcua" />
                  </div>
                </div>
                
                <div>
                  <button className="w-[220px] h-[48px] rounded-full bg-white border-[1.5px] border-dashed border-[#D2DCFF] flex items-center justify-between px-[20px] text-[#050A62] hover:border-[#3038BD] transition-colors">
                    <div className="flex items-center gap-[10px]">
                      <div className="w-[20px] h-[20px] bg-[#EEF2FF] rounded-[4px] flex items-center justify-center">
                        <span className="text-[8px]">★</span>
                      </div>
                      <span className="text-[12px] font-semibold">Upload Certificate</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* PORTFOLIO */}
          <section>
            <div className="flex justify-between items-center mb-[15px]">
              <h2 className="text-[18px] font-bold text-[#050A62]">Portfolio</h2>
              <button className="bg-[#18CD94] text-white h-[32px] px-[15px] rounded-full flex items-center justify-center gap-[6px] hover:bg-[#15b381] transition-colors focus:outline-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[11px] font-semibold">Add Portfolio</span>
              </button>
            </div>
            
            <div className="bg-[#EEF2FF] w-full rounded-[20px] p-[30px] relative mb-[40px]">
              <button className="absolute top-[20px] right-[20px] text-[#050A62] hover:text-red-500 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="grid grid-cols-4 gap-[20px] items-start pr-[10px] mb-[20px]">
                <div className="col-span-1">
                  <Label>Title</Label>
                  <Input />
                </div>
                <div className="col-span-2">
                  <Label>Portfolio Link</Label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-[85%] h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] focus:outline-none"
                    />
                    <div className="absolute right-[20%] top-[12px] text-[#A6B2D0]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <button className="w-[100%] h-[48px] mt-[10px] rounded-[15px] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex items-center justify-between px-[15px] text-[#050A62] hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-[10px]">
                      <div className="w-[20px] h-[20px] bg-[#E2F7EE] rounded-[4px] flex items-center justify-center">
                        <span className="text-[#18CD94] text-[10px] font-bold">📄</span>
                      </div>
                      <span className="text-[12px] font-bold">Upload Portfolio</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-[10px] text-[#18CD94] mt-[5px] text-center w-full block">
                    * You can upload PDF or JPEG
                  </span>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <textarea 
                  placeholder="Type your comments..."
                  className="w-full h-[80px] rounded-[15px] bg-[#FFFFFF] border-[1.5px] border-[#D2DCFF] p-[20px] text-[13px] text-[#A6B2D0] focus:outline-none focus:border-[#3038BD] transition-colors resize-none"
                ></textarea>
              </div>
            </div>
            
            {/* Final Next Button */}
            <div className="flex justify-end mt-[20px]">
              <button 
                onClick={() => router.push("/choose-skill")}
                className="w-[140px] h-[36px] rounded-full bg-[#3038BD] text-white text-[12px] font-bold hover:bg-[#252b99] transition-colors focus:outline-none shadow-[0_8px_16px_rgba(48,56,189,0.15)]"
              >
                NEXT
              </button>
            </div>
          </section>

        </div>
      </main>
    </StepperLayout>
  );
}
