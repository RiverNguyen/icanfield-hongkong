import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import IndexComparePrograms from '@/views/compare-programs/IndexComparePrograms'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import Header from '@/layout/header'

const dataLanguageSwitcher = {
  zh: {
    slug: 'compare-programs',
  },
  'zh-cn': {
    slug: 'compare-programs',
  },
  en: {
    slug: 'compare-programs',
  },
}

export async function generateMetadata({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
  const res = await getMetadata(endpoints.compareProgramsPage.page[locale])
  return metadataValues(res)
}
export default async function page({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params

  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPage = {
    api: endpoints?.compareProgramsPage.page[locale] + '?acf_format=standard',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPrograms = {
    api: endpoints?.comparePrograms.get(locale),
    option: {
      next: {revalidate: 10},
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_dataTaxonomies, dataPage, dataPrograms] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchDataACF(requestPage),
    fetchData(requestPrograms),
  ])
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

  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcher}
      />
      <IndexComparePrograms
        dataPrograms={dataPrograms}
        dataPage={dataPage?.acf}
        // dataNationSettlement={dataTaxonomies?.nation}
      />
    </>
  )
}
