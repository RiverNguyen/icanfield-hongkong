import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadataPage from '@/fetch/getMetadataPage'
import AustralianRealEstate from '@/views/australianrealestate'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({ params: { locale } }: { params: { locale: 'zh' | 'zh-cn' | 'en' } }) {
	try {
		// Gọi API để lấy metadata
		const res = await getMetadataPage(endpoints.australianRealEstate.metadata[locale])
		// console.log(res)
		// Trả về metadata được xử lý
		return metadataValues(res)
	} catch (error) {
		// Xử lý lỗi bất ngờ
		console.error('Error generating metadata:', error)
		return {}
	}
}

export default async function page({ params: { locale } }: { params: { locale: 'zh' | 'zh-cn' | 'en' } }) {
	const requestTaxonomies = {
		api: `/taxonomies-settlement?lang=${locale}`,
		option: {
			next: { revalidate: 10 },
		},
	}
	const requestPosts = {
		api: `/get-post-australia?page=1&limit=9&lang=${locale}`,
		option: {
			next: { revalidate: 10 },
		},
	}
	const [dataTaxonomies, dataAcf, dataListPost, postRelate, dataMap] =
		await Promise.all([
			fetchData(requestTaxonomies),
			fetchDataACF({
				api: endpoints.australianRealEstate.page[locale],
				option: {
					next: { revalidate: 10 },
				},
			}),
			fetchData(requestPosts),
			fetchData({
				api: '/posts-by-taxonomy?slug=australia',
				option: {
					next: { revalidate: 10 },
				},
			}),
			fetchData({
				api: `/australian-location?lang=${locale}`,
				option: {
					next: { revalidate: 10 },
				},
			}),
		])
	return (
		<AustralianRealEstate
			dataNationSettlement={dataTaxonomies?.nation}
			dataAcf={dataAcf?.acf}
			dataListPost={dataListPost}
			postRelate={postRelate}
			dataMap={dataMap?.data}
		/>
	)
}
