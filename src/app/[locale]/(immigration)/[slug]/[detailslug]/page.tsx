import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import DetailSettlementPrograms from '@/views/detail-settlement-programs'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'

// ✅ ISR + Dynamic params - an toàn cho build
export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  // ✅ Timeout 5s - tránh treo build
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const tours = await fetchData({
      api: '/slugs?post_type=settlement-program',
      option: {
        signal: controller.signal,
      },
    })

    clearTimeout(timeoutId)

    // ✅ Validate data & limit slug
    if (!Array.isArray(tours)) {
      console.warn('generateStaticParams: API không trả về array')
      return []
    }

    // ✅ Chỉ build 200 page, phần còn lại ISR
    return tours
      .slice(0, 200)
      .map((tour: {slug: string; nation?: string[]}) => ({
        slug: tour?.slug,
      }))
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('generateStaticParams failed:', error)
    // ✅ KHÔNG throw - cứu build
    return []
  }
}
export async function generateMetadata({
  params,
}: {
  params: {slug: string; detailslug: string; locale: string}
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
  params: {slug: string; detailslug: string; locale: string}
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
        '&acf_format=standard&lang=' +
        params.locale,
      option: {
        next: {revalidate: 10},
      },
    })
    const requestTaxonomies = {
      api: endpoints.settlementTaxonomies.get(
        params.locale as 'zh' | 'zh-cn' | 'en',
      ),
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
