import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import BannerHomepage from '@/sections/homepage/banner'
import FormHomepage from '@/sections/homepage/form-homepage'
import GlobalImmigration from '@/sections/homepage/global-immigration'
import {InvestmentOpportunities} from '@/sections/homepage/investment-opportunities'
import NewsFlow from '@/sections/homepage/news-homepage'
import ProudJourney from '@/sections/homepage/proud-journey'
import TalentedTeam from '@/sections/homepage/talented-team'
import endpoints from '@/utils/endpoints'
import dynamic from 'next/dynamic'

const MapDiscover = dynamic(() => import('@/sections/homepage/map-discover'), {
  ssr: false, // Nếu component không cần server-side rendering
  loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
})

const HomePage = async () => {
  const homeRequest = {
    api: endpoints.homepage + '?_fields=acf&acf_format=standard',
    option: {
      revalidate: 600,
    },
  }
  const newsRequest = {
    api: endpoints.homeFeatured,
    option: {
      revalidate: 600,
    },
  }

  try {
    const [homeResponse, newsResponse] = await Promise.all([
      fetchDataACF(homeRequest),
      fetchData(newsRequest),
    ])

    const {
      home_banner,
      home_global_immigration,
      home_map_discover,
      investment_opportunities,
      home_talented_team,
      home_proud_journey,
    } = homeResponse?.acf || {}

    return (
      <main className='bg-background'>
        {home_banner && <BannerHomepage data={home_banner} />}
        {home_global_immigration && (
          <GlobalImmigration data={home_global_immigration} />
        )}
        {home_map_discover && <MapDiscover data={home_map_discover} />}
        {investment_opportunities && (
          <InvestmentOpportunities data={investment_opportunities} />
        )}
        {home_talented_team && <TalentedTeam data={home_talented_team} />}
        {home_proud_journey && <ProudJourney data={home_proud_journey} />}
        <FormHomepage />
        <NewsFlow data={newsResponse} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading page content.</div>
  }
}

export default HomePage
