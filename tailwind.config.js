const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './layouts/**/*.tsx',
    './lib/**/*.ts',
    './data/**/*.mdx',
  ],
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        secondary: colors.red,
        gray: colors.neutral,
        blue: {
          DEFAULT: '#5F5CFF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#D7D6FF',
          300: '#AFAEFF',
          400: '#8785FF',
          500: '#5F5CFF',
          600: '#2824FF',
          700: '#0400EB',
          800: '#0300B3',
          900: '#02007B',
          950: '#02005F',
        },
        red: {
          DEFAULT: '#F23567',
          50: '#FDE1E9',
          100: '#FCCEDA',
          200: '#F9A8BE',
          300: '#F782A1',
          400: '#F45B84',
          500: '#F23567',
          600: '#E00E46',
          700: '#AC0B36',
          800: '#770825',
          900: '#420415',
          950: '#28030C',
        },
      },
    },
    keyframes: {
      slideUpEnter: {
        '0%': {
          opacity: 0,
          transform: 'translateY(20px)',
        },
        '100%': {
          opacity: 100,
          transform: 'translateY(0px)',
        },
        slideUpLeave: {
          '0%': {
            opacity: 100,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
        },
      },
    },
    animation: {
      slideUpEnter: 'slideUpEnter .3s ease-in-out',
      slideUpLeave: 'slideUpLeave .3s ease-in-out',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
