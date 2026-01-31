import fetchData from '@/fetch/fetchData'
import SearchResult from '@/sections/searchResult'
import endpoints from '@/utils/endpoints'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

export default async function page({
	params,
}: {
	params: Promise<{ locale: 'zh' | 'zh-cn' | 'en' }>
}) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Common' })
	const FilterBanner = {
		api: `${endpoints.filter}?lang=${locale}`,
		option: {
			next: { revalidate: 10 },
		},
	}

	try {
		const [dataFilter] = await Promise.all([fetchData(FilterBanner)])
		return (
			<Suspense>
				<SearchResult dataFilter={dataFilter?.data} />
			</Suspense>
		)
	} catch (error) {
		console.error('Error fetching data:', error)
		return <div>{t('loi_tai_trang')}</div>
	}
}
