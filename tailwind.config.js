/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "blue-violet": "hsl(238, 40%, 52%)",
      carnation: "hsl(358, 79%, 66%)",
      periwinkle: "hsl(239, 57%, 85%)",
      sundown: "hsl(357, 100%, 86%)",
      "blue-oxford": "hsl(212, 24%, 26%)",
      "pale-sky": "hsl(211, 10%, 45%)",
      "athens-gray": "hsl(223, 19%, 93%)",
      "white-lilac": "hsl(228, 33%, 97%)",
      white: "hsl(0, 0%, 100%)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
