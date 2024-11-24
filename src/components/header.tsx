"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import Link from "next/link";


export const Header = () => {
  const session = useSession();
  return (
    <header className="fixed top-0  w-full z-[50] border-b bg-gray-950">
      <nav className="flex items-center justify-between py-2 px-6">
        <div
          className="flex items-center justify-start gap-2 text-md font-bold"
        >
          <Wallet />
          SafeCrypt SOL
        </div>
        {session?.data?.user ? (
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/wallet"
              className="flex items-center justify-center gap-2"
            >
              <Wallet />
              Wallet
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="relative" asChild>
                <div className="mx-auto flex w-full max-w-lg items-center justify-center">
                  <div className="relative z-10 flex w-full items-center overflow-hidden rounded-full border border-slate-800 p-[2px]">
                    <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#ff16b1_20deg,transparent_120deg)]"></div>
                    <div className="relative z-20 flex w-full rounded-full bg-slate-900">
                      <Avatar className="rounded-full cursor-pointer">
                        <AvatarImage src={session?.data?.user?.image ?? ""} />
                        <AvatarFallback>
                          {session?.data?.user?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute top-0 -right-5">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-6">
            <Button
              className="text-md rounded-none bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 h-10"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
