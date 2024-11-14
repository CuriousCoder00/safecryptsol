import { createWallet } from "@/actions/wallet";
import { Button } from "../ui/button";

type Props = {};
export const CreateWallet = ({}: Props) => {
  return (
    <div className="flex gap-2 w-full items-center justify-center">
      <Button className="w-1/2" onClick={async () => await createWallet()}>
        Create Wallet
      </Button>
      <Button className="w-1/2">Import Wallet</Button>
    </div>
  );
};
