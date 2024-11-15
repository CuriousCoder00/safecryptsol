import { AlertCircle, ArrowLeft, Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";
type Props = {
  isTabNull?: boolean;
  pubKey: string;
  setTab: (tab: string | null) => void;
};

export const Receive = ({ isTabNull, pubKey, setTab }: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full gap-3 bg-black">
      {!isTabNull && (
        <Button
          variant={"link"}
          className="absolute top-2 left-0 flex gap-2"
          onClick={() => setTab(null)}
        >
          <ArrowLeft />
          Back
        </Button>
      )}
      <h1 className="text-2xl font-bold mt-12">Your Wallet Address</h1>
      <p className="w-[300px]">
        You can deposit crypto or NFTs into your account via this Solana wallet
        address:
      </p>
      {pubKey !== undefined && <QRCode value={pubKey} size={200} />}
      <div className="flex items-center border rounded justify-between md:w-2/3 w-full gap-4 py-2 px-4">
        <div className="flex items-center justify-center w-full">
          {pubKey &&
            pubKey.slice(0, 3) +
              "...." +
              pubKey.slice(pubKey.length - 3, pubKey.length - 1)}
        </div>
        <Button
          variant={"ghost"}
          className="bg-blue-700 rounded-full w-10 h-10 p-0"
        >
          <Copy size={20} />
        </Button>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <AlertCircle size={18} /> Only send crypto to this address via Solana
        network
      </div>
    </div>
  );
};
