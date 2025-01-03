'use client'
import ImageV2 from '@/components/image/ImageV2'
import {
  imageSlides,
  info,
} from '@/sections/detail-eb5/project-overview/constants'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'

type InfoItemProps = {
  title: string
  value: string
  image: string
}

const InfoItem = ({image, title, value}: InfoItemProps) => {
  return (
    <div className='relative flex h-[18.75rem] w-full items-end overflow-hidden rounded-2xl border border-white/25 p-2'>
      <ImageV2
        alt={title}
        src={image}
        width={300}
        height={300}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='z-10 flex w-full items-center space-x-4 rounded-[0.5rem] border border-black/10 bg-white/65 p-4 shadow-[0px_-1px_20px_0px_rgba(0,0,0,0.04)] backdrop-blur-[20px]'>
        <div className='flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[0.5rem] border border-white/25 bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)]'>
          <ImageV2
            alt={title}
            src='/icons/detail-eb5/check.svg'
            width={24}
            height={24}
          />
        </div>
        <div className='flex flex-col space-y-1'>
          <div className='sub-14 font-medium text-greyscaletext-400'>
            {value}
          </div>
          <div className='heading3-s text font-semibold text-Phase-1-Brown'>
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

type ProjectSliderProps = {
  images: string[]
}

const ProjectSlider = ({images}: ProjectSliderProps) => {
  return (
    <div className='relative h-[34.58331rem] w-full'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView='auto'
        navigation={{
          prevEl: '.image-pre',
          nextEl: '.image-next',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className='!h-[34.58331rem] !w-[51.875rem]'
          >
            <ImageV2
              src={image}
              alt=''
              width={500}
              height={500}
              className='h-[34.58331rem] w-[51.875rem] rounded-2xl object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='image-pre absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#FEEFD9]'>
        <ImageV2
          src='/icons/detail-eb5/arrow-left.svg'
          alt='arrow'
          width={24}
          height={24}
        />
      </div>
      <div className='image-next absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#FEEFD9]'>
        <ImageV2
          src='/icons/detail-eb5/arrow-left.svg'
          alt='arrow'
          width={24}
          height={24}
          className='rotate-180 transform'
        />
      </div>
    </div>
  )
}

const ProjectOverview = () => {
  return (
    <>
      <div className='relative mx-auto flex w-[90rem] flex-col space-y-16 rounded-t-[2rem] bg-[linear-gradient(180deg,#FFF_18.71%,#F6F6F4_100%)] p-16'>
        <div className='grid grid-cols-3 gap-6'>
          {info.map((item, index) => (
            <InfoItem
              key={index}
              {...item}
            />
          ))}
        </div>
        <div className='flex w-[47.6875rem] flex-col space-y-6'>
          <h1 className='heading1 font-optima font-semibold text-Phase-1-Brown'>
            Tổng quan dự án
          </h1>
          <p className='body16 text-greyscaletext-body'>
            Dự án đầu tư EB-5 Hyatt Hotel Thompson Palm Springs nằm ở trung tâm
            của thành phố Palm Springs, California. Là một trong những thành phố
            phong cách nhất của California, Palm Springs cung cấp nhiều loại
            trải nghiệm giải trí và văn hóa đã được chứng minh là có sức hút lớn
            đối với cả người dân địa phương và du khách trong và ngoài nước.
          </p>
        </div>
        <ImageV2
          src='/imgs/detail-eb5/bg.webp'
          alt='bg'
          width={1200}
          height={800}
          className='absolute -bottom-[10%] left-0 right-0 w-full object-cover'
        />
      </div>
      <ProjectSlider images={imageSlides} />
    </>
  )
}
export default ProjectOverview
