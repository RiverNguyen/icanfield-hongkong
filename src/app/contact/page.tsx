import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import FormConnectUsV2 from '@/sections/blogs/connect-us/FormConnectUsV2'
import WrapperConnectUsV2 from '@/sections/blogs/connect-us/WrapperConnectUsV2'
import BannerBottom from '@/sections/contact/banner-bottom'
import BannerTop from '@/sections/contact/banner-top'
import ContactInfo from '@/sections/contact/contact-info'

const page = async () => {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
      revalidate: 10,
    },
  }
  const requestPage = {
    api: '/pages/940?acf_format=standard',
    option: {
      revalidate: 10,
    },
  }
  const [dataTaxonomies, dataPage] = await Promise.all([
    fetchData(requestTaxonomies),
    fetchDataACF(requestPage)
  ])
  return (
    <main className='bg-background'>
      <BannerTop {...dataPage?.acf?.banner_contact} />
      <WrapperConnectUsV2>
        <FormConnectUsV2 dataTaxonomies={dataTaxonomies?.nation} />
      </WrapperConnectUsV2>
      <ContactInfo {...dataPage?.acf?.information} />
      <BannerBottom />
    </main>
  )
}

export default page
