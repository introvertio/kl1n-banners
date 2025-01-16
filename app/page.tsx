"use client";
import Hero from "./components/sections/Hero";
import BannerGenerator from "./components/sections/BannerGenerator";
import { useEffect } from "react";
import { initializeDB } from "@/lib/db";

export default function Home() {
  useEffect(() => {
    async function start() {
      await initializeDB();
    }
    start();
  }, []);
  return (
    <main className="h-svh w-svw overflow-scroll snap-y snap-mandatory scroll-smooth">
      <Hero />
      <section id="start" className="min-h-svh">
        <BannerGenerator />
      </section>
    </main>
  );
}
