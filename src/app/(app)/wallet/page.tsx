import { getWallets } from "@/actions/wallet";
import { CreateWallet } from "@/components/wallet/create-wallet";
import { Wallet } from "@/components/wallet/wallet";
import { Wallet as WalletType } from "@prisma/client";

const WalletPage = async () => {
  const wallets = (await getWallets()) as WalletType[];
  if (wallets.length === 0) {
    return (
      <div>
        Wallet not found. Please create a new wallet to start sending and
        receiving transactions.
      </div>
    );
  }

  return <Wallet wallets={wallets} />;
};

export default WalletPage;
