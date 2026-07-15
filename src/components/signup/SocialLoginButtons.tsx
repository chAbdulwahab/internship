import Image from "next/image";

export function SocialLoginButtons() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[17px] text-[#DDE4FC] font-poppins mb-[17px]">
        You can also signin with
      </p>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Sign in with social accounts"
          className="transition-all duration-150 ease-in-out hover:opacity-80 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full"
          onClick={() => {}}
        >
          <Image
            src="/assets/social-icons.png"
            alt="Social Login"
            width={217}
            height={51}
            unoptimized
            style={{ width: "217px", height: "auto", objectFit: "contain" }}
          />
        </button>
      </div>
    </div>
  );
}
