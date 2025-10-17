'use client'

import Image from 'next/image'
import {Fragment, useMemo, useRef, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type {Swiper as SwiperType} from 'swiper'

const ACHIEVEMENTS_DATA = [
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: 'Kết nối chiến lược với các luật sư, quỹ đầu tư, chủ đầu tư lớn tại Mỹ, Canada, châu Âu, Úc và New Zealand.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: '12 năm kinh nghiệm trong lĩnh vực đầu tư - định cư quốc tế.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: '100% hồ sơ đầu tư định cư được chấp thuận.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: '100% hồ sơ đầu tư định cư được chấp thuận.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: '12 năm kinh nghiệm trong lĩnh vực đầu tư - định cư quốc tế.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: 'Kết nối chiến lược với các luật sư, quỹ đầu tư, chủ đầu tư lớn tại Mỹ, Canada, châu Âu, Úc và New Zealand.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: 'Kết nối chiến lược với các luật sư, quỹ đầu tư, chủ đầu tư lớn tại Mỹ, Canada, châu Âu, Úc và New Zealand.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: '12 năm kinh nghiệm trong lĩnh vực đầu tư - định cư quốc tế.',
  },
  {
    imgSrc: '/imgs/detail-hr/achievement/star.webp',
    imgAlt: 'Star Image',
    text: '100% hồ sơ đầu tư định cư được chấp thuận.',
  },
]

function chunkInto<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) return [array]
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

export default function Achievements() {
  const swiperRef = useRef<SwiperType | null>(null)
  const groups = useMemo(() => chunkInto(ACHIEVEMENTS_DATA, 3), [])
  const [activeIndex, setActiveIndex] = useState(0)

  const goPrev = () => swiperRef.current?.slidePrev()
  const goNext = () => swiperRef.current?.slideNext()
  const goTo = (index: number) => swiperRef.current?.slideTo(index)

  return (
    <section className='relative flex h-full w-full flex-col items-center justify-center gap-[5rem] bg-[linear-gradient(180deg,#323232_0%,#0B0B0B_100%)] px-[5rem] pb-[8.75rem] pt-[7.5rem] xsm:gap-[2rem] xsm:bg-[linear-gradient(180deg,#323232_-5.43%,#0B0B0B_100%)] xsm:px-[1rem] xsm:py-[2.5rem]'>
      <Image
        src='/imgs/detail-hr/achievement/bg-achievement.webp'
        alt='Achievement Image'
        width={1600}
        height={666}
        className='pointer-events-none absolute inset-0 h-full w-full xsm:hidden'
      />
      <Image
        src='/imgs/detail-hr/achievement/bg-achievement-mb.webp'
        alt='Achievement Image'
        width={375}
        height={628}
        className='pointer-events-none absolute inset-0 hidden h-full w-full xsm:block'
      />
      <div className='z-1 relative flex items-center justify-between self-stretch'>
        <div className='flex w-[60.375rem] items-center gap-[0.75rem] xsm:w-full xsm:justify-center xsm:gap-0'>
          <p className='font-optima text-[3rem] font-semibold not-italic leading-[120%] tracking-[-0.06rem] text-white xsm:text-[1.5rem] xsm:leading-[130%] xsm:tracking-[-0.045rem]'>
            Những thành tích nổi bật
          </p>
        </div>
        <div className='flex items-center gap-[0.75rem] xsm:hidden xsm:gap-[0.5rem]'>
          <button
            onClick={goPrev}
            className={`flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem] ${activeIndex === 0 ? 'swiper-button-disabled' : ''}`}
          >
            <svg
              className='h-[1.5rem] w-[1.5rem] shrink-0'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M17 12H7M7 12L11 8M7 12L11 16'
                stroke='#5C321E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            className={`flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem] ${activeIndex === groups.length - 1 ? 'swiper-button-disabled' : ''}`}
          >
            <svg
              className='h-[1.5rem] w-[1.5rem] shrink-0'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M7 12H17M17 12L13 8M17 12L13 16'
                stroke='#5C321E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='z-1 relative flex flex-col items-center gap-[3rem] self-stretch xsm:gap-0'>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={32}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            setActiveIndex(swiper.activeIndex)
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className='w-full'
        >
          {groups.map((group, slideIndex) => (
            <SwiperSlide key={`slide-${slideIndex}`}>
              <div className='flex items-center gap-[2rem] self-stretch xsm:flex-col xsm:items-start xsm:gap-[1.75rem] xsm:self-stretch'>
                {group.map((item, itemIndex) => (
                  <Fragment key={`item-${slideIndex}-${itemIndex}`}>
                    {/* p-[1.5rem] */}
                    <div className='flex h-[13.4375rem] shrink-0 flex-grow basis-0 flex-col items-center gap-[1.25rem] rounded-[1rem] py-[1.5rem] xsm:h-full xsm:justify-center xsm:self-stretch xsm:p-0'>
                      <div className='flex flex-col items-center gap-[1.25rem] xsm:gap-[0.75rem] xsm:self-stretch'>
                        <Image
                          src={item.imgSrc}
                          alt={item.imgAlt}
                          width={120}
                          height={52.344}
                          className='h-[3.2715rem] w-[7.5rem] object-cover xsm:h-[2.181rem] xsm:w-[5rem]'
                        />
                        <p className='w-[26rem] text-center text-[1.375rem] font-bold not-italic leading-[150%] text-white xsm:w-[19.3125rem] xsm:text-[1rem]'>
                          {item.text}
                        </p>
                      </div>
                    </div>
                    {itemIndex < group.length - 1 && (
                      <div className='h-[10.5rem] w-[0.05rem] bg-[rgba(255,255,255,0.50)] xsm:h-[0.05rem] xsm:w-full'></div>
                    )}
                  </Fragment>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='flex items-center justify-center gap-[0.25rem] xsm:hidden'>
          {groups?.map((_, i) => (
            <div
              key={`dot-desktop-${i}`}
              onClick={() => goTo(i)}
              className={`h-[0.25rem] w-[6.25rem] rounded-[6.25rem] ${i === activeIndex ? 'bg-[#BC9247]' : 'bg-[rgba(217,217,217,0.30)]'} cursor-pointer xsm:w-[2.625rem]`}
            ></div>
          ))}
        </div>
      </div>
      {/* pagination and navigation for mobile */}
      <div className='z-1 relative hidden w-full items-center justify-between xsm:flex'>
        <div className='flex items-center justify-center gap-[0.25rem]'>
          {groups?.map((_, i) => (
            <div
              key={`dot-mobile-${i}`}
              onClick={() => goTo(i)}
              className={`h-[0.25rem] w-[6.25rem] rounded-[6.25rem] ${i === activeIndex ? 'bg-[#BC9247]' : 'bg-[rgba(217,217,217,0.30)]'} cursor-pointer xsm:w-[2.625rem]`}
            ></div>
          ))}
        </div>
        <div className='flex items-center gap-[0.75rem] xsm:gap-[0.5rem]'>
          <button
            onClick={goPrev}
            className={`flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem] ${activeIndex === 0 ? 'swiper-button-disabled' : ''}`}
          >
            <svg
              className='size-[1.5rem] shrink-0 xsm:size-[1.2rem]'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M17 12H7M7 12L11 8M7 12L11 16'
                stroke='#5C321E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            className={`flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem] ${activeIndex === groups.length - 1 ? 'swiper-button-disabled' : ''}`}
          >
            <svg
              className='size-[1.5rem] shrink-0 xsm:size-[1.2rem]'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M7 12H17M17 12L13 8M17 12L13 16'
                stroke='#5C321E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
