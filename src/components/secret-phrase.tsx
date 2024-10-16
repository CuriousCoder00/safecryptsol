"use client";
import { useState } from "react";
import { ArrowLeft, LockKeyhole, StepBack, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type Props = {
  setTab: (tab: string) => void;
};

export const SecretPhrase = ({ setTab }: Props) => {
  const [checked, setChecked] = useState(false);
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
      <div className="flex flex-col items-center justify-center max-w-[450px] gap-4">
        <div className="flex flex-col items-center justify-center gap-4">
          secret recovery phrase
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
          onClick={() => setTab("secret")}
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
