'use client'
import MapPassport from '@/sections/passport/research/MapPassport'
import WrapperAside from '@/sections/passport/research/WrapperAside'

const IndexPassport = () => {
  return (
    <div className='mt-[10rem] flex h-screen w-full items-center rounded-[2.5rem_2.5rem_0_0] bg-[#F6F6F4]'>
      <div className='flex h-[38.9rem] w-full space-x-[1.5rem] section-container'>
        <WrapperAside />
        <div className='flex-1 overflow-hidden rounded-[1.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]'>
          <MapPassport />
        </div>
      </div>
    </div>
  )
}

export default IndexPassport
