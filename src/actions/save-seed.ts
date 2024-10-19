"use server";
import { generateMnemonic } from "bip39";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
export const SaveMnemonics = async () => {
  const sessionData = await auth();
  const user = sessionData?.user;
  const mnemonics = generateMnemonic(128);
  try {
    await db.user.update({
      where: { id: user?.id },
      data: {
        mnemonics: mnemonics.split(' '),
      },
    });
  } catch (error) {
    return error;
  }
};
