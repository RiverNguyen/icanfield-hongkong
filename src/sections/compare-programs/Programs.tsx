'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import CardPrograms from '@/sections/compare-programs/CardPrograms'
import { DataItem } from '@/types/comparePrograms.interface'
import { useState } from 'react'

export default function Programs({ programs }: { programs: DataItem[] }) {
  const [indexProgramsActive, setIndexProgramsActive] = useState<number[]>([0, 1, 2, 3])
  const updateIndexValue = (index: number, newValue: number) => {
    setIndexProgramsActive((prev) => 
      prev.map((value, i) => (i === index ? newValue : value))
    );
  };
  return (
    <div
      id='table__programs'
      className='section-container hidden-scrollbar relative h-fit w-full px-[1rem] xsm:overflow-x-auto'
    >
      <div className='h-fit w-fit border border-solid'>
        <div
          id='taskbar__sticky'
          className={cn(
            'relative z-10 flex h-fit w-full transition-all duration-500 sm:sticky sm:right-0 sm:top-[6.4rem]',
          )}
        >
          <div className='flex-1 xsm:w-[6.25rem]'></div>
          <div className='flex w-[calc(19.375rem*4)] flex-shrink-0 bg-background xsm:w-[calc(13.125rem*4)]'>
            {indexProgramsActive?.map((item, index: number) => (
              <div
                key={index}
                className='relative flex h-[5rem] w-[19.375rem] items-center border-l px-[1rem] xsm:h-[4.5rem] xsm:w-[13.125rem] xsm:px-[0.75rem]'
              >
                <Select
                  onValueChange={(value) => {
                    updateIndexValue(index, Number(value))
                  }}
                >
                  <SelectTrigger className='bg-white [&_p]:[&[data-placeholder]]:hidden h-[3rem] w-full rounded-[0.75rem] border-none shadow-[0px_1.203px_4.812px_0px_rgba(0,0,0,0.10)] outline-none ring-0 focus:ring-0'>
                    <SelectValue
                      placeholder={`${programs?.[index].title}`}
                      className='body16-m xsm:sub-12-m'
                    />
                    <p className='w-full line-clamp-1 text-start'>{programs?.[item]?.title}</p>
                  </SelectTrigger>
                  <SelectContent className='w-[17.375rem] rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]'>
                    {programs?.map((p: DataItem, i: number) => {
                      if (indexProgramsActive.includes(i)) {
                        return null; // Không render gì nếu i tồn tại trong indexProgramsActive
                      }
                      return (
                        <SelectItem
                          key={p?.id}
                          value={String(i)}
                          style={{
                            transitionTimingFunction:
                              'cubic-bezier(0.5, 0, 0.3, 1)',
                          }}
                          className='!flex pointer-events-auto [&_p]:line-clamp-2 h-[3rem] w-full cursor-pointer items-center rounded-[0.3rem] border-b border-solid border-[rgba(0,0,0,0.10)] px-[1rem] transition-all duration-300 lg:hover:bg-greyscaletext-100/50'
                        >
                          <p dangerouslySetInnerHTML={{ __html: p?.title }}></p>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
        <div className='relative grid h-fit w-full grid-cols-[1fr_19.375rem_19.375rem_19.375rem_19.375rem] xsm:grid-cols-[6.25rem_13.125rem_13.125rem_13.125rem_13.125rem]'>
          <div></div>
          {indexProgramsActive?.map((item: number) => (
            <div
              key={programs?.[item]?.id}
              className='border-l border-solid p-[0_1rem_1rem] xsm:p-[0_0.75rem_0.75rem]'
            >
              <CardPrograms data={programs?.[item]} />
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Mục đích chương trình
          </div>
          {indexProgramsActive.map((id: number) => (
            <div
              key={id}
              dangerouslySetInnerHTML={{__html: programs?.[id]?.compare?.program_purpose}}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Loại hình đầu tư
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.investment_type}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Mức đầu tư thấp nhất
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              key={item}
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.lowest_investment_level}}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thời gian đạt mục tiêu
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.time_to_reach_target}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thời gian tối thiểu duy trì khoản đầu tư
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.minimum_time_to_maintain_investment}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thời gian cư trú tối thiểu
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.minimum_residence_period}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thành viên kèm hồ sơ
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.member_with_profile}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Số lần cần sang quốc gia để hoàn tất hồ sơ
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.number_of_times_you_need}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Quyền lợi làm việc
          </div>
          {indexProgramsActive?.map((item: number) => (
            <div
              dangerouslySetInnerHTML={{__html: programs?.[item]?.compare?.working_benefits}}
              key={item}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
