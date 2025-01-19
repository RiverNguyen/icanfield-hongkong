import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import IndexComparePrograms from '@/pages/compare-programs/IndexComparePrograms'
import endpoints from '@/utils/endpoints'

export default async function page() {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const requestPage = {
    api: endpoints?.compareProgramsPage + '?acf_format=standard',
    option: {
      revalidate: 10,
    },
  }
  const requestPrograms = {
    api: endpoints?.comparePrograms,
    option: {
      revalidate: 10,
    },
  }
  const [dataTaxonomies, dataPage, dataPrograms] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchDataACF(requestPage),
    fetchData(requestPrograms)
  ])

  return (
    <IndexComparePrograms
      dataPrograms={dataPrograms}
      dataPage={dataPage?.acf}
      dataNationSettlement={dataTaxonomies?.nation}
    />
  )
}
