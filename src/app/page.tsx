import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import HomePage from '@/pages/homepage'
import endpoints from '@/utils/endpoints'

export default async function Home() {
  const homeRequest = {
    api: endpoints.homepage + '?_fields=acf&acf_format=standard',
    option: {
      revalidate: 10,
    },
  }
  const newsRequest = {
    api: endpoints.homeFeatured,
    option: {
      revalidate: 10,
    },
  }

  try {
    const [homeResponse, newsResponse] = await Promise.all([
      fetchDataACF(homeRequest),
      fetchData(newsRequest),
    ])
    return (
      <HomePage
        homeData={homeResponse}
        newsData={newsResponse}
      />
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading page content.</div>
  }
}
