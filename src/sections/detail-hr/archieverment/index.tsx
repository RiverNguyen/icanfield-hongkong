'use client'

import Image from 'next/image'
import {Fragment, useMemo} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import {remToPx} from '@/utils/remToPx'
import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'
import ImageV2 from '@/components/image/ImageV2'

function chunkInto<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) return [array]
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

export default function Achievements({
  outstanding_achievements,
}: {
  outstanding_achievements: IDataAcfDetailHR['acf']['outstanding_achievements']
}) {
  const achievements = outstanding_achievements?.list_achievements

  const groups = useMemo(
    () =>
      chunkInto(
        Array.isArray(achievements)
          ? [...achievements, ...achievements, ...achievements]
          : [],
        3,
      ),
    [achievements],
  )

  return (
    <section className='relative flex h-full w-full flex-col items-center justify-center gap-[5rem] bg-[linear-gradient(180deg,#323232_0%,#0B0B0B_100%)] px-20 pb-[8.75rem] pt-[7.5rem] xsm:gap-[2rem] xsm:bg-[linear-gradient(180deg,#323232_-5.43%,#0B0B0B_100%)] xsm:px-0 xsm:py-[2.5rem]'>
      <ImageV2
        src={outstanding_achievements?.background?.url}
        alt={outstanding_achievements?.background?.alt}
        width={outstanding_achievements?.background?.width}
        height={outstanding_achievements?.background.height}
        className='pointer-events-none absolute inset-0 h-full w-full object-cover'
      />
      <div className='z-1 relative flex items-center justify-between self-stretch xsm:px-4'>
        <div className='flex w-[60.375rem] items-center gap-[0.75rem] xsm:w-full xsm:justify-center xsm:gap-0'>
          <p className='font-optima text-[3rem] font-semibold not-italic leading-[120%] tracking-[-0.06rem] text-white xsm:text-[1.5rem] xsm:leading-[130%] xsm:tracking-[-0.045rem]'>
            {outstanding_achievements?.title || ''}
          </p>
        </div>
        <div className='flex items-center gap-[0.75rem] xsm:hidden xsm:gap-[0.5rem]'>
          <button className='swiper-btn-archieverment-prev flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem]'>
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Arrow Left'
              width={40}
              height={40}
              className='size-6 object-cover'
            />
          </button>
          <button className='swiper-btn-archieverment-next flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem]'>
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Arrow Right'
              width={40}
              height={40}
              className='size-6 rotate-180 object-cover'
            />
          </button>
        </div>
      </div>
      <div className='z-1 relative flex flex-col items-center gap-[3rem] self-stretch xsm:gap-0'>
        <Swiper
          slidesPerView={1}
          spaceBetween={remToPx(2)}
          grabCursor
          navigation={{
            prevEl: '.swiper-btn-archieverment-prev',
            nextEl: '.swiper-btn-archieverment-next',
          }}
          pagination={{
            el: '.swiper-archieverment-pagination',
            type: 'bullets',
            renderBullet(index, className) {
              return `<span class="${className} !w-[6.25rem] xsm:!w-[2.625rem] !h-full !rounded-[6.25rem] !opacity-100 inline-block !ml-0 !mr-1 !last:mr-0 !transition-all !duration-300"></span>`
            },
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className='w-full xsm:!px-4'
        >
          {groups.map((group, slideIndex) => (
            <SwiperSlide key={`slide-${slideIndex}`}>
              <div className='flex items-center gap-[2rem] self-stretch xsm:flex-col xsm:items-start xsm:gap-[1.75rem] xsm:self-stretch'>
                {group.map((item, itemIndex) => (
                  <Fragment key={`item-${slideIndex}-${itemIndex}`}>
                    <div className='flex h-[13.4375rem] shrink-0 flex-grow basis-0 flex-col items-center gap-[1.25rem] rounded-[1rem] py-[1.5rem] xsm:h-full xsm:justify-center xsm:self-stretch xsm:p-0'>
                      <div className='flex flex-col items-center gap-[1.25rem] xsm:gap-[0.75rem] xsm:self-stretch'>
                        <Image
                          src={item?.icon?.url}
                          alt={item?.icon?.alt}
                          width={item?.icon?.width}
                          height={item?.icon?.height}
                          className='h-[3.2715rem] w-[7.5rem] object-cover xsm:h-[2.181rem] xsm:w-[5rem]'
                        />
                        <div
                          className='w-[26rem] text-center text-[1.375rem] font-bold not-italic leading-[150%] text-white xsm:w-[19.3125rem] xsm:text-[1rem]'
                          dangerouslySetInnerHTML={{
                            __html: item?.description || '',
                          }}
                        ></div>
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
      </div>
      <div className='relative flex w-full items-center justify-between xsm:!px-4'>
        <div className='swiper-archieverment-pagination !relative !bottom-auto h-1 flex-center xsm:!w-auto'></div>
        <div className='flex items-center gap-[0.75rem] sm:hidden xsm:gap-[0.5rem]'>
          <button
            type='button'
            className='swiper-btn-archieverment-prev flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem]'
          >
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Prev'
              width={40}
              height={40}
              className='size-[1.5rem] object-cover xsm:size-[1.2rem]'
            />
          </button>
          <button
            type='button'
            className='swiper-btn-archieverment-next flex w-[2.5rem] cursor-pointer items-center justify-end gap-[0.625rem] rounded-[1.5rem] bg-white p-[0.5rem] xsm:w-[2rem] xsm:gap-[0.5rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem]'
          >
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Next'
              width={40}
              height={40}
              className='size-[1.5rem] rotate-180 object-cover xsm:size-[1.2rem]'
            />
          </button>
        </div>
      </div>
    </section>
  )
}
