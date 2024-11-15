"use client";
import { Settings, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { Wallet as WalletType } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { getWallet } from "@/actions/wallet";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

type Props = {};
export const WalletHeader = ({}: Props) => {
  const path = usePathname();

  const [wallet, setWallet] = useState<WalletType>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getWallet(path.split("/")[2]).then((res) => {
        setWallet(res as WalletType);
      });
    });
  }, [path.split("/")[2]]);

  return (
    <div className="flex items-center justify-between w-full shadow-md shadow-slate-700 p-1 h-10">
      {wallet ? (
        <div className="flex items-center justify-center gap-2">
          <Wallet />
          {wallet?.name}
        </div>
      ) : (
        <Skeleton className="w-40 h-full" />
      )}

      <div className="flex items-center justify-center gap-2 h-full">
        {wallet ? (
          <Link
            href={`/wallet/${wallet?.id}/settings`}
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
