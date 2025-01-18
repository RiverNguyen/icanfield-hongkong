/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useStore from '@/app/(store)/store'
import {AppProgressBar as ProgressBar} from 'next-nprogress-bar'

import {ReactNode, useEffect} from 'react'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({children}: ProvidersProps) => {
  const {setViewPort} = useStore((state) => state)
  useEffect(() => {
    const viewport = window.innerWidth > 639 ? 'desktop' : 'mobile'
    setViewPort(viewport)
    // Thêm file jQuery
    const jqueryScript = document.createElement('script')
    jqueryScript.src =
      'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'
    jqueryScript.async = true
    document.body.appendChild(jqueryScript)

    // Thêm file CSS
    const paymentCss = document.createElement('link')
    paymentCss.rel = 'stylesheet'
    paymentCss.href =
      'https://sandbox.megapay.vn/pg_was/css/payment/layer/paymentClient.css'
    document.head.appendChild(paymentCss)

    // Thêm file PaymentClient.js
    const paymentScript = document.createElement('script')
    paymentScript.src =
      'https://sandbox.megapay.vn/pg_was/js/payment/layer/paymentClient.js'
    paymentScript.async = true
    document.body.appendChild(paymentScript)

    // Cleanup để xóa các tệp khi component unmount (tùy chọn)
    return () => {
      document.body.removeChild(jqueryScript)
      document.head.removeChild(paymentCss)
      document.body.removeChild(paymentScript)
    }
  }, [])
  return (
    <>
      {children}
      <ProgressBar
        height='4px'
        color='#F81A1E'
        options={{showSpinner: false}}
        shallowRouting
      />
    </>
  )
}

export default Providers
