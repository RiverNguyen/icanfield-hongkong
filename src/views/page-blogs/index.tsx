import { BannerStatic } from '@/components/banner-static'
import { Breadcrumb } from '@/components/breadcrumb'
import FormConnectUs from '@/sections/blogs/connect-us/FormConnectUs'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import { FeaturedNews } from '@/sections/blogs/featured-news'
import ListBlogs from '@/sections/blogs/list-blogs'
import {
	ApiAcfPage,
	ApiResponse,
	Category,
	IFeaturedNewsItem,
} from '@/types/blogs.interface'
import { useTranslations } from 'next-intl'
import { FC, Suspense } from 'react'
interface IPageBlogsProps {
	dataPosts: ApiResponse
	dataCategories: Category[]
	dataPage: ApiAcfPage
	outstandingData: {
		title: string
		items: IFeaturedNewsItem[]
	}
}

// INIT DATA

const PageBlogs: FC<IPageBlogsProps> = ({
	dataPosts,
	dataCategories,
	dataPage,
	outstandingData,
}) => {
	const t = useTranslations()
	const BREADCRUMB = [
		{ label: t('trang_chu'), href: t('trang_chu_breadcrumb') },
		{ label: t('tin_tuc'), href: t('tin_tuc_breadcrumb') },
	]
	const categoryItemAll = {
		id: 0,
		name: t('tat_ca'),
		slug: 'all',
		taxonomy: 'all',
	}

	let dataCategoriesWithAll
	if (
		dataCategories &&
		Array.isArray(dataCategories) &&
		dataCategories.length
	) {
		dataCategoriesWithAll = [categoryItemAll, ...dataCategories]
	} else {
		dataCategoriesWithAll = [categoryItemAll]
	}
	const dataBanner = {
		titleTop: dataPage?.banner_blogs_page?.title_line_1,
		titleBottom: dataPage?.banner_blogs_page?.title_line_2,
		description: dataPage?.banner_blogs_page?.description,
		backgroundImage: dataPage?.banner_blogs_page?.background,
	}
	// const datafeatured = {
	//   title: dataPage?.featured_news?.title,
	//   items: dataPage?.featured_news?.featured_news_blogs_page
	// }

	return (
		<>
			<BannerStatic {...dataBanner}>
				<Breadcrumb items={BREADCRUMB} />
			</BannerStatic>
			<FeaturedNews {...outstandingData} />
			<Suspense fallback={<div>{t('dang_tai')}</div>}>
				<ListBlogs
					dataPosts={dataPosts}
					dataCategories={dataCategoriesWithAll}
				/>
			</Suspense>
			<WrapperConnectUs data={dataPage?.quote_blogs_page}>
				<FormConnectUs />
			</WrapperConnectUs>
		</>
	)
}

export default PageBlogs
