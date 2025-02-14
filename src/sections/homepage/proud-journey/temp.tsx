'use client'

import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import {cn} from '@/lib/utils'
import {IImageV2} from '@/types/image.interface'
import {FC, ReactNode, useRef} from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
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

  const handleNextSlide = () => {
    swiperRef.current?.slideNext()
    swiperRef2.current?.slideNext()
  }
  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev()
    swiperRef2.current?.slidePrev()
  }

  return (
    <section className='relative z-10 bg-background py-[2.5rem]'>
      <div className='ml-auto max-w-[95rem]'>
        <div className='mb-[2.5rem] mr-auto flex max-w-[90rem] items-end justify-between'>
          <div
            className='[&_h2]:heading1 max-w-[29.75rem] font-optima font-semibold text-brown'
            dangerouslySetInnerHTML={{__html: title}}
          ></div>
          <div className='relative flex space-x-[0.75rem]'>
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
        <div className='relative h-fit w-full'>
          <div className='pointer-events-none absolute left-0 top-0 h-[24.2rem] w-[44.3rem] rounded-[1rem] bg-white shadow-[0px_6px_16px_0px_rgba(83,83,83,0.10)]'>
            <ICQuote className='absolute left-[1.5rem] top-[1.5rem] h-auto w-[4.69463rem]' />
            <div className='absolute left-[2rem] top-[4.2rem] z-10 size-fit'>
              <Swiper
                direction='vertical'
                slidesPerView={1}
                loop={true}
                onBeforeInit={(swiper) => {
                  swiperRef2.current = swiper
                }}
                speed={500}
                className='trip__text__swiper relative z-10 h-[12.5rem] w-[19.1rem]'
              >
                {items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProudJourneyQuote>{item.content}</ProudJourneyQuote>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <Swiper
            slidesPerView={4.4}
            spaceBetween={20}
            loop={true}
            speed={600}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            // allowTouchMove={false}
            className='trip__swiper relative z-10 h-[24.2rem] w-full'
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
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
  children,
  className,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <p
      className={cn(
        'z-[1] line-clamp-[7] text-[1.25rem] font-medium leading-[1.33] text-[#767676]',
        className,
      )}
    >
      {children}
    </p>
  )
}

function ProudJourneyItem({avatar, image, name, job}: IItemProudJourney) {
  return (
    <div className='relative size-full'>
      <div className='box__image relative size-full select-none transition-all duration-100'>
        <ImageV2
          className='size-full rounded-[1rem] object-cover transition-all duration-100'
          src={image.src || ''}
          alt={image.alt}
          fill
          sizes='25vw'
        />
      </div>
      <div className='box__user absolute bottom-[1.5rem] right-[1.5rem] z-10 flex w-[calc(21.375rem-3rem)] items-end space-x-[1rem] transition-all duration-1000'>
        <div className='size-[3.5rem] flex-shrink-0 rounded-full border-[1.5px] border-solid border-white'>
          <ImageV2
            className='size-full rounded-full object-cover'
            src={avatar.src || ''}
            alt={avatar.alt}
            width={56 * 2 || 40}
            height={56 * 2 || 40}
          />
        </div>
        <div className='flex-1'>
          <h3 className='mb-[0.38rem] text-[1rem] font-semibold leading-[1.3] text-white'>
            {name}
          </h3>
          <span className='text-[0.75rem] font-medium leading-[1.3] tracking-[0.00875rem] text-white'>
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
