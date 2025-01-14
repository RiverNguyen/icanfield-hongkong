'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CardPrograms from '@/sections/compare-programs/CardPrograms'

const programs = [
  {
    id: 'eb5',
    title: 'Chương trình EB-5',
    subtitle: 'Định cư Mỹ',
    flag: '/imgs/compare-programs/flag.png',
    image: 'https://placehold.co/278x220.jpg',
  },
  {
    id: 'e2',
    title: 'Chương trình E-2',
    subtitle: 'Định cư Mỹ',
    flag: '/imgs/compare-programs/flag.png',
    image: 'https://placehold.co/278x220.jpg',
  },
  {
    id: 'pei',
    title: 'Chương trình PEI',
    subtitle: 'Định cư Canada',
    flag: '/imgs/compare-programs/flag.png',
    image: 'https://placehold.co/278x220.jpg',
  },
  {
    id: 'ontario',
    title: 'Chương trình Ontario',
    subtitle: 'Định cư Canada',
    flag: '/imgs/compare-programs/flag.png',
    image: 'https://placehold.co/278x220.jpg',
  },
]

export default function Programs() {
  return (
    <div
      id='table__programs'
      className='hidden-scrollbar relative h-fit w-full px-[1rem] xsm:overflow-x-auto'
    >
      <div className='h-fit w-fit border border-solid'>
        <div className='sticky right-0 top-0 z-10 flex h-fit w-full'>
          <div className='flex-1'></div>
          <div className='flex w-[calc(19.375rem*4)] flex-shrink-0 bg-background'>
            {programs.map((program) => (
              <div
                key={program.id}
                className='relative flex h-[5rem] w-[19.375rem] items-center border-l px-[1rem]'
              >
                <Select>
                  <SelectTrigger className='h-[3rem] w-full rounded-[0.75rem] border-none shadow-[0px_1.203px_4.812px_0px_rgba(0,0,0,0.10)] outline-none ring-0 focus:ring-0'>
                    <SelectValue
                      placeholder={`${program.title} (${program.subtitle})`}
                      className='body16-m'
                    />
                  </SelectTrigger>
                  <SelectContent className='w-[17.375rem] rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]'>
                    {programs.map((p) => (
                      <SelectItem
                        key={p.id}
                        value={p.id}
                        style={{
                          transitionTimingFunction:
                            'cubic-bezier(0.5, 0, 0.3, 1)',
                        }}
                        className='flex h-[3rem] w-full cursor-pointer items-center rounded-[0.3rem] border-b border-solid border-[rgba(0,0,0,0.10)] px-[1rem] transition-all duration-300 lg:hover:bg-greyscaletext-100/50'
                      >
                        {p.title} ({p.subtitle})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
        <div className='relative grid h-fit w-full grid-cols-[1fr_19.375rem_19.375rem_19.375rem_19.375rem]'>
          <div></div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[0_1rem_1rem]'
            >
              <CardPrograms data={programs?.[0]} />
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Mục đích chương trình
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Visa tạm, sang Mỹ nhanh chóng. Cần duy trì doanh nghiệp để gia hạn
              vĩnh viễn.
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Loại hình đầu tư
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Kinh doanh trực tiếp.
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Mức đầu tư thấp nhất
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              150.000 CAD.
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Thời gian đạt mục tiêu
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Thời gian xét duyệt hồ sơ: 6 tháng.
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Thời gian tối thiểu duy trì khoản đầu tư
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Cần duy trì doanh nghiệp để giữ Visa E-2.
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Thời gian cư trú tối thiểu
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              9 tháng / năm. (để đủ điều kiện lên thường trú)
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Thành viên kèm hồ sơ
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Vợ / chồng hợp pháp. Con cái chưa kết hôn dưới 21 tuổi (Tại thời
              điểm cấp visa). Đảm bảo lý lịch an ninh & sức khỏe (như đương
              đơn).
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Số lần cần sang quốc gia để hoàn tất hồ sơ
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Toàn bộ quy trình làm từ Việt Nam. Sang Mỹ sau khi có thẻ xanh.
            </div>
          ))}
          <div className='p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE]'>
            Quyền lợi làm việc
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[1.25rem_1rem]'
            >
              Có.
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
