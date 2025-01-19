import WrapperAside from '@/sections/passport/research/WrapperAside'
import dynamic from 'next/dynamic'
const MapPassport = dynamic(
  () => import('@/sections/passport/research/MapPassport'),
  {ssr: false},
)
import ContactV2 from '@/components/ContactV2/ContactV2'
import FormInternationalJourney from '@/components/ContactV2/FormInternationalJourney'
import {Suspense} from 'react'
import {Term} from '@/sections/homepage/banner/bannerHp.interface'
import {Breadcrumb} from '@/components/breadcrumb'
import {
  Banner,
  IBannerProps,
} from '@/sections/detail-settlement-programs/banner'
const IndexPassport = ({
  dataAcf,
  dataNationSettlement,
}: {
  dataAcf: {
    clone_banner: IBannerProps
  }
  dataNationSettlement: Term[]
}) => {
  // console.log(dataAcf)
  return (
    <main className='bg-background'>
      <Banner
        {...dataAcf?.clone_banner}
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)86.12%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
      >
        <Breadcrumb
          items={[
            {label: 'Home', href: '/'},
            {label: 'Dự án EB-5', href: '/EB5'},
          ]}
        />
      </Banner>
      <div className=' flex w-full items-center rounded-[2.5rem_2.5rem_0_0] sm:pt-[5rem] bg-[#F6F6F4] sm:h-fit xsm:mt-0  xsm:h-fit z-[21] relative'>
        <div className='relative flex w-full section-container sm:h-[38.9rem] sm:space-x-[1.5rem] xsm:h-fit xsm:flex-col xsm:-translate-y-[2rem]'>
          <Suspense>
            {' '}
            <WrapperAside />
          </Suspense>
          <div className='flex-1 overflow-hidden sm:rounded-[1.5rem] sm:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:absolute xsm:left-0 xsm:top-[14.1875rem] xsm:h-[16.125rem] xsm:min-h-[16.125rem] xsm:w-full xsm:px-[1rem]'>
            <MapPassport />
          </div>
        </div>
      </div>
      <ContactV2>
        <FormInternationalJourney dataNationSettlement={dataNationSettlement} />
      </ContactV2>
    </main>
  )
}

export default IndexPassport
