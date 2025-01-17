'use client'
import Link from 'next/link'
import React from 'react'
import ImageV2 from '@/components/image/ImageV2'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper/modules'
import ItemProjectsOutstanding from '@/components/itemProjects'
import {Media} from '@/types/image.interface'
import {Location} from '@/components/itemProjects/itemProjects.interface'
import './styles.css'
export interface Project {
  id: number
  title: string
  slug: string
  permalink: string
  thumbnail: Media
  nation: Location[] // Mảng chứa các quốc gia
  type: string // Loại dự án
  project_scale: string // Quy mô dự án
  eb5_capital_ratio: string // Tỉ lệ vốn EB5
  jobs_created: string // Số lượng việc làm tạo ra
  contact: string // Liên hệ
}
const ReleatedEb5 = ({data}: {data: Project[]}) => {
  return (
    <section className=' pt-[5rem] section-container'>
      <div className='mb-[2rem] flex items-center justify-between xsm:mb-[1.5rem]'>
        <h3 className='font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown xsm:text-[1.5rem]'>
          Các dự án EB-5 khác
        </h3>
        <Link
          href={'/EB5'}
          className='flex cursor-pointer items-center justify-center rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] px-[1.5rem] py-3 xsm:hidden'
        >
          <span className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-white'>
            Xem tất cả
          </span>
          <ImageV2
            alt='icon'
            src='/imgs/detail-eb5/arrow.svg'
            width={40}
            height={40}
            className='ml-2 h-[1.5rem] w-[1.5rem]'
          />
        </Link>
      </div>
      <Swiper
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 3,
          },
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper swiper-releated-eb5'
      >
        {data &&
          data.map((item: Project, index: number) => (
            <SwiperSlide key={index}>
              <ItemProjectsOutstanding
                id={item.id}
                slug={item.slug}
                contact={item.contact}
                title={item.title}
                image={item.thumbnail}
                location={item.nation}
                type={item.type}
                project_scale={item.project_scale}
                eb5_capital_ratio={Number(item.eb5_capital_ratio)}
                jobs_created={Number(item.jobs_created)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Link
        href={'/EB5'}
        className='mx-auto flex w-fit cursor-pointer items-center justify-center rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] px-[1.5rem] py-3 sm:hidden'
      >
        <span className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-white'>
          Xem tất cả
        </span>
        <ImageV2
          alt='icon'
          src='/imgs/detail-eb5/arrow.svg'
          width={40}
          height={40}
          className='ml-2 h-[1.5rem] w-[1.5rem]'
        />
      </Link>
    </section>
  )
}

export default ReleatedEb5
