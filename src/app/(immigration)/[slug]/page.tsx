import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import Immigration from '@/pages/immigration'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await getMetadata(`/settlement-program?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}
export async function generateStaticParams() {
  // Gọi API để lấy tất cả các slug của các tour
  const tours = await fetchDataACF({
    api: '/settlement-program?_fields=slug',
  })

  // Trả về các tham số tĩnh
  return tours?.map((tour: {slug:string}) => ({
    slug: tour.slug,
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
        revalidate: 10,
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
        revalidate: 10,
      },
    }),
    fetchData({
      api: '/posts-by-taxonomy?slug=' + params?.slug,
      option: {
        revalidate: 10,
      },
    }),
    fetchData({
      api: `/data-map-with-slug/?slug=${params.slug}`,
      option: {
        revalidate: 10,
      },
    }),
  ])
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
