import { Hero } from "@/components/hero";
import { ThemeToggler } from "@/components/theme-toggler";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center container max-w-screen min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <Hero />
    </div>
  );
}
