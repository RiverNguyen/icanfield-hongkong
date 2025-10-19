import fetchData from '@/fetch/fetchData'
import getMetadata from '@/fetch/getMetadata'
import HRDetail from '@/pages/detail-hr'
import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetadata(`/team?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}

export default async function page({params: {slug}}: {params: {slug: string}}) {
  const data: IDataAcfDetailHR = await fetchData({
    api: `/team?slug=${slug}`,
    option: {
      next: {revalidate: 10},
    },
  })

  return <HRDetail data={data} />
}
