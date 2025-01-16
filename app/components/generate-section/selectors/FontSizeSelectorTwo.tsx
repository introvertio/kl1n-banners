import React from "react";

interface FontSizeSelectorTwoProps {
  size: number;
  onChange: (size: number) => void;
}

export default function FontSizeSelectorTwo({
  size,
  onChange,
}: FontSizeSelectorTwoProps) {
  const min = 12;
  const max = 50;

  // Calculate the percentage for the gradient based on the current size
  const percentage = ((size - min) / (max - min)) * 100;

  return (
    <div className="relative flex flex-col w-full h-full">
      <p className="text-black font-bold text-xs mr-auto">Font Size</p>
      <input
        type="range"
        min={min}
        max={max}
        value={size}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-10 bg-transparent shadow rounded appearance-none"
        style={{
          background: `linear-gradient(to right, #011ea0ff 0%, #011ea0ff ${percentage}%, #FFFFFF ${percentage}%, #FFFFFF 100%)`,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #011ea0ff;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #011ea0ff;
          cursor: pointer;
        }
        input[type="range"]::-ms-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #011ea0ff;
          cursor: pointer;
        }
        input[type="range"] {
          -webkit-tap-highlight-color: transparent; /* Prevent highlighting during touch */
          touch-action: manipulation; /* Ensure touch events are correctly handled */
        }
      `}</style>
    </div>
  );
}
