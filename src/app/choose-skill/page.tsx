"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepperLayout } from "@/components/stepper/StepperLayout";

type Category = {
  id: string;
  name: string;
  icon: string;
};



const categories: Category[] = [
  { id: 'ecommerce', name: 'E Commerce Skills', icon: '/assets/Frame 1686560137.png' },
  { id: 'cybersecurity', name: 'Cybersecurity Engineer', icon: '/assets/Frame 1686560138.png' },
  { id: 'cloud', name: 'Cloud Computing Engineer', icon: '/assets/Frame 1686560139.png' },
  { id: 'digital-marketing', name: 'Digital Marketing Expert', icon: '/assets/Frame 1686560140.png' },
  { id: 'software', name: 'Software Engineering', icon: '/assets/Frame 1686560141.png' },
  { id: 'it-staffing', name: 'IT Staffing', icon: '/assets/Frame 1686560142.png' },
  { id: 'datacenter', name: 'Data Center Security', icon: '/assets/Frame 1686560143.png' },
  { id: 'ai', name: 'Artificial Intelligence', icon: '/assets/Frame 1686560144.png' },
  { id: 'bi', name: 'Business Intelligence', icon: '/assets/Frame 1686560145.png' },
  { id: 'decision', name: 'Decision Intelligence', icon: '/assets/Frame 1686560146.png' },
  { id: 'robotics', name: 'Robotics', icon: '/assets/Frame 1686560147.png' },
  { id: 'vr-ar', name: 'Virtual/Augmented', icon: '/assets/Frame 1686560148.png' },
  { id: 'systems', name: 'Systems Engineering', icon: '/assets/Frame 1686560149.png' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '/assets/Frame 1686560150.png' },
  { id: 'fintech', name: 'Fintech', icon: '/assets/Frame 1686560151.png' },
  { id: 'autonomous', name: 'Autonomous Systems', icon: '/assets/Frame 1686560152.png' },
  { id: 'ml', name: 'Machine Learning', icon: '/assets/Frame 1686560153.png' },
  { id: 'ev', name: 'Electric-Vehicle Technology', icon: '/assets/Frame 1686560154.png' },
  { id: 'iot', name: 'Internet of Things', icon: '/assets/Frame 1686560155.png' },
  { id: 'recycle', name: 'Recycle-Energy', icon: '/assets/Frame 1686560156.png' },
  { id: 'smart-home', name: 'Smart-Home', icon: '/assets/Frame 1686560157.png' },
  { id: 'quantum', name: 'Quantum Computing', icon: '/assets/Frame 1686560159.png' },
  { id: 'blockchain', name: 'Blockchain', icon: '/assets/Frame 1686560150.png' },
];

const subCategoriesMap: Record<string, string[]> = {
  'ecommerce': ['Shopify Development', 'WooCommerce', 'Amazon FBA', 'E-Commerce Strategy', 'Product Listing', 'Payment Integration'],
  'cybersecurity': ['Network Security', 'Penetration Testing', 'Security Auditing', 'Threat Analysis', 'Incident Response', 'Compliance'],
  'cloud': ['AWS Solutions', 'Azure Architecture', 'Google Cloud', 'DevOps', 'Cloud Migration', 'Serverless'],
  'digital-marketing': ['SEO Specialist', 'PPC Management', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics'],
  'software': ['Frontend Development', 'Backend Development', 'Full Stack', 'Mobile Development', 'API Development', 'Testing/QA'],
  'it-staffing': ['Technical Recruiting', 'IT Consulting', 'Staff Augmentation', 'Project Staffing', 'Contract Hiring', 'Talent Sourcing'],
  'datacenter': ['Server Management', 'Network Infrastructure', 'Disaster Recovery', 'Virtualization', 'Storage Solutions', 'Monitoring'],
  'ai': ['Natural Language Processing', 'Computer Vision', 'Deep Learning', 'AI Strategy', 'Model Training', 'AI Ethics'],
  'bi': ['Data Visualization', 'Reporting Tools', 'Data Warehousing', 'ETL Processes', 'Dashboard Design', 'Predictive Analytics'],
  'decision': ['Data-Driven Strategy', 'Forecasting', 'Risk Analysis', 'Decision Modeling', 'Optimization', 'Scenario Planning'],
  'robotics': ['Robot Programming', 'Embedded Systems', 'Sensor Integration', 'Motion Planning', 'Industrial Automation', 'Drone Tech'],
  'vr-ar': ['Unity Development', 'Unreal Engine', '3D Modeling', 'AR Applications', 'VR Experience Design', 'Spatial Computing'],
  'systems': ['System Architecture', 'Requirements Engineering', 'Integration Testing', 'Reliability Engineering', 'Process Optimization', 'Documentation'],
  'crypto': ['Smart Contracts', 'DeFi Development', 'Token Economics', 'Wallet Integration', 'Exchange Development', 'Crypto Trading'],
  'fintech': ['Payment Systems', 'Banking APIs', 'Regulatory Compliance', 'Trading Platforms', 'Insurance Tech', 'Lending Solutions'],
  'autonomous': ['Self-Driving Tech', 'Sensor Fusion', 'Path Planning', 'SLAM', 'Vehicle Controls', 'Safety Systems'],
  'ml': ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Feature Engineering', 'Model Deployment', 'MLOps'],
  'ev': ['Battery Technology', 'Charging Infrastructure', 'Powertrain Design', 'EV Software', 'Fleet Management', 'Energy Storage'],
  'iot': ['Sensor Networks', 'Edge Computing', 'IoT Protocols', 'Smart Devices', 'Industrial IoT', 'IoT Security'],
  'recycle': ['Solar Energy', 'Wind Power', 'Energy Efficiency', 'Waste Management', 'Green Technology', 'Sustainability'],
  'smart-home': ['Home Automation', 'Voice Assistants', 'Smart Lighting', 'Security Systems', 'Energy Management', 'Connected Appliances'],
  'quantum': ['Quantum Algorithms', 'Quantum Hardware', 'Quantum Software', 'Quantum Cryptography', 'Quantum Simulation', 'Hybrid Computing'],
  'blockchain': ['Solidity Development', 'Web3 Integration', 'NFT Development', 'DAO Governance', 'Layer 2 Solutions', 'Cross-chain'],
};

const skillsMap: Record<string, string[]> = {
  'ecommerce': ['Product Photography', 'Inventory Management', 'Customer Analytics', 'A/B Testing', 'Conversion Optimization', 'Supply Chain', 'Dropshipping', 'Marketplace Management', 'UX Design', 'Copywriting', 'Brand Strategy', 'Pricing Strategy', 'CRM Tools', 'Logistics', 'Return Management'],
  'cybersecurity': ['Firewall Configuration', 'SIEM Tools', 'Malware Analysis', 'Vulnerability Assessment', 'Identity Management', 'Encryption', 'SOC Operations', 'Forensics', 'Risk Assessment', 'Security Architecture', 'Cloud Security', 'Mobile Security', 'Zero Trust', 'PKI', 'OWASP'],
  'cloud': ['Terraform', 'Kubernetes', 'Docker', 'CI/CD Pipelines', 'Infrastructure as Code', 'Load Balancing', 'Auto Scaling', 'Cloud Monitoring', 'Cost Optimization', 'Multi-Cloud', 'Microservices', 'Service Mesh', 'Cloud Functions', 'VPC Design', 'IAM Policies'],
  'digital-marketing': ['Google Ads', 'Facebook Ads', 'LinkedIn Marketing', 'Influencer Marketing', 'Video Marketing', 'Podcast Marketing', 'Affiliate Marketing', 'Marketing Automation', 'Growth Hacking', 'Brand Management', 'PR Strategy', 'Community Management', 'Webinar Marketing', 'SMS Marketing', 'Retargeting'],
  'software': ['React', 'Node.js', 'Python', 'Java', 'TypeScript', 'GraphQL', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis', 'Git', 'Agile/Scrum', 'System Design', 'Code Review', 'Performance Optimization'],
};

const ChooseSkill: React.FC = () => {
  const router = useRouter();
  const currentStep = 3;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [suggestedSkill, setSuggestedSkill] = useState<string>('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>(['Retail Media', 'Programmatic', 'Network', 'Product Design']);
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState<boolean>(false);

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setSelectedSubCategories([]);
    setSelectedSkills([]);
  };

  const handleCategoryRemove = () => {
    setSelectedCategory(null);
    setSelectedSubCategories([]);
    setSelectedSkills([]);
  };

  const toggleSubCategory = (subCat: string) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCat) ? prev.filter(s => s !== subCat) : [...prev, subCat]
    );
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else if (selectedSkills.length < 15) {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSuggestSkill = () => {
    if (suggestedSkill.trim() && !suggestedTags.includes(suggestedSkill.trim())) {
      setSuggestedTags(prev => [...prev, suggestedSkill.trim()]);
      setSuggestedSkill('');
    }
  };

  const removeSuggestedTag = (tag: string) => {
    setSuggestedTags(prev => prev.filter(t => t !== tag));
  };

  const handleBack = () => router.push('/setup-profile');
  const handleNext = () => {
    router.push('/connect-wallet');
  };

  const subCategories = selectedCategory ? (subCategoriesMap[selectedCategory.id] || []) : [];
  const availableSkills = selectedCategory ? (skillsMap[selectedCategory.id] || skillsMap['software']) : [];

  return (
    <StepperLayout currentStep={3}>
      <main className="flex-1 flex flex-col pt-[50px] pb-[100px] px-[80px]">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full relative">

          {/* ===== CATEGORY SECTION ===== */}
          <section className="mb-[40px]">
            <h2 className="text-[18px] font-bold text-[#050A62] mb-[5px] flex items-center">
              Category<span className="text-[#EA3B3B] ml-[2px] text-[20px] leading-none">*</span>
            </h2>

            {!selectedCategory ? (
              <>
                <p className="text-[12px] text-[#050A62] mb-[20px]">Select a category from the following.</p>
                <div className="flex flex-wrap gap-[15px]">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className="hover:scale-105 transition-transform"
                      onClick={() => handleCategorySelect(cat)}
                    >
                      <img src={cat.icon} alt={cat.name} className="h-auto w-auto object-contain" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="mb-[30px]">
                <div className="inline-flex items-center relative">
                  <img src={selectedCategory.icon} alt={selectedCategory.name} className="h-auto w-auto object-contain" />
                  <button 
                    className="absolute -right-[15px] -top-[10px] bg-white rounded-full shadow-sm border border-[#D2DCFF] p-[2px] text-[#A6B2D0] hover:text-[#EA3B3B] transition-colors" 
                    onClick={handleCategoryRemove} 
                    aria-label="Remove category"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ===== SUB CATEGORY SECTION ===== */}
          {selectedCategory && (
            <section className="mb-[40px]">
              <h2 className="text-[18px] font-bold text-[#050A62] mb-[5px] flex items-center">
                Sub Category<span className="text-[#EA3B3B] ml-[2px] text-[20px] leading-none">*</span>
              </h2>
              <p className="text-[12px] text-[#050A62] mb-[20px]">Select a category from the following.</p>

              <div className="flex flex-wrap gap-[10px]">
                {subCategories.map(sub => (
                  <button
                    key={sub}
                    className={`px-[15px] py-[8px] rounded-full text-[12px] font-medium border transition-colors ${
                      selectedSubCategories.includes(sub)
                        ? 'bg-[#3038BD] text-white border-[#3038BD]'
                        : 'bg-white text-[#050A62] border-[#D2DCFF] hover:border-[#3038BD]'
                    }`}
                    onClick={() => toggleSubCategory(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ===== SKILLS SECTION ===== */}
          {selectedCategory && (
            <section className="mb-[40px]">
              <h2 className="text-[16px] font-bold text-[#050A62] mb-[15px]">Skills</h2>

              <div className="relative w-[300px] mb-[15px]">
                <div
                  className={`w-full h-[42px] rounded-full bg-white border-[1.5px] ${skillsDropdownOpen ? 'border-[#3038BD]' : 'border-[#D2DCFF]'} px-[20px] flex items-center justify-between cursor-pointer`}
                  onClick={() => setSkillsDropdownOpen(!skillsDropdownOpen)}
                >
                  <span className="text-[13px] text-[#050A62] font-medium">
                    {selectedSkills.length > 0 ? `${selectedSkills.length} skill(s) selected` : 'Select'}
                  </span>
                  <svg className={`transition-transform ${skillsDropdownOpen ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#050A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {skillsDropdownOpen && (
                  <div className="absolute top-[50px] left-0 w-full bg-white border border-[#D2DCFF] rounded-[15px] shadow-lg max-h-[250px] overflow-y-auto z-20 py-[10px]">
                    {availableSkills.map(skill => (
                      <label key={skill} className="flex items-center px-[20px] py-[10px] hover:bg-[#F3F7FF] cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-[10px] w-[16px] h-[16px] rounded-[4px] border-[#D2DCFF] text-[#3038BD] focus:ring-[#3038BD]"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 15}
                        />
                        <span className="text-[13px] text-[#050A62] ml-[5px]">{skill}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-[10px] mb-[10px]">
                  {selectedSkills.map(skill => (
                    <span key={skill} className="bg-[#F3F7FF] text-[#3038BD] px-[15px] py-[6px] rounded-full text-[12px] font-medium flex items-center gap-[8px]">
                      {skill}
                      <button className="hover:text-[#EA3B3B]" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-[#A6B2D0] flex items-center gap-[5px]">
                <span className="text-[#3038BD]">✦</span> You can only select 15 skills in total
              </p>
            </section>
          )}

          {/* ===== SUGGEST MISSING SKILL ===== */}
          {selectedCategory && (
            <section className="mb-[40px]">
              <h2 className="text-[16px] font-bold text-[#050A62] mb-[15px]">Suggest missing skill</h2>
              <div className="w-[300px] mb-[15px]">
                <input
                  type="text"
                  className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
                  placeholder=""
                  value={suggestedSkill}
                  onChange={(e) => setSuggestedSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSuggestSkill()}
                />
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {suggestedTags.map(tag => (
                  <span key={tag} className="bg-white border border-[#D2DCFF] text-[#050A62] px-[15px] py-[6px] rounded-full text-[12px] font-medium flex items-center gap-[8px]">
                    {tag}
                    <button className="text-[#A6B2D0] hover:text-[#EA3B3B]" onClick={() => removeSuggestedTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ===== NEXT BUTTON ===== */}
          <div className="mt-auto flex justify-end">
            <button className="bg-[#3038BD] text-white px-[40px] h-[45px] rounded-full text-[14px] font-semibold hover:bg-[#232b9c] transition-colors" onClick={handleNext}>
              Next
            </button>
          </div>

        </div>
      </main>
    </StepperLayout>
  );
};

export default ChooseSkill;
