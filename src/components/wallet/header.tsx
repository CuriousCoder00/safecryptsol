"use client";
import { Settings, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { Wallet as WalletType } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { getWallet } from "@/actions/wallet";
import Link from "next/link";

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
    <div className="flex items-center justify-between w-full shadow-md shadow-slate-700 p-1">
      <div className="flex items-center justify-center gap-2">
        <Wallet />
        {wallet?.name}
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link href={`/wallet/${wallet?.id}/settings`} className="flex items-center justify-center gap-2">
          <Settings /> Wallet Settings
        </Link>
      </div>
    </div>
  );
};
