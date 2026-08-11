/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0a0f1d',
        bgDark: '#0d1117',
        bgCard: 'rgba(22, 31, 50, 0.7)',
        glowPink: '#ff4df0',
        glowPurple: '#c91cff',
        accentBlue: '#3b82f6',
        accentCyan: '#06b6d4'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
