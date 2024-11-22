"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { Wallet } from "@prisma/client";
import { getWallet } from "@/actions/wallet";
import { usePathname } from "next/navigation";

const Keys = () => {
  const [wallet, setWallet] = React.useState<Wallet>();
  const [hidden, setHidden] = React.useState<boolean>(true);
  const path = usePathname();
  const walletId = path.split("/")[3];
  const fetchWallet = async () => {
    const res = await getWallet({ walletId });
    if (res.status === false) {
      console.log(res.error);
    }
    if (res.wallet) {
      setWallet(res.wallet);
    }
  };
  React.useEffect(() => {
    fetchWallet();
  }, []);
  return (
    <div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full my-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="flex items-center justify-between w-full h-12"
          >
            View Public Key
            <Eye />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Public Key</DialogTitle>
            <DialogDescription>
              The public key is used to receive funds from other wallets.
            </DialogDescription>
          </DialogHeader>
          {wallet?.publicKey}
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="flex items-center justify-between w-full h-12"
          >
            View Private Key
            <Eye />
          </Button>
        </DialogTrigger>
        <DialogContent className="text-wrap">
          <DialogHeader>
            <DialogTitle>Private Key</DialogTitle>
            <DialogDescription>
              The private key is used to access your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="block break-words max-w-[450px] relative">
            <span className="z-10">{wallet?.privateKey}</span>
            {hidden && (
              <div
                className="absolute inset-0 z-40 flex items-center justify-center w-[450px] h-[50px] bg-black"
                onMouseEnter={() => setHidden(false)}
                onMouseLeave={() => setHidden(true)}
              >
                <Eye />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Keys;
