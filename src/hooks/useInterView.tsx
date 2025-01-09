'use client'
import {useEffect, useRef, useState} from 'react'

const useInterView = ({
  threshold = 0.5,
  shouldUnobserve = true,
  resetOnExitTop = false,
  checkreverse = false,
}: {
  threshold?: number
  shouldUnobserve?: boolean
  resetOnExitTop?: boolean
  checkreverse?: boolean
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (shouldUnobserve) {
            observer.unobserve(entry.target) // Dừng theo dõi nếu shouldUnobserve = true
          }
        } else if (resetOnExitTop && entry.boundingClientRect.top > 0) {
          setIsVisible(false)
        } else if (checkreverse && entry.boundingClientRect.top < 0) {
          setIsVisible(false)
        }
      },
      {threshold}, // max là 1
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [resetOnExitTop, shouldUnobserve, threshold])

  return {isVisible, elementRef}
}

export default useInterView