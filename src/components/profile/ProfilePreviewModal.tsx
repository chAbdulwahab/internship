"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ProfilePreviewModalProps {
  onClose: () => void;
  uploadedImage: string | null;
}

export const ProfilePreviewModal: React.FC<ProfilePreviewModalProps> = ({ onClose, uploadedImage }) => {
  const router = useRouter();

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex justify-between items-center mb-[20px]">
      <h3 className="text-[16px] font-bold text-[#050A62]">{title}</h3>
      <button className="text-[#3038BD] hover:opacity-70">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5l13.732-13.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 overflow-hidden">
      {/* Modal Container */}
      <div className="w-[95%] h-[95%] max-w-[1400px] mt-[2%] bg-white rounded-t-[20px] flex flex-col relative overflow-hidden shadow-2xl animate-fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-center h-[60px] px-[40px] border-b border-[#E5E7EB] shrink-0 sticky top-0 z-20 bg-white">
          <h2 className="text-[14px] font-semibold text-[#050A62]">Profile Preview</h2>
          <button onClick={onClose} className="text-[#050A62] hover:opacity-70 focus:outline-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto w-full px-[80px] py-[40px] bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-[20px]">
            
            {/* About Section */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="About" />
              <div className="flex gap-[30px] items-start">
                <img 
                  src={uploadedImage || "/assets/Upload%20File.png"} 
                  alt="Profile" 
                  className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-white shadow-sm shrink-0 bg-white"
                />
                <p className="text-[12px] text-[#050A62] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  <br/><br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="Personal Information" />
              <div className="grid grid-cols-4 gap-y-[20px] gap-x-[30px]">
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">First Name</p>
                  <p className="text-[13px] font-bold text-[#050A62]">John</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Last Name</p>
                  <p className="text-[13px] font-bold text-[#050A62]">Doe</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Country of Residence</p>
                  <p className="text-[13px] font-bold text-[#050A62]">USA</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Country of Citizenship</p>
                  <p className="text-[13px] font-bold text-[#050A62]">USA</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Phone Number</p>
                  <p className="text-[13px] font-bold text-[#050A62]">+1 123 555 2783</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">English Proficiency</p>
                  <p className="text-[13px] font-bold text-[#050A62]">Fluent</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Notice period to resign from current job</p>
                  <p className="text-[13px] font-bold text-[#050A62]">One Month</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Which type of job commitment do you prefer?</p>
                  <p className="text-[13px] font-bold text-[#050A62]">Full Time</p>
                </div>

                <div className="col-span-4 mt-[10px]">
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">What's your preferred hourly rate in U.S. dollars?</p>
                  <p className="text-[13px] font-bold text-[#050A62]">$24</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="Education" />
              <div className="flex flex-col gap-[15px]">
                {[
                  { deg: "PHD in UX Designing", bg: "bg-[#FFEFEF]", icon: "🎓" },
                  { deg: "Masters in UX Designing", bg: "bg-[#F3EFFF]", icon: "🎓" },
                  { deg: "Bachelor in UX Designing", bg: "bg-[#EFFFF6]", icon: "🎓" }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-[10px] p-[15px] flex items-center justify-between border-[1px] border-white hover:border-[#D2DCFF] transition-colors shadow-sm">
                    <div className="flex items-center gap-[15px]">
                      <div className={`w-[36px] h-[36px] ${item.bg} rounded-[8px] flex items-center justify-center text-[16px]`}>{item.icon}</div>
                      <p className="text-[13px] font-bold text-[#050A62]">{item.deg}</p>
                    </div>
                    <div className="flex items-center gap-[40px]">
                      <p className="text-[11px] font-medium text-[#050A62]">University of Punjab College of Art & Design</p>
                      <p className="text-[11px] font-medium text-[#050A62]">Sep 2005 - Dec 2009</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="Experience" />
              <div className="grid grid-cols-2 gap-[20px]">
                {[
                  { role: "Team Lead Product designer", comp: "Enterprise Engineering Solutions Inc", period: "Mar 2021 - Present (2 year 11 months)", points: ["Lead team of designers in developing UI/UX", "Collaborated with team to find creative solutions", "Conducted user research to understand user needs", "Presented findings to team and implemented changes", "Created social media campaign to generate leads", "Conducted user research to inform development", "Analyzed data to identify areas for improvement", "Created prototypes of new product"] },
                  { role: "Senior UI UX designer", comp: "Greelance", period: "Jan 2020 - Jan 2021 (12 months)", points: ["Lead a team of designers in developing wireframes", "Worked with team to come up with creative solutions", "Conducted user research to gain insights into users", "Presented findings to team and implemented changes", "Created social media campaign that generated buzz", "Conducted user research for the development", "Analyzed data to identify areas for improvement", "Created a prototype of a new product"] },
                  { role: "Senior UI UX designer", comp: "Algolix Technologies", period: "Oct 2018 - May 2019 (9 months)", points: ["Lead the design of a new mobile app", "Redesigned the company website", "Created a set of UI design guidelines", "Conducted user research that led to the development"] },
                  { role: "Junior UI UX designer", comp: "Algolix Technologies", period: "Nov 2016 - Oct 2018 (3 years)", points: ["Created wireframes for new features on website", "Conducted user testing to ensure feedback", "Worked with developers to implement designs", "Designed visual elements for web"] },
                ].map((exp, i) => (
                  <div key={i} className="bg-white rounded-[15px] p-[20px] border-[1px] border-white shadow-sm hover:border-[#D2DCFF] transition-colors">
                    <div className="flex gap-[15px] mb-[15px]">
                      <div className="w-[36px] h-[36px] bg-[#EEF2FF] rounded-full shrink-0 flex items-center justify-center text-[16px]">💼</div>
                      <div>
                        <p className="text-[11px] font-bold text-[#3038BD] mb-[2px]">{exp.role}</p>
                        <p className="text-[14px] font-bold text-[#050A62] mb-[2px]">{exp.comp}</p>
                        <p className="text-[10px] font-medium text-[#A6B2D0]">{exp.period}</p>
                      </div>
                    </div>
                    <ul className="list-disc pl-[25px] text-[11px] text-[#050A62] leading-relaxed">
                      {exp.points.map((pt, j) => <li key={j} className="mb-[2px]">{pt}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="Certifications" />
              <div className="grid grid-cols-4 gap-[20px]">
                {[
                  "Advanced Social Media Strategy Training & Certification",
                  "Adobe CC Masterclass: Photoshop, Illustrator, XD & InDesign",
                  "Google Display Ads Certification",
                  "Advanced Social Media Strategy Training & Certification"
                ].map((cert, i) => (
                  <div key={i} className="bg-white rounded-[15px] overflow-hidden border-[1px] border-[#D2DCFF] flex flex-col shadow-sm">
                    <div className="h-[120px] bg-gray-100 flex items-center justify-center relative border-b border-[#D2DCFF]">
                      <div className="absolute inset-0 m-[10px] border-[2px] border-dashed border-gray-300 flex flex-col items-center justify-center p-[10px]">
                        <p className="text-[16px] font-serif uppercase tracking-widest text-gray-500 mb-[5px]">Certificate</p>
                        <p className="text-[6px] italic text-gray-400 mb-[10px]">This certificate is presented to</p>
                        <p className="text-[10px] font-serif border-b border-gray-400 px-[20px]">An Andrew Adamson</p>
                        <div className="w-[16px] h-[16px] bg-yellow-400 rounded-full mt-[10px]"></div>
                      </div>
                    </div>
                    <div className="p-[15px] flex-1 flex items-center justify-center text-center">
                      <p className="text-[11px] font-bold text-[#050A62]">{cert}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="Portfolio" />
              <div className="grid grid-cols-4 gap-[20px]">
                {[
                  { title: "Website Designs", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" },
                  { title: "Presentation Designs", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" },
                  { title: "Videography", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" },
                  { title: "Social Media", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" },
                  { title: "Website Designs", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" },
                  { title: "Presentation Designs", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" },
                  { title: "Videography", tags: "Multiple websites for various industries like Fintech, Ecommerce and Edtech" }
                ].map((port, i) => (
                  <div key={i} className="bg-white rounded-[15px] overflow-hidden border-[1px] border-white shadow-sm flex flex-col hover:border-[#D2DCFF] transition-colors">
                    <div className="h-[100px] bg-gray-900 flex items-center justify-center">
                      <span className="text-[20px]">🎨</span>
                    </div>
                    <div className="p-[15px]">
                      <p className="text-[11px] font-bold text-[#050A62] mb-[5px]">{port.title}</p>
                      <p className="text-[9px] text-[#A6B2D0] mb-[10px] leading-snug">{port.tags}</p>
                      <a href="#" className="text-[9px] text-[#3038BD] hover:underline">www.websitedesigns.com</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-[#F3F7FF] rounded-[15px] p-[30px]">
              <SectionHeader title="Skills" />
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[40px]">
                  <div>
                    <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Category</p>
                    <p className="text-[13px] font-bold text-[#050A62]">Design</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#A6B2D0] mb-[4px]">Sub-Category</p>
                    <p className="text-[13px] font-bold text-[#050A62]">UI UX</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A6B2D0] mb-[10px]">Skills</p>
                  <div className="flex flex-wrap gap-[10px]">
                    {[
                      "Wireframing, Prototyping", "User Experience Design (UXD)", "Web Design", "User Experience (UX)", 
                      "User Interface Design", "Branding & Identity", "Advertising", "Graphic Design", "Digital Marketing"
                    ].map((skill, i) => (
                      <span key={i} className="px-[12px] py-[6px] bg-[#E2F7EE] text-[#18CD94] rounded-full text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-[15px] h-[80px] items-center px-[80px] border-t border-[#E5E7EB] shrink-0 sticky bottom-0 z-20 bg-white">
          <button onClick={onClose} className="w-[120px] h-[40px] rounded-full border-[1.5px] border-[#D2DCFF] text-[#050A62] text-[12px] font-bold hover:bg-[#F3F7FF] focus:outline-none">
             Back
          </button>
          <button 
            onClick={() => {
              onClose();
              router.push("/test-list");
            }}
            className="w-[120px] h-[40px] rounded-full bg-[#3038BD] text-white text-[12px] font-bold hover:opacity-90 shadow-md focus:outline-none"
          >
             Submit
          </button>
        </div>
        
      </div>
    </div>
  );
};
