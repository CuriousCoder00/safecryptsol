import { FindFirstWallet } from "@/actions/wallet";
import { CreateWallet } from "@/components/wallet/create-wallet";
import { redirect } from "next/navigation";

const WalletPage = async () => {
  const data = await FindFirstWallet();
  if (!data.account) {
    return <CreateWallet />;
  }
  return redirect(`/wallet/${data.account.id}/${data.wallet?.id}`);
};

export default WalletPage;
