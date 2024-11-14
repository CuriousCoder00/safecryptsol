"use client";
import { createWallet } from "@/actions/wallet";
import { Wallet as WalletType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const CreateWallet = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    startTransition(() => {
      createWallet().then((res) => {
        router.push(`/wallet/${res?.wallet?.id as string}`);
      });
    });
  }, []);
  return (
    <>
      {isPending && (
        <div className="flex flex-col items-center justify-center mt-12 shadow-inner shadow-slate-700 rounded-xl border p-2 gap-3 px-4">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            Creating a wallet...
          </div>
          <div className="flex">Please wait while we create your wallet.</div>
        </div>
      )}
    </>
  );
};
