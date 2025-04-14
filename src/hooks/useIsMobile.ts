'use client'
import {useEffect, useState} from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 639)
      }
    }

    const debounce = (func: () => void, delay: number) => {
      let timeout: ReturnType<typeof setTimeout>
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(func, delay)
      }
    }

    const debouncedCheckMobile = debounce(checkMobile, 150)
    if (typeof window === 'undefined') return
    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)

    return () => {
      window.removeEventListener('resize', debouncedCheckMobile)
    }
  }, [])

  return isMobile
}

export default useIsMobile
