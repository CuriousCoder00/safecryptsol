"use client";

import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center max-w-screen min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <Hero />
    </div>
  );
}
