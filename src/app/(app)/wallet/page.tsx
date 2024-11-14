import { createWallet, getWallets } from "@/actions/wallet";
import { CreateWallet } from "@/components/wallet/create-wallet";
import { Wallet } from "@/components/wallet/wallet";
import { Wallet as WalletType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const WalletPage = async () => {
  const wallets = (await getWallets()) as WalletType[];
  if (wallets.length < 1) {
    return <CreateWallet />;
  }
  return redirect(`/wallet/${wallets[0].id}`);
};

export default WalletPage;
