"use server";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Wallet as WalletType } from "@prisma/client";

export const createWallet = async () => {
  const sessionData = await auth();
  const user = sessionData?.user;
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }

  try {
    const wallets = (await getWallets()) as WalletType[];
    let x = 0;
    if (wallets.length > 0) {
      x = wallets.length;
    }
    const path = `m/44'/501'/${x}'/0'`;
    console.log(path);
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
        name: `Wallet ${x + 1}`,
        mnemonics: mnemonics.split(" "),
        userId: user.id as string,
      },
    });
    return { status: true, wallet: wallet, code: 200 };
  } catch (error: any) {
    return { status: false, error: error.message, code: 500 };
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
  return wallets as WalletType[];
};

export const getWallet = async (id: string) => {
  const sessionData = await auth();
  const user = sessionData?.user;
  if (!user) {
    return { error: "User not found" };
  }
  if (!user.id) {
    return { error: "User ID not found" };
  }

  const wallet = await db.wallet.findFirst({
    where: {
      id: id,
      userId: user.id as string,
    },
  });
  return wallet as WalletType;
};
