/* eslint-disable @typescript-eslint/no-require-imports */
import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      lg: '1025px',
      sm: '640px',
      xlg: {
        max: '1024px',
      },
      xsm: {
        max: '639px',
      },
      tablet: {
        min: '640px',
        max: '1024px',
      },
    },
    extend: {
      fontFamily: {
        optima: ['var(--font-optima)', 'sans-serif'],
      },
      colors: {
        textwhite85: 'rgba(255,255,255,0.85)',
        textwhitetest: '#f7f6f1',
        background: '#F6F6F4',
        'Phase-1-Brown': '#5C321E',
        brown: '#5C321E',
        greentext: '#254432',
        bodytext: '#5C5C5C',
        tagtext: '#A39A9A',
        inputtext: '#ffffff40',
        inputinactive: '#B9B9B9',
        linktext: '#1313C1',
        errtext: '#EA3434',
        'greyscaletext-50': '#EBEBEB',
        'greyscaletext-100': '#C0C0C0',
        'greyscaletext-200': '#A1A1A1',
        'greyscaletext-300': '#767676',
        'greyscaletext-400': '#5C5C5C',
        'greyscaletext-body': '#333333',
        'greyscaletext-600': '#2E2E2E',
        'greyscaletext-700': '#242424',
        'greyscaletext-800': '#1C1C1C',
        'greyscaletext-900': '#151515',
        'orangetext-50': '#F4EEEA',
        'orangetext-100': '#DEC9BF',
        'orangetext-200': '#CEAF9F',
        'orangetext-300': '#B88A74',
        'orangetext-400': '#AA7359',
        'orangetext-500': '#95502F',
        'orangetext-600': '#88492B',
        'orangetext-700': '#6A3921',
        'orangetext-800': '#522C1A',
        'orangetext-900': '#3F2214',
        'primary-brown': '#BC9247',
        'primary-yellow': '#DAF2AF',
        'Text-Text-Grey-Disable': 'var(--Phase-1-Text-Text-Grey-Disable)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'btn-gradient': 'var(--Phase-1-butt)',
      },
      transitionTimingFunction: {
        'pagination-bezier': 'cubic-bezier(0.77, 0.05, 0.26, 1.02)', // Bounce effect
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({addUtilities}) {
      addUtilities({
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        '.absolute-center': {
          '@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
            {},
        },
      })
    }),
  ],
}
export default config
