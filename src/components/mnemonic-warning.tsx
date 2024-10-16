"use client";
import { useState } from "react";
import { LockKeyhole, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  setTab: (tab: string) => void;
};

export const MnemonicWarning = ({ setTab }: Props) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl font-bold text-center">
          Secret Recovery Phrase Warning
        </h1>
        <p className="text-md text-slate-500 font-semibold max-w-[400px] text-center">
          On the next page, you will receive your secret recovery phrase.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-[450px] gap-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3 p-6 bg-zinc-800 rounded-lg">
            <TriangleAlert className="text-yellow-500 size-12" />
            <p className="text-slate-300 text-md">
              This is the <span className="font-bold text-white">ONLY</span> way
              to recover your account if you lose access to your device or
              password.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 p-6 bg-zinc-800 rounded-lg">
            <LockKeyhole className="text-green-500 size-10" />
            <p className="text-slate-300 text-md">
              Write it down, store it in a safe place, and{" "}
              <span className="font-bold text-white">NEVER</span> share it with
              anyone.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Input
            type="checkbox"
            className="size-10 cursor-pointer"
            id="concern"
            onChange={() => setChecked(!checked)}
          />
          <Label
            htmlFor="concern"
            className="text-md cursor-pointer hover:text-slate-300"
          >
            I understand that I am responsible for saving my secret recovery
            phrase, and that it is the only way to recover my wallet.
          </Label>
        </div>
        <Button
          onClick={() => setTab("secret")}
          disabled={!checked}
          className="px-20 py-6  text-md font-semibold rounded-xl"
        >
          Next
        </Button>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <span className="bg-blue-600 rounded-full w-3 h-3"></span>
        <span className="bg-blue-900/30 rounded-full w-3 h-3"></span>
        <span className="bg-blue-900/30 rounded-full w-3 h-3"></span>
        <span className="bg-blue-900/30 rounded-full w-3 h-3"></span>
      </div>
    </div>
  );
};
