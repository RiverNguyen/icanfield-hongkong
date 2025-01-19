'use client'
import ImageV2 from '@/components/image/ImageV2'
import { cn } from '@/lib/utils'
import { Swiper, SwiperSlide } from 'swiper/react'

type BenefitItemProps = {
  title: string
  description: string
  icon: string
  iconHover?: string
  className?: string
}

const BenefitItem = ({
  title,
  description,
  className,
  icon,
  iconHover,
}: BenefitItemProps) => {
  return (
    <div
      className={cn(
        'group relative w-[25.625rem] overflow-hidden rounded-2xl border border-brown/10 bg-white p-6 backdrop-blur-[25px] transition-all duration-300 hover:border-white/10',
        className,
      )}
    >
      <div className='absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#3F2214_31.22%,#A55934_100%)] opacity-0 transition-all duration-300 group-hover:opacity-100' />
      <div className='relative z-10 space-y-4'>
        <h2 className='heading5 line-clamp-1 font-optima font-medium uppercase text-brown transition-all duration-300 group-hover:text-white xsm:text-base xsm:tracking-[-0.02rem]'>
          {title}
        </h2>
        <div className='h-[1px] w-full bg-black/10 transition-all duration-300 group-hover:bg-white/10' />
        <div className='flex items-start'>
          <ImageV2
            src={icon}
            width={200}
            height={200}
            alt=''
            className='h-[3.75rem] w-[3.75rem] object-cover group-hover:hidden'
          />
          <ImageV2
            src={iconHover || icon}
            width={200}
            height={200}
            alt=''
            className='hidden h-[3.75rem] w-[3.75rem] object-cover group-hover:block'
          />
          <p className='body-14 pl-6 text-bodytext transition-all duration-300 group-hover:text-white'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export type BenefitsProps = {
  title: string
  description: string
  items: BenefitItemProps[]
}

export default function Benefits({title, description, items}: BenefitsProps) {
  return (
    <section className='section-container relative z-30 -mt-[20.25rem] rounded-[2rem_2rem_0rem_0rem] sm:bg-[linear-gradient(180deg,#FFF_18.71%,#F6F6F4_100%)] p-[4rem] xsm:mt-20 xsm:p-0 xsm:bg-background'>
      <div className='w-[47.6875rem] space-y-6 xsm:w-full xsm:space-y-5 xsm:px-4'>
        <h2 className='heading1 font-optima text-brown'>{title}</h2>
        <p className='body16-r55 text-greyscaletext-body'>{description}</p>
      </div>
      <div className='mt-8 hidden w-full xsm:block'>
        <Swiper
          slidesPerView='auto'
          spaceBetween={16}
          navigation
          className='w-full !px-4'
        >
          {Array.isArray(items) && items?.map((item, index) => (
            <SwiperSlide
              key={index}
              className='!w-[18.875rem]'
            >
              <BenefitItem
                {...item}
                className='w-full px-5'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='relative z-10 mt-24 flex flex-wrap gap-6 xsm:hidden xsm:px-4'>
        {Array.isArray(items) && items.map((item, index) => (
          <BenefitItem
            key={index}
            {...item}
          />
        ))}
      </div>
      <ImageV2
        width={500}
        height={500}
        src='/imgs/australianRealEstate/benefit-mask-mobile.webp'
        alt=''
        className='hidden h-[15.375rem] w-full object-cover xsm:block'
      />
      <ImageV2
        width={1000}
        height={1000}
        src='/imgs/australianRealEstate/benefit-mask-pc.webp'
        alt=''
        className='absolute right-0 top-0 h-[28.17513rem] w-[31.62956rem] object-cover object-right xsm:hidden'
      />
    </section>
  )
}
