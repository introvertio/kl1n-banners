import { cabinetFont } from "../styling/font-classes";

export default function BannerGenerator() {
  return (
    <section
      className={`h-svh flex flex-col gap-1 items-center justify-center snap-start w-full ${cabinetFont} relative `}
    >
      <h1>Start</h1>
    </section>
  );
}
