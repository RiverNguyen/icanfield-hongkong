import fetchData from '@/fetch/fetchData'
import getMetadata from '@/fetch/getMetadata'
import HRDetail from '@/pages/detail-hr'
import metadataValues from '@/utils/metadataValues'
import {notFound} from 'next/navigation'

export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetadata(`/team?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}

export default async function page({params: {slug}}: {params: {slug: string}}) {
  const data = await fetchData({
    api: `/team?slug=${slug}`,
    option: {
      next: {revalidate: 10},
    },
  })

  if (data.code === 'not_found' || !data) {
    return notFound()
  }

  return <HRDetail data={data} />
}
