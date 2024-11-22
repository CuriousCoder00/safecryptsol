"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/wallet-settings/sidebar";
import { usePathname } from "next/navigation";

export default function WalletSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const walletId = path.split("/")[3];
  return (
    <div className="flex w-full h-full px-2 overflow-hidden">
      <div className="flex items-center justify-center w-full max-h-[calc(100vh-142px)] gap-2">
        {/* <Sidebar walletId={walletId} /> */}
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <ScrollArea className="h-full w-full">{children}</ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
