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
import { GetAccountById } from "@/actions/wallet";
import { usePathname } from "next/navigation";
import { AC } from "@prisma/client";

const Seed = () => {
  const [account, setAccount] = React.useState<AC>();
  const [hidden, setHidden] = React.useState<boolean>(true);

  const path = usePathname();
  const accountId = path.split("/")[2];
  const fetchWallet = async () => {
    const res = await GetAccountById({ accountId });
    if (res.status === false) {
      console.log(res.error);
    }
    if (res.account) {
      setAccount(res.account);
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
            View Seed Phrase
            <Eye />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seed Phrase</DialogTitle>
            <DialogDescription>
              The seed phrase is used to recover your wallet in case you lose
              access to it.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <div className="grid grid-cols-3 gap-2 z-10">
              {account?.mnemonics.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-12 border rounded-md shadow-inner shadow-slate-600"
                >
                  {word}
                </div>
              ))}
            </div>
            {hidden && (
              <div
                className="absolute inset-0 z-40 flex items-center justify-center w-full  bg-black"
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

export default Seed;
