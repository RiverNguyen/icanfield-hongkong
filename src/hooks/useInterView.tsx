'use client'
import { useEffect, useRef, useState } from 'react'

type UseInterViewOptions = {
  threshold?: number
  shouldUnobserve?: boolean
  resetOnExitTop?: boolean
  checkreverse?: boolean
}

const useInterView = ({
  threshold = 0.5,
  shouldUnobserve = true,
  resetOnExitTop = false,
  checkreverse = false,
}: UseInterViewOptions) => {
  const [isVisible, setIsVisible] = useState(false) // Trạng thái hiển thị của phần tử
  const elementRef = useRef<HTMLDivElement>(null) // Tham chiếu tới phần tử được theo dõi

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, boundingClientRect } = entry

        if (isIntersecting) {
          setIsVisible(true)
          if (shouldUnobserve) observer.unobserve(entry.target) // Dừng theo dõi nếu cần
        } else {
          if (resetOnExitTop && boundingClientRect.top > 0) setIsVisible(false)
          if (checkreverse && boundingClientRect.top < 0) setIsVisible(false)
        }
      },
      { threshold }, // Định nghĩa ngưỡng quan sát (0-1)
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect() // Ngừng theo dõi khi component bị unmount
  }, [shouldUnobserve, resetOnExitTop, checkreverse, threshold])

  return { isVisible, elementRef }
}

export default useInterView
