import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import Immigration from '@/pages/immigration'
import endpoints from '@/utils/endpoints'

export default async function page({ params }: { params: { slug: string } }) {
  const requestAcf = {
    api:
      '/' +
      endpoints.taxonomiesSettlement +
      '?slug=' +
      params?.slug +
      '&acf_format=standard',
    option: {
      revalidate: 10,
    },
  }
  const requestPrograms = {
    api:
      endpoints.settlementPrograms +
      '?page=1&per_page=8&order=asc&' +
      endpoints.taxonomiesSettlement +
      '=' +
      params?.slug,
    option: {
      revalidate: 10,
    },
  }
  const requestRelate = {
    api: '/posts-by-taxonomy?slug=' + params?.slug,
    option: {
      revalidate: 10,
    },
  }
  const [dataAcf, dataPrograms, postRelate] = await Promise.all([
    fetchDataACF(requestAcf),
    fetchData(requestPrograms),
    fetchData(requestRelate),
  ])
  return (
    <Immigration
      slug={params?.slug}
      dataImmigration={dataAcf[0]}
      dataPrograms={dataPrograms}
      postRelate={postRelate}
    />
  )
}
