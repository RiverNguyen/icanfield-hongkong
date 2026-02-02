import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import FormConnectUsV2 from '@/sections/blogs/connect-us/FormConnectUsV2'
import WrapperConnectUsV2 from '@/sections/blogs/connect-us/WrapperConnectUsV2'
import BannerBottom from '@/sections/contact/banner-bottom'
import BannerTop from '@/sections/contact/banner-top'
import ContactInfo from '@/sections/contact/contact-info'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/utils/endpoints'
import Header from '@/layout/header'

const dataLanguageSwitcher = {
  zh: {
    slug: 'contact',
  },
  'zh-cn': {
    slug: 'contact',
  },
  en: {
    slug: 'contact',
  },
}

export async function generateMetadata({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
  const res = await getMetadata(endpoints.contactPage[locale])
  return metadataValues(res)
}
const page = async ({params}: {params: {locale: 'zh' | 'zh-cn' | 'en'}}) => {
  const {locale} = await params
  const requestTaxonomies = {
    api: endpoints.settlementTaxonomies.get(locale),
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPage = {
    api: `${endpoints.contactPage[locale]}?acf_format=standard`,
    option: {
      next: {revalidate: 10},
    },
  }
  const [dataTaxonomies, dataPage] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchDataACF(requestPage),
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
      <main className='bg-background'>
        <BannerTop {...dataPage?.acf?.banner_contact} />
        <WrapperConnectUsV2>
          <FormConnectUsV2 dataTaxonomies={dataTaxonomies?.nation} />
        </WrapperConnectUsV2>
        <ContactInfo {...dataPage?.acf?.information} />
        <BannerBottom />
      </main>
    </>
  )
}

export default page
