import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import DetailSettlementPrograms from '@/pages/detail-settlement-programs'
import endpoints from '@/utils/endpoints'

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
        revalidate: 600,
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
        revalidate: 10,
      },
    })
    const requestTaxonomies = {
      api: '/taxonomies-settlement',
      option: {
        revalidate: 10,
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
