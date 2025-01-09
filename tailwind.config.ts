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
  			max: '1024px'
  		},
  		xsm: {
  			max: '639px'
  		},
  		tablet: {
  			min: '640px',
  			max: '1024px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			optima: [
  				'var(--font-optima)',
  				'sans-serif'
  			]
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
  			'Text-Text-Grey-Disable': 'var(--Phase-1-Text-Text-Grey-Disable)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'btn-gradient': 'var(--Phase-1-butt)'
  		},
  		transitionTimingFunction: {
  			'pagination-bezier': 'cubic-bezier(0.77, 0.05, 0.26, 1.02)'
  		},
  		transitionDuration: {
  			'800': '800ms'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
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
        '.section-container': {
          '@apply sm:mx-auto sm:max-w-[90rem] xsm:px-4 xsm:max-w-[100%]': {},
        },
        '.hero-title': {
          '@apply font-optima text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] xsm:text-[1.75rem] xsm:tracking-[-0.035rem]': {},
        },
        '.heading1': {
          '@apply text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] xsm:text-[1.5rem] xsm:leading-[1.3]': {},
        },
        '.heading2': {
          '@apply text-[2.5rem] leading-[1.2] tracking-[-0.075rem] xsm:text-[1.25rem] xsm:leading-[1.3] xsm:tracking-[-0.06rem]': {},
        },
        '.heading3': {
          '@apply text-[2rem] leading-[1.2] tracking-[-0.04rem]': {},
        },
        '.heading4': {
          '@apply text-[1.5rem] leading-[1.4] tracking-[-0.03rem]': {},
        },
        '.heading5': {
          '@apply text-[1.25rem] leading-[1.5] tracking-[-0.025rem]': {},
        },
        '.heading6': {
          '@apply text-[1.125rem] leading-[1.5]': {},
        },
        '.sub-14': {
          '@apply text-[0.875rem] leading-[1.5]': {},
        },
        '.body-14': {
          '@apply text-[0.875rem] leading-[1.5] tracking-[-0.00875rem]': {},
        },
        '.body-14-b': {
          '@apply text-[0.875rem] font-bold leading-[1.5]': {},
        },
        '.body-14-s': {
          '@apply text-[0.875rem] font-semibold leading-[1.5]': {},
        },
        '.body-14-m': {
          '@apply text-[0.875rem] font-medium leading-[1.5] tracking-[-0.00875rem]': {},
        },
        '.sub-12': {
          '@apply text-[0.75rem] leading-[1.5]': {},
        },
        '.sub-12-m': {
          '@apply text-[0.75rem] leading-[1.5] font-medium tracking-[-0.015rem]': {},
        },
        '.sub-10': {
          '@apply text-[0.625rem] leading-[1.5]': {},
        },
        '.sub-28B': {
          '@apply text-[1.75rem] font-bold leading-[1.25] tracking-[-0.0175rem]': {},
        },
        '.sub-28Semi': {
          '@apply text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.0175rem]': {},
        },
        '.sub-28M': {
          '@apply text-[1.75rem] font-medium leading-[1.25] tracking-[-0.0175rem]': {},
        },
        '.sub-28R': {
          '@apply text-[1.75rem] leading-[1.25] tracking-[-0.0175rem]': {},
        },
        '.sub-24B': {
          '@apply text-[1.5rem] font-bold leading-[133.3%]': {},
        },
        '.sub-24R': {
          '@apply text-[1.5rem] leading-[133.3%]': {},
        },
        '.sub-24S': {
          '@apply text-[1.5rem] leading-[133.3%] tracking-[-0.03rem]': {},
        },
        '.sub-20B': {
          '@apply text-[1.25rem] leading-[133.3%] font-bold tracking-[-0.025rem]': {},
        },
        '.body16': {
          '@apply text-[1rem] leading-[1.5]': {},
        },
        '.body16-m': {
          '@apply text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem]': {},
        },
        '.body16-s': {
          '@apply text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem]': {},
        },
        '.body16-b': {
          '@apply text-[1rem] font-bold leading-[1.5] tracking-[-0.02rem]': {},
        },
        '.body16-r55': {
          '@apply text-[1rem] leading-[1.55]': {},
        },
        '.inter18': {
          '@apply text-[1.125rem] leading-[1.5] tracking-[-0.01125rem]': {},
        },
        '.title18M': {
          '@apply text-[1.125rem] leading-[1.2] tracking-[-0.0225rem] font-medium': {},
        },
        '.inter22-m': {
          '@apply text-[1.375rem] font-medium leading-[1.4] tracking-[-0.0875rem]': {},
        },
        '.mb12-s': {
          '@apply xsm:text-[0.75rem] xsm:font-semibold xsm:tracking-[-0.015rem]': {},
        },
        '.mb12-b': {
          '@apply xsm:text-[0.75rem] xsm:font-bold': {},
        },
        '.sub10-m': {
          '@apply xsm:text-[0.625rem] xsm:font-medium xsm:tracking-[-0.0125rem]': {},
        },
      })
    }),
  ],
}
export default config
