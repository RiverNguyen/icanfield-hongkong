'use client'
import ImageV2 from '@/components/image/ImageV2'
import ItemAustralia from '@/components/itemAustralia'
import {fetcher} from '@/lib/swr'
import {IDataAcfDetailAustralia} from '@/types/dataAcfDetailAustralia.interface'
import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import useSWR from 'swr'

const fetcherWithCustomBase = (url: string) =>
  fetcher(url, process.env.NEXT_PUBLIC_API_ACF)

const ProjectOther = ({id}: {id: number}) => {
  const {data: dataOther} = useSWR(
    id ? `/australia-real-estat?exclude=${id}&per_page=5` : null,
    fetcherWithCustomBase,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )
console.log(dataOther)
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
      <div className='mt-8 h-[33.625rem] xsm:h-fit'>
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
          {Array.isArray(dataOther) &&
            dataOther?.map((item: IDataAcfDetailAustralia, index) => (
              <SwiperSlide
                key={index}
                className='h-full w-full [&>a]:block'
              >
                {/* fake item */}
                <ItemAustralia
                  location={item.acf.banner.location}
                  title={item.title.rendered}
                  info={Array.from(
                    Object.keys(item.acf.banner.info).map(
                      (i) => item.acf.banner.info[i],
                    ),
                  )}
                  image={item.featured_media}
                  slug={item.slug}
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
