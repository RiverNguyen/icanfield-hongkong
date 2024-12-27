import {useState, useEffect} from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      console.log(window.innerWidth)
      setIsMobile(window.innerWidth <= 639) // Thay đổi ngưỡng tại đây nếu cần
    }

    checkMobile()

    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return isMobile
}

export default useIsMobile
