import Image from "next/image";
import { ReactNode } from "react";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface SignupLayoutProps {
  children: ReactNode;
  leftImage?: string;
  showSocial?: boolean;
}

export function SignupLayout({ children, leftImage = "/assets/freelancer-signup-screen.png", showSocial = true }: SignupLayoutProps) {
  return (
    <main className="w-[100vw] min-h-[100vh] flex bg-[var(--background-right)] m-0 p-0 max-w-none">
      
      {/* LEFT SECTION (Hidden on mobile) */}
      <section className="hidden min-[900px]:block relative shrink-0" style={{ width: "823px", backgroundColor: "var(--left-blue)" }}>
        <Image
          src={leftImage}
          alt="Side visual"
          fill
          unoptimized
          priority
          style={{ objectFit: "contain", objectPosition: "top left" }}
        />
      </section>

      {/* RIGHT SECTION */}
      <section className="relative flex-1 block min-h-[100svh] min-[900px]:min-h-0 overflow-y-auto p-4 min-[900px]:p-0">
        
        {/* Logo Container */}
        <div className="relative min-[900px]:absolute mt-8 min-[900px]:mt-0 min-[900px]:top-[124px] min-[900px]:left-[397px] w-[292px] shrink-0">
          <Image
            src="/assets/greelance-logo.png"
            alt="Greelance"
            width={292}
            height={44}
            unoptimized
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* White Form Card */}
        <div 
          className="relative min-[900px]:absolute min-[900px]:top-[185px] min-[900px]:left-[248px] bg-[#FFFFFF] rounded-[33px] overflow-hidden w-full max-w-[590px] min-[900px]:w-[590px] h-[726px] shadow-[0_16px_47px_rgba(65,211,223,0.07),0_5px_21px_rgba(20,45,120,0.025)] mt-8 min-[900px]:mt-0 shrink-0"
        >
          {children}
        </div>

        {/* Social Login Section */}
        {showSocial && (
          <div className="relative min-[900px]:absolute min-[900px]:top-[940px] min-[900px]:left-[248px] w-full min-[900px]:w-[590px] mt-8 min-[900px]:mt-0 mb-8 min-[900px]:mb-0 flex justify-center shrink-0">
            <SocialLoginButtons />
          </div>
        )}

      </section>
    </main>
  );
}
