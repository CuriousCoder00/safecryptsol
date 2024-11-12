"use client";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import LOGO from "../../assets/image.png";
import Image from "next/image";
export const Hero = () => {
  return (
    <div className="flex lg:items-center md:flex-row flex-col justify-center gap-6 sm:px-12 px-6 max-md:pt-24 md:pt-16 bg-slate-950 min-h-screen max-w-screen-2xl">
      <div className="flex flex-col items-start justify-start md:w-2/3 lg:w-1/2 text-start">
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="xl:text-6xl lg:text-6xl sm:text-5xl text-3xl font-riot text-start">
            Secure and Seamless Solana Wallet Experience
          </div>
          <div className="xl:text-6xl lg:text-6xl sm:text-5xl text-4xl text-rose-500 font-riot">
            Introducing our Wallet
          </div>
          <p className="sm:text-xl font-sans text-start text-slate-300">
            Effortlessly manage your Solana assets with our secure and
            user-friendly wallet. Create, import and monitor your holdings all
            in one place.
          </p>
        </div>

        <div className="flex items-center justify-start mt-10 gap-4 w-full">
          <Button
            className="text-md bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg h-12 max-sm:w-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="text-center sm:hidden my-3 text-slate-400">
        Empower your Solana experience with SafeCrypt SOL
      </div>
      <div className="flex items-center justify-center md:w-1/3 lg:w-1/2">
        <Image src={LOGO} alt="logo" width={500} height={500} className="" />
      </div>
    </div>
  );
};
