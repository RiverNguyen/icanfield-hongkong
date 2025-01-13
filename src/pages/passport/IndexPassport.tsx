import WrapperAside from '@/sections/passport/research/WrapperAside'
import dynamic from 'next/dynamic'
const MapPassport = dynamic(
  () => import('@/sections/passport/research/MapPassport'),
  {ssr: false},
)

const IndexPassport = () => {
  return (
    <div className='mt-[10rem] flex w-full items-center rounded-[2.5rem_2.5rem_0_0] bg-[#F6F6F4] sm:h-screen xsm:mt-[5rem] xsm:h-fit'>
      <div className='relative flex w-full section-container sm:h-[38.9rem] sm:space-x-[1.5rem] xsm:h-fit xsm:flex-col'>
        <WrapperAside />
        <div className='flex-1 overflow-hidden sm:rounded-[1.5rem] sm:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:absolute xsm:left-0 xsm:top-[14.1875rem] xsm:h-[16.125rem] xsm:min-h-[16.125rem] xsm:w-full xsm:px-[1rem]'>
          <MapPassport />
        </div>
      </div>
    </div>
  )
}

export default IndexPassport
