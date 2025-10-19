'use client'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './style.css'
import Image from 'next/image'
import ImageV2 from '@/components/image/ImageV2'
import {remToPx} from '@/utils/remToPx'
import useIsMobile from '@/hooks/useIsMobile'
import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'

export default function Reviews({
  testimonial,
}: {
  testimonial: IDataAcfDetailHR['acf']['testimonial']
}) {
  const isMobile = useIsMobile()

  return (
    <section className='sm:pb-[6.25rem]'>
      <div className='flex items-center justify-between section-container'>
        <h2
          dangerouslySetInnerHTML={{__html: testimonial?.title}}
          className='text-Phase-1-Brown heading1'
        ></h2>
        <div className='flex items-center space-x-3 xsm:hidden'>
          <button
            type='button'
            className='swiper-btn-reviews-prev w-10 rounded-3xl bg-[rgba(245,193,120,0.20)] p-2 flex-center'
          >
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Prev'
              width={24}
              height={24}
              className='size-6 object-cover'
            />
          </button>
          <button
            type='button'
            className='swiper-btn-reviews-next w-10 rounded-3xl bg-[rgba(245,193,120,0.20)] p-2 flex-center'
          >
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Next'
              width={24}
              height={24}
              className='size-6 rotate-180 object-cover'
            />
          </button>
        </div>
      </div>
      {!isMobile && (
        <Swiper
          slidesPerView={2}
          spaceBetween={remToPx(2)}
          grabCursor
          navigation={{
            nextEl: '.swiper-btn-reviews-next',
            prevEl: '.swiper-btn-reviews-prev',
          }}
          pagination={{
            el: '.swiper-reviews-pagination',
            type: 'bullets',
            renderBullet(index, className) {
              return `<span class="${className} !w-[6.25rem] !h-full !rounded-[6.25rem] !opacity-100 inline-block !ml-0 !mr-1 !last:mr-0 !transition-all !duration-300"></span>`
            },
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className='swiper-reviews !py-10 !section-container'
        >
          {Array.isArray(testimonial?.feedback_list) &&
            testimonial.feedback_list.map((feedback, i) => (
              <SwiperSlide
                key={i}
                className='xsm:!w-[18.75rem]'
              >
                <div className='flex h-[15.5rem] space-x-7 rounded-2xl bg-white p-4 xsm:h-[23.125rem] xsm:flex-col xsm:space-x-0 xsm:space-y-4 xsm:p-3'>
                  <ImageV2
                    src={feedback?.image?.url}
                    alt={feedback?.image?.alt}
                    width={feedback?.image?.width}
                    height={feedback?.image?.height}
                    className='h-[13.5rem] w-[16rem] rounded-xl object-cover xsm:h-[10.8125rem] xsm:w-full'
                  />
                  <div className='relative flex h-full flex-col justify-between xsm:space-y-6'>
                    <div className='max-h-[9.94231rem] w-full space-y-6 xsm:space-y-0'>
                      <Image
                        src='/icons/detail-hr/quote.svg'
                        alt='Quote'
                        width={40}
                        height={36}
                        className='h-[2.19231rem] w-10 object-cover xsm:absolute xsm:bottom-[-0.01925rem] xsm:left-0 xsm:h-[1.64425rem] xsm:w-[1.875rem]'
                      />
                      <div
                        dangerouslySetInnerHTML={{__html: feedback?.feedback}}
                        className='line-clamp-6 break-all text-sm font-medium italic leading-[133.3%] tracking-[-0.0175rem] text-[rgba(18,18,18,0.72)]'
                      ></div>
                    </div>
                    <p className='text-right text-sm font-medium italic leading-[133.3%] tracking-[-0.0175rem] text-[rgba(18,18,18,0.72)]'>
                      {feedback?.signature}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {isMobile && (
        <div className='hidden-scrollbar flex space-x-3 overflow-x-auto px-4 pb-10 pt-5'>
          {Array.isArray(testimonial?.feedback_list) &&
            testimonial.feedback_list.map((feedback, i) => (
              <div
                key={i}
                className='w-[18.75rem] flex-shrink-0'
              >
                <div className='flex h-[15.5rem] space-x-7 rounded-2xl bg-white p-4 xsm:h-[23.125rem] xsm:flex-col xsm:space-x-0 xsm:space-y-4 xsm:p-3'>
                  <ImageV2
                    src={feedback?.image?.url}
                    alt={feedback?.image?.alt}
                    width={feedback?.image?.width}
                    height={feedback?.image?.height}
                    className='h-[13.5rem] w-[16rem] rounded-xl object-cover xsm:h-[10.8125rem] xsm:w-full'
                  />
                  <div className='relative flex h-full flex-col justify-between xsm:space-y-6'>
                    <div className='max-h-[9.94231rem] w-full space-y-6 xsm:space-y-0'>
                      <Image
                        src='/icons/detail-hr/quote.svg'
                        alt='Quote'
                        width={40}
                        height={36}
                        className='h-[2.19231rem] w-10 object-cover xsm:absolute xsm:bottom-[-0.01925rem] xsm:left-0 xsm:h-[1.64425rem] xsm:w-[1.875rem]'
                      />
                      <div
                        dangerouslySetInnerHTML={{__html: feedback?.feedback}}
                        className='line-clamp-6 break-all text-sm font-medium italic leading-[133.3%] tracking-[-0.0175rem] text-[rgba(18,18,18,0.72)]'
                      ></div>
                    </div>
                    <p className='text-right text-sm font-medium italic leading-[133.3%] tracking-[-0.0175rem] text-[rgba(18,18,18,0.72)]'>
                      {feedback?.signature}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className='swiper-reviews-pagination !relative !bottom-auto h-1 w-full flex-center xsm:hidden'></div>
    </section>
  )
}
