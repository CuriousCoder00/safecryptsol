"use client";
import { Settings, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { Wallet as WalletType } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { getWallet } from "@/actions/wallet";
import { Button } from "../ui/button";
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
    <div className="flex items-center justify-between w-full shadow-inner shadow-slate-700 p-2 rounded-xl">
      <div className="flex items-center justify-center gap-2">
        <Wallet />
        Wallet {wallet?.id}
      </div>
      <Button variant={"ghost"} className="flex items-center justify-center gap-2">
        Settings <Settings />
      </Button>
    </div>
  );
};
