'use client'
import ImageV2 from '@/components/image/ImageV2'
import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {convertToIframe} from '@/utils/convertToIframe'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper/modules'
import 'swiper/css'
import {filterOptions, dataVideo, bannerDataImage} from './constants'

const BannerHomepage = () => {
  const haveVideo = true
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <section className='w-full h-[42.8125rem] relative xsm:h-[33.06rem] xsm:bg-background'>
      {haveVideo ? (
        <div className='banner-video absolute top-0 left-0 w-full h-full xsm:relative xsm:h-[14.625rem] rounded-bl-[0.5rem] rounded-br-[0.5rem] overflow-hidden'>
          {isClient && dataVideo.type === 'upload' ? (
            <ReactPlayer
              url={dataVideo.url}
              playing
              loop
              muted
              width='100%'
              height='100%'
              className='!w-full !h-full object-cover [&__video]:object-cover'
            />
          ) : (
            isClient && (
              <ReactPlayer
                url={convertToIframe(dataVideo)}
                playing
                loop
                muted
                width='100%'
                height='100%'
                className='!w-full !h-full object-cover [&_div_iframe]:object-cover'
              />
            )
          )}
        </div>
      ) : (
        <div className='absolute top-0 left-0 w-full h-full z-[0] xsm:relative xsm:h-[14.625rem]'>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            modules={[Autoplay]}
            className='mySwiper !h-full'
          >
            {bannerDataImage.map((item, index) => (
              <SwiperSlide
                key={index}
                className='!h-full'
              >
                <ImageV2
                  src={item}
                  alt='banner'
                  width={1920}
                  height={600}
                  className='object-cover w-full h-full'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className='overlay absolute z-[1] w-full h-full opacity-[0.24] bg-[linear-gradient(180deg,rgba(150,146,142,0.00)_55.02%,#96928E_95.27%)] xsm:hidden'></div>
      <ImageV2
        src='/imgs/homepage/banner/d-text.png'
        alt='banner'
        width={560}
        height={173}
        className='absolute top-[17.31rem] left-1/2 -translate-x-1/2  w-[22.02719rem] h-[6.76769rem] object-contain z-[2] xsm:hidden'
      />
      <div className='banner-filter xsm:hidden w-[71.5rem] bg-[#fff] absolute h-[4.19rem] bottom-[3.81rem] left-1/2 -translate-x-1/2 rounded-[0.75rem] flex z-[2]'>
        <div className='w-[0.75rem] bg-[linear-gradient(180deg,#95502F_20.03%,#F5C178_100%)] h-full rounded-tl-[0.75rem] rounded-bl-[0.75rem]'></div>
        <div className='w-full flex items-center justify-between h-full p-[0.5rem] '>
          <div className='flex items-center justify-between flex-1 h-full'>
            {filterOptions.map((item, index) => (
              <React.Fragment key={index}>
                <div className='flex items-center px-3 h-full w-full hover:bg-[rgba(60,8,8,0.08)] rounded-[0.5rem] transition-all duration-300 cursor-pointer'>
                  <div className='flex items-center justify-center bg-[rgba(18,18,18,0.08)] p-[0.62rem] rounded-[0.5rem] mr-[0.75rem]'>
                    <ImageV2
                      src={item?.icon}
                      alt='icon'
                      width={20}
                      height={20}
                      className='size-[1.25rem] object-contain'
                    />
                  </div>
                  <div className='flex flex-col flex-1 justify-between'>
                    <span className='text-[0.625rem] font-medium leading-[150%] text-greyscaletext-100'>
                      {item?.label}
                    </span>
                    <div className='flex items-center justify-between cursor-pointer'>
                      <span className='text-Phase-1-Brown text-[1rem] font-medium leading-[1.5] tracking-[0.02rem] line-clamp-1'>
                        {item?.selected}
                      </span>
                      <ImageV2
                        src='/icons/homepage/banner/arrow-down.svg'
                        alt='arrow'
                        width={10}
                        height={10}
                        className='size-[1.125rem] object-contain'
                      />
                    </div>
                  </div>
                </div>
                {index < filterOptions.length - 1 && (
                  <div className='line w-[0.0625rem] bg-[rgba(0,0,0,0.10)] rounded-[0.1875rem] h-[2.75rem] mx-[0.5rem]'></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <button className='flex items-center justify-center bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)] rounded-[0.5rem] px-[2rem] h-full flex-shrink-0 ml-2'>
            <ImageV2
              src='/icons/homepage/banner/search.svg'
              alt='filter'
              width={40}
              height={40}
              className='size-[1.5rem] object-contain mr-[0.62rem]'
            />
            <span className='text-white text-[1rem] font-semibold leading-[1.5]'>
              Tìm kiếm
            </span>
          </button>
        </div>
      </div>
      <div className='banner-filter-mb sm:hidden p-4 rounded-[0.75rem] bg-white shadow-[0px_-8px_60px_0px_rgba(3,33,7,0.08)] w-[21.4375rem] mx-auto -translate-y-[1.5rem] flex flex-col'>
        <div className='flex flex-col items-center justify-between flex-1 h-full'>
          {filterOptions.map((item, index) => (
            <React.Fragment key={index}>
              <div className='flex h-full w-full hover:bg-[rgba(60,8,8,0.08)] rounded-[0.5rem] transition-all duration-300 cursor-pointer'>
                <div className='flex items-center justify-center bg-[rgba(18,18,18,0.08)] p-[0.62rem] rounded-[0.5rem] mr-[0.75rem]'>
                  <ImageV2
                    src={item?.icon}
                    alt='icon'
                    width={20}
                    height={20}
                    className='size-[1.25rem] object-contain'
                  />
                </div>
                <div className='flex flex-col flex-1 justify-between'>
                  <span className='text-[0.625rem] font-medium leading-[150%] text-greyscaletext-100'>
                    {item?.label}
                  </span>
                  <div className='flex items-center justify-between cursor-pointer'>
                    <span className='text-Phase-1-Brown text-[1rem] font-medium leading-[1.5] tracking-[0.02rem] line-clamp-1'>
                      {item?.selected}
                    </span>
                    <ImageV2
                      src='/icons/homepage/banner/arrow-down.svg'
                      alt='arrow'
                      width={10}
                      height={10}
                      className='size-[1.125rem] object-contain'
                    />
                  </div>
                </div>
              </div>
              {index < filterOptions.length - 1 && (
                <div className='line h-[0.0625rem] bg-[rgba(0,0,0,0.10)] rounded-[0.1875rem] w-full my-4'></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <button className='flex items-center justify-center bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)] rounded-[0.5rem] py-3 h-full flex-shrink-0 mt-4'>
          <ImageV2
            src='/icons/homepage/banner/search.svg'
            alt='filter'
            width={20}
            height={20}
            className='size-[1.5rem] object-contain mr-[0.62rem]'
          />
          <span className='text-white text-[0.875rem] font-semibold leading-[1.5]'>
            Tìm kiếm
          </span>
        </button>
      </div>
    </section>
  )
}

export default BannerHomepage
