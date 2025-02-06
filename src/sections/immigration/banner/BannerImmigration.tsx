'use client'

import { Breadcrumb } from '@/components/breadcrumb'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import '@/sections/immigration/banner/style.css'
import { dataBanner } from '@/types/dataAcfImmigration.interface'

export default function BannerImmigration({name, dataAcf}: {name: string, dataAcf: dataBanner}) {
  const isMobile = useIsMobile()
  return (
    <section className="w-full h-[58.125rem] xsm:h-[50.75rem] relative sm:mt-[6.4375rem]">
      <div className="absolute top-0 left-[5rem] xsm:top-[calc(3.75rem+4.69rem)] xsm:left-0 z-20 space-y-[0.875rem]">
        {!isMobile &&
          <Breadcrumb
            className='[&_.item--li]:text-[rgba(18,18,18,0.38)] [&_.last--li]:text-brown'
            items={[
              { label: 'Trang chủ', href: '/' },
              { label: 'Định cư Canada', href: '' },
            ]}
            color='bg-[#5C321E]'
          />
        }
        <div className="space-y-[0.25rem] section-container xsm:px-[0.5rem]">
          <h1 className="uppercase text-[5rem] font-medium leading-[1.2] tracking-[-0.1rem] font-optima background_clip--text xsm:text-[2.5rem] xsm:leading-[1.3] xsm:tracking-[-0.05rem] bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)]">
            ĐỊNH CƯ {name}
          </h1>
          <p className="hero-title text-[#474736]">{dataAcf?.label}</p>
        </div>
      </div>
      {isMobile ? (
        <div className='relative size-full sm:hidden'>
          <ImageV2
            className='size-full'
            fill
            alt={dataAcf?.image_mb?.alt}
            src={dataAcf?.image_mb?.url}
          />
        </div>
      ) : (
        <div className="size-full relative xsm:hidden z-10">
          <ImageV2
            className="size-full absolute z-20"
            src={dataAcf?.image_pc?.url}
            alt={dataAcf?.image_pc?.alt}
            width={3000}
            height={3000}
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
            src={'/imgs/immigration/banner/cloud3.webp'}
            alt=''
            width={1600}
            height={820}
          />
          <ImageV2
            className='absolute bottom-[-13.5rem] left-0 z-[21] h-[36.0625rem] w-full pointer-events-none object-cover'
            src={'/imgs/immigration/banner/dai_lua_3.webp'}
            alt=''
            width={2600}
            height={1820}
            quality={100}
          />
          <div className='absolute left-0 top-[12.31rem] z-[12] flex h-[33.5rem] w-full items-center justify-end overflow-hidden'>
            {/* <ImageV2
              className='flying__clouds size-full'
              src={'/imgs/immigration/banner/flying-cloudsV2.webp'}
              alt=''
              width={1600}
              height={820}
            /> */}
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
