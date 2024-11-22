"use client";
import { Wallet } from "@/components/wallet/wallet";
import { usePathname } from "next/navigation";

const WalletPage = () => {
  const path = usePathname();
  const walletId = path.split("/")[3];
  return <Wallet walletId={walletId} />;
};

export default WalletPage;
