/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'headerBreakPoint': '1050px', // Define custom breakpoint at 1050px
      },
    },
  },
  plugins: [],
}


