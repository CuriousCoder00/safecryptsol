"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateMnemonic } from "bip39";
import { LucideEyeOff } from "lucide-react";
type Props = {
  setTab: (tab: string) => void;
};

export const SecretPhrase = ({ setTab }: Props) => {
  const [checked, setChecked] = useState(false);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);

  const generateRandomMnemonics = async () => {
    const words = generateMnemonic(128).split(" ");
    setMnemonicWords(words);
  };

  const copyOnClick = () => {
    navigator.clipboard.writeText(mnemonicWords.join(" "));
  };

  useEffect(() => {
    generateRandomMnemonics();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-bold text-center">
          Secret Recovery Phrase
        </h1>
        <p className="text-md text-slate-500 font-semibold max-w-[400px] text-center">
          Save these words in a safe place.
        </p>
      </div>
      <Button
        onClick={() => setTab("onboarding")}
        variant={"link"}
        className="flex items-center text-center gap-3 text-sky-600 font-semibold"
      >
        Go Back To Read Warnings Again
      </Button>
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className="flex relative flex-col items-center justify-center bg-zinc-900 p-3 rounded-lg gap-2 w-[500px]"
          onClick={() => copyOnClick()}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {!hovered && (
            <div className="absolute inset-0 backdrop-blur-lg flex items-center justify-center rounded-lg">
              <LucideEyeOff className="size-10" />
            </div>
          )}
          <div className="grid grid-cols-9 gap-3">
            {mnemonicWords.map((word, idx) => (
              <div
                className="col-span-3 flex items-center text-start justify-start gap-1 px-4 py-2"
                key={idx}
              >
                <span className="font-bold">{idx + 1}.</span>
                {!hovered ? "gibberish" : word}
              </div>
            ))}
          </div>
          <p className="border-t-[1px] border-slate-600 w-full text-center">
            Click anywhere on this card to copy
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div>
            <Input
              type="checkbox"
              className="size-5 cursor-pointer"
              id="concern"
              onChange={() => setChecked(!checked)}
            />
          </div>
          <Label
            htmlFor="concern"
            className="text-md cursor-pointer hover:text-slate-300"
          >
            I saved my secret recovery phrase.
          </Label>
        </div>
        <Button
          onClick={() => setTab("password")}
          disabled={!checked}
          className="px-20 py-6  text-md font-semibold rounded-xl"
        >
          Next
        </Button>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <span className="bg-blue-900 rounded-full w-3 h-3"></span>
        <span className="bg-blue-600 rounded-full w-3 h-3"></span>
        <span className="bg-blue-900/30 rounded-full w-3 h-3"></span>
        <span className="bg-blue-900/30 rounded-full w-3 h-3"></span>
      </div>
    </div>
  );
};
