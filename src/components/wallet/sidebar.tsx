import React from "react";
import { ScrollArea } from "../ui/scroll-area";

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full text-white">
      <SidebarItem />
    </div>
  );
};

export const SidebarItem = () => {
  return (
    <div className="border rounded-xl h-full w-full shadow-inner shadow-slate-600 relative flex flex-col items-center justify-between py-2">
      <ScrollArea className="h-full p-2 flex flex-col gap-5">
        <div className="flex flex-col items-start justify-start gap-2 h-full">
          <div className="flex items-center justify-center h-12 w-12 rounded-full border">
            A1
          </div>
        </div>
      </ScrollArea>
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-600 hover:bg-slate-800 transition-all duration-150 cursor-pointer aspect-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white hover:scale-110 transition-transform duration-150"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </div>
  );
};
