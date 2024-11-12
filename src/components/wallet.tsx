"use client";

import { createWallet } from "@/actions/account";
import { useEffect, useState, useTransition } from "react";

type Props = {};
const Wallet = ({}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isWalletExists, setIsWalletExists] = useState(false);
  const handleWalletCreation = async () => {
    startTransition(() => {
      createWallet()
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log("unexpected error");
        });
    });
  };

  // const checkWalletExists = async () => {
  //   // check if wallet exists
  //   const res = await getWallet();
  //   if(res?.mnemonics) setIsWalletExists(true);
  //   console.log(isWalletExists)
  // };

  // // useEffect(()=>{
  // //   handleWalletCreation();
  // // },[])
  // useEffect(()=>{
  //   checkWalletExists();
  // },[])
  return (
    <div className="flex flex-col items-center justify-center max-w-screen min-h-screen gap-6">
      {isPending ? (
        <div className="fixed top-3 items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p>Creating wallet...</p>
        </div>
      ) : (
        "Wallet created successfully"
      )}
    </div>
  );
};
export default Wallet;
