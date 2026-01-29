import { BannerStatic } from '@/components/banner-static'
import { Breadcrumb } from '@/components/breadcrumb'
import BlogDetail from '@/sections/blogs/detail/BlogDetail'
import RelatedArticles from '@/sections/blogs/detail/RelatedArticles'
import { getLocaleSlug } from '@/utils/localeSlug'
import { useLocale, useTranslations } from 'next-intl'

interface dataDetailBlog {
	success: boolean
	data: {
		banner: {
			url: string
			alt: string
		}
		content: string
		title: string
		author: string
		date: string
	}
	relatedPosts: []
}

export default function IndexDetailBlog({
	dataDetailBlog,
}: {
	dataDetailBlog: dataDetailBlog
}) {
	const locale = useLocale()
	const slug = getLocaleSlug(locale)
	const t = useTranslations()
	return (
		<>
			<BannerStatic backgroundImage={dataDetailBlog?.data?.banner}>
				<Breadcrumb
					items={[
						{ label: t('trang_chu'), href: `${slug}` },
						{ label: t('tin_tuc'), href: `${slug}/blogs` },
						{ label: dataDetailBlog?.data?.title, href: '' },
					]}
				/>
			</BannerStatic>
			<BlogDetail
				dataContentDetailBlog={dataDetailBlog?.data?.content}
				author={dataDetailBlog?.data?.author}
				title={dataDetailBlog?.data?.title}
				date={dataDetailBlog?.data?.date}
			/>
			<RelatedArticles dataRelatedPosts={dataDetailBlog?.relatedPosts} />
		</>
	)
}
