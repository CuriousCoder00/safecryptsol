"use client";
import { CreateNewWallet } from "@/actions/onboarding";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export const CreateWallet = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    startTransition(() => {
      CreateNewWallet().then((res) => {
        router.push(`/wallet`);
      });
    });
  }, []);
  return (
    <>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full z-[9999999]">
          <div className="flex flex-col items-center justify-center mt-12 shadow-inner shadow-slate-700 rounded-xl border p-2 gap-3 px-4">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Creating a wallet...
            </div>
            <div className="flex">Please wait while we create your wallet.</div>
          </div>
        </div>
      )}
    </>
  );
};
