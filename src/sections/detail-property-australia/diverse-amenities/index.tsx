'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {IDataAcfDetailAustralia} from '@/types/dataAcfDetailAustralia.interface'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

const Slider = ({
  items,
}: {
  items: IDataAcfDetailAustralia['acf']['diverse_amenities']['slide_room']
}) => {
  const isMobile = useIsMobile()
  return (
    <div className='relative h-[17.5rem] w-full xsm:h-[8.78994rem]'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={18}
        slidesPerView={isMobile ? 'auto' : 2.4}
        navigation={{
          prevEl: '.image-pre',
          nextEl: '.image-next',
        }}
        className='!w-full !h-full'
      >
        {Array.isArray(items) &&
          items.map((item, index) => (
            <SwiperSlide
              key={index}
              className='relative xsm:!w-[11.63856rem]'
            >
              <ImageV2
                src={item.image_room?.url}
                alt={item.image_room?.alt || item.name_room}
                width={1000}
                height={1000}
                className='h-full w-full rounded-2xl object-cover xsm:rounded-[0.5rem]'
              />
              <p className='absolute bottom-[0.625rem] right-[0.625rem] rounded-[0.5rem] bg-black/60 px-[0.6875rem] py-2 text-white backdrop-blur-[8px] sub-12 xsm:bottom-[0.4rem] xsm:right-[0.4rem] xsm:rounded-[0.32556rem] xsm:px-[0.44763rem] xsm:py-[0.32556rem] xsm:backdrop-blur-[5px]'>
                {item.name_room}
              </p>
            </SwiperSlide>
          ))}
      </Swiper>
      <button className='image-pre absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#FEEFD9] xsm:hidden'>
        <ImageV2
          src='/icons/detail-eb5/arrow-left.svg'
          alt='arrow'
          width={50}
          height={50}
          className='h-6 w-6 object-cover'
        />
      </button>
      <button className='image-next absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#FEEFD9] xsm:hidden'>
        <ImageV2
          src='/icons/detail-eb5/arrow-left.svg'
          alt='arrow'
          width={50}
          height={50}
          className='h-6 w-6 rotate-180 transform object-cover'
        />
      </button>
    </div>
  )
}

const DiverseAmenities = ({
  description,
  utilities,
  slide_room,
}: IDataAcfDetailAustralia['acf']['diverse_amenities']) => {
  return (
    <div className='space-y-[1.5625rem] rounded-[1.25rem] bg-white p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-6 xsm:p-0 xsm:shadow-none'>
      <h2 className='font-optima font-medium text-Phase-1-Brown heading3 xsm:text-xl xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
        Tiện ích đa dạng
      </h2>
      <p className='text-greyscaletext-400 body16-r55 xsm:body-14'>
        {description}
      </p>
      <div className='space-y-3 rounded-2xl bg-[#FAFAFA] p-4'>
        <h3 className='text-textgreybody body16-s'>Tiện ích</h3>
        <div className='h-[1px] w-full bg-[#EDEDED]' />
        <div className='grid grid-cols-4 gap-[0.625rem] xsm:grid-cols-2'>
          {Array.isArray(utilities) &&
            utilities.map((item, index) => (
              <div
                key={index}
                className='flex items-start space-x-2'
              >
                <ImageV2
                  src='/icons/detail-property/check2.svg'
                  alt=''
                  width={50}
                  height={50}
                  className='h-5 w-5 object-cover'
                />
                <p className='tracking-[-0.0175rem] body-14-m xsm:sub-12-m'>
                  {item.item}
                </p>
              </div>
            ))}
        </div>
      </div>
      <Slider items={slide_room} />
    </div>
  )
}

export default DiverseAmenities
