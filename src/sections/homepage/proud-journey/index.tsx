'use client'
import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import {cn} from '@/lib/utils'
import React, {FC, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import './style.css'

export interface IProudJourneyProps {
  title: string
  items: ItemProudJourney[]
}

const ProudJourney: FC<IProudJourneyProps> = ({title, items}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <section className='proud-journey bg-[#ccc] pb-[100rem] pl-[5rem]'>
      <div>
        <h2>{title}</h2>
        <div>
          <button className='proud-journey__prev'>
            <ArrowRight className='rotate-180' />
          </button>
          <button className='proud-journey__next'>
            <ArrowRight />
          </button>
        </div>
      </div>
      <Swiper
        // dir='rtl'
        effect='creative'
        modules={[Navigation]}
        loop={true}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
          // console.log(swiper.realIndex)
        }}
        spaceBetween={20}
        slidesPerView={'auto'}
        className='proud-journey__swiper h-[24.125rem]'
        navigation={{
          nextEl: '.proud-journey__next',
          prevEl: '.proud-journey__prev',
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide
            className={cn(
              'transition-all duration-1000',
              index === activeIndex
                ? '!w-[44.25rem]'
                : '!w-[21.375rem] overflow-hidden rounded-[0.5rem]',
            )}
            key={index}
          >
            <ItemProudJourney
              {...item}
              active={index === activeIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ProudJourney

export interface ItemProudJourney {
  name: string
  job: string
  description: string
  avatar: string
  image: string
}

export interface ItemProudJourneyProps extends ItemProudJourney {
  active: boolean
}

function ItemProudJourney({
  avatar,
  name,
  job,
  description,
  image,
  active,
}: ItemProudJourneyProps) {
  return (
    <div
      className={cn('relative h-full rounded-[0.5rem]', {
        'bg-white p-[1rem]': active,
      })}
    >
      <ImageV2
        className={cn(
          'absolute rounded-[0.5rem]',
          active
            ? 'right-[1rem] top-[1rem] h-[22.125rem] w-[19.125rem]'
            : 'bottom-0 left-0 right-0 top-0',
        )}
        src={image}
        width={306 * 2}
        height={354 * 2}
        alt={name}
      />
      <div>
        <div>{description}</div>
        <div>
          <ImageV2
            className='size-[3.5rem] rounded-full'
            src={avatar}
            width={306 * 2}
            height={354 * 2}
            alt={name}
          />
          <div>
            <span>{name}</span>
            <span>{job}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
