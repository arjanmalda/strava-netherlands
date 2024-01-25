import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        red: {
          100: '#C52A22',
          200: '#A30009',
          300: '#810000',
          400: '#620000',
        },
        gray: {
          50: '#F8F8F8',
          100: '#F3F2F2',
          200: '#E5E3E3',
          300: '#D2CFCF',
          400: '#B7B2B2',
          500: '#9D9696',
          600: '#857D7D',
          700: '#6E6767',
          800: '#5D5757',
          900: '#504C4C',
          950: '#292626',
        },
        blue: {
          100: '#D6E4FF',
          200: '#ADC8FF',
          300: '#84A9FF',
          400: '#6690FF',
          500: '#3366FF',
          600: '#254EDB',
          700: '#1939B7',
          800: '#102693',
          900: '#091A7A',
        },
        green: {
          100: '#D1EFD3',
          200: '#A3DBA7',
          300: '#75C97B',
          400: '#47B54F',
          500: '#278621',
          600: '#206F1D',
          700: '#19591A',
          800: '#124316',
          900: '#0C2D13',
        },
      },
    },
  },
  plugins: [],
};
export default config;
