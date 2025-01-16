import fetchDataACF from '@/fetch/fetchDataACF'
import DetailEB5 from '@/pages/detail-EB5'
import {notFound} from 'next/navigation'

export default async function page({
  params: {detailslug},
}: {
  params: {detailslug: string}
}) {
  const [data] = await Promise.all([
    fetchDataACF({
      api: `/eb-5-project?slug=${detailslug}&acf_format=standard`,
      option: {
        revalidate: 10,
      },
    }),
  ])
  if (data?.length <= 0) return notFound()
  return <DetailEB5 data={data?.[0]} />
}
