import React from "react";
import { cabinetFont, supremeFont } from "../styling/font-classes";
import GitHub from "@/svgs/github.svg";
import DynamicBannerNSkills from "../hero-section/DynamicBannerNSkills";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className={`h-[101svh] flex flex-col gap-2 md:gap-4 items-center justify-center snap-start w-full relative bg-main-blue `}
    >
      <span
        className={`flex flex-row gap-1 items-center justify-center font-semibold text-xl md:text-2xl text-white`}
      >
        {`kl1n`}
        <div className="size-6 md:size-7 bg-white rounded-full"></div>
        {`banners`}
      </span>
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
        <p className={` font-bold text-lg md:text-2xl mr-auto text-white`}>
          for
        </p>
      </div>
      <DynamicBannerNSkills />
      <br />
      <div className="flex flex-col gap-6 items-center justify-center">
        <Link
          href={"#start"}
          className="font-extrabold text-xl md:text-2xl py-2 px-20 text-main-blue bg-white rounded-full active:scale-105 transition-all"
        >
          Get Started
        </Link>
        <a
          target="_blank"
          href="https://github.com/introvertio/kl1n-banners"
          className="text-white text-xs font-bold flex flex-row gap-2 items-center justify-center bg-black rounded-full active:scale-105 transition-all px-4 py-2"
        >
          <GitHub />
          Open Source
        </a>
      </div>
      <br />
    </section>
  );
}
