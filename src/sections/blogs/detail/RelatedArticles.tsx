'use client'

import ImageV2 from '@/components/image/ImageV2'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import ItemBlog from '@/components/itemBlog'
import {Pagination} from 'swiper/modules'
import {DataItem} from '@/types/blogs.interface'

// interface dataItemBlog {
//   category: [{name: string}]
//   title: string
//   slug: string
//   image: {
//     url: string
//     alt: string
//   }
// }

export default function RelatedArticles({
  dataRelatedPosts,
}: {
  dataRelatedPosts: []
}) {
export default function RelatedArticles({
  dataRelatedPosts,
}: {
  dataRelatedPosts: []
}) {
  return (
    <section className='pb-[11.31rem] pt-[1.5rem] xsm:pb-[2rem]'>
      <div className='section-container flex items-center justify-between xsm:mb-[1.5rem]'>
        <p className='heading1 font-optima text-orangetext-900'>
    <section className='pb-[11.31rem] pt-[1.5rem] xsm:pb-[2rem]'>
      <div className='section-container flex items-center justify-between xsm:mb-[1.5rem]'>
        <p className='heading1 font-optima text-orangetext-900'>
          Các bài viết liên quan
        </p>
        <div className='flex items-center space-x-[0.75rem] xsm:hidden'>
          <button className='related-articles__prev h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
        <div className='flex items-center space-x-[0.75rem] xsm:hidden'>
          <button className='related-articles__prev h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
            <ImageV2
              className='size-[1.5rem] object-cover'
              alt=''
              className='size-[1.5rem] object-cover'
              alt=''
              width={1053}
              height={685}
              src={'/icons/arrow-right-brown.svg'}
              src={'/icons/arrow-right-brown.svg'}
            />
          </button>
          <button className='related-articles__next h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
          <button className='related-articles__next h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
            <ImageV2
              className='size-[1.5rem] rotate-180 object-cover'
              alt=''
              className='size-[1.5rem] rotate-180 object-cover'
              alt=''
              width={1053}
              height={685}
              src={'/icons/arrow-right-brown.svg'}
              src={'/icons/arrow-right-brown.svg'}
            />
          </button>
        </div>
      </div>
      <div className='section-container my-[2rem] h-[0.0625rem] bg-[#E7E7E7] xsm:hidden'></div>
      <div className='section-container my-[2rem] h-[0.0625rem] bg-[#E7E7E7] xsm:hidden'></div>
      <Swiper
        speed={800}
        navigation={{
          nextEl: '.related-articles__next',
          prevEl: '.related-articles__prev',
          nextEl: '.related-articles__next',
          prevEl: '.related-articles__prev',
        }}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
        }}
        className='mySwiper [&_.swiper-pagination]:pagination [&_.swiper-pagination-bullet]:pagination-bullet [&_.swiper-pagination-bullet-active]:pagination-bullet--active !px-[5rem] xsm:!px-[1rem]'
        className='mySwiper [&_.swiper-pagination]:pagination [&_.swiper-pagination-bullet]:pagination-bullet [&_.swiper-pagination-bullet-active]:pagination-bullet--active !px-[5rem] xsm:!px-[1rem]'
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
  )
}
