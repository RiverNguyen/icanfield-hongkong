"use client"

import { useEffect, useRef } from "react"

interface DigitRollerProps {
  digit: number
  duration?: number
  delay?: number
}

export function DigitRoller({ digit, duration = 2000, delay = 0 }: DigitRollerProps) {
  const digitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (digitRef.current) {
      const element = digitRef.current
      setTimeout(() => {
        element.style.transform = `translateY(calc(-100% + 2.775rem))`
      }, delay)
    }
  }, [ digit, delay])

  return (
    <div className="relative h-[2.775rem] xsm:h-[1.7375rem] w-[2rem] xsm:w-[1.25rem] overflow-hidden">
      <div
        ref={digitRef}
        className="absolute transition-transform duration-1000"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="text-brown h-[2.775rem] text-[3.25rem] font-bold leading-[1] xsm:text-[2rem]">
            {num}
          </div>
        ))}
        {digit === 0 ? 
        <div  className="text-brown h-[2.775rem] text-[3.25rem] font-bold leading-[1] xsm:text-[2rem]">
            0
        </div> : 
        new Array(digit).fill(0).map((e, index) => (
            <div key={index} className="text-brown h-[2.775rem] text-[3.25rem] font-bold leading-[1] xsm:text-[2rem]">
            {index + 1}
            </div>
        ))}
        
      </div>
    </div>
  )
}

