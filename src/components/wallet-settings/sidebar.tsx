import React from "react";
import { ScrollArea } from "../ui/scroll-area";

import { Wallet } from "@prisma/client";
import Link from "next/link";

export const Sidebar = ({ walletId }: { walletId: string }) => {
  return (
    <div className="flex flex-col h-full text-white w-44">
      <SidebarItem walletId={walletId} />
    </div>
  );
};

export const SidebarItem = ({ walletId }: { walletId: string }) => {
  const [wallets, setWallets] = React.useState<Wallet[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  // const fetchWallets = async () => {
  //   setLoading(true);
  //   const wallets = (await getWallets()) as Wallet[];
  //   if (wallets.length > 0) {
  //     setWallets(wallets);
  //     setLoading(false);
  //   }
  // };
  // React.useEffect(() => {
  //   fetchWallets();
  // }, []);
  return (
    <div className="border-r h-full w-full shadow-slate-600 relative flex flex-col items-start justify-start py-2">
      <ScrollArea className="h-full flex flex-col items-start justify-start gap-2 w-full">
        <Link
          href={`/wallet/${walletId as string}/settings/general`}
          className="flex items-center justify-start w-full hover:bg-slate-900 transition-all duration-150 cursor-pointer p-1 py-2"
        >
          General
        </Link>
        <Link
          href={`/wallet/${walletId as string}/settings/general`}
          className="flex items-center justify-start w-full hover:bg-slate-900 transition-all duration-150 cursor-pointer p-1 py-2"
        >
          General
        </Link>
        <Link
          href={`/wallet/${walletId as string}/settings/general`}
          className="flex items-center justify-start w-full hover:bg-slate-900 transition-all duration-150 cursor-pointer p-1 py-2"
        >
          General
        </Link>
      </ScrollArea>
    </div>
  );
};
