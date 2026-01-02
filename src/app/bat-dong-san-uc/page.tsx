import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadataPage from '@/fetch/getMetadataPage'
import AustralianRealEstate from '@/pages/australianrealestate'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  try {
    // Gọi API để lấy metadata
    const res = await getMetadataPage('/pages/938')
    // console.log(res)
    // Trả về metadata được xử lý
    return metadataValues(res)
  } catch (error) {
    // Xử lý lỗi bất ngờ
    console.error('Error generating metadata:', error)
    return {}
  }
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
  const [dataTaxonomies, dataAcf, dataListPost, postRelate, dataMap] =
    await Promise.all([
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
      fetchData({
        api: '/australian-location',
        option: {
          next: {revalidate: 10},
        },
      }),
    ])
  return (
    <AustralianRealEstate
      dataNationSettlement={dataTaxonomies?.nation}
      dataAcf={dataAcf?.acf}
      dataListPost={dataListPost}
      postRelate={postRelate}
      dataMap={dataMap?.data}
    />
  )
}
