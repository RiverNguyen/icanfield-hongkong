import fetchDataACF from '@/fetch/fetchDataACF';
import Immigration from '@/pages/immigration';

export default async function page({ params }: { params: { slug: string } }) {
    const [dataAcf] = await Promise.all([
        fetchDataACF({
            api: '/nation?slug='+ params?.slug +'&acf_format=standard',
            option: {
                revalidate: 10,
            },
        }),
    ])
    return <Immigration dataImmigration={dataAcf[0]} />
}