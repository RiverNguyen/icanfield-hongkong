import fetchData from '@/fetch/fetchData'
import IndexDetailBlog from '@/pages/detail-blog'

export default async function page({params}: {params: {slug: string}}) {
  const [data] = await Promise.all([fetchData({api: '/blogs/' + params.slug})])
  return <IndexDetailBlog dataDetailBlog={data} />
}
