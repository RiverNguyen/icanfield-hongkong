'use client'

import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import '@/sections/immigration/banner/style.css'

export default function BannerImmigration() {
  const isMobile = useIsMobile()
  return (
    <section className='relative h-[58.125rem] w-full sm:mt-[6.4375rem] xsm:h-[50.75rem]'>
      <div className='absolute left-[5rem] top-0 z-20 space-y-[0.875rem] xsm:left-0 xsm:top-[calc(3.75rem+4.69rem)]'>
        {/* {!isMobile &&
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blogs", href: "#" },
            ]}
          />
        } */}
        <div className='space-y-[0.25rem] section-container xsm:px-[0.5rem]'>
          <h1 className='background_clip--text bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] font-optima text-[5rem] font-medium leading-[1.2] tracking-[-0.1rem] xsm:text-[2.5rem] xsm:leading-[1.3] xsm:tracking-[-0.05rem]'>
            ĐỊNH CƯ CANADA
          </h1>
          <p className='text-[#474736] hero-title'>Khởi Đầu Tương Lai Mới</p>
        </div>
      </div>
      {isMobile ? (
        <div className='relative size-full sm:hidden'>
          <ImageV2
            className='size-full'
            fill
            alt=''
            src={'/imgs/immigration/banner/d-hero_bannerMB.webp'}
          />
        </div>
      ) : (
        <div className='relative size-full xsm:hidden'>
          <ImageV2
            className='absolute z-20 size-full'
            src={'/imgs/immigration/banner/d-main_content_containerV2.webp'}
            alt=''
            width={1600}
            height={820}
          />
          <ImageV2
            className='absolute top-[-4.37rem] z-10 h-[51.25rem] w-full'
            src={'/imgs/immigration/banner/sun.webp'}
            alt=''
            width={1600}
            height={820}
          />
          <div className='absolute left-0 top-0 z-[11] h-[41.4375rem] w-full bg-[linear-gradient(94deg,#FFF_25.06%,rgba(255,255,255,0.00)_51.89%)] opacity-[0.7]'></div>
          <ImageV2
            className='absolute left-0 top-[-13.5rem] z-[12] h-[41.125rem] w-full'
            src={'/imgs/immigration/banner/cloud.webp'}
            alt=''
            width={1600}
            height={820}
          />
          <ImageV2
            className='absolute bottom-[-14rem] left-0 z-[21] h-[36.0625rem] w-full'
            src={'/imgs/immigration/banner/silk-strip.webp'}
            alt=''
            width={1600}
            height={820}
          />
          <div className='absolute left-0 top-[12.31rem] z-[12] flex h-[33.5rem] w-full items-center justify-end overflow-hidden'>
            <ImageV2
              className='flying__clouds size-full'
              src={'/imgs/immigration/banner/flying-cloudsV2.webp'}
              alt=''
              width={1600}
              height={820}
            />
            <ImageV2
              className='flying__clouds size-full'
              src={'/imgs/immigration/banner/flying-cloudsV2.webp'}
              alt=''
              width={1600}
              height={820}
            />
          </div>
        </div>
      )}
    </section>
  )
}
