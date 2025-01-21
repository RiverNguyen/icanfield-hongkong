import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import IndexAboutUs from '@/pages/about-us/IndexAboutUs'
import endpoints from '@/utils/endpoints'
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
    />
  )
}

export default page
