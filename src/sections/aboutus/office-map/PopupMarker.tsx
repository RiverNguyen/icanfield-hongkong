/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import 'swiper/css'

import ICLocation from '@/components/icon/ICLocation'
import ICWatch from '@/components/icon/ICWatch'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import {useRef} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType} from 'swiper/types'

type PopupMarkerProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  countrySelected: string | null
}

const PopupMarker = ({open, setOpen, countrySelected}: PopupMarkerProps) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const handleNextSlide = () => {
    swiperRef.current?.slideNext()
  }
  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev()
  }
  return (
    <div
      className={cn(
        'invisible fixed bottom-0 left-0 right-0 z-[55] rounded-[1rem_1rem_0rem_0rem] bg-white p-[1rem_1rem_2.5rem_1rem] opacity-50 transition-all duration-500 ease-in-out sm:bottom-[1.5rem] sm:left-[-1rem] sm:h-[34.25rem] sm:w-[25rem] sm:-translate-x-full sm:rounded-[1rem] sm:p-[1.15rem] xsm:right-0 xsm:translate-y-full',
        open &&
          'visible opacity-100 sm:left-[1.5rem] sm:translate-x-0 xsm:translate-y-0',
      )}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Image
            className='size-[1.5rem] flex-shrink-0 rounded-full object-cover'
            src={'/imgs/map/vn.svg'}
            alt='country'
            width={24}
            height={24}
            quality={95}
          />
          <span className='ml-[0.5rem] text-[0.875rem] font-semibold leading-normal tracking-[-0.00875rem] text-greyscaletext-body'>
            Văn phòng tại {countrySelected}
          </span>
        </div>
        <button
          className='flex size-[1.5rem] items-center justify-center'
          onClick={() => setOpen(false)}
        >
          <ICX className='size-[0.75rem]' />
        </button>
      </div>
      <div className='relative my-[1rem] h-fit w-full'>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          className='!h-[14.625rem] w-full rounded-[0.75rem]'
        >
          {Array(10)
            .fill(0)
            .map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  className='size-full rounded-[0.75rem] object-cover'
                  src={`https://swiperjs.com/demos/images/nature-${index + 1}.jpg`}
                  alt='slide item'
                  width={360}
                  height={235}
                  quality={90}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='absolute bottom-[0.75rem] right-[0.75rem] z-10 flex space-x-[0.5rem]'>
          <button
            onClick={handlePrevSlide}
            className='flex size-[2.5rem] items-center justify-center rounded-full bg-white transition-all duration-100 active:scale-95'
          >
            <ICArrow className='size-[1.5rem]' />
          </button>
          <button
            onClick={handleNextSlide}
            className='flex size-[2.5rem] items-center justify-center rounded-full bg-white transition-all duration-100 active:scale-95'
          >
            <ICArrow className='size-[1.5rem] rotate-180' />
          </button>
        </div>
      </div>
      <p className='mb-[1rem] text-[1rem] font-normal leading-normal tracking-[-0.02rem] text-bodytext'>
        Là văn phòng chính thức với hơn 10 năm hoạt động, mạng lưới 1,400 đối
        tác toàn cầu của là lợi thế lớn giúp khách hàng đạt mục tiêu.
      </p>
      <div className='flex items-center'>
        <ICLocation className='mr-[0.5rem] size-[1.5rem] flex-shrink-0' />
        <span className='text-[1rem] font-medium leading-normal tracking-[-0.02rem] text-greyscaletext-300'>
          Val-d'Or, QC J9P 0J6, Canada
        </span>
      </div>
      <div className='mb-[1rem] mt-[0.62rem] flex items-center'>
        <ICWatch className='mr-[0.5rem] size-[1.5rem] flex-shrink-0' />
        <span className='text-[1rem] font-medium leading-normal tracking-[-0.02rem] text-greyscaletext-300'>
          Đang mở cửa
        </span>
      </div>
      <Link
        href={'/'}
        target='_blank'
        className='group flex h-[3rem] w-full items-center justify-center rounded-[0.5rem] border border-solid border-[rgba(18,18,18,0.16)] transition-all duration-200 lg:hover:border-none lg:hover:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'
      >
        <span className='text-[0.875rem] font-medium leading-normal tracking-[-0.0175rem] text-greyscaletext-body transition-all duration-200 lg:group-hover:text-white'>
          Xem trên bản đồ
        </span>
        <ICArrow className='ml-[0.5rem] size-[1.5rem] flex-shrink-0 rotate-180 transition-all duration-200 lg:group-hover:[&_path]:stroke-white' />
      </Link>
    </div>
  )
}

export default PopupMarker

const ICX = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      className={className}
    >
      <path
        d='M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13'
        stroke='#5D6065'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const ICArrow = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M17 12H7M7 12L11 8M7 12L11 16'
        stroke='#5C321E'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
