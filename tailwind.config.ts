import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'foldPhone': '344px',
        'tablet': '640px',

        'largeTablet': '768px',
        // => @media (min-width: 640px) { ... } 
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
        'smallDesktop': '1286',
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
        'largeDesktop': '1281px',
      },
      fontFamily: {
        'gilroy-light': ['Gilroy-Light', 'sans-serif'],
        'gilroy-medium': ['Gilroy-Medium', 'sans-serif'],
        'gilroy-regular': ['Gilroy-Regular', 'sans-serif'],
        'gilroy-semibold': ['Gilroy-SemiBold', 'sans-serif'],
        'gilroy-bold': ['Gilroy-Bold', 'sans-serif'],
        'gilroy-extrabold': ['Gilroy-ExtraBold', 'sans-serif'],
      },
      colors: {
        whiteText: "#fff",
        blackText: "#121212",
        grayText: "#525252",
        primaryGray: "#858586",
        darkText: "#D6A912",
        primaryColor: "#D6A912",
        primaryText: "#D6A912",
        buttonColor: "#D6A912",
        lightButton: "#FFFCDE",
        lightButtonText: "#D6A912",
        lightBg: "#FFFCDE",
        primaryBg: "#D6A912",
        transparentBg: "#121212F2",
        grayTransparent: "#FAFAFAF2"
      },
      flex: {
        full: "0 0 100%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ],
};
export default config;
