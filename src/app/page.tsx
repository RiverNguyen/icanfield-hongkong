import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import HomePage from '@/pages/homepage'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/96')
  return metadataValues(res)
}
export default async function Home() {
  const homeRequest = {
    api: endpoints.homepage + '?_fields=acf&acf_format=standard',
    option: {
      next: {revalidate: 10},
    },
  }
  const newsRequest = {
    api: endpoints.homeFeatured,
    option: {
      next: {revalidate: 10},
    },
  }
  const FilterBanner = {
    api: endpoints.filter,
    option: {
      next: {revalidate: 10},
    },
  }
  const HomepageMap = {
    api: endpoints.homepageMap,
    option: {
      next: {revalidate: 10},
    },
  }
  try {
    const [homeResponse, newsResponse, dataFilter, homepageMap] =
      await Promise.all([
        fetchDataACF(homeRequest),
        fetchData(newsRequest),
        fetchData(FilterBanner),
        fetchData(HomepageMap),
      ])
    return (
      <HomePage
        homeData={homeResponse}
        newsData={newsResponse}
        dataFilter={dataFilter?.data}
        dataMap={homepageMap?.data}
      />
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading page content.</div>
  }
}
