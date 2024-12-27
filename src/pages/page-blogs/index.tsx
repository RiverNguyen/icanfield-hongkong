import {BannerStatic} from '@/components/banner-static'
import blogBanner from '@/sections/blogs/banner/constants'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import ListBlogs from '@/sections/blogs/list-blogs'
import {FC} from 'react'

interface IPageBlogsProps {}

export const PageBlogs: FC<IPageBlogsProps> = ({}) => {
  return (
    <>
      <BannerStatic {...blogBanner}></BannerStatic>
      <ListBlogs />
      <WrapperConnectUs />
    </>
  )
}
