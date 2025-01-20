import ImageV2 from '@/components/image/ImageV2'

const BannerBottom = () => {
  return (
    <div className='relative z-10 mt-[8rem] h-[47.125rem] w-full xsm:mt-8 xsm:h-[12.45081rem]'>
      <div className='absolute bottom-0 left-0 right-0 top-0 h-[49.375rem] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_27.28%,rgba(0,0,0,0.45)_100%)] xsm:top-auto xsm:h-[10.5625rem]' />
      <ImageV2
        src='/imgs/contact/sky.webp'
        alt=''
        width={3000}
        height={2000}
        className='absolute left-0 right-0 top-16 h-[44.3125rem] w-full object-cover xsm:top-10 xsm:h-[10.48413rem]'
      />
      <ImageV2
        src='/imgs/contact/sydney2v2.jpg'
        alt=''
        width={3000}
        height={2000}
        className='absolute -top-[11.25rem] left-0 right-0 h-[60.625rem] w-full object-cover xsm:-top-[0.8125rem] xsm:h-[14.34356rem]'
      />
      <ImageV2
        src='/imgs/contact/icanfield.webp'
        alt=''
        width={3000}
        height={2000}
        className='absolute -top-12 left-1/2 h-[26.17594rem] w-[95.54056rem] -translate-x-1/2 transform object-cover xsm:top-4 xsm:h-[6.19306rem] xsm:w-[22.60444rem]'
      />
      <ImageV2
        src='/imgs/contact/sydneyv2.png'
        alt=''
        width={3000}
        height={2000}
        className='absolute -top-[11.25rem] left-0 right-0 z-10 h-[60.625rem] w-full object-cover xsm:-top-[0.8125rem] xsm:h-[14.34356rem]'
      />
    </div>
  )
}
export default BannerBottom
