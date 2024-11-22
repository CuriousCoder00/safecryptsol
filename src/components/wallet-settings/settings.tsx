import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Keys from "./keys";
import Seed from "./seed";

const Settings = () => {
  return (
    <div className="flex flex-col w-full gap-3 items-start justify-start">
      <ScrollArea className="w-full h-full flex flex-col items-start justify-start gap-4">
        <h1 className="text-2xl font-bold text-start">Settings</h1>
        <Keys />
        <Seed/>
      </ScrollArea>
    </div>
  );
};

export default Settings;
