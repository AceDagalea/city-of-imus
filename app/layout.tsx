import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Montserrat, Libre_Baskerville } from "next/font/google";
import LayoutShell from "@/components/layout/LayoutShell";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import SessionProvider from "@/components/providers/SessionProvider";
import { tenantConfig } from "@/config/tenant.config";
import "@/styles/globals.css";

/** "#1A3668" → "26 54 104" (space-separated RGB channels for CSS `rgb()`). */
function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

// Tenant brand colors flow in as CSS custom properties so re-skinning is a
// config edit (no rebuild). Tailwind's `tenant.*` tokens read these vars.
const tenantThemeVars = {
  "--tenant-primary": hexToRgbChannels(tenantConfig.brand.primary),
  "--tenant-secondary": hexToRgbChannels(tenantConfig.brand.secondary),
  "--tenant-accent": hexToRgbChannels(tenantConfig.brand.accent),
} as CSSProperties;

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
    <html
      lang="en"
      style={tenantThemeVars}
      className={`${montserrat.variable} ${libreBaskerville.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden flex flex-col font-body">
        <SessionProvider>
          <AccessibilityProvider>
            <LanguageProvider>
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <LayoutShell>{children}</LayoutShell>
            </LanguageProvider>
          </AccessibilityProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
