"use client";

import { usePathname } from "next/navigation";
import UtilityBar from "@/components/layout/UtilityBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDigitalPortal = pathname.startsWith("/forms");

  if (isDigitalPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        <UtilityBar />
        <Navbar />
      </header>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
