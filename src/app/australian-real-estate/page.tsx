import fetchData from '@/fetch/fetchData'
import AustralianRealEstate from '@/pages/australianrealestate'

export default async function page() {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const [dataTaxonomies] = await Promise.all([fetchData(requestTaxonomies)])
  return <AustralianRealEstate dataNationSettlement={dataTaxonomies?.nation} />
}
