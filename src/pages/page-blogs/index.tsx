import {BannerStatic} from '@/components/banner-static'
import {Breadcrumb} from '@/components/breadcrumb'
import blogBanner from '@/sections/blogs/banner/constants'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import {FeaturedNews} from '@/sections/blogs/featured-news'
import featuredNews from '@/sections/blogs/featured-news/constants'
import ListBlogs from '@/sections/blogs/list-blogs'
import {FC} from 'react'

interface IPageBlogsProps {
  test: string
}

export const PageBlogs: FC<IPageBlogsProps> = ({}) => {
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
      <ListBlogs />
      <WrapperConnectUs />
    </>
  )
}
