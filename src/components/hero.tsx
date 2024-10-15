import { Button } from "./ui/button";

type Props = {};
export const Hero = ({}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 z-10 backdrop-blur-lg">
      <h1 className="text-3xl font-bold">Welcome to Safe-crypt Sol</h1>
      <p className="text-slate-500 text-lg">Let&apos;s get started</p>
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Button>Get Started With A New Wallet</Button>
        <Button variant={"outline"}>Import Wallet</Button>
      </div>
    </div>
  );
};
