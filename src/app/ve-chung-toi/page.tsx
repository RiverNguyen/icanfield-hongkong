import fetchDataACF from '@/fetch/fetchDataACF'
import IndexAboutUs from '@/pages/about-us/IndexAboutUs'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/101')
  console.log(res)
  return metadataValues(res)
}
const page = async () => {
  const [dataAcf] = await Promise.all([
    fetchDataACF({
      api: '/pages/101?acf_format=standard',
      option: {
        next: { revalidate: 10}
      },
    }),
  ])
  return (
    <IndexAboutUs
      dataAcf={dataAcf?.acf}
    />
  )
}

export default page
