"use client";
import { Loader2, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Wallet as WalletType } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { CreateWallet, GetWallet } from "@/actions/wallet";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import SelectWallet from "./select-wallet";

export const WalletHeader = () => {
  const path = usePathname();
  const router = useRouter();
  const accountId = path.split("/")[2] as string;
  const walletId = path.split("/")[3] as string;
  const [wallet, setWallet] = useState<WalletType>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetWallet({ walletId }).then((res) => {
        if (res.status === true) {
          if (res.wallet) {
            setWallet(res.wallet);
          }
        }
      });
    });
  }, []);

  const createNewWallet = async () => {
    startTransition(() => {
      CreateWallet({ accountId }).then((res) => {
        if (res.status === true) {
          setWallet(res.wallet);
          router.push(`/wallet/${accountId}/${res.wallet?.id}`);
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-between w-full shadow-md shadow-slate-700 p-1 h-10">
      {wallet ? (
        <div className="flex items-center justify-center gap-2">
          <SelectWallet accountId={accountId} />
        </div>
      ) : (
        <Skeleton className="w-40 h-full" />
      )}

      <div className="flex items-center justify-center gap-2 h-full">
        {wallet ? (
          <Button
            variant={"ghost"}
            className="flex items-center justify-center p-0 px-1 border"
            onClick={createNewWallet}
          >
            <Plus />
          </Button>
        ) : (
          <Skeleton className="w-8 h-full" />
        )}
        {wallet ? (
          <Link
            href={`/wallet/${accountId}/${wallet?.id}/settings`}
            className="flex items-center justify-center gap-2"
          >
            <Settings /> Wallet Settings
          </Link>
        ) : (
          <Skeleton className="w-40 h-full" />
        )}
      </div>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full z-[99999] bg-black bg-opacity-50">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};
