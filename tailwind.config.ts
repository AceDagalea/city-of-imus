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
        imus: {
          navy: "#1A3668",
          green: "#39A843",
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
