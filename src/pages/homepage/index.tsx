import BannerHomepage, {IBannerHomepageProps} from '@/sections/homepage/banner'
// import FormHomepage from '@/sections/homepage/form-homepage'
import {
  IItemInvestmentOpportunities,
  InvestmentOpportunities,
} from '@/sections/homepage/investment-opportunities'
import {
  ItemNewsFeatured,
  ItemNewsHP,
} from '@/sections/homepage/news-homepage'
import {IItemProudJourney} from '@/sections/homepage/proud-journey'
// import TalentedTeam from '@/sections/homepage/talented-team'
import {Media} from '@/types/image.interface'
import dynamic from 'next/dynamic'
import {DataMapHomepage} from '@/sections/homepage/map-discover/dataMap.interface'
import {FilterData} from '@/sections/homepage/banner/bannerHp.interface'
const GlobalImmigration = dynamic(
  () => import('@/sections/homepage/global-immigration'),
)
const NewsFlow = dynamic(() => import('@/sections/homepage/news-homepage'), {
  ssr: false,
  loading: () => <p>Loading News Flow...</p>,
})
const ProudJourney = dynamic(
  () => import('@/sections/homepage/proud-journey'),
  {
    ssr: false,
    loading: () => <p>Loading Proud Journey...</p>,
  },
)
const MapDiscover = dynamic(() => import('@/sections/homepage/map-discover'), {
  ssr: false, // Nếu component không cần server-side rendering
  loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
})
const TalentedTeam = dynamic(
  () => import('@/sections/homepage/talented-team'),
  {
    ssr: false,
    loading: () => <p>Loading Talented Team...</p>,
  },
)
const FormHomepage = dynamic(
  () => import('@/sections/homepage/form-homepage'),
  {
    ssr: false,
    loading: () => <p>Loading Form Homepage...</p>,
  },
)
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
    id: number
    title_categories: string
    name: string
    slug: string
    description: string
    posts: ItemNewsHP[]
  }[]
}
const HomePage = ({
  homeData,
  newsData,
  dataFilter,
  dataMap,
}: {
  homeData: HomeData
  newsData: NewsData
  dataFilter: FilterData
  dataMap: DataMapHomepage
}) => {
  const {
    home_banner,
    home_global_immigration,
    home_map_discover,
    investment_opportunities,
    home_talented_team,
    home_proud_journey,
  } = homeData?.acf || {}
  console.log(home_banner)
  return (
    <main className='bg-background'>
      {home_banner && (
        <BannerHomepage
          data={home_banner}
          dataFilter={dataFilter}
        />
      )}
      {home_global_immigration && (
        <GlobalImmigration data={home_global_immigration} />
      )}
      {home_map_discover && (
        <MapDiscover
          data={home_map_discover}
          dataMap={dataMap}
        />
      )}
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
