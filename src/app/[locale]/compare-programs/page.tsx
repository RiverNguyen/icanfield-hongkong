import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import IndexComparePrograms from '@/pages/compare-programs/IndexComparePrograms'
import endpoints from '@/utils/endpoints'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({
	params,
}: {
	params: { locale: 'zh' | 'zh-cn' | 'en' }
}) {
	const { locale } = await params
	const res = await getMetadata(endpoints.compareProgramsPage.page[locale])
	return metadataValues(res)
}
export default async function page({
	params,
}: {
	params: { locale: 'zh' | 'zh-cn' | 'en' }
}) {
	const { locale } = await params
	const requestTaxonomies = {
		api: '/taxonomies-settlement',
		option: {
			next: { revalidate: 10 },
		},
	}
	const requestPage = {
		api: endpoints?.compareProgramsPage.page[locale] + '?acf_format=standard',
		option: {
			next: { revalidate: 10 },
		},
	}
	const requestPrograms = {
		api: endpoints?.comparePrograms.get(locale),
		option: {
			next: { revalidate: 10 },
		},
	}
	const [dataTaxonomies, dataPage, dataPrograms] = await Promise.all([ //eslint-disable-line
		fetchData(requestTaxonomies),
		fetchDataACF(requestPage),
		fetchData(requestPrograms),
	])

	return (
		<IndexComparePrograms
			dataPrograms={dataPrograms}
			dataPage={dataPage?.acf}
		// dataNationSettlement={dataTaxonomies?.nation}
		/>
	)
}
