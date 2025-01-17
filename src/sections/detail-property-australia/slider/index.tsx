'use client'
import ImageV2 from '@/components/image/ImageV2'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType} from 'swiper/types'

import {FreeMode, Thumbs, Autoplay} from 'swiper/modules'
import {useState} from 'react'
import {cn} from '@/lib/utils'

import './styles.css'
import {IDataAcfDetailAustralia} from '@/types/dataAcfDetailAustralia.interface'
import {Media} from '@/types/image.interface'
import {info_banner} from '@/sections/detail-property-australia/slider/contants'

type SliderItemProps = {
  type: 'video' | 'image'
  image: Media
  classNames?: string
  thumb?: boolean
  link_video?: string
}

const SliderItem = ({
  type,
  image,
  classNames,
  thumb,
  link_video,
}: SliderItemProps) => {
  if (type === 'video') {
    return (
      <div className='relative h-full w-full'>
        <video
          className={cn('relative h-full w-full object-cover', classNames)}
          autoPlay={!thumb}
          loop
          muted
          playsInline
        >
          <source
            src={link_video}
            type='video/mp4'
          />
        </video>
        {thumb && (
          <div className='absolute-center'>
            <ImageV2
              width={50}
              height={50}
              src='/icons/detail-property/play.svg'
              alt=''
              className='h-4 w-4 object-cover'
            />
          </div>
        )}
      </div>
    )
  } else
    return (
      <ImageV2
        className={cn('h-full w-full object-cover', classNames)}
        src={image.url}
        alt={image.alt}
        width={1920}
        height={1080}
      />
    )
}

export type SliderProps = {
  slide_banner: IDataAcfDetailAustralia['acf']['banner']['slide_banner']
  location: string
  title: string
  info: IDataAcfDetailAustralia['acf']['banner']['info']
  className?: string
}

export const SliderMobile = ({
  location,
  title,
  info,
  className,
  slide_banner,
}: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div className={cn('relative mt-[3.75rem] h-[30rem] w-full', className)}>
      <div className='absolute inset-0 h-full w-full'>
        <Swiper
          slidesPerView={1}
          navigation={true}
          modules={[Autoplay]}
          autoplay={{delay: 15000, disableOnInteraction: false}}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className='h-full w-full'
        >
          {Array.isArray(slide_banner) &&
            slide_banner.map((item, index) => (
              <SwiperSlide
                key={index}
                className='relative h-full w-full'
              >
                <div className='absolute inset-0 bg-black/50' />
                <SliderItem {...item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='relative z-10 p-4 pt-16'>
        <h3 className='flex items-center space-x-2 font-medium text-white body-14'>
          <ImageV2
            width={50}
            height={50}
            src='/icons/detail-property/location.svg'
            alt=''
            className='h-5 w-5 object-cover'
          />
          <span>{location}</span>
        </h3>
        <h1 className='font-optima text-[2.375rem] font-medium leading-[1.2] tracking-[-0.0475rem] text-white'>
          {title}
        </h1>
      </div>
      <div className='relative z-10 grid grid-cols-[auto_auto] gap-x-8 gap-y-4 p-4'>
        {typeof info === 'object' &&
          Object.keys(info).map((key, index) => (
            <div key={index}>
              <h3 className='background_clip--text bg-[linear-gradient(180deg,#FFF_0%,#D7B578_100%)] font-bold uppercase sub-12'>
                {info_banner[index].name}
              </h3>
              <p className='text-white sub-12'>{info?.[key]}</p>
            </div>
          ))}
      </div>
      <div className='relative z-10 mt-9 flex w-full justify-center space-x-2 p-4'>
        {Array.isArray(slide_banner) &&
          slide_banner.map((_, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full bg-white/40 transition-all duration-300',
                  index === activeIndex && 'w-12',
                )}
              >
                {index === activeIndex && (
                  <div
                    className={cn(
                      'dot-animation h-2 w-2 transform rounded-full bg-white',
                    )}
                  />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const Slider = ({
  location,
  title,
  info,
  slide_banner,
  className,
}: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div
      className={cn('relative mt-[6.44rem] h-[42.8125rem] w-full', className)}
    >
      <div className='absolute bottom-[4.44rem] left-20 z-10 w-[39.8125rem]'>
        <h3 className='flex items-center space-x-2 text-white body16-m'>
          <ImageV2
            width={50}
            height={50}
            src='/icons/detail-property/location.svg'
            alt=''
            className='h-6 w-6 object-cover'
          />
          <span>{location}</span>
        </h3>
        <h1 className='background_clip--text mt-[1.125rem] bg-[linear-gradient(180deg,#FFF_0%,#D7B578_100%)] hero-title'>
          {title}
        </h1>
      </div>
      <div className='absolute bottom-[9.3rem] right-20 z-10 grid w-[33.8125rem] grid-cols-[min(15rem)_1fr] gap-y-[1.125rem]'>
        {typeof info === 'object' &&
          Object.keys(info).map((key, index) => (
            <div
              key={index}
              className='flex items-center space-x-[0.875rem]'
            >
              <ImageV2
                width={80}
                height={80}
                src={info_banner[index].icon}
                alt=''
                className='h-10 w-10 object-cover'
              />
              <div>
                <h3 className='background_clip--text bg-[linear-gradient(180deg,#FFF_0%,#D7B578_100%)] uppercase body-14-b'>
                  {info_banner[index].name}
                </h3>
                <p className='text-white body-14'>{info?.[key]}</p>
              </div>
            </div>
          ))}
      </div>
      <div className='absolute bottom-[7.69rem] right-0 z-10 flex w-[38.8125rem] items-center'>
        <div className='h-1.5 w-1.5 rounded-full bg-white/50' />
        <div className='h-[1px] flex-1 bg-white/50' />
      </div>
      <div className='relative h-full w-full'>
        <Swiper
          slidesPerView={1}
          navigation={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          thumbs={{
            swiper: thumbsSwiper,
          }}
          modules={[FreeMode, Thumbs, Autoplay]}
          autoplay={{delay: 15000, disableOnInteraction: false}}
          className='h-full w-full'
        >
          {Array.isArray(slide_banner) &&
            slide_banner.map((item, index) => (
              <SwiperSlide
                key={index}
                className='relative h-full w-full'
              >
                <div className='absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_58.36%,rgba(0,0,0,0.26)_71.19%,rgba(0,0,0,0.40)_78.89%,rgba(0,0,0,0.70)_96.15%)]' />
                <SliderItem {...item} />
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView='auto'
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className='!absolute bottom-[2.44rem] right-0 h-[3.75rem] w-[38.8125rem]'
        >
          {Array.isArray(slide_banner) &&
            slide_banner.map((item, index) => (
              <SwiperSlide
                key={index}
                className='relative h-full !w-[6.6875rem] cursor-pointer overflow-hidden rounded-[0.25rem]'
              >
                {activeIndex !== index && (
                  <div className='absolute left-0 top-0 h-full w-full bg-black/[.64]' />
                )}
                <SliderItem
                  thumb
                  {...item}
                  classNames='h-full w-full object-cover'
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Slider
