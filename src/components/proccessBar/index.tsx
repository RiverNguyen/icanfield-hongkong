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
    if (typeof window !== 'undefined') {
      const viewport = window.innerWidth > 639 ? 'desktop' : 'mobile'
      setViewPort(viewport)
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
