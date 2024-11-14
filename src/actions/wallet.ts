"use server";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export const createWallet = async () => {
  const sessionData = await auth();
  const user = sessionData?.user;
  if (!user) {
    return { error: "User not found" };
  }
  if (!user.id) {
    return { error: "User ID not found" };
  }

  try {
    const wallets = await getWallets();
    let x = 0;
    const path = `m/44'/501'/${x}'/0'`;
    const mnemonics = generateMnemonic(128);
    const seed = mnemonicToSeedSync(mnemonics).toString("hex");
    const derivedSeed = derivePath(path, seed).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    const pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privKey = bs58.encode(
      nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
    );

    const wallet = await db.wallet.create({
      data: {
        privateKey: pubKey,
        publicKey: privKey,
        seed: seed,
        mnemonics: mnemonics.split(" "),
        userId: user.id as string,
      },
    });
    return wallet;
  } catch (error) {
    return error;
  }
};

export const getWallets = async () => {
  const sessionData = await auth();
  const user = sessionData?.user;
  if (!user) {
    return { error: "User not found" };
  }
  if (!user.id) {
    return { error: "User ID not found" };
  }

  const wallets = await db.wallet.findMany({
    where: {
      userId: user.id as string,
    },
  });
  return wallets;
};
