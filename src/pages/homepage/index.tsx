import FormHomepage from '@/sections/homepage/form-homepage'
import React from 'react'
import BannerHomepage from '@/sections/homepage/banner'
import TalentedTeam from '@/sections/homepage/talented-team'
import {InvestmentOpportunities} from '@/sections/homepage/investment-opportunities'
import investmentOpportunities from '@/sections/homepage/investment-opportunities/constants'
import GlobalImmigration from '@/sections/homepage/global-immigration'
import ProudJourney from '@/sections/homepage/proud-journey'
import proudJourney from '@/sections/homepage/proud-journey/constants'
import NewsFlow from '@/sections/homepage/news-homepage'
import newFlow from '@/sections/homepage/news-homepage/constants'
import MapDiscover from '@/sections/homepage/map-discover'
const HomePage = () => {
  return (
    <main className='bg-background'>
      <BannerHomepage />
      <GlobalImmigration />
      <MapDiscover />
      <TalentedTeam />
      <InvestmentOpportunities {...investmentOpportunities} />
      <FormHomepage />
      <ProudJourney {...proudJourney} />
      <NewsFlow {...newFlow} />
    </main>
  )
}

export default HomePage
