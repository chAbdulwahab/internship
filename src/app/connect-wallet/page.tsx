"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepperLayout } from "@/components/stepper/StepperLayout";

const WALLETS = [
  { id: "coinbase", name: "CoinBase", src: "/assets/Component 10.png" },
  { id: "fortmatic", name: "Fortmatic", src: "/assets/Component 11.png" },
  { id: "metamask", name: "MetaMask", src: "/assets/Component 12.png" },
];

export default function ConnectWalletPage() {
  const router = useRouter();
  // We'll set MetaMask as default to match the screenshot where it's fully blue.
  const [selectedWallet, setSelectedWallet] = useState<string>("metamask");

  // Helper component for labels
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[11px] font-bold text-[#050A62] mb-[6px] ml-[10px]">
      {children}
    </label>
  );

  // Helper component for standard input
  const Input = () => (
    <input
      type="text"
      className="w-full h-[42px] rounded-full bg-transparent border-[1.5px] border-[#D2DCFF] px-[20px] text-[13px] text-[#050A62] focus:outline-none focus:border-[#3038BD] transition-colors"
    />
  );

  return (
    <StepperLayout currentStep={4}>
      <main className="flex-1 flex flex-col pt-[50px] pb-[100px] px-[80px]">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full relative">
          
          {/* Header Section */}
          <div className="mb-[40px]">
            <h1 className="text-[22px] font-bold text-[#050A62] flex items-center mb-[5px]">
              Connect Wallet
            </h1>
            <p className="text-[13px] text-[#050A62] font-medium">
              Select a wallet you want to connect for your payment method. You can change the wallet after a sign in too.
            </p>
          </div>

          {/* Wallets Grid */}
          <div className="flex gap-[30px] mb-[60px]">
            {WALLETS.map((wallet) => {
              const isSelected = selectedWallet === wallet.id;
              return (
                <button
                  key={wallet.id}
                  onClick={() => setSelectedWallet(wallet.id)}
                  className={`
                    transition-all duration-200 rounded-[15px] overflow-hidden focus:outline-none
                    ${isSelected 
                      ? 'ring-2 ring-offset-4 ring-[#3038BD] shadow-[0_8px_20px_rgba(48,56,189,0.25)] scale-[1.02]' 
                      : 'hover:opacity-90 hover:scale-[1.02] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border-[1px] border-[#F3F7FF]'
                    }
                  `}
                >
                  <img 
                    src={wallet.src} 
                    alt={wallet.name} 
                    className="w-[140px] h-auto object-contain block"
                  />
                </button>
              );
            })}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-3 gap-[30px] w-[80%]">
            <div>
              <Label>Unique Address</Label>
              <Input />
            </div>
            <div>
              <Label>First Name</Label>
              <Input />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input />
            </div>
          </div>

          {/* Next Button - Fixed to bottom right relative to container */}
          <div className="absolute bottom-[0px] right-[0px]">
            <button 
              onClick={() => router.push("/complete-profile")}
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
