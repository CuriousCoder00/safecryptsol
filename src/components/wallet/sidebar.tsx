import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CreateWallet } from "./create-wallet";
import { getWallets } from "@/actions/wallet";
import { Wallet } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full text-white">
      <SidebarItem />
    </div>
  );
};

export const SidebarItem = () => {
  const [wallets, setWallets] = React.useState<Wallet[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const fetchWallets = async () => {
    setLoading(true);
    const wallets = (await getWallets()) as Wallet[];
    if (wallets.length > 0) {
      setWallets(wallets);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchWallets();
  }, []);
  return (
    <div className="border rounded-xl h-full w-full shadow-inner shadow-slate-600 relative flex flex-col items-center justify-between py-2">
      <ScrollArea className="h-full p-2 flex flex-col gap-5">
        <div className="flex flex-col items-start justify-start gap-2 h-full">
          {wallets.map((wallet, index) => (
            <Link
              href={`/wallet/${wallet.id}`}
              className="w-10 h-10 rounded-full flex items-center justify-center border shadow-inner shadow-slate-800 hover:bg-slate-800 transition-all duration-150 cursor-pointer"
              key={wallet.id}
            >
              A{index + 1}
            </Link>
          ))}
          {loading && (
            <div className="flex flex-col items-start justify-start gap-2 h-full">
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
              <Skeleton className="w-10 h-10 rounded-full shadow-inner shadow-slate-600" />
            </div>
          )}
        </div>
      </ScrollArea>
      <Dialog>
        <DialogTrigger className="p-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-600 hover:bg-slate-800 transition-all duration-150 cursor-pointer aspect-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white hover:scale-110 transition-transform duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Wallet</DialogTitle>
            <DialogDescription>
              Create a new wallet to start sending and receiving transactions.
            </DialogDescription>
          </DialogHeader>
          <CreateWallet />
        </DialogContent>
      </Dialog>
    </div>
  );
};
