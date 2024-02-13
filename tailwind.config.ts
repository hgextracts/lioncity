import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/wallet/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/landing/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        shade: "var(--shade)",
      },
      backgroundImage: {
        "linear-primary-secondary":
          "linear-gradient(to right, #92b2ec, #0f3f93)",
        "linear-primary-accent": "linear-gradient(#92b2ec, #3a7ef7)",
        "linear-secondary-accent": "linear-gradient(#0f3f93, #3a7ef7)",
        "radial-primary-secondary": "radial-gradient(#92b2ec, #0f3f93)",
        "radial-primary-accent": "radial-gradient(#92b2ec, #3a7ef7)",
        "radial-secondary-accent": "radial-gradient(#0f3f93, #3a7ef7)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
export default config;
