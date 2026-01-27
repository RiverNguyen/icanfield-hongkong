import fetchDataACF from '@/fetch/fetchDataACF'
import IndexAboutUs from '@/pages/about-us/IndexAboutUs'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/utils/endpoints'

interface PageProps {
	params: {
		locale: 'zh' | 'zh-cn' | 'en'
	}
}

export async function generateMetadata({ params }: PageProps) {
	const { locale } = params
	const res = await getMetadata(endpoints.aboutUs.metadata[locale])
	return metadataValues(res)
}


const page = async ({ params }: PageProps) => {
	const { locale } = params

	const [dataAcf] = await Promise.all([
		fetchDataACF({
			api: endpoints.aboutUs.page[locale],
			option: {
				next: { revalidate: 10 },
			},
		}),
	])
	return <IndexAboutUs dataAcf={dataAcf?.acf} />
}

export default page
