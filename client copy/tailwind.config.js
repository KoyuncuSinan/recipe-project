/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",'./public/index.html',"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
        "xs":"475px",
      "sm": "640px",
      "sx":"750px",
      "md": "900px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
      extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
