import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import PageBlogs from '@/pages/page-blogs'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/68')
  return metadataValues(res)
}
const page = async () => {
  const requestPosts = {
    api: endpoints.blog.list + `?page=1&limit=${LIMIT_POSTS}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const outstandingPosts = {
    api: '/outstanding-post',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestCategories = {
    api: endpoints.categories.list + '?_fields=id,name,slug,taxonomy',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPage = {
    api: '/pages/68?acf_format=standard',
    option: {
      next: {revalidate: 10},
    },
  }
  const [dataPosts, dataCategories, dataPage,outstandingData] = await Promise.all([
    fetchData(requestPosts),
    fetchDataACF(requestCategories),
    fetchDataACF(requestPage),
    fetchData(outstandingPosts),
  ]) 

  return (
    <PageBlogs
      dataPage={dataPage?.acf}
      dataPosts={dataPosts}
      dataCategories={dataCategories}
      outstandingData={outstandingData?.featured_news}
    />
  )
}

export default page
