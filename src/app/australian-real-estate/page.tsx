import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import AustralianRealEstate from '@/pages/australianrealestate'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/938')
  return metadataValues(res)
}
export default async function page() {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPosts = {
    api: '/get-post-australia?page=1&limit=9',
    option: {
      next: {revalidate: 10},
    },
  }
  const [dataTaxonomies, dataAcf, dataListPost, postRelate] = await Promise.all(
    [
      fetchData(requestTaxonomies),
      fetchDataACF({
        api: '/pages/938?acf_format=standard',
        option: {
          next: {revalidate: 10},
        },
      }),
      fetchData(requestPosts),
      fetchData({
        api: '/posts-by-taxonomy?slug=australia',
        option: {
          next: {revalidate: 10},
        },
      }),
    ],
  )
  return (
    <AustralianRealEstate
      dataNationSettlement={dataTaxonomies?.nation}
      dataAcf={dataAcf?.acf}
      dataListPost={dataListPost}
      postRelate={postRelate}
    />
  )
}
