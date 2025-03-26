'use client'

import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import Link from 'next/link'
import {FC, useEffect, useState} from 'react'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

export interface ISuccessStoryShareProps {
  title?: string
  items?: ISuccessStoryShareItem[]
}

export const SuccessStoryShare: FC<ISuccessStoryShareProps> = ({
  title,
  items,
}) => {
  const [spaceBetween, setSpaceBetween] = useState<number>(1.25)
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
    <section className='relative min-h-[56rem] sm:pt-[4.38rem] xsm:mt-[1px] xsm:p-[3.5rem_0_20.53rem]'>
      <ImageV2
        src={'/imgs/detail-settlement-programs/success-story-share-bg-2.webp'}
        alt='Success Story Share'
        width={1600 * 2 || 40}
        height={1065 * 2 || 40}
        className='absolute bottom-0 left-0 h-full w-full object-cover xsm:hidden'
      />
      <ImageV2
        src={'/imgs/detail-settlement-programs/success-story-share-bg-mb.webp'}
        alt='Success Story Share'
        width={375 * 2 || 40}
        height={763 * 2 || 40}
        className='absolute bottom-0 left-0 h-full w-full object-cover sm:hidden'
      />
      <div className='relative flex max-w-[85rem] items-center sm:ml-[5rem] xsm:px-[1rem]'>
        <h2 className='font-optima font-semibold text-brown heading1'>
          {title}
        </h2>
        <div className='ml-auto flex items-center space-x-[0.75rem]'>
          <button className='story-share__prev ml-auto size-[2.5rem] rounded-full bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:hidden'>
            <ArrowRight className='h-auto w-full rotate-180 text-brown' />
          </button>
          <button className='story-share__next ml-[0.5rem] size-[2.5rem] rounded-full bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:hidden'>
            <ArrowRight className='h-auto w-full text-brown' />
          </button>
        </div>
      </div>
      <div className='relative mt-[1rem] sm:mt-[2.56rem] sm:h-[19.0625rem]'>
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView='auto'
          className='h-full !pl-[1rem] sm:!pl-[5rem]'
          modules={[Navigation]}
          loop={true}
          navigation={{
            nextEl: '.story-share__next',
            prevEl: '.story-share__prev',
          }}
        >
          {items &&
            items.map((item, index) => (
              <SwiperSlide
                className='!max-w-[18.75rem] sm:!max-w-[33.95313rem]'
                key={index}
              >
                <SuccessStoryShareItem {...item} />
              </SwiperSlide>
            ))}
          {(items?.length ?? 0) < 6
            ? items &&
              items.map((item, index) => (
                <SwiperSlide
                  className='!max-w-[18.75rem] sm:!max-w-[33.95313rem]'
                  key={index}
                >
                  <SuccessStoryShareItem {...item} />
                </SwiperSlide>
              ))
            : ''}
        </Swiper>
      </div>
      <ImageV2
        src={'/imgs/detail-settlement-programs/success-story-share-bg-1.webp'}
        alt='Success Story Share'
        width={1600 * 2 || 40}
        height={1065 * 2 || 40}
        className='pointer-events-none absolute bottom-0 left-0 z-10 h-full w-full object-cover xsm:hidden'
      />
    </section>
  )
}

interface ISuccessStoryShareItem {
  name: string
  review: string
  image: Media
  link: string
}

interface ISuccessStoryShareItemProps extends ISuccessStoryShareItem {
  className?: string
}

export const SuccessStoryShareItem: FC<ISuccessStoryShareItemProps> = ({
  name,
  review,
  image,
  link,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center rounded-[1rem] bg-white p-[0.6875rem_0.9375rem] sm:p-[1rem] xsm:flex-col',
        className,
      )}
    >
      <div className='h-[11.875rem] w-full overflow-hidden rounded-[0.75rem] sm:mr-[1.69rem] sm:h-full sm:w-[16rem] sm:rounded-[1rem]'>
        <ImageV2
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex-1 sm:space-y-[1.5rem] sm:pr-[0.71rem] xsm:mt-[1.25rem]'>
        <h3 className='pc-sub-3 font-bold text-brown xsm:text-[1.25rem] xsm:leading-[1.33] xsm:font-bold'>{name}</h3>
        <p className='font-medium italic text-[rgba(18,18,18,0.72)] body-14 xsm:m-[0.5rem_0_1rem] xsm:tracking-[-0.0175rem]'>
          {review}
        </p>
        <Link
          className='mt-auto inline-flex h-[3rem] items-center justify-center rounded-[0.5rem] bg-btn-gradient p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:w-full'
          href={link}
        >
          <span className='body14 font-medium -tracking-[0.0175rem] text-white'>
            Xem câu chuyện
          </span>
          <ArrowRight className='ml-[0.5rem] size-[1.5rem] flex-shrink-0 text-white' />
        </Link>
      </div>
    </div>
  )
}
