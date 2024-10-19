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

export const Header = () => {
  const session = useSession();
  return (
    <div className="fixed top-0 flex items-center justify-between px-6 py-2 w-full z-[50]">
      <div className="text-md font-bold">SafeCrypt SOL</div>
      {session?.data?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="relative" asChild>
            <Avatar className="rounded-full cursor-pointer">
              <AvatarImage src={session?.data?.user?.image ?? ""} />
              <AvatarFallback>{session?.data?.user?.name?.[0]}</AvatarFallback>
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
      ) : (
        <Button
          className="text-md"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Login
        </Button>
      )}
    </div>
  );
};
