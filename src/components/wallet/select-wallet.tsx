import React from "react";

import { GetWalletsOfAAccount } from "@/actions/wallet";
import { Wallet } from "@prisma/client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const SelectWallet = ({ accountId }: { accountId: string }) => {
  const path = usePathname();
  const walletId = path.split("/")[3];
  const [wallets, setWallets] = React.useState<Wallet[]>([]);
  const getWallets = async () => {
    const { status, wallets } = await GetWalletsOfAAccount({
      accountId: accountId,
    });
    if (status === false) {
      console.log(wallets);
    }
    if (wallets) {
      setWallets(wallets);
    }
  };
  React.useEffect(() => {
    getWallets();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center justify-center gap-1 p-0 px-1 border w-36"
        >
          {wallets ? (
            wallets.filter((wallet) => wallet.id === walletId)[0]?.name
          ) : (
            <Skeleton className="w-full h-6" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="top-20 left-16 z-[9999]" side={"left"}>
        <SheetHeader>
          <SheetTitle>Wallets</SheetTitle>
        </SheetHeader>
        {wallets ? (
          wallets.map((wallet) => (
            <Link
              key={wallet.id}
              href={`/wallet/${accountId}/${wallet.id}`}
              className="flex items-center justify-start w-full p-1 py-2"
            >
              {wallet.name}
            </Link>
          ))
        ) : (
          <Skeleton className="w-full h-10" />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SelectWallet;
