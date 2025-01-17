import fetchData from '@/fetch/fetchData'
import FormConnectUsV2 from '@/sections/blogs/connect-us/FormConnectUsV2'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import BannerBottom from '@/sections/contact/banner-bottom'
import BannerTop from '@/sections/contact/banner-top'
import { bannerTopProps } from '@/sections/contact/banner-top/constants'
import ContactInfo from '@/sections/contact/contact-info'
import { contactInfoProps } from '@/sections/contact/contact-info/constants'

const page = async () => {
  const requestTaxonomies = {
    api: '/taxonomies-settlement',
    option: {
        revalidate: 10,
    },
  }
  const [dataTaxonomies] = await Promise.all([
    fetchData(requestTaxonomies)
  ])
  return (
    <div className='pt-[3.75rem] sm:pt-[6.44rem]'>
      <BannerTop {...bannerTopProps} />
      <WrapperConnectUs>
        <FormConnectUsV2 dataTaxonomies={dataTaxonomies?.nation} />
      </WrapperConnectUs>
      <ContactInfo {...contactInfoProps} />
      <BannerBottom />
    </div>
  )
}

export default page
