"use server";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import db from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { useServerSession } from "@/hook/use-server-session";

export const createNewAccount = async () => {
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
    let acN = accounts.length;
    await db.aC.create({
      data: {
        userId: user.id,
        name: `Account ${acN + 1}`,
        mnemonics: mnemonics.split(" "),
        seed: seed,
        acN: acN,
      },
    });
  } catch (error: any) {
    return {
      status: false,
      error: error.message || "Internal Server Error",
      code: 500,
    };
  }
};

export const getWalletsOfAAccount = async ({
  accountId,
}: {
  accountId: string;
}) => {
  const { user } = await useServerSession();
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }
  try {
    const wallets = await db.wallet.findMany({
      where: {
        acId: accountId,
      },
    });
    return { status: true, wallets: wallets, code: 200 };
  } catch (error: any) {
    return { status: false, error: error.message, code: 500 };
  }
};

export const createWallet = async ({ accountId }: { accountId: string }) => {
  const { user } = await useServerSession();
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }

  const account = await db.aC.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
  });
  if (!account) return { status: false, error: "Account not found", code: 404 };

  try {
    const { wallets } = await getWalletsOfAAccount({ accountId: accountId });
    if (!wallets) {
      return { status: false, error: "Wallets not found", code: 404 };
    }
    if (wallets.length >= 10) {
      return {
        status: false,
        error: "Maximum number of wallets reached",
        code: 400,
      };
    }
    let x = wallets.length;

    const path = `m/44'/501'/${account.acN}'/${x}'`;

    const seed = account?.seed;
    const derivedSeed = derivePath(path, seed).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    const pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privKey = bs58.encode(
      nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
    );
    const wallet = await db.wallet.create({
      data: {
        privateKey: privKey,
        publicKey: pubKey,
        name: `Wallet ${x + 1}`,
        acId: accountId,
      },
    });
    return { status: true, wallet: wallet, code: 200 };
  } catch (error: any) {
    return { status: false, error: error.message, code: 500 };
  }
};

export const getAccounts = async () => {
  const { user } = await useServerSession();
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }
  try {
    const accounts = await db.aC.findMany({
      where: {
        userId: user.id as string,
      },
      select: {
        id: true,
        name: true,
        acN: true,
        mnemonics: true,
        seed: true,
        wallets: true,
        user: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { status: true, accounts: accounts, code: 200 };
  } catch (error: any) {
    return { status: false, error: error.message, code: 500 };
  }
};

export const getWallet = async ({ walletId }: { walletId: string }) => {
  const { user } = await useServerSession();
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }
  try {
    const wallet = await db.wallet.findUnique({
      where: {
        id: walletId,
      },
    });
    return { status: true, wallet: wallet, code: 200 };
  } catch (error: any) {
    return { status: false, error: error.message, code: 500 };
  }
};

export const getAccountById = async ({ accountId }: { accountId: string }) => {
  const { user } = await useServerSession();
  if (!user) {
    return { status: false, error: "User not found", code: 404 };
  }
  if (!user.id) {
    return { status: false, error: "User ID not found", code: 404 };
  }
  try {
    const account = await db.aC.findUnique({
      where: {
        id: accountId,
      },
    });
    return { status: true, account: account, code: 200 };
  } catch (error: any) {
    return { status: false, error: error.message, code: 500 };
  }
};
