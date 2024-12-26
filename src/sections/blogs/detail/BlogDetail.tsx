import AsideDetail from '@/sections/blogs/detail/AsideDetail'
import ContentDetail from '@/sections/blogs/detail/ContentDetail'

export default function BlogDetail() {
  return (
    <section className='mb-[6.31rem] mt-[5rem] flex space-x-[3.75rem] section-container pt-[7rem]'>
      <AsideDetail />
      <ContentDetail />
    </section>
  )
}
