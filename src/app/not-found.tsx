'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800'>
      <h1 className='mb-8 animate-bounce text-9xl font-bold'>
        <span className='animate-spin-slow inline-block'>4</span>
        <span className='animate-ping-slow inline-block'>0</span>
        <span className='animate-spin-slow inline-block'>4</span>
      </h1>
      <p className='mb-8 animate-pulse text-2xl'>Oops! Page not found</p>
      <Link href='/'>
        <Button
          variant='outline'
          size='lg'
          className='animate-bounce-slow'
        >
          Go Home
        </Button>
      </Link>
    </div>
  )
}
