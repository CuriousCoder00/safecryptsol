"use client";
import { MnemonicWarning } from "@/components/mnemonic-warning";
import { SecretPhrase } from "@/components/secret-phrase";
import { useState } from "react";

type Props = {};
const CreateWalletPage = ({}: Props) => {
  const [tab, setTab] = useState("onboarding");
  return (
    <div className="flex flex-col items-center justify-center max-w-screen min-h-screen gap-6">
      {tab === "onboarding" && <MnemonicWarning setTab={setTab} />}
      {tab === "secret" && <SecretPhrase setTab={setTab} />}
    </div>
  );
};
export default CreateWalletPage;
