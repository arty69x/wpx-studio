import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080A12",
        violet: "#7C3AED",
        cyan: "#22D3EE",
      },
    },
  },
  plugins: [],
};

export default config;
