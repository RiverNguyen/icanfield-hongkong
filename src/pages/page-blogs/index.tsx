import {BannerStatic} from '@/components/banner-static'
import {Breadcrumb} from '@/components/breadcrumb'
import blogBanner from '@/sections/blogs/banner/constants'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import {FeaturedNews} from '@/sections/blogs/featured-news'
import featuredNews from '@/sections/blogs/featured-news/constants'
import ListBlogs from '@/sections/blogs/list-blogs'
import {ApiResponse, Category} from '@/types/blogs.interface'
import {FC, Suspense} from 'react'
interface IPageBlogsProps {
  dataPosts: ApiResponse
  dataCategories: Category[]
}

// INIT DATA
const categoryItemAll = {id: 0, name: 'Tất cả', slug: 'all', taxonomy: 'all'}

const PageBlogs: FC<IPageBlogsProps> = ({dataPosts, dataCategories}) => {
  return (
    <>
      <BannerStatic {...blogBanner}>
        <Breadcrumb
          items={[
            {label: 'Home', href: '/'},
            {label: 'Blogs', href: '/blogs'},
          ]}
        />
      </BannerStatic>
      <FeaturedNews {...featuredNews} />
      <Suspense fallback={<div>Loading...</div>}>
        <ListBlogs
          dataPosts={dataPosts}
          dataCategories={[categoryItemAll, ...dataCategories]}
        />
      </Suspense>
      <WrapperConnectUs />
    </>
  )
}

export default PageBlogs

export default PageBlogs
