import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import AustralianRealEstateClone from '@/pages/australianrealestate/indexClone'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/938')
  return metadataValues(res)
}
export default async function page(slug: any) { // eslint-disable-line
  // console.log(slug)
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPosts = {
    api: `/get-post-australia?page=1&limit=9&taxonomies=${slug?.params?.locationslug}` ,// eslint-disable-line,
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
    <AustralianRealEstateClone
      dataNationSettlement={dataTaxonomies?.nation}
      dataAcf={dataAcf?.acf}
      dataListPost={dataListPost}
      postRelate={postRelate}
      dataMap={dataMap?.data}
    />
  )
}
