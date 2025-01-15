import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import PageEB5 from '@/pages/page-EB5'
import endpoints from '@/utils/endpoints'

export default async function page() {
  try {
    const req = [
      fetchDataACF({
        api: endpoints.eb5Project.page,
        option: {
          revalidate: 10,
        },
      }),
      fetchDataACF({
        api: endpoints.eb5Project.categories,
        option: {
          revalidate: 10,
        },
      }),
      fetchData({
        api: endpoints.eb5Project.list,
        option: {
          revalidate: 10,
        },
      }),
    ]

    const [page, categories, list] = await Promise.all(req)
    console.log(list)
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
