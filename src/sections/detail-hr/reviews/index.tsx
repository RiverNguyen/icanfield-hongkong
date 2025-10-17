'use client'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './style.css'
import Image from 'next/image'
import ImageV2 from '@/components/image/ImageV2'

const remToPx = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

const reviews = [
  {
    image: {
      src: '/imgs/detail-hr/review-1.png',
      alt: 'review-1',
      width: 4096,
      height: 2731,
    },
    content: `“Làm việc cùng với Jimmy, chúng tôi luôn cảm nhận rõ sự tận tâm và chuyên nghiệp. Mọi hồ sơ đều được chuẩn bị kỹ lưỡng, tối ưu hóa khả năng thành công. Đây là đối tác đáng tin cậy hàng đầu của chúng tôi tại khu vực châu Á."`,

    author: 'Luật sư di trú Canada',
  },
  {
    image: {
      src: '/imgs/detail-hr/review-2.jpg',
      alt: 'review-2',
      width: 2048,
      height: 1366,
    },
    content: `"Anh Jimmy sở hữu tầm nhìn và khả năng kết nối xuất sắc. Anh ấy hiểu rõ thị trường quốc tế và luôn đưa ra giải pháp nhanh và phù hợp từng khách hàng."`,
    author: 'Đối tác phát triển BDS Hy Lạp',
  },
  {
    image: {
      src: '/imgs/detail-hr/review-1.png',
      alt: 'review-1',
      width: 4096,
      height: 2731,
    },
    content: `“Làm việc cùng với Jimmy, chúng tôi luôn cảm nhận rõ sự tận tâm và chuyên nghiệp. Mọi hồ sơ đều được chuẩn bị kỹ lưỡng, tối ưu hóa khả năng thành công. Đây là đối tác đáng tin cậy hàng đầu của chúng tôi tại khu vực châu Á."`,

    author: 'Luật sư di trú Canada',
  },
  {
    image: {
      src: '/imgs/detail-hr/review-2.jpg',
      alt: 'review-2',
      width: 2048,
      height: 1366,
    },
    content: `"Anh Jimmy sở hữu tầm nhìn và khả năng kết nối xuất sắc. Anh ấy hiểu rõ thị trường quốc tế và luôn đưa ra giải pháp nhanh và phù hợp từng khách hàng."`,
    author: 'Đối tác phát triển BDS Hy Lạp',
  },
]

export default function Reviews() {
  return (
    <section className='sm:pb-[6.25rem]'>
      <div className='flex items-center justify-between section-container'>
        <h2 className='w-[50.5rem] text-Phase-1-Brown heading1'>
          Cảm nhận của khách hàng khi làm việc cùng đội ngũ ICF
        </h2>
        <div className='flex items-center space-x-3 xsm:hidden'>
          <button
            type='button'
            className='swiper-btn-prev w-10 rounded-3xl bg-[rgba(245,193,120,0.20)] p-2 flex-center'
          >
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Left Arrow'
              width={24}
              height={24}
              className='size-6 object-cover'
            />
          </button>
          <button
            type='button'
            className='swiper-btn-next w-10 rounded-3xl bg-[rgba(245,193,120,0.20)] p-2 flex-center'
          >
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Right Arrow'
              width={24}
              height={24}
              className='size-6 rotate-180 object-cover'
            />
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView='auto'
        spaceBetween={remToPx(0.75)}
        freeMode={true}
        navigation={{
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
          disabledClass: 'disabled',
        }}
        breakpoints={{
          640: {
            freeMode: false,
            slidesPerView: 2,
            spaceBetween: remToPx(2),
            pagination: {
              el: '.swiper-reviews-pagination',
              type: 'bullets',
              renderBullet(index, className) {
                return `<span class="${className} !w-[6.25rem] !h-full !rounded-[6.25rem] !opacity-100 inline-block !ml-0 !mr-1 !last:mr-0 !transition-all !duration-300"></span>`
              },
              clickable: true,
            },
          },
        }}
        modules={[Pagination, Navigation]}
        className='swiper-reviews !py-10 !section-container xsm:!px-4 xsm:!pb-10 xsm:!pt-5'
      >
        {reviews.map((review, i) => (
          <SwiperSlide
            key={i}
            className='xsm:!w-[18.75rem]'
          >
            <div className='flex h-[15.5rem] space-x-7 rounded-2xl bg-white p-4 xsm:h-[23.125rem] xsm:flex-col xsm:space-x-0 xsm:space-y-4 xsm:p-3'>
              <ImageV2
                src={review.image.src}
                alt={review.image.alt}
                width={review.image.width}
                height={review.image.height}
                className='h-[13.5rem] w-[16rem] rounded-xl object-cover xsm:h-[10.8125rem] xsm:w-full'
              />
              <div className='relative flex h-full flex-col justify-between xsm:space-y-6'>
                <div className='max-h-[9.94231rem] space-y-6 xsm:space-y-0'>
                  <Image
                    src='/icons/detail-hr/quote.svg'
                    alt='Quote'
                    width={40}
                    height={36}
                    className='h-[2.19231rem] w-10 object-cover xsm:absolute xsm:bottom-[-0.01925rem] xsm:left-0 xsm:h-[1.64425rem] xsm:w-[1.875rem]'
                  />
                  <p className='text-sm font-medium italic leading-[133.3%] tracking-[-0.0175rem] text-[rgba(18,18,18,0.72)]'>
                    {review.content}
                  </p>
                </div>
                <p className='text-right text-sm font-medium italic leading-[133.3%] tracking-[-0.0175rem] text-[rgba(18,18,18,0.72)]'>
                  -- {review.author} --
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-reviews-pagination !relative !bottom-auto h-1 w-full flex-center xsm:hidden'></div>
    </section>
  )
}
