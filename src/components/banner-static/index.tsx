import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {IImageV2} from '@/types/image.interface'
import {FC} from 'react'

export interface IBannerStaticProps {
  titleTop?: string
  titleBottom?: string
  description?: string
  backgroundImage: IImageV2
  children?: React.ReactNode
}

export const BannerStatic: FC<IBannerStaticProps> = ({
  titleTop,
  titleBottom,
  description,
  backgroundImage,
  children,
}) => {
  return (
    <section className='relative min-h-[28.75rem] overflow-hidden pt-[3.75rem] sm:min-h-[36.45rem] sm:pt-[6.44rem]'>
      <ImageV2
        src={backgroundImage.src || ''}
        alt={backgroundImage.alt}
        width={1600 * 2}
        height={478 * 2}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 h-full w-full bg-black/30'></div>
      <div className='absolute inset-0 h-full w-full bg-[linear-gradient(26deg,rgba(0,0,0,0.70)_-19.37%,rgba(0,0,0,0.00)_128.25%)]'></div>
      {children}
      <div
        className={cn(
          'z-1 relative mx-auto mt-[5.81rem] flex max-w-full flex-col px-[1rem] sm:max-w-[90rem] sm:flex-row sm:flex-wrap sm:px-0',
          {'mt-[3.94rem] sm:mt-[1.5rem]': !!children},
        )}
      >
        {titleTop && titleBottom && description && (
          <BannerLine className='mb-[1rem] mt-[1rem] max-w-full sm:mt-0 sm:max-w-[58.96875rem] xsm:order-2' />
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
        'relative h-[1px] w-full max-w-[58.96875rem] bg-[linear-gradient(to_right,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)] opacity-60 after:absolute after:left-0 after:top-1/2 after:block after:h-[0.4rem] after:w-[0.4rem] after:-translate-y-1/2 after:rounded-full after:bg-white after:content-[""]',
        className,
      )}
    ></div>
  )
}
