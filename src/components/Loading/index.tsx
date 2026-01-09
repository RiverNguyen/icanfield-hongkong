import React from 'react'

export function Loading({isLoading = true}) {
  return (
    <div
      className={`${isLoading ? 'flex' : 'hidden'} items-center justify-center sm:min-h-[27.48rem]`}
    >
      <div className='border-Phase-1-Gradient h-8 w-8 animate-spin rounded-full border-b-2'></div>
    </div>
  )
}
