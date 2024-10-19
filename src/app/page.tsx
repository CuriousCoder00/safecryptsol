"use client";
import CreateWallet from "@/components/create-wallet";
import { Hero } from "@/components/hero";
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();
  return (
    <div className="relative flex flex-col items-center justify-center max-w-screen min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      {
        session?.data?.user ? (
          <CreateWallet/>
        ) : <Hero />
      }
    </div>
  );
}
