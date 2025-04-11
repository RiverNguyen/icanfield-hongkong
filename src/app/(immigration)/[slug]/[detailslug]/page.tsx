import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import DetailSettlementPrograms from '@/pages/detail-settlement-programs'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'

export async function generateStaticParams() {
  // Gọi API để lấy tất cả các slug của các tour
  const tours = await fetchData({
    api: '/slugs?post_type=settlement-program',
  })
  // Trả về các tham số tĩnh
  return tours?.map((tour: {slug: string; nation?: string[]}) => ({
    slug: tour?.slug,
  }))
}
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
      `/settlement-program?slug=${encodeURIComponent(params.detailslug)}`,
    )

    // Kiểm tra dữ liệu trả về
    if (!res || !Array.isArray(res) || res.length === 0 || !res[0]) {
      console.error('No valid metadata found for slug:', params.detailslug)
      return {}
    }
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
  params: {slug: string; detailslug: string}
}) {
  try {
    const fetchProgramData = fetchData({
      api:
        endpoints.settlementPrograms + `/${params.slug}/${params.detailslug}`,
      option: {
        next: {revalidate: 10},
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
        next: {revalidate: 10},
      },
    })
    const requestTaxonomies = {
      api: '/taxonomies-settlement',
      option: {
        next: {revalidate: 10},
      },
    }
    const [programResponse, dataAcfNation, dataTaxonomies] = await Promise.all([
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
