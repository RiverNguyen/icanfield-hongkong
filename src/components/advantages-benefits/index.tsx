'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import {FC, useEffect} from 'react'
const calculateScrollbarWidth = (): number => {
  if (typeof window === 'undefined') return 0
  return window.innerWidth - document.documentElement.clientWidth
}
export interface IAdvantagesBenefitsProps {
  subtitle?: string
  title?: string
  slogan?: string
  description?: string
  background_pc?: Media
  background_mb?: Media
  items?: IAdvantagesBenefitsItem[]
  className?: {
    headding?: string
    advantagesHeading?: string
  }
}

export const AdvantagesBenefits: FC<IAdvantagesBenefitsProps> = ({
  title,
  subtitle,
  slogan,
  description,
  background_pc: backgroundPc,
  background_mb: backgroundMb,
  items,
  className,
}) => {
  useEffect(() => {
    const scrollbarWidth = calculateScrollbarWidth()
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`,
    )
  }, [])

  return (
    <section className='relative p-[2.25rem_0_2.25rem] sm:p-[5rem_0_0] xsm:rounded-[1.5rem_1.5rem_0rem_0rem] xsm:bg-[linear-gradient(180deg,#FFF_0%,#F6F6F4_100%)] xsm:pb-0 xsm:shadow-[0px_-10px_30px_0px_rgba(131,131,131,0.06)]'>
      <div
        className={cn(
          'mx-auto flex flex-col items-center text-center sm:max-w-[51.875rem] xsm:px-[1rem]',
          className?.headding,
        )}
      >
        <div className={cn('xsm:px-[1rem]', className?.advantagesHeading)}>
          <span className='sm:heading16 font-medium text-greyscaletext-body/70 sub-12 sm:font-semibold'>
            {subtitle}
          </span>
          <div
            className='m-[0.5rem_0_1.25rem] font-optima font-semibold text-brown heading1'
            dangerouslySetInnerHTML={{__html: title || ''}}
          ></div>
        </div>
        <p className='text-greyscaletext-body body-14 sm:max-w-[39.75rem] sm:body16-r55'>
          {description}
        </p>
      </div>
      <div className='relative mt-[0.69rem] flex sm:mt-[4rem] xsm:flex-col'>
        <div className='sticky left-0 top-0 h-dvh w-full pb-[2rem] sm:top-[6.44rem] sm:h-[46.25rem] xsm:rounded-[0rem_4rem_0rem_0rem]'>
          <ImageV2
            src={backgroundPc ? backgroundPc.url : ''}
            alt={backgroundPc ? backgroundPc.alt : ''}
            width={backgroundPc ? backgroundPc.width * 3 : 1000}
            height={backgroundPc ? backgroundPc.height * 3 : 1000}
            className='absolute left-0 top-0 h-[46rem] w-[200px] min-w-[calc(100vw-1*var(--scrollbar-width))] object-cover xsm:hidden'
          />
          <ImageV2
            src={backgroundMb?.url || ''}
            alt={backgroundMb?.alt || ''}
            width={backgroundMb?.width || 1000}
            height={backgroundMb?.height || 1000}
            className='h-full w-full sm:hidden'
          />
          {slogan && (
            <div
              dangerouslySetInnerHTML={{__html: slogan || ''}}
              className='heading-hero-title-2 xms:top-[8rem] absolute left-[5rem] top-[8rem] max-w-[29.6875rem] font-optima font-medium text-white xsm:left-1/2 xsm:w-[82%] xsm:max-w-full xsm:-translate-x-1/2 xsm:text-center xsm:text-[1.9375rem]'
            ></div>
          )}
        </div>
        <div className='relative space-y-[1rem] bg-transparent pb-[2rem] sm:mb-4 sm:-translate-y-4 sm:space-y-[2rem] sm:pr-[5rem] sm:pt-[2rem] xsm:px-[1rem] xsm:pb-[6.81rem]'>
          {Array.isArray(items) &&
            items.map((item, index) => (
              <AdvantagesBenefitsItem
                {...item}
                key={index}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

interface IAdvantagesBenefitsItem {
  title?: string
  content?: string
  image?: Media
}
interface IAdvantagesBenefitsItemProps extends IAdvantagesBenefitsItem {
  className?: string
}
export const AdvantagesBenefitsItem: FC<IAdvantagesBenefitsItemProps> = ({
  title,
  content,
  image,
  className,
}) => {
  return (
    <div
      className={cn(
        'group mb-[1rem] flex overflow-hidden rounded-[1rem] p-[1rem] sm:h-[19.1875rem] sm:w-[36.625rem] sm:space-x-[1rem] sm:bg-[linear-gradient(55deg,#FFF_88.85%,#F5C178_96.63%)] sm:ring-[6px] sm:ring-[rgba(245,193,120,0.08)] xsm:flex-col xsm:bg-white',
        className,
      )}
    >
      <div className='h-full overflow-hidden rounded-[0.75rem] sm:w-[14.4375rem] xsm:h-[12.5rem]'>
        <ImageV2
          src={image?.url || ''}
          alt={image?.alt || ''}
          width={image?.width || 1000}
          height={image?.height || 1000}
          className='h-full w-full object-cover transition-transform duration-300 sm:group-hover:scale-[1.1]'
        />
      </div>
      <div className='flex-1 sm:p-[1rem] xsm:mt-[0.75rem]'>
        <h3 className='phase-1-text-gradient font-optima font-medium body16 sm:font-medium sm:heading5 xsm:font-semibold'>
          {title}
        </h3>
        <div
          className='advantages-benefits__item-content mt-[0.75rem]'
          dangerouslySetInnerHTML={{__html: content || ''}}
        ></div>
      </div>
    </div>
  )
}
