import fetchDataACF from '@/fetch/fetchDataACF'
import DetailEB5 from '@/pages/detail-EB5'
import {notFound} from 'next/navigation'
import fetchData from '@/fetch/fetchData'
export default async function page({
  params: {detailslug},
}: {
  params: {detailslug: string}
}) {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const [data, dataReleatedPost, dataTaxonomies] = await Promise.all([
    fetchDataACF({
      api: `/eb-5-project?slug=${detailslug}&acf_format=standard`,
      option: {
        revalidate: 10,
      },
    }),
    fetchData({
      api: `/related-posts/?slug=${detailslug}`,
      option: {
        revalidate: 600,
      },
    }),
    fetchData(requestTaxonomies),
  ])
  if (data?.length <= 0) return notFound()
  return (
    <DetailEB5
      data={data?.[0]}
      dataReleatedPost={dataReleatedPost?.data}
      dataNationSettlement={dataTaxonomies?.nation}
    />
  )
}
