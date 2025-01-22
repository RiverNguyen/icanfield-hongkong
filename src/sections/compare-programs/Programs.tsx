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
import { Fragment, useEffect, useState } from 'react'

const nameKey: string[] = [
  'Tiêu chí chung',
  'Mục đích chương trình',
  'Loại hình đầu tư',
  'Mức đầu tư thấp nhất',
  'Thời gian đạt mục tiêu',
  'Thời gian tối thiểu để duy trì đầu tư',
  'Thời gian cư trú tối thiểu',
  'Thành viên có hồ sơ',
  'Số lần cần sang quốc gia để hoàn tất hồ sơ',
  'Quyền lợi làm việc',
  'Các quốc gia tự do đi lại',
  'Quyền lợi nổi bật',
  'Quyền làm việc',
  'Giáo dục',
  'Y tế',
  'Quyền lợi về thuế',
  'Quốc gia là thành viên Tổ chức / Hiệp ước',
  'Yêu cầu đương đơn',
  'Tuổi',
  'Trình độ / Kinh nghiệm quản lý',
  'Chứng minh tài sản',
  'Yêu cầu doanh nghiệp ở VN',
  'Yêu cầu ngoại ngữ',
  'Lý lịch an ninh',
  'Sức khỏe',
  'Yêu cầu về hình thức đầu tư',
  'Phương án đầu tư cụ thể',
  'Chứng minh nguồn tiền đầu tư',
  'Visa được cấp',
  'Thời hạn Visa được cấp đầu tiên',
  'Thời điểm gia hạn Visa',
  'Điều kiện gia hạn',
  'Thời gian xin lên quốc tịch (sau khi đã có visa)',
  'Quyền lợi thêm sau khi lên quốc tịch',
  'Quốc tịch',
  'Điều kiện xin lên quốc tịch',
  'Điều kiện duy trì quốc tịch',
  'Cho phép đa quốc tịch'
]

export default function Programs({ programs }: { programs: DataItem[] }) {
  console.log(programs);
  const [indexProgramsActive, setIndexProgramsActive] = useState<number[]>([-1, -1, -1, -1])
  const [keys, setKeys] = useState<string[]>([])
  const [check, setCheck] = useState<boolean>(false)
  const updateIndexValue = (index: number, newValue: number) => {
    setIndexProgramsActive((prev) => 
      prev.map((value, i) => (i === index ? newValue : value))
    );
  };
  useEffect(() => {
    if (Array.isArray(programs)) {
      setKeys(Object.keys(programs?.[0]?.compare))
    }
  }, [programs])
  console.log(keys);
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
                    if (!check) {
                      setCheck(true)
                    }
                  }}
                >
                  <SelectTrigger className='bg-white [&_p]:[&[data-placeholder]]:hidden h-[3rem] w-full rounded-[0.75rem] border-none shadow-[0px_1.203px_4.812px_0px_rgba(0,0,0,0.10)] outline-none ring-0 focus:ring-0'>
                    <SelectValue
                      placeholder={`${programs?.[indexProgramsActive[index]]?.title || 'Chọn chương trình'}`}
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
          {indexProgramsActive?.map((item: number, idx: number) => (
            <div
              key={idx}
              className='border-l border-solid p-[0_1rem_1rem] xsm:p-[0_0.75rem_0.75rem]'
            >
              {programs?.[item] && 
                <CardPrograms data={programs?.[item]} />
              }
            </div>
          ))}
          {Array.isArray(keys) && (check ? keys : keys.slice(0, 10))?.map((item: string, idx: number) => (
            <Fragment key={item}>
              <div className={cn('border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]',
                programs?.[0]?.compare?.[item] === null && 'bg-[#f8f9fa]'
              )}>
                {nameKey?.[idx]}
              </div>
              {indexProgramsActive.map((id: number, index: number) =>
                <Fragment key={item + index}>
                  {(programs?.[0]?.compare?.[item] === null) ? (
                    <div className={cn('border-t border-solid bg-[#f8f9fa]',
                      index === 0 && 'border-l'
                    )}></div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{__html: programs?.[id]?.compare?.[item] || ''}}
                      className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem] [&_ul]:list-disc [&_ul]:pl-[1rem]'
                    >
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
