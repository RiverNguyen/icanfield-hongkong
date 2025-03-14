'use client'
import ImageV2 from '@/components/image/ImageV2'
import {ICountry} from '@/components/LeafletMap'
import dynamic from 'next/dynamic'
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
})
import {Media} from '@/types/image.interface'
import {FeatureCollection} from 'geojson'
import Link from 'next/link'
import {Suspense, useEffect, useState} from 'react'
import 'swiper/css'
import {Swiper, SwiperSlide} from 'swiper/react'
import {
  DataMapHomepage,
  MapData,
} from '@/sections/homepage/map-discover/dataMap.interface'
import fetchData from '@/fetch/fetchData'
import './styles.css'
import {Loading} from '@/components/Loading'

export interface IMapDiscoverProps {
  data: {
    logo: Media
    slogan: string
    title: string
    description: string
  }
}

const MapDiscover = ({
  data,
  dataMap,
}: {
  data: IMapDiscoverProps['data']
  dataMap: DataMapHomepage
}) => {
  const [navbarNationalitiesActive, setNavbarNationalitiesActive] = useState(
    dataMap.map_data[0].data_nation[0]?.label || 'Unknown',
  )
  const [geoData, setGeoData] = useState(null)
  useEffect(() => {
    fetch('/geojson/custom.geo.json')
      .then((response) => response.json())
      .then((data) => setGeoData(data))
  }, [])
  const [isChangeCountry, setIsChangeCountry] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [urlImageButton, setUrlImageButton] = useState(
    dataMap.map_data[0]?.image_button || '/imgs/default-flag.png',
  )
  const [dataPost, setDataPost] = useState(dataMap.posts) // data posts
  const [slugData, setSlugData] = useState(dataMap.map_data[0]?.slug || '')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  // handle click navbar nationalities
  const handleNavbarNationalities = (
    value: string,
    flag: string,
    slug: string,
  ) => {
    setUrlImageButton(flag)
    setNavbarNationalitiesActive(value)
    setIsChangeCountry(true)
    setSlugData(slug)
  }
  useEffect(() => {
    setIsLoading(true)
    const dataPost = {
      api: `/latest-posts/${slugData}`,
      option: {
        next: {revalidate: 10},
      },
    }
    const fetchDataPost = async () => {
      try {
        const response = await fetchData(dataPost)
        setDataPost(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchDataPost()
  }, [slugData])
  //handle zoom map
  const [isZoomInClick, setIsZoomInClick] = useState(false)
  const [isZoomOutClick, setIsZoomOutClick] = useState(false)
  const handleZoomIn = () => {
    setIsZoomInClick(!isZoomInClick)
  }
  const handleZoomOut = () => {
    setIsZoomOutClick(!isZoomOutClick)
  }
  return (
    <section className='map-discover'>
      <div className='map-discover__header relative flex items-start pb-[4.94rem] xsm:flex-col xsm:pb-[3rem]'>
        <div className='relative z-10 ml-[11rem] xsm:mx-auto'>
          <ImageV2
            src={data.logo.url || ''}
            alt={data.logo.alt}
            width={data.logo.width * 2 || 40}
            height={data.logo.height * 2 || 40}
            className='h-[9.63756rem] w-[35.37506rem] object-contain xsm:h-[4.76769rem] xsm:w-[17.5rem]'
          />
          <span className='absolute bottom-0 right-0 font-optima text-[1.375rem] leading-[1.3] tracking-[-0.055rem] text-brown xsm:text-[0.75rem]'>
            {data.slogan}
          </span>
        </div>
        <div className='ml-[4.81rem] w-[38.5rem] sm:z-10 xsm:ml-0 xsm:mt-[2.5rem] xsm:w-full xsm:px-4'>
          <h2 className='mb-[1.19rem] font-optima text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.09rem] text-brown xsm:mb-[1.25rem] xsm:w-full xsm:text-[1.25rem] xsm:tracking-[-0.025rem]'>
            {data.title}
          </h2>
          <div
            className='[&_p]:mb-[1rem] [&_p]:text-[0.875rem] [&_p]:leading-[1.5] [&_p]:text-greyscaletext-800 xsm:[&_p]:mb-[0.75rem] xsm:[&_p]:text-[0.875rem]'
            dangerouslySetInnerHTML={{__html: data.description || ''}}
          ></div>
        </div>
        <ImageV2
          src={'/imgs/homepage/map-discover/city-final-2.png'}
          alt='Map'
          width={1600}
          height={700}
          className='absolute bottom-[1rem] left-0 h-[14.4rem] w-[67.8rem] object-cover xsm:hidden'
        />
      </div>
      <div className='map-discover__body relative z-10 mx-auto flex h-[41.5rem] w-[93rem] overflow-hidden rounded-[1.25rem] bg-white p-[1rem_2.69rem_2.38rem] pl-0 xsm:h-fit xsm:w-full xsm:flex-col xsm:p-[1.5rem_1rem] xsm:px-0'>
        <div className='overlay-top pointer-events-none absolute left-0 top-0 z-10 h-[7.625rem] w-full bg-[linear-gradient(180deg,#FFF_56.16%,rgba(255,255,255,0.00)100%)] xsm:hidden'></div>
        <div className='overlay-bottom pointer-events-none absolute bottom-0 left-0 z-10 h-[5.5rem] w-full bg-[linear-gradient(0,#FFF_56.16%,rgba(255,255,255,0.00)100%)] xsm:hidden'></div>
        <div className='overlay-left pointer-events-none absolute left-0 top-0 z-10 h-full w-[5.0625rem] bg-[linear-gradient(90deg,#FFF_56.16%,rgba(255,255,255,0.00)_100%)] xsm:hidden'></div>
        <div className='absolute bottom-[2.69rem] left-[2.38rem] z-[11] flex flex-col space-y-[0.88rem] xsm:hidden'>
          <button
            onClick={handleZoomIn}
            className='flex size-[1.5rem] items-center justify-center rounded-[0.375rem] bg-[rgba(183,143,116,0.24)]'
          >
            <ImageV2
              src={'/icons/homepage/map-discover/plus.svg'}
              alt='Zoom in'
              width={200}
              height={200}
              className='size-[0.75rem] object-cover'
            />
          </button>
          <button
            onClick={handleZoomOut}
            className='flex size-[1.5rem] items-center justify-center rounded-[0.375rem] bg-[rgba(183,143,116,0.24)]'
          >
            <ImageV2
              src={'/icons/homepage/map-discover/minus.svg'}
              alt='Zoom out'
              width={200}
              height={200}
              className='size-[0.75rem] object-cover'
            />
          </button>
        </div>
        <div className='map-container relative h-full w-[65rem] xsm:h-[15rem] xsm:w-full xsm:px-4'>
          <div className='relative z-10 ml-[2.38rem] w-[45.6rem] overflow-hidden xsm:ml-0 xsm:w-full'>
            <Swiper
              className='swiper-nationalities !p-4 xsm:mb-[1.5rem] xsm:!p-0 xsm:!pl-4'
              slidesPerView='auto'
              breakpoints={{
                0: {
                  spaceBetween: 8,
                  freeMode: true,
                },
                640: {spaceBetween: 16},
                768: {spaceBetween: 56},
              }}
              spaceBetween={56}
              freeMode={true}
            >
              {dataMap?.map_data?.map((item: MapData, index: number) => (
                <SwiperSlide
                  key={index}
                  className='!w-fit'
                >
                  <div
                    className={`navbar-nationalities-item relative flex cursor-pointer items-center space-x-[0.5rem] xsm:rounded-[0.375rem] xsm:border-[1px] xsm:border-[rgba(0,0,0,0.10)] xsm:p-[0.38rem] ${
                      navbarNationalitiesActive === item?.data_nation[0]?.name
                        ? 'active xsm:bg-[#5C321E]'
                        : 'border-[#5C321E]'
                    }`}
                    onClick={() =>
                      handleNavbarNationalities(
                        item?.data_nation[0]?.name,
                        item?.image_button,
                        item?.slug,
                      )
                    }
                  >
                    <div
                      className={`relative flex size-[1.75rem] rounded-[50%] bg-white shadow-[1px_2px_6px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px] xsm:size-[1.35rem] ${
                        navbarNationalitiesActive === item?.data_nation[0]?.name
                          ? 'xsm:bg-[rgba(255,255,255,0.2)]'
                          : 'xsm:bg-white'
                      }`}
                    >
                      <div className='absolute bottom-0 left-0 z-[1] h-full w-full rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
                      <ImageV2
                        src={item?.data_nation[0]?.flag || ''}
                        alt={item?.data_nation[0]?.label}
                        width={200}
                        height={200}
                        className='absolute left-1/2 top-1/2 z-0 size-[1.5rem] -translate-x-1/2 -translate-y-1/2 scale-[1.05] rounded-[50%] xsm:left-0 xsm:top-0 xsm:size-[1.25rem] xsm:translate-x-[1px] xsm:translate-y-[1px] xsm:scale-[1]'
                      />
                    </div>
                    <span
                      className={`text-[0.875rem] font-medium uppercase leading-[1.5] tracking-[-0.00875rem] text-greyscaletext-body xsm:text-[0.8125rem] ${
                        navbarNationalitiesActive === item?.data_nation[0]?.name
                          ? 'xsm:text-white'
                          : 'xsm:text-brown'
                      }`}
                    >
                      {item?.data_nation[0]?.label}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='absolute left-0 top-0 z-[1] h-full w-full overflow-hidden xsm:!pointer-events-none xsm:relative xsm:h-[15rem] xsm:w-full xsm:px-4'>
            <div className='map-content absolute bottom-0 left-0 h-full w-full overflow-hidden xsm:relative xsm:w-full'>
              <div className='overlay-right absolute right-0 z-10 h-full w-[9.5rem] bg-[linear-gradient(-90deg,#FFF_56.16%,rgba(255,255,255,0.00)100%)] xsm:hidden'></div>
              <Suspense fallback={<Loading isLoading={true} />}>
                <LeafletMap
                  countries={dataMap?.countries_data as ICountry[][]}
                  mapJson={(geoData ?? {}) as FeatureCollection}
                  className='!absolute !z-[1] !h-full !w-full !overflow-hidden !bg-transparent'
                  borderCountries='#7F7C6E'
                  zoomDesktop={1.8}
                  isZoomClick={true}
                  setActiveCountry={setNavbarNationalitiesActive}
                  changeCountry={
                    isMobile
                      ? navbarNationalitiesActive
                      : isChangeCountry
                        ? navbarNationalitiesActive
                        : ''
                  }
                  isZoomInClick={isZoomInClick}
                  isZoomOutClick={isZoomOutClick}
                  isControlZoom={true}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <div className='z-10 flex w-[28.3125rem] flex-col pt-[3.12rem] xsm:w-full xsm:px-0'>
          <Loading isLoading={isLoading} />
          <div
            className={`${isLoading ? 'hidden' : ''} hidden-scrollbar flex overflow-hidden overflow-x-auto sm:min-h-[27.48rem] sm:flex-col sm:space-y-[1.5rem] xsm:w-full xsm:space-x-[1rem] xsm:px-[1rem]`}
          >
            {Array.isArray(dataPost) && dataPost.length > 0 ? (
              Array.isArray(dataPost) &&
              dataPost.map((item, index: number) => (
                <Link
                  href={`/${slugData}/${item.slug}`}
                  key={index}
                  className='rounded-[0.63rem] bg-[#F7F6F1] p-3 pb-6 xsm:flex xsm:w-auto xsm:flex-col xsm:rounded-[0.75rem] xsm:p-[0.75rem]'
                >
                  <div className='line-clamp-3 flex items-center space-x-[1rem] border-b-[0.0625rem] border-[rgba(0,0,0,0.10)] pb-[1.12rem] xsm:w-[18.75rem] xsm:pb-[0.75rem]'>
                    <ImageV2
                      src={item?.thumbnail || ''}
                      alt='Map'
                      width={300}
                      height={200}
                      className='h-[6.4375rem] w-[8.75rem] rounded-[0.63rem] object-cover xsm:size-[5.5rem] xsm:rounded-[0.55rem]'
                    />
                    <div>
                      <div>
                        <span className='xsm:sub10-m text-[0.625rem] font-bold uppercase leading-[1.5] text-brown xsm:opacity-[0.5]'>
                          Thông tin chương trình
                        </span>
                        <h3 className='line-clamp-2 text-[0.875rem] font-bold leading-[1.5] tracking-[-0.0175rem] text-brown sm:uppercase xsm:line-clamp-2 xsm:body-14-b'>
                          {item.title}
                        </h3>
                      </div>
                      <div className='mt-[0.37rem] flex items-center justify-start space-x-[0.25rem] rounded-[0.25rem] bg-[rgba(101,67,30,0.15)] p-[0.25rem_0.5rem] sm:hidden'>
                        <span className='tracking-[-0.00625rem] text-greyscaletext-800 sub-10'>
                          Thời gian xử lý
                        </span>
                        <p className='text-[0.625rem] font-bold text-greyscaletext-800'>
                          {item.information.review_time.from} -{' '}
                          {item.information.review_time.to} tháng
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='[&_div_p]:xsm:mb12-b flex space-x-[1.5rem] px-4 pt-[0.87rem] xsm:space-x-[0.5rem] xsm:px-0 xsm:pt-[0.75rem] [&>div]:xsm:flex-1 [&>div]:xsm:rounded-[0.5rem] [&>div]:xsm:bg-white [&>div]:xsm:p-[0.25rem_0.5rem] [&>div]:xsm:shadow-[1px_1px_8px_0px_rgba(0,0,0,0.04)] [&_div]:flex [&_div]:flex-col [&_div_p]:line-clamp-1 [&_div_p]:text-[0.8125rem] [&_div_p]:font-bold [&_div_p]:leading-[1.5] [&_div_p]:text-greyscaletext-900 [&_div_span]:whitespace-nowrap [&_div_span]:text-[0.6875rem] [&_div_span]:leading-[1.5] [&_div_span]:text-greyscaletext-900 [&_div_span]:xsm:tracking-[-0.00625rem] [&_div_span]:xsm:text-greyscaletext-400 [&_div_span]:xsm:opacity-[0.7] [&_div_span]:xsm:sub-10'>
                    <div>
                      <span>Ngân sách tối thiểu</span>
                      <p>{item?.information?.investment_level.value}</p>
                    </div>
                    <div className='xsm:!hidden'>
                      <span>Thời gian xử lý</span>
                      <p>
                        {item.information.review_time.from} -{' '}
                        {item.information.review_time.to} tháng
                      </p>
                    </div>
                    <div>
                      <span>Ngoại ngữ</span>
                      <p>
                        {item?.information?.languages?.language_required ||
                          'Đang cập nhật'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className='line-clamp-2 text-[0.875rem] font-bold leading-[1.5] tracking-[-0.0175rem] text-brown sm:uppercase xsm:line-clamp-2 xsm:body-14-b'>
                Khu vực này hiện chưa có thông tin
              </p>
            )}
          </div>
          <Link
            href={`/${slugData}`}
            className='relative mt-[1.5rem] flex h-[4.875rem] w-full items-center overflow-hidden rounded-[0.5rem] xsm:h-[4rem] xsm:px-[1rem]'
          >
            <ImageV2
              src={urlImageButton}
              alt='Icanfield'
              width={500}
              height={500}
              className='z-1 absolute top-0 h-full w-full rounded-[0.63rem] object-cover xsm:w-[90%]'
            />
            <div className='relative z-10 flex flex-col space-y-[0.12rem] pl-[10.0625rem] xsm:pl-[6.5rem]'>
              <span className='text-[0.875rem] font-semibold uppercase leading-[1.5] tracking-[-0.0175rem] text-white xsm:text-[0.875rem]'>
                Khám phá thêm
              </span>
              <span className='text-[0.625rem] font-semibold uppercase leading-[1.5] tracking-[-0.0125rem] text-white opacity-80 xsm:text-[0.625rem]'>
                chương trình liên quan
              </span>
            </div>
            <div className='absolute right-[0.25rem] top-1/2 z-10 flex size-[4.375rem] -translate-y-1/2 items-center justify-center overflow-hidden rounded-[0.375rem] bg-[rgba(255,255,255,0.22)] xsm:right-[2.25rem] xsm:h-[3.5rem] xsm:w-[3.5rem]'>
              <ImageV2
                src={'/icons/homepage/map-discover/arrow.svg'}
                alt='Icanfield'
                width={200}
                height={200}
                className='size-[1.5rem] object-cover'
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MapDiscover
