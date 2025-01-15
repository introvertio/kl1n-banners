import React from "react";

interface FontWeightSelectorProps {
  weight: number;
  font: string;
  onChange: (weight: number) => void;
}

export default function FontWeightSelector({
  weight,
  font,
  onChange,
}: FontWeightSelectorProps) {
  const fontWeights = [
    { label: "Thin", value: 300 },
    { label: "Normal", value: 500 },
    { label: "Bold", value: 700 },
    { label: "Black", value: 900 },
  ];

  return (
    <div className="relative flex flex-col w-full h-full">
      <p className="text-black font-bold text-xs mr-auto mb-2">Font Weight</p>
      <div className="flex gap-2">
        {fontWeights.map((fontWeight) => (
          <button
            key={fontWeight.value}
            onClick={() => onChange(fontWeight.value)}
            className={`h-10 w-20 rounded shadow ${
              weight === fontWeight.value
                ? "bg-main-blue text-white"
                : "bg-white text-black"
            } transition-all active:scale-95`}
            style={{ fontWeight: fontWeight.value }}
          >
            <p className={`${font} `}>{fontWeight.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
