import React from "react";

interface FontSizeSelectorProps {
  size: number;
  onChange: (size: number) => void;
}

export default function FontSizeSelector({
  size,
  onChange,
}: FontSizeSelectorProps) {
  return (
    <div className="relative flex flex-col w-full h-full">
      <p className="text-black font-bold text-xs mr-auto">Font Size</p>
      <input
        type="range"
        min="16"
        max="100"
        step="10"
        value={size}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-10 bg-white shadow rounded appearance-none touch-none"
        style={{
          background: `linear-gradient(to right, #011ea0ff 0%, #011ea0ff ${
            ((size - 16) / 84) * 100
          }%, #FFFFFF ${((size - 16) / 84) * 100}%, #FFFFFF 100%)`,
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
