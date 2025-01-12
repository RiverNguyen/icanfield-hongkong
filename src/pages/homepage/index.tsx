import BannerHomepage, { IBannerHomepageProps } from '@/sections/homepage/banner'
import FormHomepage from '@/sections/homepage/form-homepage'
import GlobalImmigration from '@/sections/homepage/global-immigration'
import {
  IItemInvestmentOpportunities,
  InvestmentOpportunities,
} from '@/sections/homepage/investment-opportunities'
import NewsFlow, {
  ItemNews,
  ItemNewsFeatured,
} from '@/sections/homepage/news-homepage'
import ProudJourney, {
  IItemProudJourney,
} from '@/sections/homepage/proud-journey'
import TalentedTeam from '@/sections/homepage/talented-team'
import { Media } from '@/types/image.interface'
import dynamic from 'next/dynamic'
const MapDiscover = dynamic(() => import('@/sections/homepage/map-discover'), {
  ssr: false, // Nếu component không cần server-side rendering
  loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
})

interface HomeData {
  acf: {
    home_banner?: IBannerHomepageProps & {
      type: 'upload' | 'youtube' | 'tiktok' | 'slide'
    }
    home_global_immigration?: {
      title: string
      description: string
      count_number: {
        number: string
        label: string
        title: string
      }[]
    }
    home_map_discover?: {
      logo: Media
      slogan: string
      title: string
      description: string
    }
    investment_opportunities?: {
      title: string
      subtitle: string
      items: IItemInvestmentOpportunities[]
    }
    home_talented_team?: {
      title: string
      subtitle: string
      talented_team: {
        image: Media
        name: string
        position: string
      }[]
    }
    home_proud_journey?: {
      title: string
      proud_journey: IItemProudJourney[]
    }
  }
}
interface NewsData {
  title: string
  news_flow: ItemNewsFeatured[]
  news: {
    title: string
    description: string
    link: string
    news: ItemNews[]
  }[]
}
const HomePage = ({
  homeData,
  newsData,
}: {
  homeData: HomeData
  newsData: NewsData
}) => {
  const {
    home_banner,
    home_global_immigration,
    home_map_discover,
    investment_opportunities,
    home_talented_team,
    home_proud_journey,
  } = homeData?.acf || {}
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
      {newsData && newsData.title && <NewsFlow data={newsData} />}
    </main>
  )
}

export default HomePage
