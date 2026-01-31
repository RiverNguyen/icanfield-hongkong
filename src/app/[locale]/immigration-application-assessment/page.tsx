import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import DocumentAppraisal from '@/views/documentappraisal'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/678')
  return metadataValues(res)
}
export default async function page() {
  const requestPage = {
    api: '/pages/678?acf_format=standard',
    option: {
      revalidate: 10,
    },
  }
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const [dataAcf, dataTaxonomies] = await Promise.all([
    fetchDataACF(requestPage),
    fetchData(requestTaxonomies),
  ])
  return (
    <DocumentAppraisal
      dataTaxonomies={dataTaxonomies}
      data={dataAcf?.acf}
    />
  )
}
