import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import DocumentAppraisal from '@/views/documentappraisal'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import {DEFAULT_COUNTRY_SELECT} from '@/sections/document-appraisal/constants'
import Header from '@/layout/header'

const PAGE_ID = {
  zh: 7339,
  'zh-cn': 7344,
  en: 7342,
}

const dataLanguageSwitcher = {
  zh: {
    slug: 'document-appraisal',
  },
  'zh-cn': {
    slug: 'document-appraisal',
  },
  en: {
    slug: 'document-appraisal',
  },
}

export async function generateMetadata({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
  const res = await getMetadata(`/pages/${PAGE_ID[locale]}`)
  return metadataValues(res)
}
export default async function page({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
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

  const requestPage = {
    api: `/pages/${PAGE_ID[locale]}?acf_format=standard&lang=${locale}`,
    option: {
      revalidate: 10,
    },
  }
  const requestTaxonomies = {
    api: `/taxonomies-settlement?lang=${locale}`,
    option: {
      revalidate: 10,
    },
  }
  const [dataAcf, dataTaxonomies] = await Promise.all([
    fetchDataACF(requestPage),
    fetchData(requestTaxonomies),
  ])
  const entry =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (DEFAULT_COUNTRY_SELECT as any)[locale] ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (DEFAULT_COUNTRY_SELECT as any).en
  const root = entry?.idd?.root ?? ''
  const suffix =
    Array.isArray(entry?.idd?.suffixes) && entry.idd.suffixes.length > 0
      ? entry.idd.suffixes[0]
      : ''
  const defaultCalling = root + (suffix ?? '')

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
      <DocumentAppraisal
        dataTaxonomies={dataTaxonomies}
        data={dataAcf?.acf}
        defaultCalling={defaultCalling}
      />
    </>
  )
}
