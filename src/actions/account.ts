"use server";
import { generateMnemonic } from "bip39";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Keypair } from "@solana/web3.js";
export const createWallet = async () => {
  const sessionData = await auth();
  const user = sessionData?.user;
  try {
    if (!user) {
      return { error: "User not found" };
    }
    if (!user.id) {
      return { error: "User ID not found" };
    }
    const keypair = Keypair.generate();

    const pubKey = keypair.publicKey.toString();
    const privKey = keypair.secretKey.toString();

    const wallet = await db.wallet.create({
      data: {
        address: "",
        name: (user.email?.split("@")[0] as string) + "'s Wallet",
        privateKey: pubKey,
        publicKey: privKey,
        userId: user.id as string,
        mnemonics: generateMnemonic(128).split(" "),
      },
    });
    return wallet;
  } catch (error) {
    return error;
  }
};
