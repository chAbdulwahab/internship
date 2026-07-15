"use client";

import { Occupation } from "@/types/occupation";
import { occupations } from "@/data/occupations";
import { OccupationOption } from "./OccupationOption";

interface OccupationSelectorProps {
  selectedOccupation: Occupation;
  onSelectOccupation: (occupation: Occupation) => void;
}

export function OccupationSelector({
  selectedOccupation,
  onSelectOccupation,
}: OccupationSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select an occupation"
      className="flex flex-col w-[374px]"
      style={{ gap: "5px" }}
    >
      {occupations.map((occ) => (
        <OccupationOption
          key={occ}
          occupation={occ}
          isSelected={selectedOccupation === occ}
          onSelect={onSelectOccupation}
        />
      ))}
    </div>
  );
}
