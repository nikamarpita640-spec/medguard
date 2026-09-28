/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eefbfa',
          100: '#d4f4f1',
          200: '#aae8e3',
          300: '#75d6cf',
          400: '#43bdb7',
          500: '#279e9b',
          600: '#1c7e7e',
          700: '#1a6566',
          800: '#1a5153',
          900: '#194445',
        },
        ink: {
          50: '#f6f7f8',
          100: '#eceef0',
          200: '#d5d9de',
          300: '#b1b9c2',
          400: '#8691a0',
          500: '#677383',
          600: '#525c6b',
          700: '#434b58',
          800: '#3a404b',
          900: '#252932',
        },
        success: {
          50: '#effaf3',
          100: '#d7f2e0',
          500: '#1c9a52',
          600: '#167d43',
          700: '#146538',
        },
        warning: {
          50: '#fff8ec',
          100: '#feecc7',
          500: '#e08a1e',
          600: '#c06f10',
          700: '#95560f',
        },
        danger: {
          50: '#fdf1f1',
          100: '#fbdcdc',
          500: '#d8393f',
          600: '#bc2530',
          700: '#98202a',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 30, 40, 0.06), 0 1px 12px rgba(20, 30, 40, 0.04)',
      },
      borderRadius: {
        card: '0.625rem',
      },
    },
  },
  plugins: [],
};
