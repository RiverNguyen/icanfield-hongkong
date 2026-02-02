import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadataPage from '@/fetch/getMetadataPage'
import AustralianRealEstate from '@/views/australianrealestate'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import Header from '@/layout/header'

export async function generateMetadata({
  params: {locale},
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  try {
    // Gọi API để lấy metadata
    const res = await getMetadataPage(
      endpoints.australianRealEstate.metadata[locale],
    )
    // console.log(res)
    // Trả về metadata được xử lý
    return metadataValues(res)
  } catch (error) {
    // Xử lý lỗi bất ngờ
    console.error('Error generating metadata:', error)
    return {}
  }
}

export default async function page({
  params: {locale},
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const dataLanguageSwitcher = {
    zh: {
      slug: 'australian-real-estate',
    },
    'zh-cn': {
      slug: 'australian-real-estate',
    },
    en: {
      slug: 'australian-real-estate',
    },
  }
  const requestTaxonomies = {
    api: `/taxonomies-settlement?lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPosts = {
    api: `/get-post-australia?page=1&limit=9&lang=${locale}`,
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
  const [
    dataFooter,
    dataHeader,
    dataPopup,
    dataTaxonomies,
    dataAcf,
    dataListPost,
    postRelate,
    dataMap,
  ] = await Promise.all([
    fetchData(requestFooter),
    fetchData(requestHeader),
    fetchData(requestPopup),
    fetchData(requestTaxonomies),
    fetchDataACF({
      api: endpoints.australianRealEstate.page[locale],
      option: {
        next: {revalidate: 10},
      },
    }),
    fetchData(requestPosts),
    fetchData({
      api: '/posts-by-taxonomy?slug=australia',
      option: {
        next: {revalidate: 10},
      },
    }),
    fetchData({
      api: `/australian-location?lang=${locale}`,
      option: {
        next: {revalidate: 10},
      },
    }),
  ])
  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcher}
      />
      <AustralianRealEstate
        dataNationSettlement={dataTaxonomies?.nation}
        dataAcf={dataAcf?.acf}
        dataListPost={dataListPost}
        postRelate={postRelate}
        dataMap={dataMap?.data}
      />
    </>
  )
}
