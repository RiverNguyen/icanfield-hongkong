import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import {FC} from 'react'

export interface IBannerProps {
  titleTop?: string
  titleBottom?: string
  description?: string
  backgroundImage: Media
  children?: React.ReactNode
  className?: string
  backgroundOverlay?: string
}

export const Banner: FC<IBannerProps> = ({
  titleTop,
  titleBottom,
  description,
  backgroundImage,
  children,
  className,
  backgroundOverlay = 'linear-gradient(180deg,rgba(246,246,244,0.00)_76.15%,#F6F6F4_98.8%),linear-gradient(180deg,rgba(0,0,0,0.45)_12%,rgba(0,0,0,0.00)_100%)',
}) => {
  return (
    <section className={`relative min-h-[33.5rem] overflow-hidden pt-[3.75rem] sm:min-h-[55.9375rem] sm:pt-[6.44rem] xsm:rounded-[0_0_1rem_1rem] ${className}`}>
      <ImageV2
        src={backgroundImage.url}
        alt={backgroundImage.alt}
        width={1600 * 2}
        height={478 * 2}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className={`absolute inset-0 hidden h-full w-full bg-[${backgroundOverlay}] sm:block`}></div>
      <div className='absolute left-0 top-0 h-[40.25rem] w-full bg-[linear-gradient(180deg,rgba(246,246,244,0.00)_76.15%,#F6F6F4_98.8%),linear-gradient(180deg,rgba(0,0,0,0.45)_12%,rgba(0,0,0,0.00)_100%)] sm:hidden'></div>
      {children}
      <div
        className={cn(
          'z-1 relative mx-auto mt-[3rem] flex max-w-full flex-col px-[1rem] pl-[2rem] sm:max-w-[90rem] sm:flex-row sm:flex-wrap sm:px-0',
          {'mt-[3.94rem] sm:mt-[1.5rem]': !!children},
        )}
      >
        {titleTop && titleBottom && description && (
          <BannerLine className='absolute min-h-[20rem] w-[1px] sm:relative sm:mt-0 sm:min-h-[1px] sm:w-full sm:max-w-[58.96875rem] xsm:left-[1rem] xsm:top-0' />
        )}
        <div className='sm:mr-[5rem] xsm:order-1'>
          <h1 className='font-optima text-[2.375rem] font-medium leading-[1.2] tracking-[-0.0475rem] text-white sm:text-[5rem] sm:tracking-[-0.1rem]'>
            {titleTop}
          </h1>
          <h2 className='font-optima text-[1.625rem] font-medium leading-[1.3] tracking-[-0.0325rem] text-white sm:text-[3.25rem] sm:leading-[1.2] sm:tracking-[-0.065rem]'>
            {titleBottom}
          </h2>
        </div>
        <p className='text-[0.75rem] font-semibold uppercase leading-[1.5] text-white/85 sm:max-w-[20.2rem] sm:text-[1rem] xsm:order-3'>
          {description}
        </p>
      </div>
    </section>
  )
}

function BannerLine({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'relative h-[1px] w-full max-w-[58.96875rem] bg-[linear-gradient(to_bottom,white,rgba(255,255,255,0))] opacity-60 after:absolute after:left-1/2 after:top-0 after:block after:h-[0.4rem] after:w-[0.4rem] after:-translate-x-1/2 after:rounded-full after:bg-white after:content-[""] sm:mb-[1rem] sm:bg-[linear-gradient(to_right,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)] sm:after:left-0 sm:after:top-1/2 sm:after:-translate-y-1/2',
        className,
      )}
    ></div>
  )
}
