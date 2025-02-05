import fetchDataACF from '@/fetch/fetchDataACF'
import DetailEB5 from '@/pages/detail-EB5'
import {notFound} from 'next/navigation'
import fetchData from '@/fetch/fetchData'
import {redirect} from 'next/navigation'
export async function generateStaticParams() {
  // Gọi API để lấy tất cả các slug của các tour
  const tours = await fetchData({
    api: '/slugs?post_type=eb-5-project',
  })
  // Trả về các tham số tĩnh
  return tours?.map((tour: string[]) => ({
    slug: tour,
  }))
}
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
  console.log(data)
  if (!data || !data.length) {
    redirect('/')
  }
  if (data?.length <= 0) return notFound()
  return (
    <DetailEB5
      data={data?.[0]}
      dataReleatedPost={dataReleatedPost?.data}
      dataNationSettlement={dataTaxonomies?.nation}
    />
  )
}
