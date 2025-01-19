import fetchData from '@/fetch/fetchData'
import AustralianRealEstate from '@/pages/australianrealestate'
import fetchDataACF from '@/fetch/fetchDataACF'
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
  const [dataTaxonomies, dataAcf, dataListPost] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchDataACF({
      api: '/pages/938?acf_format=standard',
      option: {
        revalidate: 10,
      },
    }),
    fetchData(requestPosts),
  ])
  return (
    <AustralianRealEstate
      dataNationSettlement={dataTaxonomies?.nation}
      dataAcf={dataAcf?.acf}
      dataListPost={dataListPost}
    />
  )
}
