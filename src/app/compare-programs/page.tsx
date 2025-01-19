import IndexComparePrograms from '@/pages/compare-programs/IndexComparePrograms'
import fetchData from '@/fetch/fetchData'

export default async function page() {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }

  const [dataTaxonomies] = await Promise.all([fetchData(requestTaxonomies)])

  return <IndexComparePrograms dataNationSettlement={dataTaxonomies?.nation} />
}
