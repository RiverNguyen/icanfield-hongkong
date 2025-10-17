import FormContact from '@/sections/detail-hr/form-contact'
import Reviews from '@/sections/detail-hr/reviews'
import Settle from '@/sections/detail-hr/settle'
import React from 'react'

export default function HRDetail() {
  return (
    <main className='relative bg-background pt-[calc(4.37rem+2.0625rem+6.25rem)]'>
      <Reviews />
      <Settle />
      <FormContact />
    </main>
  )
}
