'use client'
import React from 'react'
import ImageV2 from '@/components/image/ImageV2'
import Link from 'next/link'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper/modules'
import 'swiper/css'
import './styles.css'
import {languageOptions} from './constants'
const Header = () => {
  const listPostOutstanding = [
    {
      title: 'Ứng dụng vật liệu sinh học trong căn hộ ở Ecopark',
      href: '/',
    },
    {
      title: 'Tìm hiểu về bê tông khí chưng áp',
      href: '/',
    },
    {
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, a?',
      href: '/',
    },
  ]
  const listItemTopHeader = [
    {
      title: 'sự kiện',
      linkIcon: '/icons/homepage/header/event.svg',
    },
    {
      title: 'tin định cư',
      linkIcon: '/icons/homepage/header/flag.svg',
    },
    {
      title: 'liên hệ',
      linkIcon: '/icons/homepage/header/gmail.svg',
    },
  ]
  const listItemLeftBottomHeader = [
    {
      title: 'Định cư Canada',
      href: '/',
    },
    {
      title: 'Định cư Mỹ',
      href: '/',
    },
    {
      title: 'Định cư Caribe',
      href: '/',
    },
    {
      title: 'Định cư Châu Âu',
      href: '/',
    },
  ]
  const listItemRightBottomHeader = [
    {
      title: 'Các chương trình khác',
      href: '/',
      children: [
        {
          title: 'Lorem ipsum dolor',
          href: '/',
        },
        {
          title: 'Định cư Mỹ',
          href: '/',
        },
        {
          title: 'Định cư Caribe',
          href: '/',
        },
      ],
    },
    {
      title: 'Cẩm nang iCanfield',
      href: '/',
    },
  ]
  return (
    <header>
      <div className='header-top bg-[linear-gradient(118deg,#2E1506_69.75%,#95502F_142.7%,#F5C178_182.76%)] xsm:hidden'>
        <div className=' section-container flex items-center justify-between'>
          <div className='flex items-center space-x-[0.94rem]'>
            <div className=' relative '>
              <div className='bg-[linear-gradient(90deg,#FFF_0%,#FFF_52.5%,#FFF_100%)] absolute w-full h-full opacity-[0.08] top-0 z-1'></div>
              <div className='p-[0.47rem_0.53rem] flex items-center space-x-[0.62rem] justify-center'>
                <ImageV2
                  src='/icons/homepage/header/news.svg'
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[0.875rem] object-contain translate-y-[-1px]'
                />
                <span className='text-[0.75rem] leading-[1.5] font-medium text-white'>
                  TIN DOANH NGHIỆP
                </span>
              </div>
            </div>
            <div className='w-[19.9625rem] h-[2.0625rem]'>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                direction={'vertical'}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay]}
                className='swiper-outstanding-post !h-full '
              >
                {listPostOutstanding.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className='!w-fit !h-full !flex !items-center'
                  >
                    <Link
                      href={item.href}
                      className='line-clamp-1 text-white text-[0.875rem] font-medium link-outstanding-post leading-[1.2] relative z-10'
                    >
                      {item.title}
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className='flex items-center space-x-[2.73rem]'>
            {listItemTopHeader.map((item, index) => (
              <div
                key={index}
                className='flex items-center space-x-[0.62rem]'
              >
                <ImageV2
                  src={item.linkIcon}
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[0.875rem] object-contain'
                />
                <span className='text-[0.75rem] leading-[1.5] font-medium text-white uppercase'>
                  {item.title}
                </span>
              </div>
            ))}
            <div className='language-dropdown flex items-center space-x-[0.5rem] relative'>
              <div className='flex  size-[1.2rem] bg-[rgba(255,255,255,0.25)] rounded-[50%] backdrop-blur-[10px] relative'>
                <div className='w-full h-full absolute bottom-0 left-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)] rounded-full'></div>
                <ImageV2
                  src='/imgs/homepage/header/vn-flag2.png'
                  alt='logo'
                  width={200}
                  height={200}
                  className='size-[1rem] scale-[1.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] z-0'
                />
              </div>
              <span className='text-[0.75rem] font-medium leading-[1.5] text-white'>
                VN
              </span>
              <ImageV2
                src='/icons/homepage/header/arrow-down.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1rem]'
              />
              <div className='absolute'>
                  {
                    languageOptions.map((item, index) => (
                      <div key={index} className='flex items-center space-x-[0.5rem]'>
                          <span>
                            {item.text}
                          </span>
                          <ImageV2
                            src={item.flagUrl}
                            alt='logo'
                            width={40}
                            height={40}
                            className='size-[1rem] rounded-[50%] object-contain'
                          />
                      </div>
                    ))
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='header-bottom xsm:hidden'>
        <div className='section-container flex items-center justify-between py-[0.62rem]'>
          {/* left */}
          <div className='flex items-center space-x-[2.5rem]'>
            {listItemLeftBottomHeader.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='text-[1rem] font-medium text-[#333] leading-[1.5] tracking-[-0.02rem]'
              >
                {item.title}
              </Link>
            ))}
          </div>
          <Link href={'/'}>
            <ImageV2
              src='/imgs/homepage/header/IC.png'
              alt='logo'
              width={200}
              height={200}
              className='w-[2.33106rem] h-[3.125rem]'
            />
          </Link>
          {/* right */}
          <div className='flex items-center space-x-[2rem]'>
            {listItemRightBottomHeader.map((item, index) =>
              item.children ? (
                <div
                  key={index}
                  className='text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333] cursor-pointer relative flex items-center space-x-[0.25rem]'
                >
                  <span>{item.title}</span>
                  <ImageV2
                    src='/icons/homepage/header/arrow-down-brown.svg'
                    alt='logo'
                    width={40}
                    height={40}
                    className='size-[1rem] object-contain'
                  />
                </div>
              ) : (
                <Link
                  href={item.href}
                  key={index}
                  className='text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                >
                  {item.title}
                </Link>
              ),
            )}
            <Link
              href={'/'}
              className='flex items-center space-x-[0.5rem] p-[0.5rem_1.375rem_0.5rem_1.125rem] bg-[#2E1506] rounded-[0.5rem]'
            >
              <ImageV2
                src='/icons/homepage/header/star.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1.5rem] object-contain'
              />
              <span className='text-white font-medium text-[0.875rem] leading-[1.5] tracking-[-0.0175rem]'>
                Hỗ trợ khách hàng
              </span>
              <ImageV2
                src='/icons/homepage/header/down-white.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1rem] object-contain'
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='sm:hidden flex items-center justify-between section-container py-[0.62rem]'>
        <Link href={'/'}>
          <ImageV2
            src='/imgs/homepage/header/d-IC-mb.png'
            alt='logo'
            width={100}
            height={100}
            className='w-[6.25244rem] h-[2.25rem] object-contain'
          />
        </Link>
        <div className='flex items-center space-x-[1.5rem]'>
          <div className='flex items-center'>
            <div className='relative size-[1rem] rounded-[50%] mr-1'>
              <ImageV2
                src='/imgs/homepage/header/vn-flag2.png'
                alt='logo'
                width={40}
                height={40}
                className='size-[1rem] rounded-[50%] z-0 absolute w-full h-full top-0 left-0'
              />
              <div className='bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)] absolute z-[1] w-full h-full top-0'></div>
            </div>
            <span className='text-greyscaletext-600 text-[0.75rem] font-medium leading-[1.5]'>VN</span>
            <ImageV2
            src={'/icons/homepage/header/arrow-down-brown-mb.svg'}
            alt='down'
            width={40}
            height={40}
            className='size-[1.125rem] object-contain ml-[0.38rem]'
          />
          </div>
          <button className='w-[3.125rem] h-[2.125rem]'>
            <ImageV2
              src='/icons/homepage/header/hamburger.svg'
              alt='menu'
              width={40}
              height={40}
              className='w-full h-full'
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
