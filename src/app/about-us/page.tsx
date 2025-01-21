import fetchDataACF from '@/fetch/fetchDataACF'
import IndexAboutUs from '@/pages/about-us/IndexAboutUs'
import endpoints from '@/utils/endpoints'
import fetchData from '@/fetch/fetchData'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/101')
  return metadataValues(res)
}
const page = async () => {
  const HomepageMap = {
    api: endpoints.homepageMap,
    option: {
      revalidate: 10,
    },
  }
  const [dataAcf, dataMap] = await Promise.all([
    fetchDataACF({
      api: '/pages/101?acf_format=standard',
      option: {
        revalidate: 10,
      },
    }),
    fetchData(HomepageMap),
  ])
  return (
    <IndexAboutUs
      dataAcf={dataAcf?.acf}
      dataMap={dataMap?.data}
    />
  )
}

export default page
