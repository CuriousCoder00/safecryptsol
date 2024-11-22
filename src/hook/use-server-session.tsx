"use server";

import { auth } from "@/lib/auth";

export const useServerSession = async () => {
  const session = await auth();
  const user = session?.user;
  return { user };
};
