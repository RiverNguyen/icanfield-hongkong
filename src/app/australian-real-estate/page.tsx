import fetchData from '@/fetch/fetchData'
import AustralianRealEstate from '@/pages/australianrealestate'

export default async function page() {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const requestPosts = {
    api: '/get-post-australia?page=1&limit=9',
    option: {
      revalidate: 10,
    },
  }
  const [dataTaxonomies, dataListPost] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchData(requestPosts),
  ])
  return (
    <AustralianRealEstate
      dataNationSettlement={dataTaxonomies?.nation}
      dataListPost={dataListPost}
    />
  )
}
