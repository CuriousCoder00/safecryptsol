import { useEffect, useState, useTransition } from "react";
import { Wallet as WalletType } from "@prisma/client";
import { getWallet } from "@/actions/wallet";
import { Receive } from "./receive";
import { ScrollArea } from "../ui/scroll-area";
import { Send } from "./send";
import { Swap } from "./swap";
import { WalletMenu } from "./wallet-menu";

type Props = {
  walletId: string;
};
export const Wallet = ({ walletId }: Props) => {
  const [wallet, setWallet] = useState<WalletType>();
  const [tab, setTab] = useState<string | null>(null);
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
  return (
    <div className="flex items-start justify-start h-full w-full gap-2 relative">
      <WalletMenu setTab={setTab} wallet={wallet as WalletType} />
      <ScrollArea className="h-full lg:w-2/3 w-full">
        {tab !== null && (
          <div className="flex flex-col gap-2 px-4 items-start justify-start w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 text-wrap flex-wrap">
            {tab === "receive" ? (
              <Receive setTab={setTab} pubKey={wallet?.publicKey as string} />
            ) : tab === "send" ? (
              <Send setTab={setTab} />
            ) : (
              <Swap setTab={setTab} />
            )}
          </div>
        )}
        {tab === null && (
          <div className="flex flex-col gap-2 px-4 items-start justify-start w-full h-full shadow-inner shadow-slate-700 rounded-xl p-2 text-wrap flex-wrap max-lg:hidden">
            <Receive
              isTabNull={tab === null}
              setTab={setTab}
              pubKey={wallet?.publicKey as string}
            />
          </div>
        )}
        {tab !== null && (
          <div className="max-lg:absolute inset-0 bg-black z-[999999] flex items-start justify-start lg:hidden h-full w-full">
            {tab === "receive" ? (
              <Receive setTab={setTab} pubKey={wallet?.publicKey as string} />
            ) : tab === "send" ? (
              <Send setTab={setTab} />
            ) : (
              <Swap setTab={setTab} />
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
