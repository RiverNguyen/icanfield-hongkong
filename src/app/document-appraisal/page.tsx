import fetchData from "@/fetch/fetchData";
import fetchDataACF from "@/fetch/fetchDataACF";
import DocumentAppraisal from "@/pages/documentappraisal";

export default async function page() {
    const requestPage = {
        api: '/pages/678?acf_format=standard',
        option: {
            revalidate: 10,
        },
    }
    const requestTaxonomies = {
        api: '/taxonomies-settlement',
        option: {
            revalidate: 10,
        },
    }
    const [dataAcf, dataTaxonomies] = await Promise.all([
        fetchDataACF(requestPage),
        fetchData(requestTaxonomies)
    ])
    return (
        <DocumentAppraisal
            dataTaxonomies={dataTaxonomies}
            data={dataAcf?.acf}
        />
    )
}
