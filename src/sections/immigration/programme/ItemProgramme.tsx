'use client'
import useStore from '@/app/(store)/store'
import IConArrow from '@/components/icon/IConArrow'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import IConMessager from '@/sections/immigration/programme/IConMessager'
import {dataProgramsAcf} from '@/types/dataAcfImmigration.interface'
import Link from 'next/link'

export default function ItemProgramme({
  className,
  dataPostProgramme,
  slug,
}: {
  className?: string
  dataPostProgramme: dataProgramsAcf
  slug: string
}) {
  const isMobile = useIsMobile()
  const {consultingPhoneNumber} = useStore((state) => state)
  return (
    <div
      className={cn(
        'w-full rounded-[1.25rem] border-[0.8px] border-solid border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11.1px_0px_rgba(114,114,114,0.08)] sm:h-fit xsm:z-[9]',
        className,
      )}
    >
      <Link
        href={'/' + slug + '/' + dataPostProgramme?.slug}
        className='relative block h-[18.5625rem] w-full rounded-[1.25rem] xsm:h-[14.25rem]'
      >
        <ImageV2
          className='size-full rounded-[1.25rem] object-cover'
          width={464}
          height={297}
          alt={dataPostProgramme?.slug}
          src={dataPostProgramme?.featured_image}
        />
        <div className='absolute inset-0 z-10 size-full rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(92,50,30,0.00)_0.15%,rgba(40,14,2,0.90)_95.57%)]'></div>
        <h3
          className='absolute bottom-[1.5rem] left-[1.5rem] z-[11] line-clamp-2 font-optima font-medium text-white heading3 sm:text-[2rem] xsm:bottom-[4.81rem] xsm:left-[1rem] xsm:heading2'
          dangerouslySetInnerHTML={{__html: dataPostProgramme?.title || ''}}
        ></h3>
        {isMobile && (
          <div className='absolute bottom-[0.5rem] z-[11] flex w-full items-center space-x-[0.5rem] px-[0.5rem] sm:hidden'>
            <div className='flex-1 rounded-[0.5rem] bg-[rgba(237,237,237,0.16)] p-[0.5rem_0.75rem]'>
              <p className='text-[rgba(255,255,255,0.85)] body-14-m'>
                {dataPostProgramme?.acf?.information?.investment_level?.title ||
                  'Mức đầu tư'}
              </p>
              <p className='text-white body16-s'>
                {dataPostProgramme?.acf?.information?.investment_level?.value ||
                  'Chưa có thông tin'}
              </p>
            </div>
            <div className='flex-1 rounded-[0.5rem] bg-[rgba(237,237,237,0.16)] p-[0.5rem_0.75rem]'>
              <p className='text-[rgba(255,255,255,0.85)] body-14-m'>
                {dataPostProgramme?.acf?.information?.review_time?.title ||
                  'Thời gian xét duyệt'}
              </p>
              <p className='text-white body16-s'>
                {dataPostProgramme?.acf?.information?.review_time?.from}-
                {dataPostProgramme?.acf?.information?.review_time?.to} tháng
              </p>
            </div>
          </div>
        )}
      </Link>
      {!isMobile && (
        <div className='flex w-full items-center justify-between p-[1.25rem_1.5rem] xsm:hidden'>
          <div>
            <p className='text-greyscaletext-200 body16-m'>
              {dataPostProgramme?.acf?.information?.investment_level?.title ||
                'Mức đầu tư'}
            </p>
            <p className='text-[1.125rem] font-semibold leading-[133.3%] tracking-[-0.0225rem] text-orangetext-500'>
              {dataPostProgramme?.acf?.information?.investment_level?.value ||
                'Chưa có thông tin'}
            </p>
          </div>
          <div>
            <p className='text-greyscaletext-200 body16-m'>
              {dataPostProgramme?.acf?.information?.review_time?.title ||
                'Thời gian xét duyệt'}
            </p>
            <p className='text-[1.125rem] font-semibold leading-[133.3%] tracking-[-0.0225rem] text-orangetext-500'>
              {dataPostProgramme?.acf?.information?.review_time?.from}-
              {dataPostProgramme?.acf?.information?.review_time?.to} tháng
            </p>
          </div>
        </div>
      )}
      {/* {dataPostProgramme?.acf?.interest?.title_interest ? (
        <div className='px-[1.5rem] xsm:p-[1rem_1rem_0rem_1rem]'>
          <div className='space-y-[0.625rem] rounded-[0.75rem] bg-background p-[0.75rem_0.75rem_1rem_0.75rem] xsm:p-[0.75rem]'>
            <div className='flex w-full items-center justify-between'>
              <p className='text-brown body16-m xsm:body-14-m'>Quyền lợi</p>
              <p className='flex items-center rounded-[1.5625rem] bg-[rgba(0,0,0,0.10)] p-[0.125rem_0.625rem] text-brown body-14-s xsm:text-[0.625rem] xsm:font-bold xsm:uppercase xsm:leading-[1.2] xsm:tracking-[-0.00625rem]'>
                {dataPostProgramme?.acf?.interest?.amount_of_benefits}+
              </p>
            </div>
            <ul className='list-disc pl-[1.5rem]'>
              {Array.isArray(
                dataPostProgramme?.acf?.interest?.title_interest
              ) &&
                dataPostProgramme?.acf?.interest?.title_interest
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
        </div>
      ) : (
        <div className='flex h-[8rem] w-full'></div>
      )} */}
      <div className='flex items-center justify-between p-[1.25rem] xsm:space-x-[0.5rem] xsm:p-[1rem]'>
        <Link
          target='__blank'
          href={'tel:' + consultingPhoneNumber}
          className='group flex cursor-pointer items-center space-x-[0.75rem]'
        >
          <div className='rounded-[1.875rem] bg-[#F4EEEA] p-[0.875rem] transition-all group-hover:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] xsm:p-[0.75rem]'>
            <IConMessager className='size-[1.25rem] object-contain' />
          </div>
          <p className='tracking-[-0.0175rem] text-brown transition-all body-14-m group-hover:text-brown xsm:hidden'>
            Liên hệ tư vấn
          </p>
        </Link>
        <Link
          href={'/' + slug + '/' + dataPostProgramme?.slug}
          className='flex cursor-pointer items-center space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:flex-1 xsm:justify-center'
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
