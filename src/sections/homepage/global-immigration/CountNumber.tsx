"use client"
import { DigitRoller } from "@/sections/homepage/global-immigration/DigitRoller"
import { useEffect, useState } from "react"

export default function CountNumber({number, suffix = ''}: {number: number, suffix: string }) {
    const digits = String(number).split("").map(Number)
    return (
        <div className="flex">
            <div className="flex">
                {digits.map((digit, index) => (
                    <DigitRoller
                        key={index}
                        digit={digit}
                        delay={index * 50} 
                    />
                ))}
            </div>
            {suffix && (
                <span className="text-brown heading3 xsm:text-[1.24444rem] tracking-normal font-bold leading-[1] translate-y-[-0.25rem]">{suffix}</span>
            )}
        </div>
    )
}