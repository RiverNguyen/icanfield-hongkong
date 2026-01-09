import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import Immigration from '@/pages/immigration'
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
  params: {slug: string; detailslug: string}
}) {
  try {
    // Gọi API để lấy metadata
    const res = await getMetadata(
      `/nation?slug=${encodeURIComponent(params.slug)}`,
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
export default async function page({params}: {params: {slug: string}}) {
  const [dataAcf, dataPrograms, postRelate, dataMap] = await Promise.all([
    fetchDataACF({
      api:
        '/' +
        endpoints.taxonomiesSettlement +
        '?slug=' +
        params?.slug +
        '&acf_format=standard',
      option: {
        next: {revalidate: 10},
      },
    }).catch((err) => {
      console.error('fetchDataACF error:', err)
      return null
    }),
    fetchData({
      api:
        endpoints.settlementPrograms +
        '?page=1&per_page=8&order=asc&' +
        endpoints.taxonomiesSettlement +
        '=' +
        params?.slug,
      option: {
        next: {revalidate: 10},
      },
    }).catch((err) => {
      console.error('fetchData dataPrograms error:', err)
      return []
    }),
    fetchData({
      api: '/posts-by-taxonomy?slug=' + params?.slug,
      option: {
        next: {revalidate: 10},
      },
    }).catch((err) => {
      console.error('fetchData postRelate error:', err)
      return []
    }),
    fetchData({
      api: `/data-map-with-slug/?slug=${params.slug}`,
      option: {
        next: {revalidate: 10},
      },
    }).catch((err) => {
      console.error('fetchData dataMap error:', err)
      return null
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
  return (
    <Immigration
      slug={params?.slug}
      dataImmigration={dataAcf[0]}
      dataPrograms={dataPrograms}
      postRelate={postRelate}
      dataMap={dataMap?.data}
    />
  )
}
