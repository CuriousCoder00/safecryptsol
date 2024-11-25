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
import { GetAccounts } from "@/actions/wallet";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Button } from "../ui/button";
import { CreateNewWallet } from "@/actions/onboarding";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full text-white">
      <SidebarItem />
    </div>
  );
};

export const SidebarItem = () => {
  const [accounts, setAccounts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loading2, setLoading2] = React.useState<boolean>(false);
  const router = useRouter();
  const fetchAccounts = async () => {
    setLoading(true);
    const res = await GetAccounts();
    if (res.status === false) {
      console.log(res.error);
      setLoading(false);
    }
    if (res.status === true && res.accounts) {
      setAccounts(res.accounts);
      setLoading(false);
    }
  };
  const addNewWallet = async () => {
    setLoading2(true);
    const ac = await CreateNewWallet();
    if (ac.status === true) {
      router.push(`/wallet/${ac.account?.id}/${ac.wallet?.id}`);
      setLoading2(false);
    }
    setLoading2(false);
  };
  React.useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <div className="border rounded-xl h-full w-full shadow-inner shadow-slate-600 relative flex flex-col items-center justify-between py-2">
      <ScrollArea className="h-full p-2 flex flex-col gap-5">
        <div className="flex flex-col items-start justify-start gap-2 h-full">
          {accounts.map((account, index) => (
            <Link
              href={`/wallet/${account.id}/${account.wallets[0]?.id}`}
              className="w-10 h-10 rounded-full flex items-center justify-center border shadow-inner shadow-slate-800 hover:bg-slate-800 transition-all duration-150 cursor-pointer"
              key={account.id}
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
        <DialogContent className="z-[999]">
          {loading2 ? (
            <div className="flex items-center justify-center h-10 w-full">
              <Skeleton className="w-20 h-8" />
            </div>
          ) : (
            <DialogHeader>
              <DialogTitle>Create Wallet</DialogTitle>
              <DialogDescription>
                Create a new wallet to start sending and receiving transactions.
              </DialogDescription>
            </DialogHeader>
          )}
          <div className="flex gap-2 w-full items-center justify-center">
            <Button
              disabled={loading2}
              className="w-1/2"
              onClick={() => addNewWallet()}
            >
              Add new Wallet
            </Button>
            <Button disabled={loading2} className="w-1/2">
              Import Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
