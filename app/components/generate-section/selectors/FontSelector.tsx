import React from "react";

interface FontOption {
  name: string;
  value: string;
}

interface FontSelectorProps {
  fonts: FontOption[];
  italic: boolean;
  selectedFont: string;
  onChange: (value: string) => void; // Callback for selection change
  titleText: string;
}

export default function FontSelector({
  fonts,
  selectedFont,
  italic,
  onChange,
  titleText,
}: FontSelectorProps) {
  const titlePreview = titleText.slice(0, 2) || "Aa";

  return (
    <div className="flex flex-wrap gap-4">
      {fonts.map((font) => (
        <button
          key={font.name}
          onClick={() => onChange(font.value)}
          className={`${
            font.value
          } size-10 rounded flex items-center justify-center shadow disabled:bg-main-blue ${
            font.value === selectedFont
              ? "bg-main-blue text-white"
              : "bg-white text-black"
          }`}
          disabled={font.value === selectedFont}
        >
          <span className={` ${italic && `italic`} text-lg font-black `}>
            {titlePreview}
          </span>
        </button>
      ))}
    </div>
  );
}
