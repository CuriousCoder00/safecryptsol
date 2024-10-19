"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export const Hero = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col text-center gap-4">
      <h1 className="sm:text-4xl text-2xl font-bold">
        Welcome to Safe-crypt Sol
      </h1>
      <p className="text-slate-500 text-lg">Let&apos;s get started</p>
      {
        session?.data?.user ? (
          <div className="flex items-center justify-center mt-10 gap-4">
            <Button
              onClick={() => router.push("/create")}
            >
              Create a wallet
            </Button>
            <Button
              onClick={() => router.push("/recover")}
            >
              Recover your wallet
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10 gap-4">
            <Button
              className="text-md"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Get Started
            </Button>
          </div>
        )
      }
    </div>
  );
};
