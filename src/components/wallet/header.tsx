import { Wallet } from "lucide-react";

type Props = {};
export const WalletHeader = ({}: Props) => {
  return (
    <div className="flex items-center justify-between w-full shadow-inner shadow-slate-700 p-2 rounded-xl">
      <div className="flex items-center justify-center gap-2">
        <Wallet />
        Wallet
      </div>
    </div>
  );
};
