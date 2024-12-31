import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import {PageBlogs} from '@/pages/page-blogs'
import endpoints from '@/utils/endpoints'

export const LIMIT_POSTS = 9

const page = async () => {
  const requestPosts = {
    api: endpoints.blog.list + `?page=1&limit=${LIMIT_POSTS}`,
    option: {
      revalidate: 600,
    },
  }
  const requestCategories = {
    api: endpoints.categories.list + '?_fields=id,name,slug,taxonomy',
    option: {
      revalidate: 600,
    },
  }
  const [dataPosts, dataCategories] = await Promise.all([
    fetchData(requestPosts),
    fetchDataACF(requestCategories),
  ])
  return (
    <PageBlogs
      dataPosts={dataPosts}
      dataCategories={dataCategories}
    />
  )
}

export default page
