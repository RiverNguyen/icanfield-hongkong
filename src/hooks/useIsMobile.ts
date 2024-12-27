import {useState, useEffect} from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 639) // Thay đổi ngưỡng tại đây nếu cần
      }
    }

    checkMobile()
    if (typeof window === 'undefined') return
    window.addEventListener('resize', checkMobile)
    return () => {
      if (typeof window === 'undefined') return
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return isMobile
}

export default useIsMobile
