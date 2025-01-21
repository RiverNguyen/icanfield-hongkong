import IndexPassport from '@/pages/passport/IndexPassport'
import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/1632')
  return metadataValues(res)
}
const Page = async () => {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const [dataTaxonomies, dataAcf] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchDataACF({
      api: '/pages/1632?_fields=acf&acf_format=standard',
      option: {
        revalidate: 10,
      },
    }),
  ])
  return (
    <IndexPassport
      dataAcf={dataAcf.acf}
      dataNationSettlement={dataTaxonomies?.nation}
    />
  )
}

export default Page
