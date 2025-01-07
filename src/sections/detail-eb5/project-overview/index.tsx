'use client'
import ImageV2 from '@/components/image/ImageV2'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import useIsMobile from '@/hooks/useIsMobile'
import 'swiper/css'

type InfoItemProps = {
  title: string
  value: string
  image: string
}

const InfoItem = ({image, title, value}: InfoItemProps) => {
  return (
    <div className='relative flex h-[18.75rem] w-full items-end overflow-hidden rounded-2xl border border-white/25 p-2 xsm:h-[11.25rem] xsm:rounded-xl xsm:p-0'>
      <ImageV2
        alt={title}
        src={image}
        width={300}
        height={300}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='z-10 flex w-full flex-row items-center space-x-4 space-y-0 rounded-[0.5rem] border border-black/10 bg-white/65 p-4 shadow-[0px_-1px_20px_0px_rgba(0,0,0,0.04)] backdrop-blur-[20px] xsm:flex-col xsm:items-start xsm:space-x-0 xsm:space-y-2 xsm:p-2'>
        <div className='flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[0.5rem] border border-white/25 bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)] bg-origin-border xsm:h-5 xsm:w-5 xsm:border-none xsm:bg-none'>
          <ImageV2
            alt={title}
            src='/icons/detail-eb5/check.svg'
            width={24}
            height={24}
            className='h-6 w-6 xsm:h-4 xsm:w-4'
          />
        </div>
        <div className='flex-col space-y-1'>
          <p className='sub-14 xsm:sub-12 font-medium tracking-[-0.00875rem] text-greyscaletext-400 xsm:font-normal'>
            {title}
          </p>
          <p className='heading3-s font-semibold text-Phase-1-Brown xsm:text-sm xsm:leading-[1.4] xsm:tracking-[-0.0175rem]'>
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

type ProjectSliderProps = {
  images: string[]
}

const ProjectSlider = ({images}: ProjectSliderProps) => {
  const isMobile = useIsMobile()

  return (
    <div className='relative h-[34.58331rem] w-full xsm:h-[12.5rem]'>
      <Swiper
        slidesOffsetBefore={isMobile ? 16 : 80}
        modules={[Navigation]}
        spaceBetween={isMobile ? 16 : 24}
        slidesPerView='auto'
        navigation={{
          prevEl: '.image-pre',
          nextEl: '.image-next',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className='!h-[34.58331rem] !w-[51.875rem] xsm:!h-[12.5rem] xsm:!w-[18.75rem]'
          >
            <ImageV2
              src={image}
              alt=''
              width={500}
              height={500}
              className='h-full w-full rounded-2xl object-cover xsm:rounded-[0.5rem]'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className='image-pre absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#FEEFD9] xsm:hidden'>
        <ImageV2
          src='/icons/detail-eb5/arrow-left.svg'
          alt='arrow'
          width={24}
          height={24}
        />
      </button>
      <button className='image-next absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#FEEFD9] xsm:hidden'>
        <ImageV2
          src='/icons/detail-eb5/arrow-left.svg'
          alt='arrow'
          width={24}
          height={24}
          className='rotate-180 transform'
        />
      </button>
    </div>
  )
}

export type ProjectOverviewProps = {
  title: string
  description: string
  infoItems: InfoItemProps[]
  images: string[]
}

const ProjectOverview = ({
  title,
  description,
  infoItems,
  images,
}: ProjectOverviewProps) => {
  return (
    <section>
      <div className='section-container relative -mt-[20.25rem] flex flex-col space-y-16 rounded-t-[2rem] bg-[linear-gradient(180deg,#FFF_18.71%,#F6F6F4_100%)] p-16 xsm:-mt-[10rem] xsm:space-y-5 xsm:bg-none xsm:p-4'>
        <div className='grid w-full grid-cols-3 gap-6 xsm:grid-cols-2 xsm:gap-2 xsm:rounded-[1.25rem] xsm:bg-white/75 xsm:p-2 xsm:backdrop-blur-[25px]'>
          {infoItems.map((item, index) => (
            <InfoItem
              key={index}
              {...item}
            />
          ))}
        </div>
        <div className='z-10 flex w-[47.6875rem] flex-col space-y-6 xsm:w-full xsm:space-y-4'>
          <h1 className='heading1 font-optima font-semibold text-Phase-1-Brown'>
            {title}
          </h1>
          <p className='body16 xsm:body-14 text-greyscaletext-body'>
            {description}
          </p>
        </div>
        <ImageV2
          src='/imgs/detail-eb5/bg.webp'
          alt='bg'
          width={1600}
          height={800}
          className='absolute -bottom-10 left-0 w-[100rem] object-cover opacity-80 xsm:hidden'
        />
      </div>
      <ProjectSlider images={images} />
    </section>
  )
}
export default ProjectOverview
