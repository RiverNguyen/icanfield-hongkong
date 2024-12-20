import {InvestmentOpportunities} from '@/sections/homepage/investment-opportunities'
import investmentOpportunities from '@/sections/homepage/investment-opportunities/CONSTANTS'
import React from 'react'

const HomePage = () => {
  return (
    <main className='pt-[100rem]'>
      <InvestmentOpportunities {...investmentOpportunities} />
    </main>
  )
}

export default HomePage
