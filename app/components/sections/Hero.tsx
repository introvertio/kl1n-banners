import React from "react";
import { cabinetFont, supremeFont } from "../styling/font-classes";
import GitHub from "@/svgs/github.svg";
import DynamicBannerNSkills from "../hero-section/DynamicBannerNSkills";

export default function Hero() {
  return (
    <section
      className={`h-[101svh] flex flex-col gap-1 items-center justify-center snap-start w-full ${cabinetFont} relative bg-main-blue `}
    >
      <div
        className="flex flex-col gap-5 items-start
         justify-center p-3"
      >
        <h1 className="text-[70px] [line-height:_.7] md:text-[90px] font-black text-main-blue [text-shadow:_-4px_4px_0px_#ffffff]">
          SOCIAL
        </h1>
        <h1 className="text-[70px] [line-height:_.7] md:text-[90px] font-black text-main-blue [text-shadow:_-4px_4px_0px_#ffffff]">
          BANNERS
        </h1>
        <p
          className={` ${supremeFont} font-bold text-lg md:text-2xl mr-auto text-white`}
        >
          for
        </p>
      </div>
      <DynamicBannerNSkills />
      <br />

      <a
        target="_blank"
        href="https://github.com/introvertio/kl1n-banners"
        className="text-white text-xs font-bold flex flex-row gap-2 items-center justify-center bg-black rounded-full active:scale-105 transition-all px-4 py-2"
      >
        <GitHub />
        Open Source
      </a>
    </section>
  );
}
