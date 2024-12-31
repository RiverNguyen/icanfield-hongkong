import AsideDetail from '@/sections/blogs/detail/AsideDetail'
import ContentDetail from '@/sections/blogs/detail/ContentDetail'

export default function BlogDetail({
  dataContentDetailBlog,
  author,
  title,
  date
}: {
  dataContentDetailBlog: string
  author: string
  title: string
  date: string
}) {
  return (
    <section className='sm:mb-[6.31rem] xsm:pt-[3rem] xsm:pb-[1.5rem] flex xsm:flex-col sm:space-x-[3.75rem] section-container pt-[7rem]'>
      <AsideDetail 
        date={date}
        dataContent={dataContentDetailBlog} 
        title={title}
      />
      <ContentDetail
        author={author}
        title={title}
        dataContent={dataContentDetailBlog}
      />
    </section>
  )
}
