'use client'
import { Breadcrumb } from '@/components/breadcrumb'
import ImageV2 from '@/components/image/ImageV2'
import useInterView from '@/hooks/useInterView'
import { cn } from '@/lib/utils'
import { dataAcfBanner } from '@/types/dataAcfAboutus.interface'
import './style.css'

export default function BannerAboutus({
  dataAcfBanner,
}: {
  dataAcfBanner: dataAcfBanner
  }) {
  const {isVisible, elementRef} = useInterView({threshold: 0.1})
  
  return (
    <section
      ref={elementRef}
      className='relative z-10 w-full sm:overflow-hidden'
    >
      <Breadcrumb
        className='absolute left-[5rem] top-[6.4375rem]'
        items={[
          {label: 'Trang Chủ', href: '/'},
          {label: 'Về chúng tôi', href: ''},
        ]}
      />
      <ImageV2
        className='h-full w-full sm:hidden'
        alt={dataAcfBanner?.images_background_mb?.alt}
        width={368}
        height={650}
        src={dataAcfBanner?.images_background_mb?.url || ''}
      />
      <ImageV2
        className='h-full w-full xsm:hidden'
        alt={dataAcfBanner?.images_background_pc?.alt}
        width={1200}
        height={650}
        src={dataAcfBanner?.images_background_pc?.url || ''}
      />
      <ImageV2
        className={cn(
          isVisible && 'active__plane',
          'absolute left-[11.83rem] top-[14.87rem] !h-[16.69144rem] !w-[24.98719rem] object-cover transition-all xsm:left-[-0.29rem] xsm:top-[21.31rem] xsm:!h-[6.31106rem] xsm:!w-[10.14275rem] xsm:rotate-[-5.462deg]',
        )}
        alt=''
        width={399}
        height={267}
        src={'/imgs/about-us/banner/maybayX4.png'}
      />
      <div
        className={cn(
          isVisible && 'active__about',
          'absolute top-[13.87rem] z-10 space-y-[1.5rem] transition-all sm:right-[11.94rem] sm:translate-y-[100%] sm:opacity-0 xsm:left-[50%] xsm:top-[8.19rem] xsm:w-[18.25rem] xsm:translate-x-[-50%] xsm:space-y-[1rem]',
        )}
      >
        <p className='font-optima text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] text-white xsm:text-[1.75rem] xsm:font-semibold xsm:tracking-[-0.035rem]'>
          {dataAcfBanner?.we_are?.title}
        </p>
        <ImageV2
          className='!h-[10.35025rem] !w-[33.6875rem] object-contain xsm:!h-[5.60719rem] xsm:!w-[18.25rem]'
          alt={dataAcfBanner?.we_are?.image_about_us?.alt}
          width={539}
          height={165}
          src={dataAcfBanner?.we_are?.image_about_us?.url || ''}
        />
        <h1 className='fixed top-[-100%] opacity-0'>Icanfield Việt Nam</h1>
      </div>
      <div
        className={cn(
          isVisible && 'active__content',
          'absolute bottom-[3rem] left-[5rem] w-[41.625rem] space-y-[1.19rem] transition-all sm:translate-y-[100%] sm:opacity-0 xsm:bottom-0 xsm:left-[50%] xsm:w-full xsm:translate-x-[-50%] xsm:space-y-[1rem] xsm:p-[2.5rem_1rem]',
        )}
      >
        <span
          dangerouslySetInnerHTML={{__html: dataAcfBanner?.label_group || ''}}
          className='font-optima text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.09rem] text-brown xsm:text-[1.25rem] xsm:leading-[1.2] xsm:tracking-[-0.025rem]'
        ></span>
        <div
          dangerouslySetInnerHTML={{__html: dataAcfBanner?.decscripts || ''}}
          className='tracking-[-0.00875rem] text-greyscaletext-800 body-14'
        ></div>
      </div>
    </section>
  )
}
