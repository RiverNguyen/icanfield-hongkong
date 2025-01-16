import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import PageBlogs from '@/pages/page-blogs'
import { LIMIT_POSTS } from '@/sections/blogs/constant'
import endpoints from '@/utils/endpoints'
const page = async () => {
  const requestPosts = {
    api: endpoints.blog.list + `?page=1&limit=${LIMIT_POSTS}`,
    option: {
      revalidate: 10,
    },
  }
  const requestCategories = {
    api: endpoints.categories.list + '?_fields=id,name,slug,taxonomy',
    option: {
      revalidate: 10,
    },
  }
  const requestPage = {
    api: '/pages/68?acf_format=standard',
    option: {
      revalidate: 10,
    },
  }
  const [dataPosts, dataCategories, dataPage] = await Promise.all([
    fetchData(requestPosts),
    fetchDataACF(requestCategories),
    fetchDataACF(requestPage),
  ])
  return (
    <PageBlogs
      dataPage={dataPage?.acf}
      dataPosts={dataPosts}
      dataCategories={dataCategories}
    />
  )
}

export default page
