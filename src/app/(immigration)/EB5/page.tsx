import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import PageEB5 from '@/pages/page-EB5'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/521')
  return metadataValues(res)
}
export default async function page() {
  try {
    const req = [
      fetchDataACF({
        api: endpoints.eb5Project.page,
        option: {
          next: {revalidate: 10},
        },
      }),
      fetchDataACF({
        api: endpoints.eb5Project.categories,
        option: {
          next: {revalidate: 10},
        },
      }),
      fetchData({
        api: endpoints.eb5Project.list + `?page=1&limit=${LIMIT_POSTS}`,
        option: {
          next: {revalidate: 10},
        },
      }),
    ]

    const [page, categories, list] = await Promise.all(req)
    if (page.status === 404) {
      return <div>{String('error')}</div>
    }
    return (
      <PageEB5 data={{...page?.acf, listItems: list, categories: categories}} />
    )
  } catch {
    return <div>{String('error')}</div>
  }
}
