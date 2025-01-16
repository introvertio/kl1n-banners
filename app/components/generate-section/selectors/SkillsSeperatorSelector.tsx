import React from "react";
import None from "@/svgs/None.svg";
import NoneWhite from "@/svgs/NoneWhite.svg";

interface SkillsSeparatorSelectorProps {
  font: string;
  separators: (" , " | " - " | " / " | " | " | " ~ " | null)[]; // List of available separators
  selectedSeparator: " , " | " - " | " / " | " | " | " ~ " | null; // Currently selected separator
  onChange: (separator: " , " | " - " | " / " | " | " | " ~ " | null) => void; // Callback for selection change
}

export default function SkillsSeparatorSelector({
  font,
  separators,
  selectedSeparator,
  onChange,
}: SkillsSeparatorSelectorProps) {
  return (
    <div className="flex flex-row w-full flex-wrap gap-1 items-center justify-between">
      {separators.map((separator) => (
        <button
          key={separator || "null"} // Using "null" as key when separator is null
          onClick={() => onChange(separator)}
          className={`size-10 rounded flex items-center justify-center shadow disabled:bg-main-blue active:scale-95 transition-all ${
            separator === selectedSeparator
              ? "bg-main-blue text-white"
              : "bg-white text-black"
          }`}
          disabled={separator === selectedSeparator}
        >
          {separator === selectedSeparator ? (
            <p className={`${font} font-black`}>
              {separator ? separator : <NoneWhite />}
            </p>
          ) : (
            <p className={`${font} font-black`}>
              {separator ? separator : <None />}
            </p>
          )}
        </button>
      ))}
    </div>
  );
}
