'use client'
import ResultPassport from '@/sections/passport/research/ResultPassport'
import SearchPassport from '@/sections/passport/research/SearchPassport'
import {useSearchParams} from 'next/navigation'
import React, {useEffect, useState} from 'react'

const WrapperAside = () => {
  const [codePostal, setCodePostal] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const postal = searchParams?.get('postal')
    if (postal) {
      setCodePostal(postal)
    }
  }, [searchParams])

  return (
    <div className='h-fit w-[29rem] flex-shrink-0'>
      <SearchPassport setCodePostal={setCodePostal} />
      {codePostal && <ResultPassport codePostal={codePostal} />}
    </div>
  )
}

export default WrapperAside
