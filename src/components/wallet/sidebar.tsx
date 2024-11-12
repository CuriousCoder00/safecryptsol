import React from "react";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col pt-[72px] pb-2 h-full text-white">
      {children}
    </div>
  );
};

export const SidebarItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2 border rounded-xl h-full w-full shadow-inner shadow-slate-600">{children}</div>;
};
