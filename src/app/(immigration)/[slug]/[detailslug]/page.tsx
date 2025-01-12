import fetchData from '@/fetch/fetchData';
import DetailSettlementPrograms from '@/pages/detail-settlement-programs';
import endpoints from '@/utils/endpoints';

export default async function page({
  params,
}: {
  params: {slug: string; detailSlug: string}
}) {
  try {
    const fetchProgramData = fetchData({
      api: endpoints.settlementPrograms + `/${params.slug}/${params.detailSlug}`,
      option: {
        revalidate: 600,
      },
    })
    const fetchAcfNation = fetchData({
      api: '/' + endpoints.taxonomiesSettlement + '?slug=' + params?.slug + '&acf_format=standard',
      option: {
          revalidate: 10,
      },
    })
    const [programResponse, dataAcfNation] = await Promise.all([
      fetchProgramData,
      fetchAcfNation
    ])
     const data = {
      ...programResponse,
      acfNation: dataAcfNation[0],
    };

    if (data.status === 404) {
      return <div>{String('error')}</div>
    }
    return <DetailSettlementPrograms {...data} />
  } catch (error) {
    return <div>{String(error)}</div>
  }
}
