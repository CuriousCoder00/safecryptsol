"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WalletHeader } from "@/components/wallet/header";
import { Sidebar } from "@/components/wallet/sidebar";

export default function WalletLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full max-w-screen-2xl overflow-hidden min-h-screen px-2">
      <div className="flex items-center justify-center w-full gap-3 max-h-[calc(100vh-72px)] mt-[72px] pb-2">
        <Sidebar />
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col items-center justify-center border rounded-xl h-full w-full max-h-[calc(100vh-72px)] shadow-inner shadow-slate-600 p-2 gap-3">
            <WalletHeader />
            <div className="flex h-full w-full max-h-[calc(100vh-150px)]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
