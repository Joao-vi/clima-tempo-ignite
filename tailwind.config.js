/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },

    extend: {
      fontSize: {
        sm: ['0.75rem', '1rem'],
        base: ['0.875rem', '1.25rem'],
        md: ['1rem', '1.5rem'],
      },
    },
  },
  plugins: [],
}
