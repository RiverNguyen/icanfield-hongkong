import React from 'react'

export default function ArrowRight({className}: {className?: string}) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Arrow Icon'>
        <path
          id='Vector'
          d='M7 12H17M17 12L13 8M17 12L13 16'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}
