"use client";
import { MoonStar, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-center">
      {theme}
      <MoonStar className="w-6 h-6" onClick={() => setTheme("dark")} />
      <SunIcon className="w-6 h-6" onClick={() => setTheme("light")} />
    </div>
  );
};
