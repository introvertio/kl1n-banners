import React from "react";

interface ItalicSelectorProps {
  isItalic: boolean;
  weight: number;
  font: string;
  onChange: (value: boolean) => void;
}

export default function ItalicSelector({
  font,
  weight,
  isItalic,
  onChange,
}: ItalicSelectorProps) {
  return (
    <button
      onClick={() => onChange(!isItalic)} // Toggle italic state
      className={`h-10 w-20 shadow rounded flex items-center justify-center transition-all active:scale-95 ${font} ${
        isItalic ? `bg-main-blue text-white` : `bg-white text-black`
      }`}
    >
      <p
        className="italic"
        style={{
          fontWeight: weight,
        }}
      >
        Italic
      </p>
    </button>
  );
}
