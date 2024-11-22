import { getWalletsOfAAccount } from "@/actions/wallet";
import { CreateWallet } from "@/components/wallet/create-wallet";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const WalletPage = async () => {
  const account = await db.aC.findFirst();
  if (!account) {
    return <CreateWallet />;
  }
  const wallets = await getWalletsOfAAccount({
    accountId: account?.id as string,
  });
  if (wallets && wallets.wallets && wallets.wallets.length > 0) {
    return redirect(`/wallet/${account.id}/${wallets.wallets[0].id}`);
  }
  return <CreateWallet />;
};

export default WalletPage;
