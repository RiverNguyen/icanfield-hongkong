'use client'

import Image from 'next/image'
import {Breadcrumb} from '@/components/breadcrumb'

export default function Banner() {
  return (
    <section className='relative h-[29.875rem] self-stretch xsm:h-[14.625rem]'>
      <Image
        src='/imgs/detail-hr/banner/banner-image.webp'
        alt='Banner Image'
        width={1603}
        height={478}
        className='absolute inset-0 h-full w-full object-cover'
      />

      <div className='absolute inset-0 h-full w-full bg-[rgba(0,0,0,0.30)]'></div>
      <div className='absolute inset-0 h-full w-full bg-[linear-gradient(26deg,rgba(0,0,0,0.70)_-19.37%,rgba(0,0,0,0.00)_128.25%)]'></div>

      <Breadcrumb
        items={[
          {label: 'Trang chủ', href: '/'},
          {label: 'Đội ngũ', href: ''},
          {label: 'Jimmy Vu', href: ''},
        ]}
      />
    </section>
  )
}
