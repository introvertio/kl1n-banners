import React from "react";
import AlignLeft from "@/svgs/AlignLeft.svg";
import AlignLeftWhite from "@/svgs/AlignLeftWhite.svg";
import AlignCenter from "@/svgs/AlignCenter.svg";
import AlignCenterWhite from "@/svgs/AlignCenterWhite.svg";
import AlignRight from "@/svgs/AlignRight.svg";
import AlignRightWhite from "@/svgs/AlignRightWhite.svg";

interface AlignSelectorProps {
  alignment: "left" | "center" | "right";
  onChange: (value: "left" | "center" | "right") => void;
}

export default function AlignSelector({
  alignment,
  onChange,
}: AlignSelectorProps) {
  return (
    <div className="flex flex-row gap-2">
      {["left", "center", "right"].map((align) => (
        <button
          key={align}
          onClick={() => onChange(align as "left" | "center" | "right")}
          className={`h-10 w-20 shadow rounded flex items-center justify-center active:scale-95 transition-all ${
            alignment === align
              ? "bg-main-blue text-white"
              : "bg-white text-black"
          }`}
        >
          {align == "left" ? (
            <>{align == alignment ? <AlignLeftWhite /> : <AlignLeft />}</>
          ) : align == "center" ? (
            <>{align == alignment ? <AlignCenterWhite /> : <AlignCenter />}</>
          ) : (
            <>{align == alignment ? <AlignRightWhite /> : <AlignRight />}</>
          )}
        </button>
      ))}
    </div>
  );
}
