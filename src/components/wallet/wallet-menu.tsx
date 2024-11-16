import { Wallet } from "@prisma/client";
import { Button } from "../ui/button";
import { ArrowDown, ArrowLeftRight, ArrowUp, Copy } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

type Props = {
  setTab: (tab: string | null) => void;
  wallet: Wallet;
};
export const WalletMenu = ({ setTab, wallet }: Props) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  if (wallet === undefined || wallet === null) return <WalletMenuLoader />;
  return (
    <div className="flex flex-col items-center justify-start gap-2 lg:w-1/3 w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 px-4 max-lg:absolute z-[999] inset-0">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Balance</h1>
        <Button
          variant={"outline"}
          className="flex items-center justify-center gap-2"
          onClick={() => copyToClipboard(wallet?.publicKey as string)}
        >
          {wallet &&
            wallet?.publicKey.slice(0, 3) +
              "...." +
              wallet?.publicKey.slice(
                wallet.publicKey.length - 3,
                wallet.publicKey.length - 1
              )}
          <Copy size={13} />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 text-3xl font-bold">
        <span>$</span>
        <span>0.00</span>
      </div>
      <div className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-400">
        <span>$</span>
        <span>0.00</span>
        <span>0%</span>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-2 my-3">
          <Button
            variant={"outline"}
            className="rounded-full text-sky-600 h-12 w-12 text-xl p-0"
            onClick={() => setTab("receive")}
          >
            <ArrowDown size={20} />
          </Button>
          <span className="text-sm text-slate-400">Receive</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 my-3">
          <Button
            variant={"outline"}
            className="rounded-full text-sky-600 h-12 w-12 text-xl p-0"
            onClick={() => setTab("send")}
          >
            <ArrowUp size={20} />
          </Button>
          <span className="text-sm text-slate-400">Send</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 my-3">
          <Button
            variant={"outline"}
            className="rounded-full text-sky-600 h-12 w-12 text-xl p-0"
            onClick={() => setTab("swap")}
          >
            <ArrowLeftRight size={20} />
          </Button>
          <span className="text-sm text-slate-400">Swap</span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <h2 className="font-semibold text-lg">Recent Transactions</h2>
      </div>
      <ScrollArea className="h-full w-full"></ScrollArea>
    </div>
  );
};

const WalletMenuLoader = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-2 lg:w-1/3 w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 px-4 max-lg:absolute z-[999] inset-0">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-20 h-8 rounded-lg" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-3xl font-bold">
        <Skeleton className="w-28 h-10 rounded-lg" />
        <Skeleton className="w-20 h-7 rounded-lg" />
      </div>

      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-2 my-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 my-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 my-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <Skeleton className="w-44 h-8 rounded-lg" />
      </div>
    </div>
  );
};
