import {BannerStatic} from '@/components/banner-static'
import blogBanner from '@/sections/blogs/banner/constants'
import {FC} from 'react'

interface IPageBlogsProps {}

export const PageBlogs: FC<IPageBlogsProps> = ({}) => {
  return (
    <>
      <BannerStatic {...blogBanner}></BannerStatic>
    </>
  )
}
