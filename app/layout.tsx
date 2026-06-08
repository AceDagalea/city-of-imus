import type { Metadata } from "next";
import { Montserrat, Libre_Baskerville } from "next/font/google";
import LayoutShell from "@/components/layout/LayoutShell";
import { LanguageProvider } from "@/context/LanguageContext";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "City of Imus | Flag Capital of the Philippines",
    template: "%s | City of Imus",
  },
  description:
    "Official website of the City of Imus, Cavite — Flag Capital of the Philippines. AAngat ang Imus.",
  keywords: ["City of Imus", "Cavite", "Philippines", "government", "eBOSS"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${libreBaskerville.variable}`}>
      <body className="min-h-screen overflow-x-hidden flex flex-col font-body">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
