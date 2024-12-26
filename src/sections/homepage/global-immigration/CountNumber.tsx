'use client'
import {cn} from '@/lib/utils'
import {DigitRoller} from '@/sections/homepage/global-immigration/DigitRoller'
interface className {
  suffixClass?: string
  numberClass?: string
}
export default function CountNumber({
  number,
  suffix = '',
  className,
  delay = 0,
  interFace = false,
}: {
  number: number
  suffix: string
  className?: className
  delay?: number
  interFace?: boolean
}) {
  const digits = String(number).split('').map(Number)
  return (
    <div className='flex'>
      <div className='flex'>
        {digits.map((digit, index) => (
          <DigitRoller
            interFace={interFace}
            key={index}
            digit={digit}
            delay={index * 50 + delay}
            className={className?.numberClass}
          />
        ))}
      </div>
      {suffix && (
        <span
          className={cn(
            'heading3 translate-y-[-0.25rem] font-bold leading-[1] tracking-normal text-brown xsm:text-[1.24444rem]',
            className?.suffixClass,
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}
