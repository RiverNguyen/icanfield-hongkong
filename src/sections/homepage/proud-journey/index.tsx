'use client'

import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import {cn} from '@/lib/utils'
import {IImageV2} from '@/types/image.interface'
import {FC, useEffect, useRef, useState} from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import {Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType} from 'swiper/types'
import './style.css'

export interface IProudJourneyProps {
  title: string
  items: IItemProudJourney[]
}

export interface IItemProudJourney {
  image: IImageV2
  avatar: IImageV2
  name: string
  job: string
  content: string
}

const ProudJourney: FC<IProudJourneyProps> = ({items, title}) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const swiperRef2 = useRef<SwiperType | null>(null)
  const [spaceBetween, setSpaceBetween] = useState(1.5)

  useEffect(() => {
    setSpaceBetween((prev) => {
      if (typeof window === 'undefined') return prev
      if (window.innerWidth < 640) {
        return (
          1 * parseFloat(getComputedStyle(document.documentElement).fontSize)
        )
      }
      return (
        prev * parseFloat(getComputedStyle(document.documentElement).fontSize)
      )
    })
  }, [])

  const handleNextSlide = () => {
    swiperRef.current?.slideNext()
    swiperRef2.current?.slideNext()
  }
  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev()
    swiperRef2.current?.slidePrev()
  }

  return (
    <section className='relative z-10 overflow-hidden bg-background p-[5rem_0_0rem] sm:py-[2.5rem]'>
      <div className='ml-auto max-w-[95rem]'>
        <div className='-mb-[3.875rem] mr-auto flex items-end justify-between px-[1rem] sm:mb-[2.5rem] sm:max-w-[90rem]'>
          <div
            className='[&_h2]:heading1 max-w-[29.75rem] font-optima font-semibold text-brown'
            dangerouslySetInnerHTML={{__html: title}}
          ></div>
          <div className='relative hidden space-x-[0.75rem] sm:flex'>
            <button
              onClick={handlePrevSlide}
              className='ml-auto size-[2.5rem] rounded-full bg-[rgba(245,193,120,0.20)] p-[0.5rem]'
            >
              <ArrowRight className='h-auto w-full rotate-180 text-brown' />
            </button>
            <button
              onClick={handleNextSlide}
              className='ml-auto size-[2.5rem] rounded-full bg-[rgba(245,193,120,0.20)] p-[0.5rem]'
            >
              <ArrowRight className='h-auto w-full text-brown' />
            </button>
          </div>
        </div>
        <div className='relative h-fit w-full xsm:hidden'>
          <div className='pointer-events-none absolute left-0 top-0 h-[24.2rem] w-[44.3rem] rounded-[1rem] bg-white shadow-[0px_6px_16px_0px_rgba(83,83,83,0.10)]'>
            <ICQuote className='absolute left-[1.5rem] top-[1.5rem] h-auto w-[4.69463rem]' />
            <div className='absolute left-[2rem] top-[2.5rem] z-10 size-fit'>
              <Swiper
                direction='vertical'
                slidesPerView={1}
                loop={true}
                onBeforeInit={(swiper) => {
                  swiperRef2.current = swiper
                }}
                speed={800}
                className='trip__text__swiper relative z-10 h-[12.5rem] w-[19.1rem]'
              >
                {items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProudJourneyQuote content={item.content} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <Swiper
            effect='coverflow'
            centeredSlides={true}
            slidesPerView={4.5}
            spaceBetween={spaceBetween}
            loop={true}
            speed={800}
            modules={[Autoplay]}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              swiperRef2.current?.slideTo(swiper.realIndex)
            }}
            allowTouchMove={false}
            className='trip__swiper relative z-10 !ml-[8.3rem] !mr-0 h-[24.2rem] w-full flex-1 !overflow-visible'
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <ProudJourneyItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='relative h-fit w-full sm:hidden'>
          <Swiper
            slidesPerView='auto'
            spaceBetween={spaceBetween}
            className='min-h-[25.125rem] !p-[5.375rem_0_2.5rem] !pl-[1rem]'
          >
            {items.map((item, index) => (
              <SwiperSlide
                className='!w-[18.75rem] rounded-[1rem] bg-white p-[1rem] shadow-[0px_-8px_60px_0px_rgba(3,33,7,0.08)]'
                key={index}
              >
                <ProudJourneyItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default ProudJourney

function ProudJourneyQuote({
  content,
  className,
}: {
  className?: string
  content: string
}) {
  return (
    <div
      dangerouslySetInnerHTML={{__html: content}}
      className={cn(
        'z-[1] mb-auto mt-[1.5rem] text-[1.25rem] font-medium leading-[133.3%] text-greyscaletext-300 [&_*]:text-[1.25rem] [&_*]:font-medium [&_*]:leading-[133.3%] [&_*]:text-greyscaletext-300 [&_strong]:text-greyscaletext-900',
        className,
      )}
    ></div>
  )
}

function ProudJourneyItem({
  avatar,
  image,
  name,
  job,
  content,
}: IItemProudJourney) {
  return (
    <div className='relative flex size-full flex-col sm:block'>
      <div className='box__image relative h-[11.25rem] select-none transition-all duration-100 sm:size-full'>
        <ImageV2
          className='rounded-[0.5rem] object-cover transition-all duration-100 sm:size-full sm:rounded-[1rem]'
          src={image.src}
          alt={image.alt}
          fill
          sizes='25vw'
        />
        <div className='bottom-0 left-0 right-0 top-0 size-full rounded-[1rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,_rgba(0,0,0,0.55))] sm:absolute'></div>
      </div>
      <div
        dangerouslySetInnerHTML={{__html: content}}
        className='mb-auto mt-[1.5rem] text-[1rem] font-medium leading-[1.333rem] text-greyscaletext-300 sm:mt-0 sm:hidden [&_*]:text-[1rem] [&_*]:font-medium [&_*]:leading-[1.333rem] [&_*]:text-greyscaletext-300 [&_strong]:text-greyscaletext-900'
      ></div>
      <div className='box__user z-10 mt-[1.25rem] flex items-center space-x-[0.75rem] transition-all duration-1000 sm:absolute sm:bottom-[1.5rem] sm:left-[1.5rem] sm:mt-0 sm:w-[calc(21.375rem-3rem)] sm:items-end sm:space-x-[1rem]'>
        <div className='box__user-border size-[2.5rem] flex-shrink-0 rounded-full border-[2px] border-solid border-[#95502F] sm:size-[3.5rem] sm:border-[1.5px] sm:border-white'>
          <ImageV2
            className='size-full rounded-full object-cover'
            src={avatar.src}
            alt={avatar.alt}
            width={56 * 2}
            height={56 * 2}
          />
        </div>
        <div className=''>
          <h3 className='text-[1rem] font-semibold leading-[1.3] text-[var(--GREYSCALE-grey-900)] sm:mb-[0.38rem] sm:text-white'>
            {name}
          </h3>
          <span className='text-[0.75rem] font-medium leading-[0.975rem] tracking-[0.00875rem] text-[#B3B3B3;] sm:leading-[1.3rem] sm:text-white'>
            {job}
          </span>
        </div>
      </div>
    </div>
  )
}

const ICQuote = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='76'
      height='69'
      viewBox='0 0 76 69'
      fill='none'
      className={className}
    >
      <path
        d='M75.1139 0.702646L73.41 13.9353C69.2449 13.6507 66.0264 14.4095 63.7545 16.2118C61.4827 18.0141 59.9681 20.5278 59.2108 23.753C58.4535 26.9781 58.3115 30.6302 58.7848 34.709H75.1139V69H43.7336V31.8633C43.7336 20.6701 46.3841 12.2278 51.6852 6.53638C57.0809 0.75008 64.8905 -1.1945 75.1139 0.702646ZM31.3803 0.702646L29.6764 13.9353C25.5113 13.6507 22.2928 14.4095 20.0209 16.2118C17.749 18.0141 16.2345 20.5278 15.4772 23.753C14.7199 26.9781 14.5779 30.6302 15.0512 34.709H31.3803V69H0V31.8633C0 20.6701 2.65052 12.2278 7.95157 6.53638C13.3473 0.75008 21.1568 -1.1945 31.3803 0.702646Z'
        fill='#EEEDE6'
      />
    </svg>
  )
}
