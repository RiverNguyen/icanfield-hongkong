'use client'
import IConArrow from '@/components/icon/IConArrow'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import IConMessager from '@/sections/immigration/programme/IConMessager'
import { dataProgramsAcf } from '@/types/dataAcfImmigration.interface'
import Link from 'next/link'

export default function ItemProgramme({ className,dataPostProgramme, slug }: { className?: string, dataPostProgramme: dataProgramsAcf, slug: string }) {
  const isMobile = useIsMobile()
  return (
    <div
      className={cn(
        'sm:h-[36.75rem] w-full rounded-[1.25rem] border-[0.8px] border-solid border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11.1px_0px_rgba(114,114,114,0.08)]',
        className
      )}
    >
      <div className="w-full h-[18.5625rem] xsm:h-[14.25rem] relative rounded-[1.25rem]">
        <ImageV2
          className="size-full object-cover rounded-[1.25rem]"
          width={464}
          height={297}
          alt={dataPostProgramme?.slug}
          src={dataPostProgramme?.featured_image}
        />
        <div className="absolute size-full inset-0 rounded-[1.25rem] z-10 bg-[linear-gradient(180deg,rgba(92,50,30,0.00)_0.15%,rgba(40,14,2,0.90)_95.57%)]"></div>
        <h3 className="absolute z-[11] bottom-[1.5rem] left-[1.5rem] xsm:left-[1rem] xsm:bottom-[4.81rem] line-clamp-1 heading3 xsm:heading2 font-medium text-white">
          {dataPostProgramme?.title}
        </h3>
        {isMobile && (
          <div className="flex items-center space-x-[0.5rem] sm:hidden">
            <div className="p-[0.5rem_0.75rem] flex-1 rounded-[0.5rem] bg-[rgba(237,237,237,0.16)] blur-[10px]">
              <p className="body-14-m text-[rgba(255,255,255,0.85)]">
                {dataPostProgramme?.acf?.information?.investment_level?.title}
              </p>
              <p className="body16-s text-white">{dataPostProgramme?.acf?.information?.investment_level?.value}</p>
            </div>
            <div>
              <p className="body-14-m text-[rgba(255,255,255,0.85)]">
                {dataPostProgramme?.acf?.information?.review_time?.title}
              </p>
              <p className="body16-s text-white">
                {dataPostProgramme?.acf?.information?.review_time?.from}-{dataPostProgramme?.acf?.information?.review_time?.to} tháng
              </p>
            </div>
          </div>
        )}
      </div>
      {!isMobile && (
        <div className="xsm:hidden w-full p-[1.25rem_1.5rem] flex items-center justify-between">
          <div>
            <p className="body16-m text-greyscaletext-200">{dataPostProgramme?.acf?.information?.investment_level?.title}</p>
            <p className="text-[1.125rem] text-orangetext-500 font-semibold leading-[133.3%] tracking-[-0.0225rem]">
              {dataPostProgramme?.acf?.information?.investment_level?.value}
            </p>
          </div>
          <div>
            <p className="body16-m text-greyscaletext-200">{dataPostProgramme?.acf?.information?.review_time?.title}</p>
            <p className="text-[1.125rem] text-orangetext-500 font-semibold leading-[133.3%] tracking-[-0.0225rem]">
              {dataPostProgramme?.acf?.information?.review_time?.from}-{dataPostProgramme?.acf?.information?.review_time?.to} tháng
            </p>
          </div>
        </div>
      )}
      <div className="px-[1.5rem] xsm:p-[1rem_1rem_0rem_1rem]">
        <div className="space-y-[0.625rem] p-[0.75rem_0.75rem_1rem_0.75rem] xsm:p-[0.75rem] rounded-[0.75rem] bg-background">
          <div className="flex items-center justify-between w-full">
            <p className="body16-m text-brown xsm:body-14-m">Quyền lợi</p>
            <p className="flex items-center p-[0.125rem_0.625rem] rounded-[1.5625rem] bg-[rgba(0,0,0,0.10)] body-14-s xsm:text-[0.625rem] xsm:font-bold xsm:leading-[1.2] xsm:tracking-[-0.00625rem] xsm:uppercase text-brown">
              {dataPostProgramme?.acf?.interest?.amount_of_benefits}+
            </p>
          </div>
          <ul className="list-disc pl-[1.5rem]">
            {Array.isArray(dataPostProgramme?.acf?.interest?.title_interest) && dataPostProgramme?.acf?.interest?.title_interest?.map((e: {title: string}, index: number) => (
              <li key={index} className="body16 xsm:body-14 sm:tracking-[-0.02rem] text-[#5C5C5C]">
                <p className="body16 xsm:body-14 sm:tracking-[-0.02rem] text-[#5C5C5C] line-clamp-1">
                  {e?.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center p-[1.25rem] xsm:p-[1rem] xsm:space-x-[0.5rem]">
        <Link
          href={'#'}
          className="group cursor-pointer flex items-center space-x-[0.75rem]"
        >
          <div className="transition-all group-hover:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] p-[0.875rem] xsm:p-[0.75rem] rounded-[1.875rem] bg-[#F4EEEA]">
            <IConMessager className="size-[1.25rem] object-contain" />
          </div>
          <p className="xsm:hidden group-hover:text-brown transition-all body-14-m tracking-[-0.0175rem] text-brown">
            Liên hệ tư vấn
          </p>
        </Link>
        <Link
          href={'/' + slug + '/' + dataPostProgramme?.slug}
          className="xsm:flex-1 cursor-pointer flex items-center space-x-[0.5rem] p-[0.5rem_0.75rem_0.5rem_1.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]"
        >
          <p className="body-14-m tracking-[-0.0175rem] text-white">
            Xem chi tiết
          </p>
          <IConArrow className="size-[1.5rem]" />
        </Link>
      </div>
    </div>
  )
}
