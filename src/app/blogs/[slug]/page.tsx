
import IndexDetailBlog from '@/pages/detail-blog'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import fetchData from '@/fetch/fetchData'
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await getMetadata(`/posts?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}
export async function generateStaticParams() {
  // Gọi API để lấy tất cả các slug của các tour
  const tours = await fetchData({
    api: '/slugs?post_type=post',
  })
  // Trả về các tham số tĩnh
  return tours?.map((tour: string[]) => ({
    slug: tour,
  }))
}
export default async function page({params}: {params: {slug: string}}) {
  const [data] = await Promise.all([
    fetchData({
      api: '/blogs/' + params.slug,
      option: {
        next: { revalidate: 10}
      },
    })
  ])
  return <IndexDetailBlog dataDetailBlog={data} />
}
