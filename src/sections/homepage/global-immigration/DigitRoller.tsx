"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface DigitRollerProps {
  digit: number
  duration?: number
  delay?: number
  className?: string
  interFace?: boolean
}

export function DigitRoller({ digit, delay = 0, className, interFace = false}: DigitRollerProps) {
  const digitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (digitRef.current && !interFace) {
      const element = digitRef.current
      setTimeout(() => {
        element.style.transform = `translateY(calc(-100% + 2.775rem))`
      }, delay)
    }
  }, [ digit, delay, interFace])

  return (
    <div className="relative h-[2.775rem] xsm:h-[1.7375rem] w-[2rem] xsm:w-[1.25rem] overflow-hidden">
      <div
        ref={digitRef}
        className="absolute transition-transform duration-1000"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className={cn("text-brown h-[2.775rem] text-[3.25rem] font-bold leading-[1] xsm:text-[2rem]", className)}>
            {num}
          </div>
        ))}
        {digit === 0 ? 
        <div  className={cn("text-brown h-[2.775rem] text-[3.25rem] font-bold leading-[1] xsm:text-[2rem]", className)}>
            0
        </div> : 
        new Array(digit).fill(0).map((e, index) => (
            <div key={index} className={cn("text-brown h-[2.775rem] text-[3.25rem] font-bold leading-[1] xsm:text-[2rem]", className)}>
              {index + 1}
            </div>
        ))}
        
      </div>
    </div>
  )
}

