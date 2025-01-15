import Hero from "./components/sections/Hero";
import BannerGenerator from "./components/sections/BannerGenerator";

export default function Home() {
  return (
    <main className="h-svh w-svw overflow-scroll snap-y snap-mandatory scroll-smooth">
      <Hero />
      <section id="start">
        <BannerGenerator />
      </section>
    </main>
  );
}
