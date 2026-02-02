import fetchDataACF from '@/fetch/fetchDataACF'
import IndexAboutUs from '@/views/about-us/IndexAboutUs'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/utils/endpoints'
import fetchData from '@/fetch/fetchData'
import Header from '@/layout/header'

interface PageProps {
  params: {
    locale: 'zh' | 'zh-cn' | 'en'
  }
}
const dataLanguageSwitcher = {
  zh: {
    slug: 'about-us',
  },
  'zh-cn': {
    slug: 'about-us',
  },
  en: {
    slug: 'about-us',
  },
}
export async function generateMetadata({params}: PageProps) {
  const {locale} = params
  const res = await getMetadata(endpoints.aboutUs.metadata[locale])
  return metadataValues(res)
}

const page = async ({params}: PageProps) => {
  const {locale} = params
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
  const [dataAcf, dataFooter, dataHeader, dataPopup] = await Promise.all([
    fetchDataACF({
      api: endpoints.aboutUs.page[locale],
      option: {
        next: {revalidate: 10},
      },
    }),
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
      <IndexAboutUs dataAcf={dataAcf?.acf} />
    </>
  )
}

export default page
