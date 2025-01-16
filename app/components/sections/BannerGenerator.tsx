"use client";
import MainController from "../generate-section/MainController";
import BannerPreview from "../preview/BannerPreview";
import { cabinetFont } from "../styling/font-classes";

export default function BannerGenerator() {
  return (
    <section
      className={`h-[120svh] overflow-y-auto flex flex-col md:flex-row items-center justify-center snap-start w-full relative `}
    >
      <BannerPreview />
      <MainController />
    </section>
  );
}
