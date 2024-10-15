import { Button } from "./ui/button";

type Props = {};
export const Hero = ({}: Props) => {
  return (
    <div className="flex flex-col text-center gap-4">
      <h1 className="sm:text-4xl text-2xl font-bold">Welcome to Safe-crypt Sol</h1>
      <p className="text-slate-500 text-lg">Let&apos;s get started</p>
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Button className="text-md">Get Started With A New Wallet</Button>
        <Button className="text-md" variant={"outline"}>Import Wallet</Button>
      </div>
    </div>
  );
};
