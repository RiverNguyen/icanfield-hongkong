import fetchDataACF from '@/fetch/fetchDataACF'
import DetailEB5 from '@/views/detail-EB5'
import { notFound } from 'next/navigation'
import fetchData from '@/fetch/fetchData'
import { redirect } from 'next/navigation'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateStaticParams() {
	// Gọi API để lấy tất cả các slug của các tour
	const tours = await fetchData({
		api: '/slugs?post_type=eb-5-project',
	})
	// Trả về các tham số tĩnh
	return tours?.map((tour: string[]) => ({
		slug: tour,
	}))
}
export async function generateMetadata({
	params,
}: {
	params: { slug: string; detailslug: string }
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
	params: { detailslug, locale },
}: {
	params: { detailslug: string, locale: string }
}) {
	const requestTaxonomies = {
		api: `/taxonomies-settlement?lang=${locale}`,
		option: {
			revalidate: 10,
		},
	}
	const [data, dataReleatedPost, dataTaxonomies] = await Promise.all([
		fetchDataACF({
			api: `/eb-5-project?slug=${detailslug}&acf_format=standard&lang=${locale}`,
			option: {
				next: { revalidate: 10 }
			},
		}),
		fetchData({
			api: `/related-posts/?slug=${detailslug}&lang=${locale}`,
			option: {
				next: { revalidate: 10 },
			},
		}),
		fetchData(requestTaxonomies),
	])
	if (!data || !data.length) {
		redirect('/')
	}
	if (data?.length <= 0) return notFound()
	return (
		<DetailEB5
			data={data?.[0]}
			dataReleatedPost={dataReleatedPost?.data}
			dataNationSettlement={dataTaxonomies?.nation}
		/>
	)
}
