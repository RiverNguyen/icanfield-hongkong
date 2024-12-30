'use client'
import ImageV2 from '@/components/image/ImageV2'
import UnderLineHeader from '@/components/svg/UnderLine'
import {
  LanguageOption,
  MenuItem,
  PostOutstanding,
  SocialNetwork,
  TopHeaderItem,
} from '@/types/header.interface'
import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from 'react'
import 'swiper/css'
import {Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {languageOptions} from './constants'
import './styles.css'
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
      href: '/events',
    },
    {
      title: 'tin định cư',
      linkIcon: '/icons/homepage/header/flag.svg',
      href: '/events',
    },
    {
      title: 'liên hệ',
      linkIcon: '/icons/homepage/header/gmail.svg',
      href: '/events',
    },
  ]
  const menu = [
    {
      title: 'Định cư Canada',
      href: '/',
      imgUrl: '/imgs/homepage/header/canada-flag2.png',
      background: '/imgs/homepage/header/d-card-canada.webp',
      count: 54,
    },
    {
      title: 'Định cư Mỹ',
      href: '/',
      imgUrl: '/imgs/homepage/header/d-america-flag.jpg',
      background: '/imgs/homepage/header/d-card-my.webp',
      count: 24,
      children: [
        {
          title: 'Các chương trình định cư',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-Uc.webp',
        },
        {
          title: 'Dự án EB-5',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-bds.webp',
        },
      ],
    },
    {
      title: 'Định cư Caribe',
      href: '/',
      imgUrl: '/imgs/homepage/header/d-carribe-flag.png',
      background: '/imgs/homepage/header/d-card-caribe.webp',
      count: 32,
    },
    {
      title: 'Định cư Châu Âu',
      href: '/',
      imgUrl: '/imgs/homepage/header/eu-flag2.png',
      background: '/imgs/homepage/header/d-card-eu.webp',
      count: 36,
    },
    {
      title: 'Các chương trình khác',
      href: '/',
      children: [
        {
          title: 'Định cư Úc',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-Uc.webp',
        },
        {
          title: 'Bất động sản Úc',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-bds.webp',
        },
      ],
    },
    {
      title: 'Cẩm nang iCanfield',
      href: '/',
    },
  ]
  const listItemSupportCustomer = [
    {
      title: 'Thẩm định hồ sơ',
      href: '/',
      imgUrl: '/imgs/homepage/header/d-Uc.webp',
    },
    {
      title: 'So sánh chương trình',
      href: '/',
      imgUrl: '/imgs/homepage/header/d-bds.webp',
    },
    {
      title: 'Thông tin hộ chiếu',
      href: '/',
      imgUrl: '/imgs/homepage/header/d-Uc.webp',
    },
  ]
  const listMenuMobileLast = [
    {
      title: 'Hỗ trợ khách hàng',
      href: '/',
      children: [
        {
          title: 'Thẩm định hồ sơ',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-Uc.webp',
        },
        {
          title: 'So sánh chương trình',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-bds.webp',
        },
        {
          title: 'Thông tin hộ chiếu',
          href: '/',
          imgUrl: '/imgs/homepage/header/d-Uc.webp',
        },
      ],
    },
    {
      title: 'Cẩm nang iCanfield',
      href: '/',
    },
    {
      title: 'Sự kiện',
      href: '/',
    },
    {
      title: 'Liên hệ',
      href: '/',
    },
  ]
  const socialNetwork = [
    {
      title: 'facebook',
      link: '/',
      icon: '/icons/homepage/header/facebook.svg',
    },
    {
      title: 'instagram',
      link: '/',
      icon: '/icons/homepage/header/instagram.svg',
    },
    {
      title: 'linkedin',
      link: '/',
      icon: '/icons/homepage/header/linkedin.svg',
    },
    {
      title: 'youtube',
      link: '/',
      icon: '/icons/homepage/header/youtube.svg',
    },
  ]
  const [isActivedLanguage, setIsActivedLanguage] = React.useState(false) //handle language dropdown
  const [isCurrentLanguage, setIsCurrentLanguage] = React.useState(
    languageOptions[1],
  ) //handle current language
  const [isActiveOverlay, setIsActiveOverlay] = React.useState(false) //handle overlay menu
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [urlImage, setUrlImage] = React.useState<string | null>(null)
  const [urlImageSupportCustomer, setUrlImageSupportCustomer] = React.useState<
    string | null
  >(null)
  const [isCloseMenu, setIsCloseMenu] = React.useState(false)
  const refDropdownLanguage = React.useRef<HTMLDivElement>(null)
  const [selectedChild, setSelectedChild] = React.useState<MenuItem | null>(
    null,
  )
  const [isOpenedChild, setIsOpenedChild] = React.useState(false)
  //function handle language dropdown
  const handleOpenLanguage = () => {
    setIsActivedLanguage(!isActivedLanguage)
  }
  //function handle change language
  const handleChangeLanguage = (item: LanguageOption) => {
    setIsCurrentLanguage(item)
    setIsActivedLanguage(false)
  }
  //handle click outside dropdown language
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refDropdownLanguage.current &&
        !refDropdownLanguage.current.contains(event.target as Node)
      ) {
        setIsActivedLanguage(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  //handle active overlay menu
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsActiveOverlay(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsActiveOverlay(false)
    }, 300)
  }
  //handle change url image different program
  const handleChangeUrlImage = (url: string) => {
    setUrlImage(url)
  }
  //handle change url image support customer
  const handleChangeUrlImageSupportCustomer = (url: string) => {
    setUrlImageSupportCustomer(url)
  }
  //header Mobile
  const handleToggleMenu = () => {
    setIsCloseMenu(!isCloseMenu)
  }
  // handle toggle popup Language mobile
  const [isActivedLanguageMb, setIsActivedLanguageMb] = React.useState(false)
  //function handle language dropdown
  const handleOpenLanguageMb = () => {
    setIsActivedLanguageMb(!isActivedLanguageMb)
    setIsActiveOverlay(!isActiveOverlay)
  }
  //handle select child menu
  const handleSelectChild = (item: MenuItem) => {
    setSelectedChild(item)
  }
  //handle toggle child menu
  const handleToggleChild = () => {
    setIsOpenedChild(!isOpenedChild)
  }
  return (
    <header className='fixed left-0 top-0 z-[50] w-full'>
      <div className='header-top bg-[linear-gradient(118deg,#2E1506_69.75%,#95502F_142.7%,#F5C178_182.76%)] xsm:hidden'>
        <div className='flex items-center justify-between section-container'>
          <div className='flex items-center space-x-[0.94rem]'>
            <div className='relative'>
              <div className='z-1 pointer-events-none absolute top-0 h-full w-full bg-[linear-gradient(90deg,#FFF_0%,#FFF_52.5%,#FFF_100%)] opacity-[0.08]'></div>
              <Link
                href={'/blogs'}
                className='flex items-center justify-center space-x-[0.62rem] p-[0.47rem_0.53rem]'
              >
                <ImageV2
                  src='/icons/homepage/header/news.svg'
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[0.875rem] translate-y-[-1px] object-contain'
                />
                <span className='text-[0.75rem] font-medium leading-[1.5] text-white'>
                  TIN DOANH NGHIỆP
                </span>
              </Link>
            </div>
            <div className='h-[2.0625rem] w-[19.9625rem]'>
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
                // navigation={true}
                modules={[Autoplay]}
                className='swiper-outstanding-post !h-full'
              >
                {listPostOutstanding.map((item: PostOutstanding, index) => (
                  <SwiperSlide
                    key={index}
                    className='!flex !h-full !w-fit !items-center'
                  >
                    <Link
                      href={item.href}
                      className='link-outstanding-post relative z-10 line-clamp-1 text-[0.875rem] font-medium leading-[1.2] text-white'
                    >
                      {item.title}
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className='flex items-center space-x-[2.73rem]'>
            {listItemTopHeader.map((item: TopHeaderItem, index) => (
              <Link
                href={item.href || '/'}
                key={index}
                className='flex items-center space-x-[0.62rem]'
              >
                <ImageV2
                  src={item.linkIcon || ''}
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[0.875rem] object-contain'
                />
                <span className='text-[0.75rem] font-medium uppercase leading-[1.5] text-white'>
                  {item.title}
                </span>
              </Link>
            ))}
            <div
              className='language-dropdown relative flex cursor-pointer select-none items-center space-x-[0.5rem]'
              onClick={handleOpenLanguage}
            >
              <div className='relative flex size-[1.2rem] rounded-[50%] bg-[rgba(255,255,255,0.25)] backdrop-blur-[10px]'>
                <div className='absolute bottom-0 left-0 z-[1] h-full w-full rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
                <ImageV2
                  src={isCurrentLanguage.flagUrl || ''}
                  alt='logo'
                  width={200}
                  height={200}
                  className='absolute left-1/2 top-1/2 z-0 size-[1rem] -translate-x-1/2 -translate-y-1/2 scale-[1.05] rounded-[50%]'
                />
              </div>
              <span className='text-[0.75rem] font-medium leading-[1.5] text-white'>
                {isCurrentLanguage.text}
              </span>
              <ImageV2
                src='/icons/homepage/header/arrow-down.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1rem]'
              />
              <div
                ref={refDropdownLanguage}
                className={`absolute left-0 top-[120%] z-[2] !ml-0 flex h-fit w-full flex-col space-y-1 rounded-[0.25rem] border-[1px] border-[rgba(0,0,0,0.10)] bg-white p-2 shadow-[1px_2px_24px_0px_rgba(0,0,0,0.16)] ${isActivedLanguage ? 'block' : 'hidden'}`}
              >
                {languageOptions.map((item: LanguageOption, index: number) => (
                  <div
                    key={index}
                    className='flex items-center space-x-[0.5rem] hover:scale-105'
                    onClick={() => handleChangeLanguage(item)}
                  >
                    <span
                      className={`text-[0.75rem] leading-[1.5] text-brown ${isCurrentLanguage.value === item.value ? 'font-semibold' : 'font-medium'} `}
                    >
                      {item.text}
                    </span>
                    <ImageV2
                      src={item.flagUrl || ''}
                      alt='logo'
                      width={40}
                      height={40}
                      className='size-[1rem] rounded-[50%] object-contain'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='header-bottom relative bg-white xsm:hidden'>
        <div className='flex h-[4.37rem] items-center justify-between section-container'>
          {/* left */}
          <div className='flex h-full items-center space-x-[2.5rem]'>
            {menu.slice(0, -2).map((item: MenuItem, index) =>
              item.children ? (
                <div
                  key={index}
                  className='item-has-children group flex h-full cursor-pointer items-center space-x-[0.25rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>{item.title}</span>
                  <ImageV2
                    src='/icons/homepage/header/arrow-down-brown.svg'
                    alt='arrow'
                    width={40}
                    height={40}
                    className='size-[1rem] object-contain'
                  />
                  <div className='children-menu invisible absolute left-1/2 top-[100%] z-[52] -translate-x-1/2 opacity-0 transition-all delay-300 duration-300 group-hover:visible group-hover:opacity-100 group-hover:delay-0'>
                    <ImageV2
                      src='/icons/homepage/header/triangle.svg'
                      alt='triangle'
                      width={40}
                      height={40}
                      className='h-[2rem] w-[3rem] translate-x-[60rem] object-contain'
                    />
                    <div className='h-[37.5rem] w-[95rem] -translate-y-[1rem] rounded-[1.5rem] bg-white p-[4rem_5rem]'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <p className='mb-[2.5rem] font-optima text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] text-greyscaletext-body'>
                            {item.title}
                          </p>
                          <div className='flex flex-col'>
                            {item.children.map(
                              (child: MenuItem, childIndex) => (
                                <div
                                  key={childIndex}
                                  className='flex flex-col'
                                  onMouseEnter={() =>
                                    handleChangeUrlImage(child.imgUrl || '')
                                  }
                                >
                                  <Link
                                    href={child.href}
                                    className='relative rounded-[0.75rem] p-[1.5rem] hover:bg-[linear-gradient(90deg,#F2EDE7_0%,rgba(242,237,231,0.00)100%)]'
                                  >
                                    <p className='font-optima text-[1.75rem] font-medium uppercase tracking-[-0.035rem] text-greyscaletext-body'>
                                      {child.title}
                                    </p>
                                    {item.children &&
                                      childIndex < item.children.length - 1 && (
                                        <UnderLineHeader className='absolute bottom-0 left-[1.5rem] h-[2px] w-[22.8rem] object-contain' />
                                      )}
                                  </Link>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <Image
                          src={urlImage || item.children[0]?.imgUrl || ''}
                          alt='preview'
                          width={500}
                          height={500}
                          className='h-full w-[38.125rem] rounded-[1rem] object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className='flex h-full items-center text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                >
                  {item.title}
                </Link>
              ),
            )}
          </div>
          <Link href={'/'}>
            <ImageV2
              src='/imgs/homepage/header/IC.png'
              alt='logo'
              width={200}
              height={200}
              className='h-[3.125rem] w-[2.33106rem]'
            />
          </Link>
          {/* right */}
          <div className='flex h-full items-center space-x-[2rem]'>
            {menu.slice(-2).map((item: MenuItem, index) =>
              item.children ? (
                <div
                  key={index}
                  className='item-has-children group flex h-full cursor-pointer items-center space-x-[0.25rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>{item.title}</span>
                  <ImageV2
                    src='/icons/homepage/header/arrow-down-brown.svg'
                    alt='logo'
                    width={40}
                    height={40}
                    className='size-[1rem] object-contain'
                  />
                  <div className='children-menu invisible absolute left-1/2 top-[100%] z-[52] -translate-x-1/2 opacity-0 transition-all delay-300 duration-300 group-hover:visible group-hover:opacity-100 group-hover:delay-0'>
                    <ImageV2
                      src='/icons/homepage/header/triangle.svg'
                      alt='logo'
                      width={40}
                      height={40}
                      className='h-[2rem] w-[3rem] translate-x-[60rem] object-contain'
                    />
                    <div className='h-[37.5rem] w-[95rem] -translate-y-[1rem] rounded-[1.5rem] bg-white p-[4rem_5rem]'>
                      <div className='flex items-start justify-between'>
                        <div className=''>
                          <p className='mb-[2.5rem] font-optima text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] text-greyscaletext-body'>
                            {item.title}
                          </p>
                          <div className='flex flex-col'>
                            {item.children.map((child: MenuItem, index) => (
                              <div
                                key={index}
                                className='flex flex-col'
                                onMouseEnter={() =>
                                  handleChangeUrlImage(child?.imgUrl || '')
                                }
                              >
                                <Link
                                  href={child.href}
                                  className='relative rounded-[0.75rem] p-[1.5rem] hover:bg-[linear-gradient(90deg,#F2EDE7_0%,rgba(242,237,231,0.00)100%)]'
                                >
                                  <p className='font-optima text-[1.75rem] font-medium uppercase tracking-[-0.035rem] text-greyscaletext-body'>
                                    {child.title}
                                  </p>
                                  {item.children &&
                                    index < item.children.length - 1 && (
                                      <UnderLineHeader className='absolute bottom-0 left-[1.5rem] h-[2px] w-[22.8rem] object-contain' />
                                    )}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Image
                          src={
                            urlImage
                              ? urlImage || ''
                              : item?.children[0]?.imgUrl || ''
                          }
                          alt='logo'
                          width={500}
                          height={500}
                          className='h-[full] w-[38.125rem] rounded-[1rem] object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  key={index}
                  className='flex h-full items-center text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                >
                  {item.title}
                </Link>
              ),
            )}
            <div
              className='group flex cursor-pointer items-center space-x-[0.5rem] rounded-[0.5rem] bg-[#2E1506] p-[0.5rem_1.375rem_0.5rem_1.125rem]'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ImageV2
                src='/icons/homepage/header/star.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1.5rem] object-contain'
              />
              <span className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-white'>
                Hỗ trợ khách hàng
              </span>
              <ImageV2
                src='/icons/homepage/header/down-white.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1rem] object-contain'
              />
              <div className='children-menu invisible absolute left-1/2 top-[100%] z-[52] !ml-0 -translate-x-1/2 opacity-0 transition-all delay-300 duration-300 group-hover:visible group-hover:opacity-100 group-hover:delay-0'>
                <ImageV2
                  src='/icons/homepage/header/triangle.svg'
                  alt='logo'
                  width={40}
                  height={40}
                  className='h-[2rem] w-[3rem] translate-x-[84rem] object-contain'
                />
                <div className='h-[37.5rem] w-[95rem] -translate-y-[1rem] rounded-[1.5rem] bg-white p-[4rem_5rem]'>
                  <div className='flex items-start justify-between'>
                    <div className=''>
                      <p className='mb-[2.5rem] font-optima text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] text-greyscaletext-body'>
                        Hỗ trợ khách hàng
                      </p>
                      <div className='flex flex-col'>
                        {listItemSupportCustomer.map(
                          (child: MenuItem, index) => (
                            <div
                              key={index}
                              className='flex flex-col'
                              onMouseEnter={() =>
                                handleChangeUrlImageSupportCustomer(
                                  child.imgUrl || '',
                                )
                              }
                            >
                              <Link
                                href={child.href}
                                className='relative rounded-[0.75rem] p-[1.5rem] hover:bg-[linear-gradient(90deg,#F2EDE7_0%,rgba(242,237,231,0.00)100%)]'
                              >
                                <p className='font-optima text-[1.75rem] font-medium uppercase tracking-[-0.035rem] text-greyscaletext-body'>
                                  {child.title}
                                </p>
                                {index < listItemSupportCustomer.length - 1 && (
                                  <UnderLineHeader className='absolute bottom-0 left-[1.5rem] h-[2px] w-[22.8rem] object-contain' />
                                )}
                              </Link>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <ImageV2
                      src={
                        urlImageSupportCustomer
                          ? urlImageSupportCustomer || ''
                          : listItemSupportCustomer[0].imgUrl || ''
                      }
                      alt='logo'
                      width={500}
                      height={500}
                      className='h-[full] w-[38.125rem] rounded-[1rem] object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex h-[3.75rem] items-center justify-between bg-white py-[0.62rem] section-container sm:hidden'>
        <Link href={'/'}>
          <ImageV2
            src='/imgs/homepage/header/d-IC-mb.png'
            alt='logo'
            width={100}
            height={100}
            className='h-[2.25rem] w-[6.25244rem] object-contain'
          />
        </Link>
        <div className='flex items-center space-x-[1.5rem]'>
          <div
            className='flex items-center'
            onClick={handleOpenLanguageMb}
          >
            <div className='relative mr-1 size-[1rem] rounded-[50%]'>
              <ImageV2
                src='/imgs/homepage/header/vn-flag2.png'
                alt='logo'
                width={40}
                height={40}
                className='absolute left-0 top-0 z-0 size-[1rem] h-full w-full rounded-[50%]'
              />
              <div className='absolute top-0 z-[1] h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
            </div>
            <span className='text-[0.75rem] font-medium leading-[1.5] text-greyscaletext-600'>
              VN
            </span>
            <ImageV2
              src={'/icons/homepage/header/arrow-down-brown-mb.svg'}
              alt='down'
              width={40}
              height={40}
              className='ml-[0.38rem] size-[1.125rem] object-contain'
            />
          </div>
          <button
            onClick={handleToggleMenu}
            className='relative flex h-[2.125rem] w-[3.125rem] items-center justify-center rounded-[0.38rem] bg-[rgba(0,0,0,0.10)]'
            aria-label='Toggle Menu'
            aria-expanded={isCloseMenu}
          >
            <span
              className={`absolute left-1/2 block h-[0.13rem] -translate-x-1/2 transform rounded-full bg-[linear-gradient(97deg,#5C321E_-3.86%,_#95502F_51.97%,#F5C178_117.18%)] transition-all duration-300 ease-in-out ${
                isCloseMenu
                  ? 'top-1/2 w-[1.25rem] -translate-y-1/2 rotate-45'
                  : 'le top-[0.75rem] w-[1.63rem] translate-y-0 rotate-0'
              }`}
            />
            <span
              className={`absolute left-1/2 block h-[0.13rem] w-[1.25rem] transform rounded-full transition-all duration-300 ease-in-out ${
                isCloseMenu
                  ? 'top-1/2 w-[1.25rem] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[linear-gradient(196deg,#5C321E_-3.86%,_#95502F_51.97%,#F5C178_117.18%)]'
                  : 'top-5 w-[1.25rem] -translate-x-1/3 translate-y-0 rotate-0 bg-[linear-gradient(97deg,#5C321E_-3.86%,_#95502F_51.97%,#F5C178_117.18%)]'
              }`}
            />
          </button>
        </div>
        <div
          className={`dropdown-menu absolute left-0 top-[100%] z-50 h-screen w-full overflow-auto bg-white p-[1.5rem_1rem] pb-[3.5rem] transition-all duration-300 ${!isCloseMenu ? 'translate-x-[150%]' : 'translate-x-0'}`}
        >
          <div className='flex flex-col space-y-3'>
            {menu.slice(0, 4).map((item: MenuItem, index: number) =>
              item.children ? (
                <div
                  key={index}
                  className='relative flex h-[4.8125rem] w-full items-center justify-end rounded-[0.5rem] pr-[1.12rem]'
                  onClick={() => {
                    handleSelectChild(item)
                    handleToggleChild()
                  }}
                >
                  {item?.background && (
                    <ImageV2
                      src={item?.background || ''}
                      alt='logo'
                      width={500}
                      height={500}
                      className='absolute left-0 top-0 h-full w-full rounded-[0.5rem] object-cover'
                    />
                  )}
                  <div className='relative z-10 w-[9.06rem]'>
                    <span className='text-[1rem] font-semibold leading-[150%] tracking-[-0.01rem] text-white'>
                      {item?.title}
                    </span>
                    <ImageV2
                      src={'/icons/homepage/header/line-mb.svg'}
                      alt='logo'
                      width={40}
                      height={40}
                      className='my-[0.25rem] w-full'
                    />
                    <span className='text-[0.75rem] font-normal leading-[1.5] text-white opacity-85'>
                      {item?.count ? item?.count : 3} chương trình
                    </span>
                  </div>
                  <ImageV2
                    src={'/icons/homepage/header/arrow_mb.svg'}
                    alt='logo'
                    width={40}
                    height={40}
                    className='z-10 ml-[0.81rem] size-[1.625rem]'
                  />
                </div>
              ) : (
                <Link
                  href={item.href}
                  key={index}
                  className='relative flex h-[4.8125rem] w-full items-center justify-end rounded-[0.5rem] pr-[1.12rem]'
                >
                  {item?.background && (
                    <ImageV2
                      src={item?.background || ''}
                      alt='logo'
                      width={500}
                      height={500}
                      className='absolute left-0 top-0 h-full w-full rounded-[0.5rem] object-cover'
                    />
                  )}
                  <div className='relative z-10 w-[9.06rem]'>
                    <span className='text-[1rem] font-semibold leading-[150%] tracking-[-0.01rem] text-white'>
                      {item?.title}
                    </span>
                    <ImageV2
                      src={'/icons/homepage/header/line-mb.svg'}
                      alt='logo'
                      width={40}
                      height={40}
                      className='my-[0.25rem] w-full'
                    />
                    <span className='text-[0.75rem] font-normal leading-[1.5] text-white opacity-85'>
                      {item?.count ? item?.count : 3} chương trình
                    </span>
                  </div>
                  <ImageV2
                    src={'/icons/homepage/header/arrow_mb.svg'}
                    alt='logo'
                    width={40}
                    height={40}
                    className='z-10 ml-[0.81rem] size-[1.625rem]'
                  />
                </Link>
              ),
            )}
          </div>
          <div
            className='mb-3 mt-3 flex w-full items-center justify-between rounded-[0.75rem] bg-[#F1F0EC] p-4'
            onClick={() => {
              handleSelectChild(menu[4])
              handleToggleChild()
            }}
          >
            <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
              Các chương trình khác
            </span>
            <ImageV2
              src='/icons/homepage/header/arrow_normal_mb.svg'
              alt='arrow'
              width={40}
              height={40}
              className='size-[1.125rem] object-contain'
            />
          </div>
          <div className='flex flex-col rounded-[0.75rem] bg-[#F1F0EC] p-4'>
            {listMenuMobileLast.map((item, index) =>
              item.children ? (
                <div key={index}>
                  <div
                    className='flex items-center justify-between'
                    onClick={() => {
                      handleSelectChild(item)
                      handleToggleChild()
                    }}
                  >
                    <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
                      {item.title}
                    </span>
                    <ImageV2
                      src='/icons/homepage/header/arrow_normal_mb.svg'
                      alt='arrow'
                      width={40}
                      height={40}
                      className='size-[1.125rem] object-contain'
                    />
                  </div>
                  {index < listMenuMobileLast.length - 1 && (
                    <div className='my-4 h-[1px] w-full bg-[rgba(0,0,0,0.10)]'></div>
                  )}
                </div>
              ) : (
                <Link
                  href={'/'}
                  key={index}
                >
                  <div className='flex items-center justify-between'>
                    <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
                      {item.title}
                    </span>
                    <ImageV2
                      src='/icons/homepage/header/arrow_normal_mb.svg'
                      alt='arrow'
                      width={40}
                      height={40}
                      className='size-[1.125rem] object-contain'
                    />
                  </div>
                  {index < listMenuMobileLast.length - 1 && (
                    <div className='my-4 h-[1px] w-full bg-[rgba(0,0,0,0.10)]'></div>
                  )}
                </Link>
              ),
            )}
          </div>

          <div className='mb-[3.5rem] mt-[2.5rem] flex items-center justify-center space-x-[0.75rem]'>
            {socialNetwork.map((item: SocialNetwork, index: number) => (
              <Link
                href={item.link || '/'}
                key={index}
                className='flex size-[2.75rem] items-center justify-center rounded-[0.5rem] border-[1px] border-[rgba(0,0,0,0.10)]'
              >
                <ImageV2
                  src={item.icon || ''}
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[1.5rem] object-contain'
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`popup-change-language fixed bottom-0 left-0 z-[51] h-fit w-full rounded-tl-[1rem] rounded-tr-[1rem] bg-white p-4 pb-[1.5rem] transition-all duration-300 sm:hidden ${isActivedLanguageMb ? 'translate-y-0' : 'translate-y-[150%]'}`}
      >
        <div className='flex items-center justify-between border-b-[1px] border-[#EBEBEB] pb-4'>
          <span className='text-[0.875rem] font-semibold tracking-[-0.0175rem] text-brown'>
            Lựa chọn ngôn ngữ
          </span>
          <ImageV2
            src={'/icons/homepage/header/close-popup.svg'}
            alt='close'
            width={40}
            height={40}
            className='size-[1.5rem] object-contain'
            onClick={handleOpenLanguageMb}
          />
        </div>
        <>
          {languageOptions.map((item: LanguageOption, index: number) => (
            <div
              className='flex items-center space-x-[0.5rem] border-b-[1px] border-[#EBEBEB] p-[1rem_0.75rem]'
              key={index}
            >
              <ImageV2
                src={item.flagUrl || ''}
                alt='logo'
                width={40}
                height={40}
                className='size-[1.5rem] rounded-[50%] object-contain'
              />
              <span className='text-[0.875rem] leading-[1.5] tracking-[-0.00875rem] text-greyscaletext-body'>
                {item.label}
              </span>
            </div>
          ))}
        </>
      </div>
      <div
        className={`fixed bottom-0 left-0 z-[51] flex h-full w-full items-end transition-all duration-300 sm:hidden ${isOpenedChild ? 'opacity-1 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
      >
        <div
          className='absolute z-10 h-full w-full bg-[rgba(0,0,0,0.16)]'
          onClick={handleToggleChild}
        ></div>
        <div
          className={`relative z-20 h-fit max-h-[50vh] w-full translate-y-0 rounded-tl-[1rem] rounded-tr-[1rem] bg-white p-4 pb-[1.5rem] transition-all duration-300 sm:hidden ${isOpenedChild ? 'translate-y-0' : 'translate-y-[150%]'}`}
        >
          <div className='flex items-center justify-between pb-4'>
            <span className='text-[0.875rem] font-semibold tracking-[-0.0175rem] text-brown'>
              {selectedChild?.title}
            </span>
            <ImageV2
              src={'/icons/homepage/header/close-popup.svg'}
              alt='close'
              width={40}
              height={40}
              className='size-[1.5rem] object-contain'
              onClick={handleToggleChild}
            />
          </div>
          <div className='flex flex-col rounded-[0.75rem] bg-[#F1F0EC] p-4'>
            {selectedChild?.children?.map((item: MenuItem, index: number) => (
              <Link
                href={item.href}
                key={index}
              >
                <div className='flex items-center justify-between'>
                  <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
                    {item.title}
                  </span>
                  <ImageV2
                    src='/icons/homepage/header/arrow_normal_mb.svg'
                    alt='arrow'
                    width={40}
                    height={40}
                    className='size-[1.125rem] object-contain'
                  />
                </div>
                {selectedChild?.children &&
                  index < selectedChild.children.length - 1 && (
                    <div className='my-4 h-[1px] w-full bg-[rgba(0,0,0,0.10)]'></div>
                  )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`overlay-menu pointer-events-none fixed left-0 top-0 z-[50] h-full w-full bg-[rgba(0,0,0,0.16)] xsm:pointer-events-auto ${isActiveOverlay ? 'block' : 'hidden'}`}
        onClick={handleOpenLanguageMb}
      ></div>
    </header>
  )
}

export default Header
