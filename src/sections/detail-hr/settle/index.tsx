'use client'
import IConArrow from '@/components/icon/IConArrow'
import ImageV2 from '@/components/image/ImageV2'
import IConMessager from '@/sections/immigration/programme/IConMessager'
import ItemProgramme from '@/sections/immigration/programme/ItemProgramme'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const items = [
  'Hơn 12 năm kinh nghiệm về tư vấn di trú, đầu tư quốc tế.',
  'Mạng lưới đối tác uy tín trên toàn cầu, kết nối với đội ngũ Chuyên gia tư vấn cùng luật sư di trú.',
  'Đồng hành cùng khách hàng trong xuyên suốt hành trình kiến tạo lộ trình định cư toàn cầu.',
]

const programs = [
  {
    title: 'ĐẦU TƯ BẤT ĐỘNG SẢN ÚC',
    slug: 'dau-tu-bat-dong-san-uc',
    nation: ['Australia'],
    image: {
      src: '/imgs/detail-hr/settle-1.webp',
      alt: 'Settle 1',
    },
    investment_level: {
      title: 'Mức tăng trưởng vốn',
      value: '7 - 10%/năm',
    },
    review_time: {
      title: 'Thời gian xử lý',
      from: '18',
      to: '24',
    },
    interest: {
      title_interest: [
        'Sở hữu bất động sản vĩnh viễn',
        'Tính thanh khoản cao, hệ thống pháp lý minh bạch.',
      ],
      amount_of_benefits: '4',
    },
    tel: '0123456789',
  },
  {
    title: 'ĐẦU TƯ ĐỊNH CƯ MỸ EB-5',
    slug: 'dau-tu-dinh-cu-my-eb5',
    nation: ['US'],
    image: {
      src: '/imgs/detail-hr/settle-2.webp',
      alt: 'Settle 2',
    },
    investment_level: {
      title: 'Chi phí từ',
      value: '800.000 USD',
    },
    review_time: {
      title: 'Thời gian xử lý',
      from: '18',
      to: '24',
    },
    interest: {
      title_interest: [
        'Không yêu cầu ngoại ngữ hay trình độ học vấn.',
        'Nhận thẻ xanh vĩnh viễn cho cả gia đình.',
      ],
      amount_of_benefits: '4',
    },
    tel: '0123456789',
  },
  {
    title: 'START-UP VISA CANADA - ...',
    slug: 'start-up-visa-canada',
    nation: ['Canada'],
    image: {
      src: '/imgs/detail-hr/settle-3.webp',
      alt: 'Settle 3',
    },
    investment_level: {
      title: 'Chi phí từ',
      value: '800.000 USD',
    },
    review_time: {
      title: 'Thời gian xử lý',
      from: '18',
      to: '24',
    },
    interest: {
      title_interest: [
        'Không yêu cầu ngoại ngữ hay trình độ học vấn.',
        'Nhận thẻ xanh vĩnh viễn cho cả gia đình.',
      ],
      amount_of_benefits: '4',
    },
    tel: '0123456789',
  },
]

export default function Settle() {
  return (
    <section className='relative overflow-hidden rounded-t-[4rem] bg-white px-20 pb-[22.5rem] pt-[6.25rem] xsm:rounded-t-[1.5rem] xsm:px-4 xsm:pb-[23.125rem] xsm:pt-8'>
      <Image
        src={'/imgs/detail-hr/settle-bg-deco.webp'}
        alt='Deco'
        width={1932}
        height={963}
        className='absolute left-0 top-[10.63625rem] w-[calc(70.5rem-10.125rem)] object-cover xsm:hidden'
      />
      <div className='relative mb-16 flex items-start justify-between xsm:mb-6 xsm:flex-col'>
        <h2 className='w-[38.4375rem] font-optima text-Phase-1-Brown heading1 xsm:mb-3 xsm:w-full'>
          iCanfield Việt Nam - 12+ năm kiến tạo hành trình định cư toàn cầu
        </h2>
        <div className='w-[46.375rem] text-base font-normal leading-[155%] text-greyscaletext-body xsm:w-full xsm:text-sm xsm:leading-[150%] xsm:tracking-[-0.00875rem]'>
          <p className='mb-3.5 xsm:mb-2.5'>
            iCanfield tự hào là đơn vị tiên phong trong lĩnh vực đầu tư - định
            cư quốc tế, mang đến giải pháp toàn diện và đáng tin cậy, đồng hành
            cùng hàng trăm gia đình hiện thực hóa giấc mơ xây dựng cuộc sống bền
            vững ở nước ngoài.
          </p>
          <ul className='space-y-3 xsm:space-y-2'>
            {items.map((item, i) => (
              <li
                key={i}
                className='flex items-center space-x-2.5 xsm:space-x-2'
              >
                <Image
                  src={'/icons/detail-hr/check.svg'}
                  alt='Check'
                  width={24}
                  height={24}
                  className='size-6 object-cover xsm:size-5'
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='relative mb-10 flex items-center justify-between xsm:mb-5'>
        <h3 className='text-Phase-1-Brown heading2 xsm:tracking-[-0.025rem]'>
          Lựa chọn định cư - đầu tư toàn cầu
        </h3>
        <Link
          href='#'
          className='h-12 space-x-2 rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] py-2 pl-6 pr-3 text-sm font-medium leading-[150%] tracking-[-0.0175rem] text-white flex-center xsm:hidden'
        >
          <span>Tìm hiểu thêm</span>
          <Image
            src={'/icons/arrow-right.svg'}
            alt='Arrow Right'
            width={24}
            height={24}
            className='size-6 object-cover'
          />
        </Link>
      </div>
      <div className='relative flex space-x-6 xsm:mb-[2.13rem] xsm:flex-col xsm:space-x-0 xsm:space-y-4'>
        {programs.map((program, i) => (
          <div
            key={i}
            className='w-full overflow-hidden rounded-[1.25rem] border-[0.8px] border-solid border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11.1px_0px_rgba(114,114,114,0.08)] sm:h-fit xsm:z-[9] xsm:rounded-[0.924rem]'
          >
            <Link
              href={'/' + program?.slug}
              className='relative block h-[18.5625rem] w-full xsm:h-[14.25rem]'
            >
              <ImageV2
                className='size-full object-cover'
                width={464}
                height={297}
                alt={program?.slug}
                src={program?.image.src}
              />
              <div className='absolute inset-0 z-10 size-full bg-[linear-gradient(180deg,rgba(92,50,30,0.00)_0.15%,rgba(40,14,2,0.90)_95.57%)]'></div>
              <h3
                className='absolute bottom-[1.5rem] left-[1.5rem] z-[11] line-clamp-2 font-optima font-medium text-white heading3 sm:text-[2rem] xsm:bottom-[0.75rem] xsm:left-[0.75rem] xsm:heading2'
                dangerouslySetInnerHTML={{
                  __html: program?.title || '',
                }}
              ></h3>
            </Link>

            <div className='flex w-full items-center justify-between p-[1.25rem_1.5rem] xsm:p-3'>
              <div>
                <p className='text-greyscaletext-200 body16-m xsm:text-sm'>
                  {program.investment_level?.title || 'Mức đầu tư'}
                </p>
                <p className='text-[1.125rem] font-semibold leading-[133.3%] tracking-[-0.0225rem] text-orangetext-500 xsm:text-base xsm:leading-[150%]'>
                  {program.investment_level?.value || 'Chưa có thông tin'}
                </p>
              </div>
              <div>
                <p className='text-greyscaletext-200 body16-m xsm:text-sm'>
                  {program.review_time?.title || 'Thời gian xét duyệt'}
                </p>
                <p className='text-[1.125rem] font-semibold leading-[133.3%] tracking-[-0.0225rem] text-orangetext-500 xsm:text-base xsm:leading-[150%]'>
                  {program.review_time?.from}-{program.review_time?.to} tháng
                </p>
              </div>
            </div>

            <div className='px-[1.5rem] xsm:px-3 xsm:pt-0'>
              <div className='space-y-[0.625rem] rounded-[0.75rem] bg-background p-[0.75rem_0.75rem_1rem_0.75rem] xsm:p-[0.75rem]'>
                <div className='flex w-full items-center justify-between'>
                  <p className='text-brown body16-m xsm:body-14-m'>Quyền lợi</p>
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
            </div>

            <div className='flex items-center justify-between p-[1.25rem] xsm:space-x-[0.5rem] xsm:p-[1rem] xsm:px-3 xsm:py-3.5'>
              <Link
                target='__blank'
                href={'tel:' + program.tel}
                className='group flex cursor-pointer items-center space-x-[0.75rem]'
              >
                <div className='before:-z-1 relative rounded-[1.875rem] bg-[#F4EEEA] p-[0.875rem] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] before:opacity-0 before:transition-all before:content-[""] before:group-hover:opacity-100 xsm:p-[0.75rem]'>
                  <IConMessager className='relative size-[1.25rem] object-contain' />
                </div>
                <p className='tracking-[-0.0175rem] text-brown transition-all body-14-m group-hover:text-brown xsm:hidden'>
                  Liên hệ tư vấn
                </p>
              </Link>
              <Link
                href={'/' + program?.slug}
                className='flex cursor-pointer items-center space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:justify-center'
              >
                <p className='tracking-[-0.0175rem] text-white body-14-m'>
                  Xem chi tiết
                </p>
                <IConArrow className='size-[1.5rem]' />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='flex-center sm:hidden'>
        <Link
          href='#'
          className='h-12 space-x-2 rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] py-2 pl-6 pr-3 text-sm font-medium leading-[150%] tracking-[-0.0175rem] text-white flex-center'
        >
          <span>Tìm hiểu thêm</span>
          <Image
            src={'/icons/arrow-right.svg'}
            alt='Arrow Right'
            width={24}
            height={24}
            className='size-6 object-cover'
          />
        </Link>
      </div>
    </section>
  )
}
