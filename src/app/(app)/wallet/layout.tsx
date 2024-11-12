import { Sidebar, SidebarItem } from "@/components/wallet/sidebar";

export default function WalletLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full max-w-screen-2xl overflow-hidden min-h-screen px-2">
      <div className="flex items-center justify-center w-full gap-3">
        <Sidebar>
          <SidebarItem>
            <div className="rounded-full w-12 h-12 bg-slate-700 flex items-center justify-center">A1</div>
          </SidebarItem>
        </Sidebar>
        <div className="flex flex-col h-full w-full max-h-[calc(100vh-72px)] mt-[72px] pb-2">
          <div className="flex items-center justify-center  px-2 border rounded-xl h-full w-full shadow-inner shadow-slate-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
