import { content, plugin } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", content()],
  theme: {
    extend: {},
  },
  plugins: [plugin()],
};
