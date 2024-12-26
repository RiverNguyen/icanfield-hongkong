import React from 'react'

export default function UnderLineHeader({className}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='365'
      height='2'
      viewBox='0 0 365 2'
      fill='none'
      className={className}
    >
      <path
        d='M0 1H365'
        stroke='url(#paint0_linear_1526_33313)'
        strokeOpacity='0.16'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1526_33313'
          x1='0'
          y1='1.5'
          x2='365'
          y2='1.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.275' />
          <stop
            offset='1'
            stopOpacity='0'
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
