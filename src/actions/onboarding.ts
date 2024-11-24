"use server";

import { useServerSession } from "@/hook/use-server-session";

import { CreateWallet } from "@/actions/wallet";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import db from "@/lib/db";

export const CreateNewWallet = async () => {
  const { user } = await useServerSession();
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }
  try {
    const mnemonics = generateMnemonic(128);
    const seed = mnemonicToSeedSync(mnemonics).toString("hex");
    const accounts = await db.aC.findMany({
      where: {
        userId: user.id,
      },
    });
    const acN = accounts.length;
    const account = await db.aC.create({
      data: {
        userId: user.id,
        name: `Account ${acN + 1}`,
        mnemonics: mnemonics.split(" "),
        seed: seed,
        acN: acN,
      },
    });
    const { wallet } = await CreateWallet({ accountId: account.id });
    return { status: true, account: account, wallet: wallet, code: 200 };
  } catch (error: unknown) {
    return {
      status: false,
      error: (error as Error)?.message || "Internal Server Error",
      code: 500,
    };
  }
};
