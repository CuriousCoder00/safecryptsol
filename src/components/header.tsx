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
import { MenuIcon, Wallet } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Header = () => {
  const session = useSession();
  return (
    <header className="fixed top-0  w-full z-[50] border-b bg-gray-950">
      <nav className="flex items-center justify-between py-2 px-6">
        <div className="flex items-center justify-start gap-2 text-md font-bold">
          <Wallet />
          SafeCrypt SOL
        </div>
        {session?.data?.user ? (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="relative" asChild>
                <Avatar className="rounded-full cursor-pointer">
                  <AvatarImage src={session?.data?.user?.image ?? ""} />
                  <AvatarFallback>
                    {session?.data?.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
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
