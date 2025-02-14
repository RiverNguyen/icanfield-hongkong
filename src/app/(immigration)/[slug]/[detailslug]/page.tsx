import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import DetailSettlementPrograms from '@/pages/detail-settlement-programs'
import endpoints from '@/utils/endpoints'
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
export default async function page({
  params,
}: {
  params: {slug: string; detailslug: string}
}) {
  try {
    const fetchProgramData = fetchData({
      api:
        endpoints.settlementPrograms + `/${params.slug}/${params.detailslug}`,
      option: {
        next: { revalidate: 10 }
      },
    })
    const fetchAcfNation = fetchDataACF({
      api:
        '/' +
        endpoints.taxonomiesSettlement +
        '?slug=' +
        params?.slug +
        '&acf_format=standard',
      option: {
        next: { revalidate: 10}
      },
    })
    const requestTaxonomies = {
      api: '/taxonomies-settlement',
      option: {
        next: { revalidate: 10}
      },
    }
    const [programResponse, dataAcfNation,dataTaxonomies] = await Promise.all([
      fetchProgramData,
      fetchAcfNation,
      fetchData(requestTaxonomies),
    ])
    const data = {
      ...programResponse,
      data: {
        ...programResponse.data,
        acfNation: dataAcfNation[0],
        dataTaxonomies: dataTaxonomies?.nation,
      },
    }
    if (data.status === 404) {
      return <div>{String('error')}</div>
    }
    return <DetailSettlementPrograms {...data.data} />
  } catch (error) {
    return <div>{String(error)}</div>
  }
}
