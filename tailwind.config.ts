import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // National "Republic of the Philippines" design-system palette.
        // Drives the outer chrome (utility bar, national banners, footer legal
        // strip). Consistent across every LGU deployment.
        gov: {
          blue: "#0038A8",
          blueDark: "#002776",
          red: "#CE1126",
          gold: "#FCD116",
          white: "#FFFFFF",
        },
        // Per-tenant palette. `primary`/`secondary`/`accent` (and the navy/green
        // aliases) are backed by CSS custom properties set in `app/layout.tsx`
        // from `config/tenant.config.ts`, so re-skinning is a config edit — no
        // Tailwind rebuild. Written as `rgb(var(--x) / <alpha-value>)` so Tailwind
        // opacity modifiers (e.g. `bg-tenant-navy/10`) keep working. The tint
        // shades stay as fixed hex.
        tenant: {
          primary: "rgb(var(--tenant-primary) / <alpha-value>)",
          secondary: "rgb(var(--tenant-secondary) / <alpha-value>)",
          accent: "rgb(var(--tenant-accent) / <alpha-value>)",
          navy: "rgb(var(--tenant-primary) / <alpha-value>)",
          green: "rgb(var(--tenant-secondary) / <alpha-value>)",
          greenDark: "#2D8636",
          greenLight: "#5BC464",
          red: "#C8102E",
          white: "#FFFFFF",
          gray: "#F5F5F5",
          navyDark: "#0F2247",
          sky: "#E8F4FC",
          skyDark: "#D0E8F7",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-libre-baskerville)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 43, 92, 0.08)",
        float: "0 8px 32px rgba(0, 43, 92, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
