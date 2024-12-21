import FormHomepage from '@/sections/homepage/form-homepage'
import BannerHomepage from '@/sections/homepage/banner'
import TalentedTeam from '@/sections/homepage/talented-team'
import {InvestmentOpportunities} from '@/sections/homepage/investment-opportunities'
import investmentOpportunities from '@/sections/homepage/investment-opportunities/constants'
import React from 'react'
import GlobalImmigration from '@/sections/homepage/global-immigration'

const HomePage = () => {
  return (
    <main>
      HomePage
      <BannerHomepage />
      <GlobalImmigration />
      <TalentedTeam />
      <InvestmentOpportunities {...investmentOpportunities} />
      <FormHomepage />
    </main>
  )
}

export default HomePage
