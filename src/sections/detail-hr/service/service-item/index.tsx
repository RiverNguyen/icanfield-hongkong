'use client'
import useStore from '@/app/(store)/store'
import IConArrow from '@/components/icon/IConArrow'
import ImageV2 from '@/components/image/ImageV2'
import IConMessager from '@/sections/immigration/programme/IConMessager'
import {IService} from '@/types/dataAcfDetailHR.interface'
import Link from 'next/link'
import React from 'react'

export default function ServiceItem({service}: {service: IService}) {
  const {consultingPhoneNumber} = useStore((state) => state)

  return (
    <div
      key={service.id}
      className='w-full overflow-hidden rounded-[1.25rem] border-[0.8px] border-solid border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11.1px_0px_rgba(114,114,114,0.08)] sm:h-fit xsm:z-[9] xsm:rounded-[0.924rem]'
    >
      <Link
        href={`/${service?.nation[0]}/${service?.slug}`}
        className='relative block h-[18.5625rem] w-full xsm:h-[14.25rem]'
      >
        <ImageV2
          className='size-full object-cover'
          src={service?.featured_image}
          alt={service?.slug}
          fill
        />
        <div className='absolute inset-0 z-10 size-full bg-[linear-gradient(180deg,rgba(92,50,30,0.00)_0.15%,rgba(40,14,2,0.90)_95.57%)]'></div>
        <h4 className='absolute bottom-[1.5rem] left-[1.5rem] z-[11] line-clamp-2 font-optima font-medium text-white heading3 sm:text-[2rem] xsm:bottom-[0.75rem] xsm:left-[0.75rem] xsm:heading2'>
          {service?.title}
        </h4>
      </Link>

      <div className='flex w-full items-start justify-between p-[1.25rem_1.5rem] xsm:p-3'>
        <div>
          <p className='text-greyscaletext-200 body16-m xsm:text-sm'>
            {service?.acf?.information?.investment_level?.title || 'Mức đầu tư'}
          </p>
          <p className='text-[1.125rem] font-semibold leading-[133.3%] tracking-[-0.0225rem] text-orangetext-500 xsm:text-base xsm:leading-[150%]'>
            {service?.acf?.information?.investment_level?.value ||
              'Chưa có thông tin'}
          </p>
        </div>
        <div>
          <p className='text-greyscaletext-200 body16-m xsm:text-sm'>
            {service?.acf?.information?.review_time?.title ||
              'Thời gian xét duyệt'}
          </p>
          <p className='text-[1.125rem] font-semibold leading-[133.3%] tracking-[-0.0225rem] text-orangetext-500 xsm:text-base xsm:leading-[150%]'>
            {service?.acf?.information?.review_time?.from}-
            {service?.acf?.information?.review_time?.to} tháng
          </p>
        </div>
      </div>

      {/*<div className='px-[1.5rem] xsm:px-3 xsm:pt-0'>
      <div className='space-y-[0.625rem] rounded-[0.75rem] bg-background p-[0.75rem_0.75rem_1rem_0.75rem] xsm:p-[0.75rem]'>
        <div className='flex w-full items-center justify-between'>
          <p className='text-brown body16-m xsm:body-14-m'>
            Quyền lợi
          </p>
          <p className='flex items-center rounded-[1.5625rem] bg-[rgba(0,0,0,0.10)] p-[0.125rem_0.625rem] text-brown body-14-s xsm:text-[0.625rem] xsm:font-bold xsm:uppercase xsm:leading-[1.2] xsm:tracking-[-0.00625rem]'>
            {program?.interest?.amount_of_benefits}+
          </p>
        </div>
        <ul className='list-disc pl-[1.5rem]'>
          {Array.isArray(program?.interest?.title_interest) &&
            program?.interest?.title_interest
              .slice(0, 2)
              .map((item: string, index: number) => (
                <li
                  key={index}
                  className='text-[#5C5C5C] body16 sm:tracking-[-0.02rem] xsm:body-14'
                >
                  <p className='line-clamp-1 text-[#5C5C5C] body16 sm:tracking-[-0.02rem] xsm:body-14'>
                    {item}
                  </p>
                </li>
              ))}
        </ul>
      </div>
    </div>*/}

      <div className='flex items-center justify-between p-[1.25rem] xsm:p-[1rem] xsm:px-3 xsm:py-3.5'>
        <Link
          target='__blank'
          href={`tel:${consultingPhoneNumber}`}
          className='group flex cursor-pointer items-center space-x-[0.75rem] xsm:space-x-[0.55rem]'
        >
          <div className='before:-z-1 relative rounded-full bg-[#F4EEEA] p-[0.875rem] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] before:opacity-0 before:transition-all before:content-[""] before:group-hover:opacity-100 xsm:p-[0.55rem]'>
            <IConMessager className='relative size-[1.25rem] object-cover xsm:size-[0.78125rem]' />
          </div>
          <p className='tracking-[-0.0175rem] text-brown transition-all body-14-m group-hover:text-brown xsm:text-[0.75rem] xsm:tracking-[0.015rem]'>
            Liên hệ tư vấn
          </p>
        </Link>
        <Link
          href={`/${service?.nation[0]}/${service?.slug}`}
          className='flex h-12 cursor-pointer items-center space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:justify-center'
        >
          <p className='tracking-[-0.0175rem] text-white body-14-m'>
            Xem chi tiết
          </p>
          <IConArrow className='size-[1.5rem]' />
        </Link>
      </div>
    </div>
  )
}
