"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepperLayout } from "@/components/stepper/StepperLayout";

const CATEGORIES = [
  { name: "E Commerce Skills", src: "/assets/Frame 1686560137.png" },
  { name: "Cybersecurity Engineer", src: "/assets/Frame 1686560138.png" },
  { name: "Cloud Computing Engineer", src: "/assets/Frame 1686560139.png" },
  { name: "Digital Marketing Expert", src: "/assets/Frame 1686560140.png" },
  { name: "Software Engineering", src: "/assets/Frame 1686560141.png" },
  { name: "IT Staffing", src: "/assets/Frame 1686560142.png" },
  { name: "Data Center security", src: "/assets/Frame 1686560143.png" },
  { name: "Artificial Intelligence", src: "/assets/Frame 1686560144.png" },
  { name: "Business Intelligence", src: "/assets/Frame 1686560145.png" },
  { name: "Decision Intelligence", src: "/assets/Frame 1686560146.png" },
  { name: "Virtual/Augmented", src: "/assets/Frame 1686560147.png" },
  { name: "Systems Engineering", src: "/assets/Frame 1686560148.png" },
  { name: "Blockchain", src: "/assets/Frame 1686560149.png" },
  { name: "Cryptocurrency", src: "/assets/Frame 1686560150.png" },
  { name: "Fintech", src: "/assets/Frame 1686560151.png" },
  { name: "Electric-Vehicle Technology", src: "/assets/Frame 1686560152.png" },
  { name: "Internet of Things", src: "/assets/Frame 1686560153.png" },
  { name: "Recycle-Energy", src: "/assets/Frame 1686560154.png" },
  { name: "Smart-Home", src: "/assets/Frame 1686560155.png" },
  { name: "Quantum Computing", src: "/assets/Frame 1686560156.png" },
  { name: "Robotics", src: "/assets/Frame 1686560157.png" },
  { name: "Machine Learning", src: "/assets/Frame 1686560159.png" },
];

export default function ChooseSkillPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(1);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const activeCategoryData = CATEGORIES.find(c => c.name === selectedCategory);

  return (
    <StepperLayout currentStep={3}>
      <main className="flex-1 flex flex-col pt-[50px] pb-[100px] px-[80px]">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full relative">
          
          {/* Header Section */}
          <div className="mb-[20px]">
            <h1 className="text-[18px] font-bold text-[#050A62] flex items-center mb-[5px]">
              Category<span className="text-[#EA3B3B] ml-[2px] text-[20px] leading-none">*</span>
            </h1>
            {!selectedCategory && (
              <p className="text-[13px] text-[#050A62] font-medium">
                Select a category from the following.
              </p>
            )}
          </div>

          {!selectedCategory ? (
            /* --- VIEW 1: CATEGORIES GRID --- */
            <div className="flex flex-wrap gap-[15px] mb-[60px]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className="transition-all duration-200 rounded-[10px] overflow-hidden focus:outline-none hover:opacity-90 hover:scale-[1.02] shadow-sm"
                >
                  <img 
                    src={cat.src} 
                    alt={cat.name} 
                    className="h-[56px] w-auto object-contain"
                  />
                </button>
              ))}
            </div>
          ) : (
            /* --- VIEW 2: SUB-CATEGORY & SKILLS SELECTION --- */
            <div className="flex flex-col w-full animate-fade-in">
              
              {/* Selected Category Pill */}
              <div className="mb-[30px]">
                <div className="inline-flex items-center bg-[#F7FAFF] border-[1.5px] border-[#D2DCFF] rounded-[15px] p-[10px] pr-[15px]">
                  <img 
                    src={activeCategoryData?.src} 
                    alt={activeCategoryData?.name} 
                    className="h-[40px] w-auto object-contain"
                  />
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="ml-[15px] text-[#3038BD] hover:bg-[#EEF2FF] rounded-full p-[4px] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sub Category Section */}
              <div className="mb-[30px]">
                <h1 className="text-[18px] font-bold text-[#050A62] flex items-center mb-[5px]">
                  Sub Category<span className="text-[#EA3B3B] ml-[2px] text-[20px] leading-none">*</span>
                </h1>
                <p className="text-[13px] text-[#050A62] font-medium mb-[15px]">
                  Select a category from the following.
                </p>
                <div className="flex flex-wrap gap-[15px]">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSubCategory(index)}
                      className={`
                        h-[36px] px-[25px] rounded-[8px] text-[12px] font-semibold transition-colors focus:outline-none border-[1.5px]
                        ${selectedSubCategory === index 
                          ? 'bg-[#3038BD] text-white border-[#3038BD]' 
                          : 'bg-white text-[#050A62] border-[#D2DCFF] hover:border-[#3038BD]'
                        }
                      `}
                    >
                      {activeCategoryData?.name || "E Commerce Skills"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-[30px] w-full max-w-[300px]">
                <h1 className="text-[13px] font-bold text-[#050A62] mb-[10px]">
                  Skills
                </h1>
                
                <div className="relative">
                  {/* Custom Select Trigger */}
                  <div 
                    onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
                    className="w-full h-[42px] rounded-full bg-white border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] flex items-center justify-between cursor-pointer focus:outline-none focus:border-[#3038BD] transition-colors"
                  >
                    <span>Select</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-200 ${isSkillsDropdownOpen ? 'rotate-180' : ''}`}>
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#3038BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Custom Dropdown Menu */}
                  {isSkillsDropdownOpen && (
                    <div className="absolute top-[calc(100%+5px)] left-0 w-[300px] bg-white rounded-[15px] p-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-50 max-h-[250px] overflow-y-auto border-[1px] border-[#F3F7FF]">
                      <div className="flex flex-col gap-[12px]">
                        {[
                          "Retail Media", 
                          "Programmatic", 
                          "Network", 
                          "Product Design", 
                          "UI/UX", 
                          "Frontend", 
                          "Backend", 
                          "DevOps"
                        ].map((skillName, idx) => {
                          const isChecked = selectedSkills.includes(skillName);
                          
                          return (
                            <label key={idx} className="flex items-center gap-[10px] cursor-pointer group">
                              <div 
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleSkill(skillName);
                                }}
                                className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-colors border-[1.5px] ${
                                  isChecked 
                                    ? 'bg-[#18CD94] border-[#18CD94]' 
                                    : 'bg-white border-[#3038BD] group-hover:border-[#252b99]'
                                }`}
                              >
                                {isChecked && (
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 4.5L3.5 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <span className="text-[12px] font-semibold text-[#050A62]">{skillName}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Skills Tags */}
                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-[10px] mt-[15px] w-full max-w-[800px]">
                    {selectedSkills.map((skill) => (
                      <div 
                        key={skill} 
                        className="h-[30px] px-[15px] rounded-full bg-[#18CD94] text-white flex items-center justify-center text-[12px] font-medium shadow-[0_2px_8px_rgba(24,205,148,0.2)]"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedSkills.length === 0 && (
                  <p className="text-[#18CD94] text-[11px] mt-[8px]">
                    *You can only select 15 skills in total
                  </p>
                )}
              </div>

              {/* Suggest Missing Skill Section */}
              <div>
                <h1 className="text-[13px] font-bold text-[#050A62] mb-[10px]">
                  Suggest missing skill
                </h1>
                <input
                  type="text"
                  className="w-full max-w-[300px] h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors mb-[15px]"
                />
                
                {/* Green Pill Tags */}
                <div className="flex flex-wrap gap-[10px]">
                  {["Retail Media", "Programmatic", "Network", "Product Design"].map((skill) => (
                    <div 
                      key={skill} 
                      className="h-[30px] px-[15px] rounded-full bg-[#18CD94] text-white flex items-center justify-center text-[12px] font-medium shadow-[0_2px_8px_rgba(24,205,148,0.2)]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Next Button - Fixed to bottom right relative to container */}
          <div className="absolute bottom-[-40px] right-[0px]">
            <button 
              onClick={() => router.push("/connect-wallet")}
              className="w-[140px] h-[36px] rounded-full bg-[#3038BD] text-white text-[12px] font-bold hover:bg-[#252b99] transition-colors focus:outline-none shadow-[0_8px_16px_rgba(48,56,189,0.15)]"
            >
              Next
            </button>
          </div>
          
        </div>
      </main>
    </StepperLayout>
  );
}
