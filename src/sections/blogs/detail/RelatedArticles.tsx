'use client'

import ImageV2 from '@/components/image/ImageV2'
import ItemBlog from '@/components/itemBlog'
import { cn } from '@/lib/utils'
import { DataItem } from '@/types/blogs.interface'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
export default function RelatedArticles({
  dataRelatedPosts,
  className
}: {
  dataRelatedPosts: DataItem[]
  className?: string
  }) {
  // console.log(dataRelatedPosts)
  return (
    <section className={cn('pb-[11.31rem] pt-[1.5rem] xsm:pb-[2rem]', className)}>
      <div className='flex items-center justify-between section-container xsm:mb-[1.5rem]'>
        <p className='font-optima text-orangetext-900 heading1'>
          Các bài viết liên quan
        </p>
        <div className='flex items-center space-x-[0.75rem] xsm:hidden'>
          <button className='related-articles__prev h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
            <ImageV2
              className='size-[1.5rem] object-cover'
              alt=''
              width={1053}
              height={685}
              src={'/icons/arrow-right-brown.svg'}
            />
          </button>
          <button className='related-articles__next h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
            <ImageV2
              className='size-[1.5rem] rotate-180 object-cover'
              alt=''
              width={1053}
              height={685}
              src={'/icons/arrow-right-brown.svg'}
            />
          </button>
        </div>
      </div>
      <div className='my-[2rem] h-[0.0625rem] bg-[#E7E7E7] section-container xsm:hidden'></div>
      <Swiper
        speed={800}
        navigation={{
          nextEl: '.related-articles__next',
          prevEl: '.related-articles__prev',
        }}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
        }}
        className='mySwiper [&_.swiper-pagination]:pagination [&_.swiper-pagination-bullet]:pagination-bullet [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:pagination-bullet--active !px-[5rem] xsm:!px-[1rem]'
      >
        {Array.isArray(dataRelatedPosts) &&
          dataRelatedPosts.map((e: DataItem, index: number) => (
            <SwiperSlide
              key={index}
              className='sm:mr-[2rem] sm:!w-[28.35rem] sm:last:mr-0'
            >
              <ItemBlog data={e} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}
