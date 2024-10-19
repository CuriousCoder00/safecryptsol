"use client";
import { MnemonicWarning } from "@/components/mnemonic-warning";
import { Password } from "@/components/password";
import { SecretPhrase } from "@/components/secret-phrase";
import { useState } from "react";

type Props = {};
const CreateWallet = ({}: Props) => {
  const [tab, setTab] = useState("onboarding");
  return (
    <div className="flex flex-col items-center justify-center max-w-screen min-h-screen gap-6">
      {tab === "onboarding" && <MnemonicWarning setTab={setTab} />}
      {tab === "secret" && <SecretPhrase setTab={setTab} />}
      {tab === "wallet-created" && <Password />}
    </div>
  );
};
export default CreateWallet;