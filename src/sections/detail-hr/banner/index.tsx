'use client'

import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'
import ImageV2 from '@/components/image/ImageV2'

export default function Banner({
  banner_background,
  children,
}: {
  banner_background: IDataAcfDetailHR['acf']['banner_background']
  children: React.ReactNode
}) {
  return (
    <section className='relative h-[29.875rem] self-stretch xsm:h-[14.625rem]'>
      <ImageV2
        src={banner_background?.url}
        alt={banner_background?.alt}
        width={banner_background?.width}
        height={banner_background?.height}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 h-full w-full bg-[rgba(0,0,0,0.30)]'></div>
      <div className='absolute inset-0 h-full w-full bg-[linear-gradient(26deg,rgba(0,0,0,0.70)_-19.37%,rgba(0,0,0,0.00)_128.25%)]'></div>

      {children}
    </section>
  )
}
