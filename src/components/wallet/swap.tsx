import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
type Props = {
  setTab: (tab: string | null) => void;
};

export const Swap = ({ setTab }: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full gap-3 bg-black">
      <Button
        variant={"link"}
        className="absolute top-2 left-0 flex gap-2"
        onClick={() => setTab(null)}
      >
        <ArrowLeft />
        Back
      </Button>
      <h1 className="text-2xl font-bold mt-12">Swap</h1>
    </div>
  );
};
