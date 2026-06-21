import type { Config } from "tailwindcss";

const config: Config = {
   content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
         fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;