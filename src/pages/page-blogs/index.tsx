import {BannerStatic} from '@/components/banner-static'
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
      <BannerStatic {...blogBanner}></BannerStatic>
      <FeaturedNews {...featuredNews} />
      <ListBlogs />
      <WrapperConnectUs />
    </>
  )
}
