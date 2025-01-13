import { BannerStatic } from '@/components/banner-static'
import { Breadcrumb } from '@/components/breadcrumb'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import { FeaturedNews } from '@/sections/blogs/featured-news'
import ListBlogs from '@/sections/blogs/list-blogs'
import { ApiAcfPage, ApiResponse, Category } from '@/types/blogs.interface'
import { FC, Suspense } from 'react'
interface IPageBlogsProps {
  dataPosts: ApiResponse
  dataCategories: Category[]
  dataPage: ApiAcfPage
}

// INIT DATA
const categoryItemAll = {id: 0, name: 'Tất cả', slug: 'all', taxonomy: 'all'}

const PageBlogs: FC<IPageBlogsProps> = ({dataPosts, dataCategories, dataPage}) => {
  let dataCategoriesWithAll
  let dataBanner
  let datafeatured
  if (
    dataCategories &&
    Array.isArray(dataCategories) &&
    dataCategories.length
  ) {
    dataCategoriesWithAll = [categoryItemAll, ...dataCategories]
  } else {
    dataCategoriesWithAll = [categoryItemAll]
  }
  dataBanner = {
    titleTop: dataPage?.banner_blogs_page?.title_line_1,
    titleBottom: dataPage?.banner_blogs_page?.title_line_2,
    description: dataPage?.banner_blogs_page?.description,
    backgroundImage: dataPage?.banner_blogs_page?.background,
  }
  datafeatured = {
    title: dataPage?.featured_news?.title,
    items: dataPage?.featured_news_blogs_page
  }
  return (
    <>
      <BannerStatic {...dataBanner}>
        <Breadcrumb
          items={[
            {label: 'Trang chủ', href: '/'},
            {label: 'Tin Tức', href: '/blogs'},
          ]}
        />
      </BannerStatic>
      <FeaturedNews {...datafeatured} />
      <Suspense fallback={<div>Loading...</div>}>
        <ListBlogs
          dataPosts={dataPosts}
          dataCategories={dataCategoriesWithAll}
        />
      </Suspense>
      <WrapperConnectUs />
    </>
  )
}

export default PageBlogs
