import Achievements from '@/sections/detail-hr/archieverment'
import Banner from '@/sections/detail-hr/banner'
import FormContact from '@/sections/detail-hr/form-contact'
import Personnel from '@/sections/detail-hr/personnel'
import Reviews from '@/sections/detail-hr/reviews'
import Said from '@/sections/detail-hr/said'
import Settle from '@/sections/detail-hr/settle'
import Success from '@/sections/detail-hr/success'
import React from 'react'

export default function HRDetail() {
  return (
    <main className='relative bg-background'>
      <Banner />
      <Personnel />
      <Achievements />
      <Said />
      <Success />
      <Reviews />
      <Settle />
      <FormContact />
    </main>
  )
}
