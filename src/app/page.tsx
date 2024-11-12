"use client";
import { Hero } from "@/components/home/hero";
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();
  return (
    <div className="relative flex flex-col items-center justify-center max-w-screen min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <Hero />
      </div>
    </div>
  );
}
