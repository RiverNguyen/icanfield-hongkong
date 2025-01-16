import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import Immigration from '@/pages/immigration'
import endpoints from '@/utils/endpoints'

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
