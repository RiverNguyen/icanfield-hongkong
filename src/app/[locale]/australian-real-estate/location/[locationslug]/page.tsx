import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import AustralianRealEstateClone from '@/views/australianrealestate/indexClone'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
import Header from '@/layout/header'
export async function generateMetadata({
  params: {locale},
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const res = await getMetadata(endpoints.australianRealEstate.page[locale])
  return metadataValues(res)
}

export default async function page({
  params: {locale, locationslug},
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'; locationslug: string}
}) {
  // ✅ Khởi tạo trong component - tránh duplicate slug khi build
  const dataLanguageSwitcherLocal = {
    zh: {
      slug: 'australian-real-estate/location',
    },
    'zh-cn': {
      slug: 'australian-real-estate/location',
    },
    en: {
      slug: 'australian-real-estate/location',
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
  const requestLanguageSwitcher = {
    api:
      '/language-switcher/australia-real-estat-location/' +
      locale +
      '/' +
      locationslug,
    option: {
      next: {revalidate: 60},
    },
  }
  const [dataFooter, dataHeader, dataPopup, dataLanguageSwitcher] =
    await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
      fetchData(requestLanguageSwitcher),
    ])
  // console.log(params)
  const requestTaxonomies = {
    api: `/taxonomies-settlement?lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPosts = {
    api: `/get-post-australia?page=1&limit=9&taxonomies=${locationslug}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const [dataTaxonomies, dataAcf, dataListPost, postRelate, dataMap] =
    await Promise.all([
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
  if (dataLanguageSwitcher) {
    Object.keys(dataLanguageSwitcherLocal).forEach((key) => {
      dataLanguageSwitcherLocal[key as 'zh' | 'zh-cn' | 'en'].slug +=
        '/' + dataLanguageSwitcher[key as 'zh' | 'zh-cn' | 'en']?.slug
    })
  }
  console.log('dataLanguageSwitcherLocal', dataLanguageSwitcherLocal)
  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcherLocal}
      />
      <AustralianRealEstateClone
        dataNationSettlement={dataTaxonomies?.nation}
        dataAcf={dataAcf?.acf}
        dataListPost={dataListPost}
        postRelate={postRelate}
        dataMap={dataMap?.data}
      />
    </>
  )
}
