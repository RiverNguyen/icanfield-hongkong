'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {cn} from '@/lib/utils'
import CardPrograms from '@/sections/compare-programs/CardPrograms'

// Import GSAP và ScrollTrigger
// import {gsap} from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'
// import {useEffect, useState} from 'react'

// gsap.registerPlugin(ScrollTrigger)

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
  // const [isFixed, setIsFixed] = useState(false)

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const header = document.querySelector('header')
  //     const table = document.querySelector('#table__programs')
  //     const taskbar = document.querySelector('#taskbar__sticky')

  //     if (window.innerWidth < 640 && header && table && taskbar) {
  //       ScrollTrigger.create({
  //         trigger: table,
  //         start: `top ${header.getBoundingClientRect().bottom}px`,
  //         end: `bottom-=50px ${taskbar.getBoundingClientRect().height + header?.getBoundingClientRect().height}px`,
  //         scrub: true,
  //         markers: true,
  //         onEnter: () => {
  //           setIsFixed(true)
  //         },
  //         onEnterBack: () => {
  //           setIsFixed(true)
  //         },
  //         onLeave: () => {
  //           setIsFixed(false)
  //         },
  //         onLeaveBack: () => {
  //           setIsFixed(false)
  //         },
  //       })
  //     }
  //   }
  // }, [])

  return (
    <div
      id='table__programs'
      className='hidden-scrollbar relative h-fit w-full px-[1rem] xsm:overflow-x-auto'
    >
      <div className='h-fit w-fit border border-solid'>
        <div
          id='taskbar__sticky'
          className={cn(
            'relative z-10 flex h-fit w-full transition-all duration-500 sm:sticky sm:right-0 sm:top-[6.4rem]',
            // isFixed &&
            //   'overflow-x-auto transition-all duration-500 xsm:fixed xsm:top-[3.72rem]',
          )}
        >
          <div className='flex-1 xsm:w-[6.25rem]'></div>
          <div className='flex w-[calc(19.375rem*4)] flex-shrink-0 bg-background xsm:w-[calc(13.125rem*4)]'>
            {programs.map((program) => (
              <div
                key={program.id}
                className='relative flex h-[5rem] w-[19.375rem] items-center border-l px-[1rem] xsm:h-[4.5rem] xsm:w-[13.125rem] xsm:px-[0.75rem]'
              >
                <Select>
                  <SelectTrigger className='h-[3rem] w-full rounded-[0.75rem] border-none shadow-[0px_1.203px_4.812px_0px_rgba(0,0,0,0.10)] outline-none ring-0 focus:ring-0'>
                    <SelectValue
                      placeholder={`${program.title} (${program.subtitle})`}
                      className='body16-m xsm:sub-12-m'
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
        <div className='relative grid h-fit w-full grid-cols-[1fr_19.375rem_19.375rem_19.375rem_19.375rem] xsm:grid-cols-[6.25rem_13.125rem_13.125rem_13.125rem_13.125rem]'>
          <div></div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-solid p-[0_1rem_1rem] xsm:p-[0_0.75rem_0.75rem]'
            >
              <CardPrograms data={programs?.[0]} />
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Mục đích chương trình
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Visa tạm, sang Mỹ nhanh chóng. Cần duy trì doanh nghiệp để gia hạn
              vĩnh viễn.
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Loại hình đầu tư
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Kinh doanh trực tiếp.
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Mức đầu tư thấp nhất
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              150.000 CAD.
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thời gian đạt mục tiêu
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Thời gian xét duyệt hồ sơ: 6 tháng.
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thời gian tối thiểu duy trì khoản đầu tư
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Cần duy trì doanh nghiệp để giữ Visa E-2.
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thời gian cư trú tối thiểu
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              9 tháng / năm. (để đủ điều kiện lên thường trú)
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Thành viên kèm hồ sơ
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Vợ / chồng hợp pháp. Con cái chưa kết hôn dưới 21 tuổi (Tại thời
              điểm cấp visa). Đảm bảo lý lịch an ninh & sức khỏe (như đương
              đơn).
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Số lần cần sang quốc gia để hoàn tất hồ sơ
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Toàn bộ quy trình làm từ Việt Nam. Sang Mỹ sau khi có thẻ xanh.
            </div>
          ))}
          <div className='border-t p-[1.25rem_1rem] text-[1rem] font-semibold leading-normal tracking-[-0.02rem] text-[#121212DE] xsm:p-[0.75rem]'>
            Quyền lợi làm việc
          </div>
          {programs.map((program) => (
            <div
              key={program.id}
              className='border-l border-t border-solid p-[1.25rem_1rem] xsm:p-[0.75rem]'
            >
              Có.
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
