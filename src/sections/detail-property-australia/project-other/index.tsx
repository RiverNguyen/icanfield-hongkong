'use client'
import ImageV2 from '@/components/image/ImageV2'
import ItemProjectsOutstanding from '@/components/itemProjects'
import {IProject} from '@/components/itemProjects/itemProjects.interface'
import {fetcher} from '@/lib/swr'
import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import useSWR from 'swr'

const data = [
  {
    id: 222,
    location: [
      {
        id: 11,
        name: 'Canada',
        slug: 'canada',
        taxonomy: 'string',
        primary: true,
      },
    ],
    slug: 'Dự-án-Hudson-Yards',
    title: 'Dự án Hudson Yards',
    image: {
      ID: 88,
      id: 88,
      title: 'bacgroud',
      filename: 'sss',
      filesize: 59961081,
      url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
      link: 'string',
      alt: 'string',
      author: 'string',
      description: 'string',
      caption: 'string',
      name: 'string',
      status: 'string',
      uploaded_to: 1,
      date: 'string',
      modified: 'string',
      menu_order: 1,
      mime_type: 'string',
      type: 'string',
      subtype: 'string',
      icon: 'string',
      width: 1622,
      height: 800,
    },
    type: '',
    project_scale: 2,
    eb5_capital_ratio: 2,
    jobs_created: 2,
    contact: 'string',
  },
]
const fetcherWithCustomBase = (url: string) =>
  fetcher(url, process.env.NEXT_PUBLIC_API_PASSPORT)
const ProjectOther = ({id}: {id: number}) => {
  const {data: dataOther} = useSWR(
    id ? `/australia-real-estat?exclude=${id}&per_page=5` : null,
    fetcherWithCustomBase,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )
  return (
    <section className='mt-[6.25rem] section-container xsm:mt-8'>
      <div className='flex w-full items-end justify-between'>
        <h1 className='font-optima font-semibold tracking-[-0.045rem] text-orangetext-900 heading1 xsm:text-2xl xsm:leading-[1.2]'>
          Các dự án khác
        </h1>
        <button className='flex h-[3rem] items-center justify-center rounded-[0.5rem] bg-btn-gradient px-[0.75rem] pl-[1.5rem] xsm:hidden'>
          <span className='body14 font-medium -tracking-[0.0175rem] text-white'>
            Xem tất cả
          </span>
          <ImageV2
            src='/icons/arrow-right.svg'
            width={50}
            height={50}
            alt=''
            className='ml-2 h-6 w-6 object-cover'
          />
        </button>
      </div>
      <div className='mt-8 h-[33.625rem] xsm:h-[27.375rem]'>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={24}
          slidesPerView={1}
          navigation={true}
          modules={[Pagination]}
          pagination={{
            el: '.pagination-project-other',
            clickable: true,
            bulletClass:
              'w-2 h-2 bg-Phase-1-Brown/40 rounded-full transition-all duration-300',
            bulletActiveClass: '!bg-Phase-1-Brown w-6',
            renderBullet: function (index, className) {
              return `<button class='${className}'></button>`
            },
          }}
          className='h-full w-full'
        >
          {data?.map((item: IProject, index) => (
            <SwiperSlide
              key={index}
              className='h-full w-full [&>a]:block'
            >
              {/* fake item */}
              <ItemProjectsOutstanding
                key={index}
                {...item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='mt-6 hidden w-full flex-col items-center xsm:flex'>
        <div className='pagination-project-other flex justify-center space-x-2'></div>
        <button className='mt-7 hidden h-[3rem] items-center justify-center rounded-[0.5rem] bg-btn-gradient px-[0.75rem] pl-[1.5rem] xsm:flex'>
          <span className='body14 font-medium -tracking-[0.0175rem] text-white'>
            Xem tất cả
          </span>
          <ImageV2
            src='/icons/arrow-right.svg'
            width={50}
            height={50}
            alt=''
            className='ml-2 h-6 w-6 object-cover'
          />
        </button>
      </div>
    </section>
  )
}
export default ProjectOther
