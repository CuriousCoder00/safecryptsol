import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Wallet as WalletType } from "@prisma/client";
import { getWallet } from "@/actions/wallet";
import { ArrowDown, ArrowLeftRight, ArrowUp, Copy } from "lucide-react";
import { Receive } from "./receive";

type Props = {
  walletId: string;
};
export const Wallet = ({ walletId }: Props) => {
  const [wallet, setWallet] = useState<WalletType>();
  const [tab, setTab] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  useEffect(() => {
    startTransition(() => {
      getWallet(walletId).then((res) => {
        setWallet(res as WalletType);
      });
    });
  }, []);
  return (
    <div className="flex items-start justify-start h-full w-full gap-2 relative">
      <div className="flex flex-col items-center justify-start gap-2 lg:w-1/3 w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 px-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Balance</h1>
          <Button
            variant={"outline"}
            className="flex items-center justify-center gap-2"
            onClick={() => copyToClipboard(wallet?.publicKey as string)}
          >
            {wallet &&
              wallet?.publicKey.slice(0, 3) +
                ".." +
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
            >
              <ArrowUp size={20} />
            </Button>
            <span className="text-sm text-slate-400">Send</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 my-3">
            <Button
              variant={"outline"}
              className="rounded-full text-sky-600 h-12 w-12 text-xl p-0"
            >
              <ArrowLeftRight size={20} />
            </Button>
            <span className="text-sm text-slate-400">Swap</span>
          </div>
        </div>
      </div>
      {tab !== null && (
        <div className="flex flex-col gap-2 px-4 items-start justify-start lg:w-2/3 w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 text-wrap flex-wrap max-md:absolute">
          {tab === "receive" && (
            <Receive setTab={setTab} pubKey={wallet?.publicKey as string} />
          )}
        </div>
      )}
      {tab === null && (
        <div className="flex flex-col gap-2 px-4 items-start justify-start lg:w-2/3 w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 text-wrap flex-wrap max-md:hidden max-md:absolute">
          <Receive setTab={setTab} pubKey={wallet?.publicKey as string} />
        </div>
      )}
    </div>
  );
};
