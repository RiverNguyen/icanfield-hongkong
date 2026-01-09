import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import IndexComparePrograms from '@/pages/compare-programs/IndexComparePrograms'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
export async function generateMetadata() {
  const res = await getMetadata('/pages/1621')
  return metadataValues(res)
}
export default async function page() {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPage = {
    api: endpoints?.compareProgramsPage + '?acf_format=standard',
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPrograms = {
    api: endpoints?.comparePrograms,
    option: {
      next: {revalidate: 10},
    },
  }
  const [dataTaxonomies, dataPage, dataPrograms] = await Promise.all([ //eslint-disable-line
    fetchData(requestTaxonomies),
    fetchDataACF(requestPage),
    fetchData(requestPrograms),
  ])

  return (
    <IndexComparePrograms
      dataPrograms={dataPrograms}
      dataPage={dataPage?.acf}
      // dataNationSettlement={dataTaxonomies?.nation}
    />
  )
}
