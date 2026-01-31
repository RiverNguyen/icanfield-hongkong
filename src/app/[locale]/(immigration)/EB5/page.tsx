import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
// import PageEB5 from '@/views/page-EB5'
import { LIMIT_POSTS } from '@/sections/blogs/constant'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import PageEB5 from '@/views/page-EB5'
export async function generateMetadata({
	params,
}: {
	params: { locale: 'zh' | 'zh-cn' | 'en' }
}) {
	const { locale } = await params
	const res = await getMetadata(endpoints.eb5Project.page[locale])
	return metadataValues(res)
}
export default async function page({
	params,
}: {
	params: { locale: 'zh' | 'zh-cn' | 'en' }
}) {
	const { locale } = await params
	try {
		const req = [
			fetchDataACF({
				api: `${endpoints.eb5Project.page[locale]}?_fields=acf&acf_format=standard`,
				option: {
					next: { revalidate: 10 },
				},
			}),
			fetchDataACF({
				api: `${endpoints.eb5Project.categories}&lang=${locale}`,
				option: {
					next: { revalidate: 10 },
				},
			}),
			fetchData({
				api: `${endpoints.eb5Project.list}?page=1&limit=${LIMIT_POSTS}&lang=${locale}`,
				option: {
					next: { revalidate: 10 },
				},
			}),
			fetchData({
				api: `/eb5-location?lang=${locale}`,
				option: {
					next: { revalidate: 10 },
				},
			}),
		]

		const [page, categories, list, dataMap] = await Promise.all(req)
		if (page.status === 404) {
			return <div>{String('error')}</div>
		}

		return (
			<PageEB5
				data={{
					...page?.acf,
					listItems: list,
					categories: categories,
					dataMap: dataMap?.data,
				}}
			/>
		)
	} catch {
		return <div>{String('error')}</div>
	}
}
