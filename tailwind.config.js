/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          card: '#0d1d38',
          elevated: '#112244',
          border: '#1c3151',
        },
        teal: {
          DEFAULT: '#00A79D',
          dim: '#007d75',
        },
        gold: {
          DEFAULT: '#C9A84C',
          dim: '#a8893e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
