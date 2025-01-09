'use client'

import ImageV2 from '@/components/image/ImageV2'
import {Media} from '@/types/image.interface'
import {FC, useEffect, useState} from 'react'
import 'swiper/css'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
export interface IAwardsCertificationsProps {
  logo: Media
  title: string
  items: IAwardsCertificationsItem[]
  background: Media
}

interface IAwardsCertificationsItem {
  title: string
  image: Media
}

const AwardsCertifications: FC<IAwardsCertificationsProps> = ({
  logo,
  title,
  items,
  background,
}) => {
  const [spaceBetween, setSpaceBetween] = useState<number>(6.25)
  useEffect(() => {
    setSpaceBetween((prev) => {
      if (typeof window === 'undefined') return prev
      if (window.innerWidth < 640) {
        return (
          1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)
        )
      }
      return (
        prev * parseFloat(getComputedStyle(document.documentElement).fontSize)
      )
    })
  }, [])
  return (
    <section className='bg-[linear-gradient(180deg,#F6F6F4_76.05%,#F7EDDE_100%)] pb-[5rem] xsm:overflow-hidden'>
      <ImageV2
        alt={logo?.alt}
        src={logo?.url || ''}
        width={255 * 2}
        height={80 * 2}
        className='m-auto block h-[3rem] w-[8.50894rem] object-contain sm:h-[5.625rem] sm:w-[15.95425rem]'
      />
      <h2 className='m-auto mb-[4rem] mt-[1.5rem] px-[1rem] text-center font-optima text-[1.125rem] font-semibold leading-[130%] tracking-[-0.09rem] text-brown sm:mb-[7rem] sm:mt-[2rem] sm:max-w-[44.5625rem] sm:px-0 sm:text-[2.25rem] xsm:tracking-[-0.045rem]'>
        {title}
      </h2>
      <div className='relative'>
        <div className='absolute top-[-5rem] h-[16.25rem] w-[56rem] sm:left-0 sm:right-0 sm:top-[-9.44rem] sm:h-[23.8125rem] sm:w-full xsm:left-1/2 xsm:-translate-x-1/2'>
          <BackgroundImage
            image={background || {url: '', alt: ''}}
            className='absolute left-0 top-0 z-10 h-full w-full'
          />
        </div>
        <button className='xsm:hidden z-20 cursor-pointer awards-certification__prev absolute top-[50%] translate-y-[-8rem] left-[5rem] h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-white flex-center'>
          <ImageV2
            className='size-[1.5rem] object-cover'
            alt=''
            width={1053}
            height={685}
            src={'/icons/arrow-right-brown.svg'}
          />
        </button>
        <button className='xsm:hidden z-20 cursor-pointer awards-certification__next absolute top-[50%] translate-y-[-8rem] right-[5rem] h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-white flex-center'>
          <ImageV2
            className='size-[1.5rem] rotate-180 object-cover'
            alt=''
            width={1053}
            height={685}
            src={'/icons/arrow-right-brown.svg'}
          />
        </button>
        <Swiper
          centeredSlides={true}
          loop={true}
          slidesPerView={1.35}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={spaceBetween}
          modules={[Navigation]}
          navigation={{
            nextEl: '.awards-certification__next',
            prevEl: '.awards-certification__prev',
          }}
          className='!z-10 mx-auto min-h-[14.5rem] select-none sm:min-h-[24rem] sm:max-w-[74.38rem] xsm:!pl-[1rem]'
        >
          {items?.map((item, index) => (
            <SwiperSlide
              key={index}
              className='mb-auto mt-auto !flex !w-[15.25rem] flex-col items-center justify-center p-[0.5rem] sm:!w-[20.625rem]'
            >
              <ItemAwardsCertifications {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default AwardsCertifications

function ItemAwardsCertifications({title, image}: IAwardsCertificationsItem) {
  return (
    <>
      <ImageV2
        alt={image.alt}
        src={image.url}
        width={330 * 2}
        height={310 * 2}
        className='mb-[1rem] h-auto w-full object-contain sm:mb-[1.25rem]'
      />
      <h3 className='text-center text-[0.75rem] font-semibold leading-[1.5] text-orangetext-500 sm:text-[1.25rem] sm:leading-[133.3%]'>
        {title}
      </h3>
    </>
  )
}

interface IBackgroundImageProps {
  image: Media
  className: string
}

function BackgroundImage({image, className}: IBackgroundImageProps) {
  return (
    <svg
      width={1600}
      height={381}
      viewBox='0 0 1600 381'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={className}
    >
      <mask
        id='mask0_1426_50243'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x={0}
        y={0}
        width={1600}
        height={381}
      >
        <rect
          opacity={0.4}
          width={1600}
          height={381}
          fill='url(#paint0_linear_1426_50243)'
        />
      </mask>
      <g mask='url(#mask0_1426_50243)'>
        <g filter='url(#filter0_i_1426_50243)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1600 254.074C1360.23 335.202 1088.25 381 800 381C511.745 381 239.768 335.202 0 254.074L0 0H1600V254.074Z'
            fill='url(#pattern0_1426_50243)'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_i_1426_50243'
          x={0}
          y={-8}
          width={1600}
          height={389}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            floodOpacity={0}
            result='BackgroundImageFix'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy={-8} />
          <feGaussianBlur stdDeviation={25} />
          <feComposite
            in2='hardAlpha'
            operator='arithmetic'
            k2={-1}
            k3={1}
          />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.203333 0 0 0 0 0.169896 0 0 0 0 0.0779444 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_1426_50243'
          />
        </filter>
        <pattern
          id='pattern0_1426_50243'
          patternContentUnits='objectBoundingBox'
          width={1}
          height={1}
        >
          <use
            xlinkHref='#image0_1426_50243'
            transform='matrix(0.000244141 0 0 0.00102526 0 -0.899996)'
          />
        </pattern>
        <linearGradient
          id='paint0_linear_1426_50243'
          x1={800}
          y1={0}
          x2={800}
          y2={381}
          gradientUnits='userSpaceOnUse'
        >
          <stop
            stopColor='#D9D9D9'
            stopOpacity={0}
          />
          <stop
            offset={1}
            stopColor='#D9D9D9'
          />
        </linearGradient>
        <image
          id='image0_1426_50243'
          width={4096}
          height={2731}
          xlinkHref={image.url ? image.url : ''}
        />
      </defs>
    </svg>
  )
}
