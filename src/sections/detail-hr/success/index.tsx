'use client'

import ImageV2 from '@/components/image/ImageV2'
import {ICArrow} from '@/components/itemBlog'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType} from 'swiper'
import {useRef, useState, useMemo} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'

// Success Card Component
interface SuccessCardProps {
  item: {
    id: number
    imageSrc: string
    imageAlt: string
    href: string
    stats: Array<{label: string; value: string}>
    title: string
    description: string
  }
}

const SuccessCard = ({item}: SuccessCardProps) => (
  <Link
    href={item.href}
    className='group relative flex h-[36.25rem] flex-shrink-0 cursor-pointer flex-col items-start overflow-hidden rounded-[1.25rem] xsm:h-[25rem] xsm:w-[18.75rem] xsm:rounded-[1rem]'
  >
    <ImageV2
      src={item.imageSrc}
      alt={item.imageAlt}
      className='z-[1] size-full origin-center object-cover transition-all duration-700 lg:group-hover:scale-[1.15]'
      fill
      sizes='30vw'
    />
    <div className='absolute left-0 top-0 z-[2] size-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_22.87%,rgba(0,0,0,0.57)__60%,rgba(0,0,0,0.84)_89.8%)]'></div>

    <div className='relative z-[3] flex shrink-0 flex-grow basis-0 flex-col items-start justify-between self-stretch p-[2rem] xsm:p-[0.875rem]'>
      <div className='relative ml-auto flex h-[2.75rem] w-[8.5rem] justify-end xsm:opacity-0'>
        <span className='absolute left-[1.25rem] top-1/2 z-10 -translate-y-1/2 text-[0.875rem] font-semibold leading-[150%] text-[#3F2214] opacity-0 transition-all delay-100 duration-500 lg:group-hover:opacity-100'>
          Xem thêm
        </span>
        <button className='z-[1] flex h-full w-[2.75rem] items-center justify-end rounded-[0.9375rem] bg-white px-[0.625rem] transition-all duration-500 lg:group-hover:w-full'>
          <ICArrow className='size-[1.5rem] transition-all duration-700 lg:group-hover:rotate-45' />
        </button>
      </div>
      <div className='flex w-full flex-col items-start gap-[0.625rem] xsm:gap-[0.5rem] xsm:self-stretch'>
        <div className='flex items-center justify-between self-stretch border-b-[0.4px] border-b-white pb-[0.75rem] xsm:border-b-[0.299px] xsm:pb-[0.56088rem]'>
          {item.stats.map((stat, index) => (
            <>
              <div
                key={index}
                className='flex flex-col items-start'
              >
                <p className='text-[0.875rem] font-medium not-italic leading-[150%] tracking-[-0.0175rem] text-[#EBEBEB] xsm:text-[0.625rem] xsm:tracking-[-0.0125rem]'>
                  {stat.label}
                </p>
                <p className='text-[1.5rem] font-semibold not-italic leading-[133.3%] tracking-[-0.03rem] text-white xsm:text-[1.125rem] xsm:tracking-[-0.0225rem]'>
                  {stat.value}
                </p>
              </div>
              {index !== item.stats.length - 1 && (
                <div className='h-[2.4375rem] w-[0.03125rem] bg-[#C0C0C0] xsm:h-[1.82281rem] xsm:w-[0.02338rem]'></div>
              )}
            </>
          ))}
        </div>
        <div className='flex flex-col gap-[0.3125rem] self-stretch'>
          <p className='self-stretch font-optima text-[1.25rem] font-medium not-italic leading-[150%] tracking-[-0.025rem] text-white xsm:text-[0.875rem] xsm:tracking-[-0.0175rem]'>
            {item.title}
          </p>
          <p className='xsm:tracking-0 line-clamp-2 text-ellipsis text-[1rem] font-normal not-italic leading-[150%] tracking-[-0.02rem] text-[#A1A1A1] xsm:text-[0.75rem]'>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  </Link>
)

const SUCCESS_DATA = [
  {
    id: 1,
    imageSrc: '/imgs/detail-hr/success/success-1.webp',
    imageAlt: 'Success Image',
    href: '/success-story-1',
    stats: [
      {label: 'IELTS', value: '7.0'},
      {label: 'SUV', value: 'Y tế'},
      {label: 'Nộp PR', value: 'Trong năm 2025'},
    ],
    title: 'Dự án SUV Y tế về ứng dụng AI trong ứng dụng chăm sóc sức khỏe',
    description:
      'Founder dự án SUV Y tế đạt IELTS 7.0 General ngay lần đầu tiên, dự kiến nhận LOS và nộp PR ngay trong năm 2025.',
  },
  {
    id: 2,
    imageSrc: '/imgs/detail-hr/success/success-2.webp',
    imageAlt: 'Success Image',
    href: '/success-story-2',
    stats: [
      {label: 'LOS', value: '2 Tháng'},
      {label: 'SUV', value: 'Y tế'},
      {label: 'Nộp PR', value: 'Trong năm 2025'},
    ],
    title: 'Dự án SUV Y tế về ứng dụng AI trong ứng dụng chăm sóc sức khỏe',
    description:
      'Founder dự án SUV Y tế đạt IELTS 7.0 General ngay lần đầu tiên, dự kiến nhận LOS và nộp PR ngay trong năm 2025.',
  },
  {
    id: 3,
    imageSrc: '/imgs/detail-hr/success/success-2.webp',
    imageAlt: 'Success Image',
    href: '/success-story-3',
    stats: [
      {label: 'IELTS', value: '7.0'},
      {label: 'SUV', value: 'Y tế'},
      {label: 'Nộp PR', value: 'Trong năm 2025'},
    ],
    title: 'Dự án SUV Y tế về ứng dụng AI trong ứng dụng chăm sóc sức khỏe',
    description:
      'Founder dự án SUV Y tế đạt IELTS 7.0 General ngay lần đầu tiên, dự kiến nhận LOS và nộp PR ngay trong năm 2025.',
  },
  {
    id: 4,
    imageSrc: '/imgs/detail-hr/success/success-1.webp',
    imageAlt: 'Success Image',
    href: '/success-story-4',
    stats: [
      {label: 'IELTS', value: '7.0'},
      {label: 'SUV', value: 'Y tế'},
      {label: 'Nộp PR', value: 'Trong năm 2025'},
    ],
    title: 'Dự án SUV Y tế về ứng dụng AI trong ứng dụng chăm sóc sức khỏe',
    description:
      'Founder dự án SUV Y tế đạt IELTS 7.0 General ngay lần đầu tiên, dự kiến nhận LOS và nộp PR ngay trong năm 2025.',
  },
  {
    id: 5,
    imageSrc: '/imgs/detail-hr/success/success-2.webp',
    imageAlt: 'Success Image',
    href: '/success-story-5',
    stats: [
      {label: 'LOS', value: '2 Tháng'},
      {label: 'SUV', value: 'Y tế'},
      {label: 'Nộp PR', value: 'Trong năm 2025'},
    ],
    title: 'Dự án SUV Y tế về ứng dụng AI trong ứng dụng chăm sóc sức khỏe',
    description:
      'Founder dự án SUV Y tế đạt IELTS 7.0 General ngay lần đầu tiên, dự kiến nhận LOS và nộp PR ngay trong năm 2025.',
  },
  {
    id: 6,
    imageSrc: '/imgs/detail-hr/success/success-2.webp',
    imageAlt: 'Success Image',
    href: '/success-story-6',
    stats: [
      {label: 'IELTS', value: '7.0'},
      {label: 'SUV', value: 'Y tế'},
      {label: 'Nộp PR', value: 'Trong năm 2025'},
    ],
    title: 'Dự án SUV Y tế về ứng dụng AI trong ứng dụng chăm sóc sức khỏe',
    description:
      'Founder dự án SUV Y tế đạt IELTS 7.0 General ngay lần đầu tiên, dự kiến nhận LOS và nộp PR ngay trong năm 2025.',
  },
]

export default function Success() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const slidesPerView = 3
  const slidesPerGroup = 1

  // Tính toán số lượng pagination dots
  const totalPages = useMemo(() => {
    return Math.ceil((SUCCESS_DATA.length - slidesPerView) / slidesPerGroup) + 1
  }, [])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  const handlePrevClick = () => {
    if (swiperRef.current && activeIndex > 0) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (swiperRef.current && activeIndex < totalPages - 1) {
      swiperRef.current.slideNext()
    }
  }

  return (
    <section className='flex flex-col items-center justify-center gap-[2.5rem] self-stretch bg-[#F6F6F4] px-[5rem] pb-[6.25rem] xsm:items-start xsm:gap-[1.25rem] xsm:px-0 xsm:pb-[2rem]'>
      <div className='flex items-center justify-between self-stretch xsm:justify-center'>
        <h2 className='text-center font-optima text-[3rem] font-semibold not-italic leading-[120%] tracking-[-0.06rem] text-[#5C321E] xsm:self-stretch xsm:text-[1.5rem] xsm:leading-[130%] xsm:tracking-[-0.045rem]'>
          Câu chuyện thành công
        </h2>
        <div className='flex items-center gap-[0.75rem] xsm:hidden xsm:gap-[0.5rem]'>
          <button
            onClick={handlePrevClick}
            className={`flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem] ${activeIndex === 0 ? 'swiper-button-disabled' : ''}`}
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
            onClick={handleNextClick}
            className={`flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem] ${activeIndex === totalPages - 1 ? 'swiper-button-disabled' : ''}`}
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
      <div className='flex items-center gap-[2rem] self-stretch xsm:hidden xsm:items-start xsm:gap-[0.875rem]'>
        <Swiper
          slidesPerView={slidesPerView}
          slidesPerGroup={slidesPerGroup}
          spaceBetween={32}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={handleSlideChange}
          className='w-full xsm:hidden'
        >
          {SUCCESS_DATA?.map((item) => (
            <SwiperSlide key={item.id}>
              <SuccessCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* mobile */}
      <div className='hidden items-center gap-[2rem] self-stretch overflow-x-auto xsm:flex xsm:w-full xsm:items-start xsm:gap-[0.875rem] xsm:px-[1rem]'>
        {SUCCESS_DATA?.map((item) => (
          <SuccessCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className='flex items-center gap-[0.25rem] xsm:hidden'>
        {Array.from({length: totalPages}, (_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-[0.25rem] w-[6.25rem] rounded-[6.25rem] transition-colors duration-300 ${
              activeIndex === index ? 'bg-[#5C321E]' : 'bg-[#D9D9D9]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
