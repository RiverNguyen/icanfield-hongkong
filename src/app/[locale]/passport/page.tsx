import IndexPassport from '@/views/passport/IndexPassport'
import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/utils/endpoints'
export async function generateMetadata({
	params,
}: {
	params: { locale: 'zh' | 'zh-cn' | 'en' }
}) {
	const { locale } = await params
	const res = await getMetadata(endpoints.passportPage[locale])
	return metadataValues(res)
}
export default async function Page({
	params,
}: {
	params: { locale: 'zh' | 'zh-cn' | 'en' }
}) {
	const { locale } = await params
	const [dataTaxonomies, dataAcf] = await Promise.all([
		fetchData({
			api: endpoints.settlementTaxonomies.get(locale as 'zh' | 'zh-cn' | 'en'),
			option: {
				next: { revalidate: 10 },
			},
		}),
		fetchDataACF({
			api: endpoints.passportPage[locale] + '?_fields=acf&acf_format=standard',
			option: {
				next: { revalidate: 10 },
			},
		}),
	])
	return (
		<IndexPassport
			dataAcf={dataAcf.acf}
			dataNationSettlement={dataTaxonomies?.nation}
		/>
	)
}
