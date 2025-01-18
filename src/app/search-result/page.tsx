import fetchData from '@/fetch/fetchData'
import SearchResult from '@/sections/searchResult'
import endpoints from '@/utils/endpoints'

export default async function page() {
  const FilterBanner = {
    api: endpoints.filter,
    option: {
      revalidate: 10,
    },
  }

  try {
    const [dataFilter] = await Promise.all([fetchData(FilterBanner)])
    return <SearchResult dataFilter={dataFilter?.data} />
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading page content.</div>
  }
}
