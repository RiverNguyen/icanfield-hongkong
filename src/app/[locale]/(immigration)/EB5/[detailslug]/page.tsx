import fetchDataACF from '@/fetch/fetchDataACF'
import DetailEB5 from '@/views/detail-EB5'
import {notFound} from 'next/navigation'
import fetchData from '@/fetch/fetchData'
import {redirect} from 'next/navigation'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import Header from '@/layout/header'

// ✅ ISR + Dynamic params - an toàn cho build
export const dynamicParams = true
export const revalidate = 60

// export async function generateStaticParams() {
//   // ✅ Timeout 5s - tránh treo build
//   const controller = new AbortController()
//   const timeoutId = setTimeout(() => controller.abort(), 5000)

//   try {
//     const tours = await fetchData({
//       api: '/slugs?post_type=eb-5-project',
//       option: {
//         signal: controller.signal,
//       },
//     })

//     clearTimeout(timeoutId)

//     // ✅ Validate data & limit slug
//     if (!Array.isArray(tours)) {
//       console.warn('generateStaticParams: API không trả về array')
//       return []
//     }

//     // ✅ Chỉ build 5 page, phần còn lại ISR (on-demand)
//     return tours.slice(0, 5).map((tour: string[]) => ({
//       slug: tour,
//     }))
//   } catch (error) {
//     clearTimeout(timeoutId)
//     console.error('generateStaticParams failed:', error)
//     // ✅ KHÔNG throw - cứu build
//     return []
//   }
// }
export async function generateMetadata({
  params,
}: {
  params: {slug: string; detailslug: string}
}) {
  try {
    // Kiểm tra params.detailslug có tồn tại và hợp lệ
    if (!params?.detailslug) {
      console.error('Missing or invalid detailslug')
      return {}
    }

    // Gọi API để lấy metadata
    const res = await getMetadata(
      `/eb-5-project?slug=${encodeURIComponent(params.detailslug)}`,
    )

    // Kiểm tra dữ liệu trả về
    if (!res || !Array.isArray(res) || res.length === 0 || !res[0]) {
      console.error('No valid metadata found for slug:', params.detailslug)
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
  params: {detailslug, locale},
}: {
  params: {detailslug: string; locale: string}
}) {
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
  const requestTaxonomies = {
    api: `/taxonomies-settlement?lang=${locale}`,
    option: {
      revalidate: 10,
    },
  }
  const [dataFooter, dataHeader, dataPopup] = await Promise.all([
    fetchData(requestFooter),
    fetchData(requestHeader),
    fetchData(requestPopup),
  ])
  const [data, dataReleatedPost, dataTaxonomies] = await Promise.all([
    fetchDataACF({
      api: `/eb-5-project?slug=${detailslug}&acf_format=standard&lang=${locale}`,
      option: {
        next: {revalidate: 10},
      },
    }),
    fetchData({
      api: `/related-posts/?slug=${detailslug}&lang=${locale}`,
      option: {
        next: {revalidate: 10},
      },
    }),
    fetchData(requestTaxonomies),
  ])
  if (!data || !data.length) {
    redirect('/')
  }
  if (data?.length <= 0) return notFound()
  const dataLanguageSwitcher = {
    zh: {
      slug: 'EB5',
    },
    'zh-cn': {
      slug: 'EB5',
    },
    en: {
      slug: 'EB5',
    },
  }
  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcher}
      />
      <DetailEB5
        data={data?.[0]}
        dataReleatedPost={dataReleatedPost?.data}
        dataNationSettlement={dataTaxonomies?.nation}
      />
    </>
  )
}
