'use client'
import ImageV2 from '@/components/image/ImageV2'
import {ICountry, LeafletMap} from '@/components/LeafletMap'
import officeMap from '@/sections/aboutus/office-map/constants'
import customGeoJson from '@/sections/aboutus/office-map/custom.geo.json'
import {Media} from '@/types/image.interface'
import {FeatureCollection} from 'geojson'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import React, {useEffect} from 'react'
import 'swiper/css'
import {Swiper, SwiperSlide} from 'swiper/react'
import {listProgramInfomation} from './contanst'
import './styles.css'

interface IMapDiscoverProps {
  data: {
    logo: Media
    slogan: string
    title: string
    description: string
  }
}

const MapDiscover = ({data}: IMapDiscoverProps) => {
  const [navbarNationalitiesActive, setNavbarNationalitiesActive] =
    React.useState(officeMap?.countries[0][0].label || 'Unknown')
  const [isChangeCountry, setIsChangeCountry] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [urlImageButton, setUrlImageButton] = React.useState(
    officeMap?.countries[0][0].flag || '/imgs/default-flag.png',
  )
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])
  // handle click navbar nationalities
  const handleNavbarNationalities = (value: string, flag: string) => {
    setNavbarNationalitiesActive(value)
    setUrlImageButton(flag)
    console.log(urlImageButton)
    setIsChangeCountry(true)
  }
  //handle zoom map
  const [isZoomInClick, setIsZoomInClick] = React.useState(false)
  const [isZoomOutClick, setIsZoomOutClick] = React.useState(false)
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
            src={data.logo.url}
            alt={data.logo.alt}
            width={data.logo.width * 2}
            height={data.logo.height * 2}
            className='h-[9.63756rem] w-[35.37506rem] object-contain xsm:h-[4.76769rem] xsm:w-[17.5rem]'
          />
          <span className='absolute bottom-0 right-0 font-optima text-[1.375rem] leading-[1.3] tracking-[-0.055rem] text-brown xsm:text-[0.75rem]'>
           {data.slogan}
          </span>
        </div>
        <div className='ml-[4.81rem] w-[38.5rem] xsm:ml-0 xsm:mt-[2.5rem] xsm:w-full xsm:px-4'>
          <h2 className='mb-[1.19rem] font-optima text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.09rem] text-brown xsm:mb-[1.25rem] xsm:w-full xsm:text-[1.25rem] xsm:tracking-[-0.025rem]'>
            {data.title}
          </h2>
          <div className='[&_p]:mb-[1rem] [&_p]:text-[0.875rem] [&_p]:leading-[1.5] [&_p]:text-greyscaletext-800 xsm:[&_p]:mb-[0.75rem] xsm:[&_p]:text-[0.875rem]' dangerouslySetInnerHTML={{__html: data.description}}></div>
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
              {officeMap?.countries?.map(
                (countryGroup: ICountry[], groupIndex: number) =>
                  countryGroup
                    .filter(
                      (country: ICountry) =>
                        country.label && country.label !== 'Việt Nam',
                    ) // Chỉ lấy quốc gia có label và không phải Việt Nam
                    .map((country: ICountry, index: number) => {
                      const nameLabel = country.label || 'Unknown'
                      const imgSrc = country.flag || '/imgs/default-flag.png'
                      return (
                        <SwiperSlide
                          key={`${groupIndex}-${index}`}
                          className='!w-fit'
                        >
                          <div
                            className={`navbar-nationalities-item relative flex cursor-pointer items-center space-x-[0.5rem] xsm:rounded-[0.375rem] xsm:border-[1px] xsm:border-[rgba(0,0,0,0.10)] xsm:p-[0.38rem] ${
                              navbarNationalitiesActive === nameLabel
                                ? 'active xsm:bg-[#5C321E]'
                                : 'border-[#5C321E]'
                            }`}
                            onClick={() =>
                              handleNavbarNationalities(nameLabel, imgSrc)
                            }
                          >
                            <div
                              className={`relative flex size-[1.75rem] rounded-[50%] bg-white shadow-[1px_2px_6px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px] xsm:size-[1.35rem] ${
                                navbarNationalitiesActive === nameLabel
                                  ? 'xsm:bg-[rgba(255,255,255,0.2)]'
                                  : 'xsm:bg-white'
                              }`}
                            >
                              <div className='absolute bottom-0 left-0 z-[1] h-full w-full rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
                              <ImageV2
                                src={imgSrc}
                                alt={nameLabel}
                                width={200}
                                height={200}
                                className='absolute left-1/2 top-1/2 z-0 size-[1.5rem] -translate-x-1/2 -translate-y-1/2 scale-[1.05] rounded-[50%] xsm:left-0 xsm:top-0 xsm:size-[1.25rem] xsm:translate-x-[1px] xsm:translate-y-[1px] xsm:scale-[1]'
                              />
                            </div>
                            <span
                              className={`text-[0.875rem] font-medium uppercase leading-[1.5] tracking-[-0.00875rem] text-greyscaletext-body xsm:text-[0.8125rem] ${
                                navbarNationalitiesActive === nameLabel
                                  ? 'xsm:text-white'
                                  : 'xsm:text-brown'
                              }`}
                            >
                              {nameLabel}
                            </span>
                          </div>
                        </SwiperSlide>
                      )
                    }),
              )}
            </Swiper>
          </div>
          <div className='absolute left-0 top-0 z-[1] h-full w-full overflow-hidden xsm:!pointer-events-none xsm:relative xsm:h-[15rem] xsm:w-full xsm:px-4'>
            <div className='map-content absolute bottom-0 left-0 h-full w-full overflow-hidden xsm:relative xsm:w-full'>
              <div className='overlay-right absolute right-0 z-10 h-full w-[9.5rem] bg-[linear-gradient(-90deg,#FFF_56.16%,rgba(255,255,255,0.00)100%)] xsm:hidden'></div>
              <LeafletMap
                countries={officeMap?.countries}
                mapJson={customGeoJson as FeatureCollection}
                className='!absolute !z-[1] !h-full !w-full !overflow-hidden !bg-transparent'
                borderCountries='#AF9689'
                zoomDesktop={1.8}
                isZoomClick={true}
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
            </div>
          </div>
        </div>
        <div className='z-10 flex w-[28.3125rem] flex-col pt-[5.12rem] xsm:w-full xsm:px-4'>
          <div className='flex flex-col space-y-[1.5rem]'>
            {listProgramInfomation.map((item, index) => (
              <div
                key={index}
                className='rounded-[0.63rem] bg-[#F7F6F1] p-3 pb-6'
              >
                <div className='flex items-center space-x-[1rem] border-b-[0.0625rem] border-[rgba(0,0,0,0.10)] pb-[1.12rem]'>
                  <ImageV2
                    src={'/imgs/homepage/map-discover/thumb.webp'}
                    alt='Map'
                    width={300}
                    height={200}
                    className='h-[6.4375rem] w-[8.75rem] rounded-[0.63rem] object-cover'
                  />
                  <div>
                    <span className='text-[0.625rem] font-bold uppercase leading-[1.5] text-brown'>
                      Thông tin chương trình
                    </span>
                    <h3 className='text-[0.875rem] font-bold uppercase leading-[1.5] tracking-[-0.0175rem] text-brown'>
                      {item.name}
                    </h3>
                  </div>
                </div>
                <div className='flex space-x-[1.5rem] px-4 pt-[0.87rem] [&_div]:flex [&_div]:flex-col [&_div_p]:line-clamp-1 [&_div_p]:text-[0.8125rem] [&_div_p]:font-bold [&_div_p]:leading-[1.5] [&_div_p]:text-greyscaletext-900 [&_div_span]:whitespace-nowrap [&_div_span]:text-[0.6875rem] [&_div_span]:leading-[1.5] [&_div_span]:text-greyscaletext-900'>
                  <div>
                    <span>Ngân sách tối thiểu</span>
                    <p>{item?.minBudget}</p>
                  </div>
                  <div>
                    <span>Thời gian xử lý</span>
                    <p>{item?.time}</p>
                  </div>
                  <div>
                    <span>Ngoại ngữ</span>
                    <p>{item?.languages}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href={'/'}
            className='relative mt-[1.5rem] flex h-[4.875rem] w-full items-center overflow-hidden rounded-[0.5rem] xsm:h-[4rem]'
          >
            <ImageV2
              src={'/imgs/homepage/map-discover/canada.webp'}
              alt='Icanfield'
              width={300}
              height={200}
              className='h-full w-[9.0625rem] rounded-[0.63rem] object-cover xsm:w-[5.4375rem]'
            />
            <div className='overlay absolute right-0 top-0 z-[1] h-full w-[25.375rem] bg-[linear-gradient(270deg,#BE0225_82.82%,rgba(190,2,37,0.00)89.29%)] xsm:w-[19.3125rem]'></div>
            <div className='space-y-[0.12rem]] relative z-10 flex flex-col'>
              <span className='text-[0.875rem] font-semibold uppercase leading-[1.5] tracking-[-0.0175rem] text-white xsm:text-[0.875rem]'>
                Khám phá thêm
              </span>
              <span className='text-[0.625rem] font-semibold uppercase leading-[1.5] tracking-[-0.0125rem] text-white opacity-80 xsm:text-[0.625rem]'>
                chương trình liên quan
              </span>
            </div>
            <div className='absolute right-[0.25rem] top-1/2 z-10 flex size-[4.375rem] -translate-y-1/2 items-center justify-center overflow-hidden rounded-[0.375rem] bg-[rgba(255,255,255,0.22)] xsm:h-[3.5rem] xsm:w-[3rem]'>
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
