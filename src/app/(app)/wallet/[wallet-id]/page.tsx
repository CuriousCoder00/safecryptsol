"use client";
import { Wallet } from "@/components/wallet/wallet";
import { usePathname } from "next/navigation";

const WalletPage = () => {
  const path = usePathname();
  const walletId = path.split("/")[2];
  return <Wallet walletId={walletId} />;
};

export default WalletPage;
