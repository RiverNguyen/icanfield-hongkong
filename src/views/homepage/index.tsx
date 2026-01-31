'use client'
import {useTranslations} from 'next-intl'
import BannerHomepage, {IBannerHomepageProps} from '@/sections/homepage/banner'
import {
  IItemInvestmentOpportunities,
  InvestmentOpportunities,
} from '@/sections/homepage/investment-opportunities'
import {ItemNewsFeatured, ItemNewsHP} from '@/sections/homepage/news-homepage'
import {IItemProudJourney} from '@/sections/homepage/proud-journey'
import {Media} from '@/types/image.interface'
import dynamic from 'next/dynamic'
import {DataMapHomepage} from '@/sections/homepage/map-discover/dataMap.interface'
import {FilterData} from '@/sections/homepage/banner/bannerHp.interface'

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
        link: string
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
  const t = useTranslations()

  const GlobalImmigration = dynamic(
    () => import('@/sections/homepage/global-immigration'),
    {ssr: false},
  )
  const NewsFlow = dynamic(() => import('@/sections/homepage/news-homepage'), {
    ssr: false,
    loading: () => <p>{t('dang_tai_tin_tuc')}</p>,
  })
  const ProudJourney = dynamic(
    () => import('@/sections/homepage/proud-journey'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_hanh_trinh')}</p>,
    },
  )
  const MapDiscover = dynamic(
    () => import('@/sections/homepage/map-discover'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_ban_do')}</p>,
    },
  )
  const TalentedTeam = dynamic(
    () => import('@/sections/homepage/talented-team'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_doi_ngu')}</p>,
    },
  )
  const FormHomepage = dynamic(
    () => import('@/sections/homepage/form-homepage'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_bieu_mau')}</p>,
    },
  )

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
      {newsData &&
        (newsData.title ||
          newsData.news_flow?.length ||
          newsData.news?.length) && <NewsFlow data={newsData} />}
    </main>
  )
}

export default HomePage
