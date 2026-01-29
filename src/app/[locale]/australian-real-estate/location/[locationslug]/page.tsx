import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import AustralianRealEstateClone from '@/views/australianrealestate/indexClone'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata({ params: { locale } }: { params: { locale: 'zh' | 'zh-cn' | 'en' } }) {
	const res = await getMetadata(endpoints.australianRealEstate.page[locale])
	return metadataValues(res)
}
export default async function page({ params: { locale, locationslug } }: { params: { locale: 'zh' | 'zh-cn' | 'en', locationslug: string } }) {
	// console.log(params)
	const requestTaxonomies = {
		api: `/taxonomies-settlement?lang=${locale}`,
		option: {
			next: { revalidate: 10 },
		},
	}
	const requestPosts = {
		api: `/get-post-australia?page=1&limit=9&taxonomies=${locationslug}`,
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
		<AustralianRealEstateClone
			dataNationSettlement={dataTaxonomies?.nation}
			dataAcf={dataAcf?.acf}
			dataListPost={dataListPost}
			postRelate={postRelate}
			dataMap={dataMap?.data}
		/>
	)
}
