import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import Immigration from '@/pages/immigration'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import {redirect} from 'next/navigation'
export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetadata(`/settlement-program?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}
export async function generateStaticParams() {
  // Gọi API để lấy tất cả các slug của các tour
  const tours = await fetchData({
    api: '/slugs?post_type=settlement-program',
  })

  // Trả về các tham số tĩnh
  return tours?.map((tour: string[]) => ({
    slug: tour,
  }))
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
        next: { revalidate: 10}
      },
    }),
    fetchData({
      api:
        endpoints.settlementPrograms +
        '?page=1&per_page=8&order=asc&' +
        endpoints.taxonomiesSettlement +
        '=' +
        params?.slug,
      option: {
        next: { revalidate: 10}
      },
    }),
    fetchData({
      api: '/posts-by-taxonomy?slug=' + params?.slug,
      option: {
        next: { revalidate: 10}
      },
    }),
    fetchData({
      api: `/data-map-with-slug/?slug=${params.slug}`,
      option: {
        next: { revalidate: 10}
      },
    }),
  ])
  if (!dataAcf || !dataAcf.length) {
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
