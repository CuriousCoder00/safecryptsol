import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarItem } from "@/components/wallet/sidebar";

export default function WalletLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full max-w-screen-2xl overflow-hidden min-h-screen px-2">
      <div className="flex items-center justify-center w-full gap-3 max-h-[calc(100vh-72px)] mt-[72px] pb-2">
        <Sidebar/>
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-center border rounded-xl h-full w-full shadow-inner shadow-slate-600">
            <ScrollArea className="h-full p-2">{children}</ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
