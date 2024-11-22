"use client";
import { Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Wallet as WalletType } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { createWallet, getWallet } from "@/actions/wallet";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import SelectWallet from "./select-wallet";

type Props = {};
export const WalletHeader = ({}: Props) => {
  const path = usePathname();
  const router = useRouter();
  const accountId = path.split("/")[2] as string;
  const walletId = path.split("/")[3] as string;
  const [wallet, setWallet] = useState<WalletType>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getWallet({ walletId }).then((res) => {
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
      createWallet({ accountId }).then((res) => {
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
    </div>
  );
};
