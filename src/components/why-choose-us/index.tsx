'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import {FC} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper/modules'
import 'swiper/css'
export interface IWhyChooseUsProps {
  title?: string
  description?: string
  logo?: Media
  items?: IWhyChooseUsItem[]
  background_pc?: Media
  background_mb?: Media
}

export const WhyChooseUs: FC<IWhyChooseUsProps> = ({
  title,
  description,
  logo,
  items,
  background_pc,
  background_mb,
}) => {
  return (
    <section className='relative min-h-[40.5625rem] bg-[#F6F6F4] pb-[12.5rem] lg:min-h-lvh sm:pb-[9.56rem] sm:pt-[7.5rem]'>
      <ImageV2
        src={'/imgs/detail-settlement-programs/why-choose-us-bg-1.webp'}
        alt={'Why Choose Us Background'}
        width={1600 * 2 || 40}
        height={788 * 2 || 40}
        className='absolute bottom-0 right-0 h-full w-futl object-cover xsm:hidden'
      />
      <ImageV2
        src={'/imgs/detail-settlement-programs/why-choose-us-bg-1-mb.webp'}
        alt={'Why Choose Us Background'}
        width={1600 * 2 || 40}
        height={788 * 2 || 40}
        className='absolute bottom-0 left-0 h-auto w-full object-contain sm:hidden'
      />
      <div className='absolute bottom-0 right-0 h-full w-full sm:bg-[linear-gradient(90deg,#FFF_31.02%,rgba(153,153,153,0.00)_70.54%)] xsm:hidden'></div>
      <div className='relative z-10 mx-auto flex justify-between sm:max-w-[90rem] xsm:mt-[2.5rem] xsm:px-[1rem]'>
        <div className='max-w-[39.75rem]'>
          <h2 className='font-optima font-semibold text-brown heading1'>
            {title}
          </h2>
          <p className='mt-[0.75rem] text-greyscaletext-body body16-r55 sm:mt-[1rem] xsm:body-14'>
            {description}
          </p>
        </div>
        <ImageV2
          src={logo?.url || ''}
          alt={logo?.alt || ''}
          width={logo?.width || 1000}
          height={logo?.height || 1000}
          className='mr-[5.41rem] h-[8.65525rem] w-auto select-none xsm:hidden'
        />
      </div>
      <div className='scrollbar-hidden xsm:w-ful relative ml-[4rem] mt-[2rem] flex max-w-[90rem] sm:mt-[2.69rem] sm:space-x-[1.25rem] xsm:ml-0 xsm:pl-[0]'>
        <Swiper
          navigation
          slidesPerView={3}
          autoplay={{delay: 3000}}
          speed={1000}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Autoplay]}
          className='!ml-0 !w-[60rem] xsm:!w-full xsm:!pl-4'
        >
          {Array.isArray(items) &&
            items.map((item, index) => (
              <SwiperSlide
                key={index}
                className=''
              >
                <WhyChooseUsItem
                  {...item}
                  number={index + 1}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <ImageV2
        src={
          background_pc?.url ||
          '/imgs/detail-settlement-programs/why-choose-us-bg-2.webp'
        }
        alt={'Why Choose Us Background'}
        width={1219 * 2 || 40}
        height={585 * 2 || 40}
        className='pointer-events-none absolute top-[20rem] right-0 h-[50rem] w-full object-cover xsm:hidden'
      />
      <ImageV2
        src={
          background_mb?.url ||
          '/imgs/detail-settlement-programs/why-choose-us-bg-2-mb.webp'
        }
        alt={'Why Choose Us Background'}
        width={1219 * 2 || 40}
        height={585 * 2 || 40}
        className='pointer-events-none absolute bottom-0 right-0 h-auto w-full object-contain sm:hidden'
      />
    </section>
  )
}

interface IWhyChooseUsItem {
  title?: string
  description?: string
}

interface IWhyChooseUsItemProps extends IWhyChooseUsItem {
  className?: string
  number: number
}

export const WhyChooseUsItem: FC<IWhyChooseUsItemProps> = ({
  number,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative min-h-[18.125rem] overflow-hidden rounded-[1rem] bg-[linear-gradient(154deg,rgba(255,255,255,0.90)_83.01%,rgba(255,255,255,0.00)_109.3%)] p-[1.5rem] shadow-sm sm:min-h-[19.5625rem] sm:max-w-[19.75rem] sm:p-[1.75rem] xsm:w-full xsm:flex-none xsm:last:!mr-[1rem]',
        className,
      )}
    >
      <div className='absolute left-0 top-0 h-[14.375rem] w-full bg-[radial-gradient(55.47%_55.27%_at_15.35%_3.04%,#F5C178_34.24%,rgba(255,255,255,0.00)_100%)]'></div>
      <div className='relative'>
        <span className='inline-block h-[1.6875rem] font-optima text-[2.5rem] font-semibold leading-none tracking-[-0.16rem] text-white sm:h-[2.6875rem] sm:text-[4rem]'>
          {number < 10 ? `0${number}` : number}
        </span>
        <h3 className='mb-[0.5rem] mt-[1.5rem] text-[1.5rem] font-bold leading-[1.3] text-brown sm:mt-[2.5rem] xsm:text-[1rem]'>
          {title}
        </h3>
        <p className='text-[rgba(18,18,18,0.87)] body-14'>{description}</p>
      </div>
    </div>
  )
}
