import { BannerStatic } from '@/components/banner-static'
import { Breadcrumb } from '@/components/breadcrumb'
import BlogDetail from '@/sections/blogs/detail/BlogDetail'
import RelatedArticles from '@/sections/blogs/detail/RelatedArticles'

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
  return (
    <>
        <BannerStatic backgroundImage={dataDetailBlog?.data?.banner}>
          <Breadcrumb
            items={[
              {label: 'Trang chủ', href: '/'},
              {label: 'Tin Tức', href: '/blogs'},
              {label: dataDetailBlog?.data?.title, href: ''},
            ]}
          />
        </BannerStatic>
      <BlogDetail
        dataContentDetailBlog={dataDetailBlog?.data?.content}
        author={dataDetailBlog?.data?.author}
        title={dataDetailBlog?.data?.title}
        date={dataDetailBlog?.data?.date}
      />
      <RelatedArticles dataRelatedPosts={dataDetailBlog?.relatedPosts}/>
    </>
  )
}
