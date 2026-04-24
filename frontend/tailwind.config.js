/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 10px 40px rgba(79, 70, 229, 0.25)",
        glow: "0 0 25px rgba(129, 140, 248, 0.55)"
      },
      colors: {
        panel: "rgba(255, 255, 255, 0.08)"
      }
    }
  },
  plugins: []
};
