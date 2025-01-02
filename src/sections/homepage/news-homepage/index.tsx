'use client'
import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import Link from 'next/link'
import {FC, useState} from 'react'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import './style.css'

export interface INewsFlowProps {
  data: {
    title: string
    news_flow: ItemNewsFeatured[]
    news: {
      title: string
      description: string
      link: string
      news: ItemNews[]
    }[]
  }
}

const NewsFlow: FC<INewsFlowProps> = ({data}) => {
  const {title, news_flow: itemsNewsFeatured, news: itemsNews} = data
  const [latestNewsItemIndex, setLatestNewsItemIndex] = useState<number>(0)
  return (
    <section className='relative z-10 space-y-[1.5rem] bg-white pt-[2.5rem] shadow-[0px_-20px_40px_0px_rgba(0,0,0,0.03)] sm:space-y-[2.5rem] sm:rounded-[4rem_4rem_0rem_0rem] sm:p-[5rem_0_6.5rem] xsm:mb-[4rem]'>
      <h2 className='heading1 mx-auto max-w-[90rem] px-[1rem] font-optima font-semibold text-brown sm:px-0'>
        {title}
      </h2>
      <div className='mx-auto flex flex-col px-[1rem] sm:max-w-[90rem] sm:flex-row sm:px-0'>
        {itemsNewsFeatured.map((item, index) => (
          <NewsFeatured
            key={index}
            {...item}
          />
        ))}
      </div>
      <div className='relative flex max-w-[95rem] flex-wrap justify-between pb-[4rem] sm:ml-auto'>
        <div className='scrollbar-hidden mb-[1.5rem] ml-[1rem] mr-auto flex max-w-[90rem] basis-full overflow-auto border-b border-b-[#E6E6E6]'>
          {itemsNews.map((item, index) => (
            <button
              onClick={() => setLatestNewsItemIndex(index)}
              key={index}
              className={cn(
                'body-14-m relative z-10 mr-[0.94rem] py-[0.5rem] text-black/60 xsm:flex-none',
                {
                  'text-orangetext-500 after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:w-full after:rounded-[0.5rem] after:bg-orangetext-500 after:content-[""] sm:after:h-[2px]':
                    index == latestNewsItemIndex,
                },
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className='px-[1rem] sm:max-w-[21.38rem] sm:pr-[0.38rem]'>
          <h3 className='text-[1.25rem] font-bold leading-[1.66625rem] tracking-[-0.025rem] text-black/80'>
            {itemsNews[latestNewsItemIndex].title}
          </h3>
          <p className='body-14 mb-[2.2rem] mt-[0.5rem] text-black/60'>
            {itemsNews[latestNewsItemIndex].description}
          </p>
          <div className='mt-[1.5rem] flex items-center justify-center px-[1rem] sm:justify-between sm:px-0 xsm:absolute xsm:bottom-0 xsm:left-0 xsm:right-0'>
            <Link
              href={itemsNews[latestNewsItemIndex].link}
              className='flex items-center justify-center rounded-[0.5rem] bg-btn-gradient p-[0.5rem_0.75rem_0.5rem_1.5rem]'
            >
              <span className='body-14-m text-white'>Xem tất cả</span>
              <ArrowRight className='ml-[0.5rem] h-[1.3125rem] w-auto text-white' />
            </Link>
            <button className='latest-news__prev ml-auto size-[2.5rem] rounded-full bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:hidden'>
              <ArrowRight className='h-auto w-full rotate-180 text-brown' />
            </button>
            <button className='latest-news__next ml-[0.5rem] size-[2.5rem] rounded-full bg-[rgba(245,193,120,0.20)] p-[0.5rem] xsm:hidden'>
              <ArrowRight className='h-auto w-full text-brown' />
            </button>
          </div>
        </div>
        <div className='max-w-full flex-1 sm:max-w-[72.5rem]'>
          <Swiper
            loop={true}
            className='latest-news !pl-[1rem]'
            spaceBetween={20}
            breakpoints={{
              640: {
                spaceBetween: 24,
              },
            }}
            slidesPerView='auto'
            modules={[Navigation]}
            navigation={{
              nextEl: '.latest-news__next',
              prevEl: '.latest-news__prev',
            }}
          >
            {itemsNews[latestNewsItemIndex].news.map((item, index) => (
              <SwiperSlide
                key={index}
                className='!w-[14.375rem] sm:!w-[21.375rem]'
              >
                <LatestNews {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default NewsFlow

export interface ItemNews {
  id: number
  title: string
  image?: Media
  date: string
  slug: string
  categories?: {
    id: number
    name: string
    slug: string
    taxonomy: string
    primary: boolean
  }[]
}
export interface ItemNewsFeatured extends ItemNews {
  articleLogo?: Media
}

function NewsFeatured({
  title,
  image,
  date,
  slug: link,
  articleLogo,
}: ItemNewsFeatured) {
  return (
    <div className='group relative h-[15rem] flex-none overflow-hidden rounded-[1rem] sm:h-[22.125rem] sm:flex-1 sm:first:mr-[1.5rem] xsm:first:mb-[1rem]'>
      <ImageV2
        src={image ? image.url : ''}
        alt={image ? image.alt : ''}
        width={image ? image.width : 100}
        height={image ? image.height : 100}
        className='absolute left-0 top-0 h-full w-full object-cover transition-all duration-300 ease-out group-hover:scale-105'
      />
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(102deg,#3F2214_6.47%,rgba(63,34,20,0.00)_148.7%)] sm:bg-[linear-gradient(90deg,#3F2214_0%,rgba(63,34,20,0.00)_100%)]'></div>
      <div className='absolute left-0 top-0 flex h-full w-full flex-col p-[1rem] sm:p-[1.5rem]'>
        <div className='flex justify-between xsm:mt-[0.75rem]'>
          <div className='flex flex-col justify-between'>
            <p className='xsm:sub-12 sm:sub-14 basis-1/2 self-start text-white opacity-60 xsm:font-medium'>
              {date}
            </p>
            <h3 className='xsm:body16-s sm:heading6 mt-[0.75rem] max-w-[20.625rem] font-semibold text-white sm:mt-[0.5rem]'>
              {title}
            </h3>
          </div>
          {articleLogo && (
            <p className='h-[1.88rem] w-[5.23rem] self-start before:absolute before:bottom-0 before:left-0 before:h-[1.29688rem] before:w-full before:rounded-[0.34581rem] before:bg-white before:content-[""] sm:relative sm:h-[2.69rem] sm:w-[7.5rem] sm:before:h-[1.875rem] sm:before:rounded-[0.5rem] xsm:absolute xsm:right-[1rem] xsm:top-[1rem]'>
              <ImageV2
                src={articleLogo ? articleLogo.url : ''}
                alt={articleLogo ? articleLogo.alt : ''}
                width={articleLogo ? articleLogo.width : 91 * 2}
                height={articleLogo ? articleLogo.width : 33 * 2}
                className='absolute left-1/2 top-0 h-auto w-[3.968rem] -translate-x-1/2 object-contain sm:w-[5.6875rem]'
              />
            </p>
          )}
        </div>
        <Link
          href={`/blogs/${link}`}
          className='group/btn relative z-10 mt-auto inline-flex cursor-pointer items-center self-start rounded-[0.5rem] border border-white/25 p-[0.84rem_0.75rem_0.84rem_1.5rem] hover:bg-white xsm:hidden'
        >
          <span className='body-14-m text-white group-hover/btn:text-greentext'>
            Chi tiết bài viết
          </span>
          <ArrowRight className='ml-[0.5rem] h-[1.3125rem] w-auto text-white group-hover/btn:text-greentext' />
        </Link>
        <Link
          className='absolute bottom-0 left-0 right-0 top-0 group-hover:text-greentext'
          href={`/blogs/${link}`}
        ></Link>
      </div>
    </div>
  )
}

function LatestNews({title, image, date, slug: link}: ItemNews) {
  return (
    <div>
      <ImageV2
        src={image ? image.url : ''}
        alt={image ? image.alt : ''}
        width={image ? image.width : 342 * 2}
        height={image ? image.height : 171 * 2}
        className='h-[10.6875rem] w-full rounded-[1rem] object-cover'
      />
      <Link href={`/blogs/${link}`}>
        <h3 className='mb-[0.5rem] mt-[0.75rem] line-clamp-2 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
          {title}
        </h3>
      </Link>
      <p className='sub-14 font-medium text-greyscaletext-200'>{date}</p>
    </div>
  )
}
