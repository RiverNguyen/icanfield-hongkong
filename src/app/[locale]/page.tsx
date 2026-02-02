import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import HomePage from '@/views/homepage'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import getMetadataPage from '@/fetch/getMetadataPage'
import Header from '@/layout/header'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
  const res = await getMetadataPage(endpoints.homepage[locale])
  return metadataValues(res)
}
const dataLanguageSwitcher = {
  zh: {
    slug: '',
  },
  'zh-cn': {
    slug: '',
  },
  en: {
    slug: '',
  },
}
export default async function Home({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Common'})
  const requestFooter = {
    api: `/footer-options?acf_format=standard&lang=${locale}`,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestHeader = {
    api: `/header-options?acf_format=standard&lang=${locale}`,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestPopup = {
    api: `/form-all-page?lang=${locale}`,
    option: {
      next: {revalidate: 60},
    },
  }

  const homeRequest = {
    api: `${endpoints.homepage[locale]}?_fields=acf&acf_format=standard`,
    option: {
      next: {revalidate: 10},
    },
  }
  const newsRequest = {
    api: `${endpoints.homeFeatured}?lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const FilterBanner = {
    api: `${endpoints.filter}?lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const HomepageMap = {
    api: `${endpoints.homepageMap}?lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }

  try {
    const [homeResponse, newsResponse, dataFilter, homepageMap] =
      await Promise.all([
        fetchDataACF(homeRequest),
        fetchData(newsRequest),
        fetchData(FilterBanner),
        fetchData(HomepageMap),
      ])
    const [dataFooter, dataHeader, dataPopup] = await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
    ])
    return (
      <>
        <Header
          data={dataHeader?.data}
          dataFooter={dataFooter.data}
          dataPopup={dataPopup?.data}
          languageSwitcher={dataLanguageSwitcher}
        />
        <HomePage
          homeData={homeResponse}
          newsData={newsResponse?.data ?? newsResponse}
          dataFilter={dataFilter?.data}
          dataMap={homepageMap?.data}
        />
      </>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>{t('loi_tai_trang')}</div>
  }
}
