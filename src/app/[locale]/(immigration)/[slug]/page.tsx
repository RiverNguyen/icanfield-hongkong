import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import Header from '@/layout/header'
import Immigration from '@/views/immigration'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'

import {redirect} from 'next/navigation'

// export async function generateStaticParams() {
//   // Gọi API để lấy tất cả các slug của các tour
//   const tours = await fetchData({
//     api: '/slugs?post_type=settlement-program',
//   })

//   // Trả về các tham số tĩnh
//   return tours?.map((tour: {slug: string; nation?: string[]}) => ({
//     slug: tour?.slug,
//   }))
// }
export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string; detailslug: string}>
}) {
  const {slug: slugRaw} = await params
  const slug =
    typeof slugRaw === 'string' && /%[0-9A-Fa-f]{2}/.test(slugRaw)
      ? decodeURIComponent(slugRaw)
      : slugRaw
  try {
    const res = await getMetadata(
      `/nation?slug=${encodeURIComponent(slug)}`,
    )

    // Kiểm tra dữ liệu trả về
    if (!res || !Array.isArray(res) || res.length === 0 || !res[0]) {
      console.error('No valid metadata found for slug:', slug)
      return {}
    }
    // console.log('res', res[0])
    // Trả về metadata được xử lý
    return metadataValues(res[0])
  } catch (error) {
    // Xử lý lỗi bất ngờ
    console.error('Error generating metadata:', error)
    return {}
  }
}
export default async function page({
  params,
}: {
  params: Promise<{slug: string; locale: string}>
}) {
  const {locale, slug: slugRaw} = await params
  // Slug có thể nhận dạng encoded trên production (vd. %E5%8A%A0%E6%8B%BF%E5%A4%A7) → decode để gọi API đúng
  const slug =
    typeof slugRaw === 'string' && /%[0-9A-Fa-f]{2}/.test(slugRaw)
      ? decodeURIComponent(slugRaw)
      : slugRaw
  const slugEnc = encodeURIComponent(slug)
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
    api: '/language-switcher/taxonomy-nation/' + locale + '/' + encodeURIComponent(slug),
    option: {
      next: {revalidate: 60},
    },
    fallback: {},
  }

  const [dataFooter, dataHeader, dataPopup, dataLanguageSwitcher] =
    await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
      fetchData(requestLanguageSwitcher),
    ])

  const [dataAcf, dataPrograms, postRelate, dataMap] = await Promise.all([
    fetchDataACF({
      api:
        '/' +
        endpoints.taxonomiesSettlement +
        '?slug=' +
        slugEnc +
        '&acf_format=standard&lang=' +
        locale,
      option: {
        next: {revalidate: 10},
      },
    }),
    fetchData({
      api:
        endpoints.settlementPrograms +
        '?page=1&per_page=8&order=asc&' +
        endpoints.taxonomiesSettlement +
        '=' +
        slugEnc +
        '&lang=' +
        locale,
      option: {
        next: {revalidate: 10},
      },
      fallback: [],
    }),
    fetchData({
      api: '/posts-by-taxonomy?slug=' + slugEnc,
      option: {
        next: {revalidate: 10},
      },
      fallback: [],
    }),
    fetchData({
      api: `/data-map-with-slug/?slug=${slugEnc}`,
      option: {
        next: {revalidate: 10},
      },
      fallback: null,
    }),
  ])
  if (
    !dataAcf ||
    !Array.isArray(dataAcf) ||
    dataAcf.length === 0 ||
    !dataAcf[0]
  ) {
    redirect('/')
  }

  console.log('dataPrograms', dataPrograms)

  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcher}
      />
      <Immigration
        locale={locale}
        slug={slug}
        dataImmigration={dataAcf[0]}
        dataPrograms={dataPrograms}
        postRelate={postRelate}
        dataMap={dataMap?.data}
      />
    </>
  )
}
