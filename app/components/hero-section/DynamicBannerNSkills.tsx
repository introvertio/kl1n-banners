import React from "react";

interface Brand {
  font: string;
  value: string;
  font_size: number;
  font_weight: number;
  alignment: "left" | "center" | "right";
}

interface SkillsRDescription {
  font: string;
  value: string | [string];
  font_size: number;
  font_weight: number;
  alignment: "left" | "center" | "right";
}

export default function DynamicBannerNSkills() {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center text-white">
      <div className="w-full aspect-[820/310] text-black bg-white flex flex-col items-center justify-center max-w-2xl font-bold">
        <p className=" text-xl ">Dynamically Generated Banner</p>
        <small className="text-center">
          (Text below will be changing and so will the banner)
        </small>
      </div>
      <h2
        className={`text-[55px] [line-height:_.7] md:text-[80px] font-black `}
      >
        DEVELOPERS
      </h2>
    </div>
  );
}
