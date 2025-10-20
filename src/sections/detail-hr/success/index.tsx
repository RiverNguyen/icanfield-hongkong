'use client'

import Image from 'next/image'
import ImageV2 from '@/components/image/ImageV2'
import {ICArrow} from '@/components/itemBlog'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import Link from 'next/link'
import {remToPx} from '@/utils/remToPx'
import {Fragment} from 'react'
import useIsMobile from '@/hooks/useIsMobile'
import {IDataAcfDetailHR, IPost} from '@/types/dataAcfDetailHR.interface'

const SuccessCard = ({post}: {post: IPost}) => (
  <Link
    href={`/tin-tuc/${post?.slug}`}
    className='group relative flex h-[36.25rem] w-full flex-shrink-0 cursor-pointer flex-col items-start overflow-hidden rounded-[1.25rem] xsm:h-[25rem] xsm:w-[18.75rem] xsm:rounded-[1rem]'
  >
    <ImageV2
      src={post?.featured_image}
      alt={post?.title}
      className='z-1 size-full origin-center object-cover transition-all duration-700 lg:group-hover:scale-[1.15]'
      fill
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
        <div className='flex w-full items-center justify-between border-b-[0.4px] border-b-[#C0C0C0] pb-[0.75rem] xsm:border-b-[0.299px] xsm:pb-[0.56088rem]'>
          {Array.isArray(post?.list_infomation) &&
            post.list_infomation.map((info, index) => (
              <Fragment key={index}>
                <div className='flex flex-col items-start'>
                  <p className='text-[0.875rem] font-medium not-italic leading-[150%] tracking-[-0.0175rem] text-[#EBEBEB] xsm:text-[0.625rem] xsm:tracking-[-0.0125rem]'>
                    {info?.label}
                  </p>
                  <p className='text-[1.5rem] font-semibold not-italic leading-[133.3%] tracking-[-0.03rem] text-white xsm:text-[1.125rem] xsm:tracking-[-0.0225rem]'>
                    {info?.value}
                  </p>
                </div>
                {index !== post?.list_infomation?.length - 1 && (
                  <div className='h-[2.4375rem] w-[0.03125rem] bg-[#C0C0C0] xsm:h-[1.82281rem] xsm:w-[0.02338rem]'></div>
                )}
              </Fragment>
            ))}
          {post?.list_infomation?.length < 3 && (
            <Fragment>
              <div className='invisible h-[2.4375rem] w-[0.03125rem] bg-[#C0C0C0] opacity-0 xsm:h-[1.82281rem] xsm:w-[0.02338rem]'></div>
              <div className='h-1 w-[1.875rem]'></div>
            </Fragment>
          )}
        </div>
        <div className='flex flex-col gap-[0.3125rem] self-stretch'>
          <p className='line-clamp-2 self-stretch font-optima text-[1.25rem] font-medium not-italic leading-[150%] tracking-[-0.025rem] text-white xsm:text-[0.875rem] xsm:tracking-[-0.0175rem]'>
            {post?.title}
          </p>
          <div
            dangerouslySetInnerHTML={{__html: post?.excerpt}}
            className='xsm:tracking-0 line-clamp-2 text-ellipsis text-[1rem] font-normal not-italic leading-[150%] tracking-[-0.02rem] text-[#A1A1A1] xsm:text-[0.75rem]'
          ></div>
        </div>
      </div>
    </div>
  </Link>
)

export default function Success({
  success_story,
}: {
  success_story: IDataAcfDetailHR['acf']['success_story']
}) {
  const isMobile = useIsMobile()

  return (
    <section className='flex flex-col items-center justify-center gap-[2.5rem] self-stretch bg-[#F6F6F4] px-[5rem] pb-[6.25rem] xsm:items-start xsm:gap-[1.25rem] xsm:px-0 xsm:pb-[2rem]'>
      <div className='flex items-center justify-between self-stretch xsm:justify-center'>
        <h2 className='text-center font-optima text-[3rem] font-semibold not-italic leading-[120%] tracking-[-0.06rem] text-[#5C321E] xsm:self-stretch xsm:text-[1.5rem] xsm:leading-[130%] xsm:tracking-[-0.045rem]'>
          {success_story?.title}
        </h2>
        <div className='flex items-center space-x-[0.75rem] xsm:hidden xsm:space-x-[0.5rem]'>
          <button className='swiper-btn-success-prev flex w-[2.5rem] cursor-pointer items-center justify-end rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:w-[2rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem]'>
            <Image
              src='/icons/arrow-right-brown.svg'
              alt='Prev'
              width={24}
              height={24}
              className='size-6 object-cover'
            />
          </button>
          <button className='swiper-btn-success-next flex w-[2.5rem] cursor-pointer items-center justify-end rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:w-[2rem] xsm:rounded-[1.2rem] xsm:p-[0.4rem]'>
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
          slidesPerView={3}
          spaceBetween={remToPx(2)}
          grabCursor
          navigation={{
            nextEl: '.swiper-btn-success-next',
            prevEl: '.swiper-btn-success-prev',
          }}
          pagination={{
            el: '.swiper-pagination-custom',
            type: 'bullets',
            clickable: true,
            renderBullet(index, className) {
              return `<span class='${className} !w-[6.25rem] !h-full !rounded-[6.25rem] !opacity-100 inline-block !ml-0 !mr-1 !last:mr-0 !transition-all !duration-300'></span>`
            },
          }}
          modules={[Pagination, Navigation]}
          className='w-full xsm:!px-4'
        >
          {Array.isArray(success_story?.list_post) &&
            success_story.list_post.map((post) => (
              <SwiperSlide
                key={post.id}
                className='xsm:!w-[18.75rem]'
              >
                <SuccessCard post={post} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {isMobile && (
        <div className='hidden-scrollbar hidden items-center gap-[2rem] self-stretch overflow-x-auto xsm:flex xsm:w-full xsm:items-start xsm:gap-[0.875rem] xsm:px-[1rem]'>
          {Array.isArray(success_story?.list_post) &&
            success_story.list_post.map((post) => (
              <SuccessCard
                key={post.id}
                post={post}
              />
            ))}
        </div>
      )}

      <div className='swiper-pagination-custom !relative !bottom-auto h-1 w-full flex-center xsm:hidden'></div>
    </section>
  )
}
