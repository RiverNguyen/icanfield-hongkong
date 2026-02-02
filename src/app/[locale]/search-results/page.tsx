import fetchData from '@/fetch/fetchData'
import SearchResult from '@/sections/searchResult'
import endpoints from '@/utils/endpoints'
import {Suspense} from 'react'
import {getTranslations} from 'next-intl/server'
import Header from '@/layout/header'

const dataLanguageSwitcher = {
  zh: {
    slug: 'search-results',
  },
  'zh-cn': {
    slug: 'search-results',
  },
  en: {
    slug: 'search-results',
  },
}
export default async function page({
  params,
}: {
  params: Promise<{locale: 'zh' | 'zh-cn' | 'en'}>
}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Common'})
  const FilterBanner = {
    api: `${endpoints.filter}?lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const requestFooter = {
    api: '/footer-options?acf_format=standard&lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestHeader = {
    api: '/header-options?acf_format=standard&lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestPopup = {
    api: '/form-all-page?lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const [dataFooter, dataHeader, dataPopup] = await Promise.all([
    fetchData(requestFooter),
    fetchData(requestHeader),
    fetchData(requestPopup),
  ])
  try {
    const [dataFilter] = await Promise.all([fetchData(FilterBanner)])
    return (
      <>
        <Header
          data={dataHeader?.data}
          dataFooter={dataFooter.data}
          dataPopup={dataPopup?.data}
          languageSwitcher={dataLanguageSwitcher}
        />
        <Suspense>
          <SearchResult dataFilter={dataFilter?.data} />
        </Suspense>
      </>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>{t('loi_tai_trang')}</div>
  }
}
