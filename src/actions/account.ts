"use server";
import { generateMnemonic } from "bip39";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

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
    const privKey = bs58.encode(keypair.secretKey);

    const wallet = await db.wallet.create({
      data: {
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
