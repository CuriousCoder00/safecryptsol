import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
