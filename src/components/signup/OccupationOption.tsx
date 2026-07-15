"use client";

import { Check } from "lucide-react";
import { Occupation } from "@/types/occupation";

interface OccupationOptionProps {
  occupation: Occupation;
  isSelected: boolean;
  onSelect: (occupation: Occupation) => void;
}

export function OccupationOption({
  occupation,
  isSelected,
  onSelect,
}: OccupationOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(occupation)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(occupation);
        }
      }}
      className={`
        flex items-center justify-between w-full box-border
        h-[78px] px-[16px] rounded-[10px] shrink-0
        text-left text-[21px] leading-none font-poppins
        transition-colors duration-150 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1
        ${
          isSelected
            ? "bg-[#4ADF86] border-[1.33px] border-[#4ADF86] text-[#FFFFFF] font-semibold"
            : "bg-[#F3F7FF] border-[1.33px] border-[#D2DCFF] text-[#070E66] font-semibold hover:border-blue-300"
        }
      `}
      style={{
        maxWidth: "374px",
        width: "100%",
      }}
    >
      <span>{occupation}</span>
      {isSelected && (
        <div className="w-[25px] h-[25px] rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-[#4ADF86] stroke-[3]" />
        </div>
      )}
    </button>
  );
}
