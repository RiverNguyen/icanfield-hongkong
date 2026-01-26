'use client'

import useStore from '@/app/(store)/store'
import ImageV2 from '@/components/image/ImageV2'
import UnderLineHeader from '@/components/svg/UnderLine'
import {isLockScroll} from '@/hooks/useBodyScrollLock'
import {social} from '@/layout/footer'
import {dataFooter} from '@/types/dataFooter.interface'
import {
  ChildProgram,
  ImageHeader,
  Language,
  OutstandingPost,
  Program,
  SettingItem,
  dataHeader,
} from '@/types/dataHeader.interface'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'

// Declare googleTranslateElementInit and google on the Window interface
declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: {
      translate: {
        TranslateElement: new (options: object, container: string) => void
      }
    }
  }
}
import 'swiper/css'
import {Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {languageOptions} from './constants'
import './styles.css'
import PopupForm from '@/components/popupAllPage'
import LanguageSwitcher from '@/components/language-switcher'

interface ILanguageSwitcher {
  [key: string]: {
    slug: string
  }
}

export interface IPropsPopup {
  setting: SettingItem[]
  image_form_all: ImageHeader
}
const Header = ({
  data,
  dataFooter,
  dataPopup,
  languageSwitcher,
}: {
  data: dataHeader
  dataFooter: dataFooter
  dataPopup?: IPropsPopup
  languageSwitcher?: ILanguageSwitcher
}) => {
  const listMenuMobileLast = [data?.icanfield_handbook, data?.contact].filter(
    Boolean,
  )
  const [isActivedLanguage, setIsActivedLanguage] = React.useState(false) //handle language dropdown
  const [isCurrentLanguage, setIsCurrentLanguage] = React.useState(
    data?.language?.languages[0] || languageOptions[0],
  ) //handle current language
  const [isActiveOverlay, setIsActiveOverlay] = React.useState(false) //handle overlay menu
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [urlImage, setUrlImage] = React.useState<string | null>(null)
  const [urlImageSupportCustomer, setUrlImageSupportCustomer] = React.useState<
    string | null
  >(null)
  const [isCloseMenu, setIsCloseMenu] = React.useState(false)
  const refDropdownLanguage = React.useRef<HTMLDivElement>(null)
  const [selectedChild, setSelectedChild] = React.useState<
    Program | {label: string; childrens: ChildProgram[]} | null
  >(null)
  const refDisableHover = React.useRef<HTMLDivElement>(null)
  const [isOpenedChild, setIsOpenedChild] = React.useState(false)
  const {setConsultingPhoneNumber} = useStore((state) => state)

  useEffect(() => {
    if (data) {
      setConsultingPhoneNumber(data?.consulting_phone_number)
    }
  }, [data])
  //function handle language dropdown
  const handleOpenLanguage = () => {
    setIsActivedLanguage(!isActivedLanguage)
  }

  //function handle change language
  const handleChangeLanguage = (item: Language) => {
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
    isLockScroll(!isCloseMenu)
  }
  // handle toggle popup Language mobile
  const [isActivedLanguageMb, setIsActivedLanguageMb] = React.useState(false)
  //function handle language dropdown
  const handleOpenLanguageMb = () => {
    setIsActivedLanguageMb(!isActivedLanguageMb)
    setIsActiveOverlay(!isActiveOverlay)
  }
  //handle select child menu
  const handleSelectChild = (
    item: Program | {label: string; childrens: ChildProgram[]},
  ) => {
    setSelectedChild(item)
  }
  //handle toggle child menu
  const handleToggleChild = () => {
    setIsOpenedChild(!isOpenedChild)
  }
  //close the mobile header
  const handleBeforeNavigate = () => {
    setIsCloseMenu(false)
    isLockScroll(false)
    setIsOpenedChild(false)
  }
  //hanlde disable hover
  const handleDisableHover = () => {
    if (refDisableHover.current) {
      // Vô hiệu hóa hover
      refDisableHover.current.style.pointerEvents = 'none'

      // Bật lại sau 0.5s
      setTimeout(() => {
        if (refDisableHover.current) {
          refDisableHover.current.style.pointerEvents = 'auto'
        }
      }, 1000)
    }
  }

  // handle gg translate
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'vi'
    }
    return 'vi'
  })

  useEffect(() => {
    // Lưu ngôn ngữ hiện tại vào localStorage khi `currentLanguage` thay đổi
    if (typeof window !== 'undefined' && currentLanguage) {
      localStorage.setItem('language', currentLanguage)
    }
  }, [currentLanguage])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let timeoutId: NodeJS.Timeout
    let isMounted = true

    const initTranslate = () => {
      // Các logic khởi tạo ngôn ngữ
      const savedLanguage = localStorage.getItem('language') || 'vi'
      setCurrentLanguage(savedLanguage)

      const languages = Array.isArray(data?.language?.languages)
        ? data.language.languages
        : []
      const isCurrentLang =
        languages.find(
          (item: Language) =>
            item.label.toLowerCase() === savedLanguage.toLowerCase(),
        ) || (languages.length > 0 ? languages[0] : null)

      if (isCurrentLang) {
        setIsCurrentLanguage(isCurrentLang)
      }

      // Tải script Google Translate sau khi các tác vụ chính hoàn thành
      if (!document.getElementById('google-translate-script')) {
        const googleTranslateScript = document.createElement('script')
        googleTranslateScript.id = 'google-translate-script'
        googleTranslateScript.src =
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        if (typeof window === 'undefined') return
        // Thêm callback initialization
        window.googleTranslateElementInit = () => {
          if (!isMounted) return

          const languagesString = data?.language?.languages
            .map((item: Language) => item.label.toLowerCase())
            .join(',')

          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: languagesString,
              autoDisplay: false,
              multilanguagePage: true,
            },
            'google_translate_element',
          )
        }

        document.body.appendChild(googleTranslateScript)
      }
    }

    // Delay bằng requestIdleCallback hoặc setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initTranslate)
    } else {
      timeoutId = setTimeout(initTranslate, 1500) // Delay 1.5s
    }

    return () => {
      isMounted = false
      clearTimeout(timeoutId)

      const script = document.getElementById('google-translate-script')
      if (script) {
        document.body.removeChild(script)
      }
      window.googleTranslateElementInit = () => {}
    }
  }, [data?.language?.languages])

  const clearCookies = () => {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
  }

  const handleLanguageChange = (language: string) => {
    if (typeof window === 'undefined') return

    if (language === 'vi') {
      setCurrentLanguage('vi')
      clearCookies()
      window.location.reload()
    } else {
      const selectBox = document.querySelector('.goog-te-combo:last-child')
      if (selectBox) {
        ;(selectBox as HTMLSelectElement).value = language
        selectBox.dispatchEvent(new Event('change'))
        setCurrentLanguage(language)
      }
    }
  }

  // useEffect(() => {
  //   console.log('isCurrentLanguage', isCurrentLanguage)
  // }, [isCurrentLanguage])
  return (
    <header className='fixed left-0 top-0 z-[1000] w-full'>
      <div
        id='google_translate_element'
        className='hidden'
      ></div>
      <div className='header-top bg-[linear-gradient(118deg,#2E1506_69.75%,#95502F_142.7%,#F5C178_182.76%)] xsm:hidden'>
        <div className='flex items-center justify-between section-container'>
          <div className='flex items-center space-x-[0.94rem]'>
            <div className='relative'>
              <div className='z-1 pointer-events-none absolute top-0 h-full w-full bg-[linear-gradient(90deg,#FFF_0%,#FFF_52.5%,#FFF_100%)] opacity-[0.08]'></div>
              <Link
                href={data?.news_business?.link || '/'}
                className='flex items-center justify-center space-x-[0.62rem] p-[0.47rem_0.53rem]'
              >
                <ImageV2
                  src='/icons/homepage/header/news.svg'
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[0.875rem] translate-y-[-1px] object-contain'
                  loading='eager'
                />
                <span className='text-[0.75rem] font-medium uppercase leading-[1.5] text-white'>
                  {data?.news_business?.label || ''}
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
                {Array.isArray(data?.news_business?.outstanding_news) &&
                  data.news_business.outstanding_news.map(
                    (item: OutstandingPost, index) => (
                      <SwiperSlide
                        key={index}
                        className='!flex !h-full !w-fit !items-center'
                      >
                        <Link
                          href={`/tin-tuc/${item?.post_name}` || '/'}
                          className='link-outstanding-post relative z-10 line-clamp-1 text-[0.875rem] font-medium leading-[1.2] text-white'
                        >
                          {item?.post_title}
                        </Link>
                      </SwiperSlide>
                    ),
                  )}
              </Swiper>
            </div>
          </div>
          <div className='flex items-center space-x-[2.73rem]'>
            <Link
              href={data?.events?.link || '/'}
              className='flex items-center space-x-[0.62rem]'
            >
              <ImageV2
                src={'/icons/homepage/header/event.svg'}
                alt='logo'
                width={40}
                height={40}
                className='size-[0.875rem] object-contain'
              />
              <span className='text-[0.75rem] font-medium uppercase leading-[1.5] text-white'>
                {data?.events?.label || ''}
              </span>
            </Link>
            <Link
              href={data?.settlement_news?.link || '/'}
              className='flex items-center space-x-[0.62rem]'
            >
              <ImageV2
                src={'/icons/homepage/header/flag.svg'}
                alt='logo'
                width={40}
                height={40}
                className='size-[0.875rem] object-contain'
              />
              <span className='text-[0.75rem] font-medium uppercase leading-[1.5] text-white'>
                {data?.settlement_news?.label || ''}
              </span>
            </Link>
            <Link
              href={data?.contact?.link || '/'}
              className='flex items-center space-x-[0.62rem]'
            >
              <ImageV2
                src={'/icons/homepage/header/gmail.svg'}
                alt='logo'
                width={40}
                height={40}
                className='size-[0.875rem] object-contain'
              />
              <span className='text-[0.75rem] font-medium uppercase leading-[1.5] text-white'>
                {data?.contact?.label || ''}
              </span>
            </Link>
            <div
              className='language-dropdown relative flex hidden cursor-pointer select-none items-center space-x-[0.5rem]'
              onClick={handleOpenLanguage}
            >
              <div className='relative flex size-[1.2rem] rounded-[50%] bg-[rgba(255,255,255,0.25)] backdrop-blur-[10px]'>
                <div className='absolute bottom-0 left-0 z-[1] h-full w-full rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
                <ImageV2
                  src={isCurrentLanguage?.image_flag?.url || ''}
                  alt='logo'
                  width={200}
                  height={200}
                  className='absolute left-1/2 top-1/2 z-0 size-[1rem] -translate-x-1/2 -translate-y-1/2 scale-[1.05] rounded-[50%]'
                />
              </div>
              <span className='notranslate text-[0.75rem] font-medium leading-[1.5] text-white'>
                {isCurrentLanguage.label}
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
                {Array.isArray(data?.language?.languages) &&
                  data.language.languages.map(
                    (item: Language, index: number) => (
                      <div
                        key={index}
                        className='grid grid-cols-2 items-center space-x-[0.5rem] hover:scale-105'
                        onClick={() => {
                          handleChangeLanguage(item)
                          handleLanguageChange(item.label.toLowerCase())
                        }}
                      >
                        <span
                          className={`notranslate text-[0.75rem] leading-[1.5] text-brown ${isCurrentLanguage.label === item.label ? 'font-semibold' : 'font-medium'} `}
                        >
                          {item.label}
                        </span>
                        <ImageV2
                          src={item?.image_flag?.url || ''}
                          alt='logo'
                          width={40}
                          height={40}
                          className='size-[1rem] rounded-[50%] object-contain'
                        />
                      </div>
                    ),
                  )}
              </div>
            </div>
            <LanguageSwitcher data={languageSwitcher} />
          </div>
        </div>
      </div>
      <div className='header-bottom relative bg-white xsm:hidden'>
        <div
          className='flex h-[4.37rem] items-center justify-between section-container'
          ref={refDisableHover}
        >
          {/* left */}
          <div className='flex h-full items-center space-x-[2.5rem]'>
            {data?.settlement_programs?.list_of_program.map(
              (item: Program, index) =>
                item.childrens ? (
                  <div
                    key={index}
                    className='item-has-children group flex h-full cursor-pointer items-center space-x-[0.25rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span>{item.label}</span>
                    <ImageV2
                      src='/icons/homepage/header/arrow-down-brown.svg'
                      alt='arrow'
                      width={40}
                      height={40}
                      className='size-[1rem] object-contain'
                    />
                    <div className='children-menu invisible absolute left-1/2 top-[100%] z-[52] -translate-x-[75%] opacity-0 transition-all delay-300 duration-300 group-hover:visible group-hover:opacity-100 group-hover:delay-0'>
                      <ImageV2
                        src='/icons/homepage/header/triangle.svg'
                        alt='triangle'
                        width={40}
                        height={40}
                        className='h-[2rem] w-[3rem] translate-x-[8.25rem] object-contain'
                      />
                      <div className='h-[22.5rem] w-[58rem] -translate-y-[1rem] rounded-[1.5rem] bg-white p-4'>
                        <div className='flex h-full items-start justify-between'>
                          <div>
                            <p className='mb-[1.5rem] mt-[2rem] pl-5 font-optima text-[2rem] font-medium leading-[1.2] tracking-[-0.065rem] text-greyscaletext-body'>
                              {item.label}
                            </p>
                            <div className='flex flex-col pl-5'>
                              {item.childrens.map(
                                (child: ChildProgram, childIndex) => (
                                  <div
                                    key={childIndex}
                                    className='flex flex-col'
                                    onMouseEnter={() =>
                                      handleChangeUrlImage(
                                        child.image?.url || '',
                                      )
                                    }
                                  >
                                    <Link
                                      href={child.link}
                                      className='relative rounded-[0.75rem] p-[1rem_0.5rem] hover:bg-[linear-gradient(90deg,#F2EDE7_0%,rgba(242,237,231,0.00)100%)]'
                                      onClick={handleDisableHover}
                                    >
                                      <p className='font-optima text-[1.25rem] font-medium uppercase tracking-[-0.035rem] text-greyscaletext-body'>
                                        {child.label}
                                      </p>
                                      {item.childrens &&
                                        childIndex <
                                          item.childrens.length - 1 && (
                                          <UnderLineHeader className='absolute bottom-0 left-[0rem] h-[2px] w-[22.8rem] object-contain' />
                                        )}
                                    </Link>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <Image
                            src={
                              urlImage || item.childrens[0]?.image?.url || ''
                            }
                            alt='preview'
                            width={500}
                            height={500}
                            className='h-[20.72281rem] w-[26.5rem] rounded-[1rem] object-cover'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.link}
                    className='flex h-full items-center text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
                  >
                    {item.label}
                  </Link>
                ),
            )}
          </div>
          <Link href={'/'}>
            <ImageV2
              src={data?.logo?.url}
              alt='logo'
              width={200}
              height={200}
              className='h-[3.125rem] w-[2.33106rem]'
            />
          </Link>
          {/* right */}
          <div className='flex h-full items-center space-x-[2rem]'>
            <div
              className='item-has-children group flex h-full cursor-pointer items-center space-x-[0.25rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>{data?.other_programs?.label}</span>
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
                  className='h-[2rem] w-[3rem] translate-x-[40rem] object-contain'
                />
                <div className='h-[22.5rem] w-[58rem] -translate-y-[1rem] rounded-[1.5rem] bg-white p-4'>
                  <div className='flex h-full items-start justify-between'>
                    <div className=''>
                      <p className='mb-[1.5rem] mt-[2rem] pl-5 font-optima text-[2rem] font-medium leading-[1.2] tracking-[-0.065rem] text-greyscaletext-body'>
                        {data?.other_programs?.label}
                      </p>
                      <div className='flex flex-col pl-5'>
                        {Array.isArray(data?.other_programs?.program_list) &&
                          data.other_programs.program_list.map(
                            (child: ChildProgram, index) => (
                              <div
                                key={index}
                                className='flex flex-col'
                                onMouseEnter={() =>
                                  handleChangeUrlImage(child?.image?.url || '')
                                }
                              >
                                <Link
                                  href={child.link}
                                  className='relative rounded-[0.75rem] p-[1rem_0.5rem] hover:bg-[linear-gradient(90deg,#F2EDE7_0%,rgba(242,237,231,0.00)100%)]'
                                  onClick={handleDisableHover}
                                >
                                  <p className='font-optima text-[1.25rem] font-medium uppercase tracking-[-0.035rem] text-greyscaletext-body'>
                                    {child.label}
                                  </p>
                                  {data?.other_programs?.program_list &&
                                    index <
                                      data?.other_programs?.program_list
                                        .length -
                                        1 && (
                                      <UnderLineHeader className='absolute bottom-0 left-[0rem] h-[2px] w-[22.8rem] object-contain' />
                                    )}
                                </Link>
                              </div>
                            ),
                          )}
                      </div>
                    </div>
                    <Image
                      src={
                        urlImage
                          ? urlImage || ''
                          : data?.other_programs?.program_list[0]?.image?.url ||
                            ''
                      }
                      alt='logo'
                      width={500}
                      height={500}
                      className='h-[20.72281rem] w-[26.5rem] rounded-[1rem] object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={data?.icanfield_handbook?.link || '/'}
              className='flex h-full items-center text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-[#333]'
            >
              {data?.icanfield_handbook?.label}
            </Link>
            <div
              className='group flex cursor-pointer items-center space-x-[0.5rem] rounded-[0.5rem] bg-[#2E1506] p-[0.5rem_1.375rem_0.5rem_1.125rem]'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ImageV2
                src='/icons/homepage/header/star_2.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1.5rem] object-contain'
              />
              <span className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-white'>
                {data?.support_customer?.label}
              </span>
              <ImageV2
                src='/icons/homepage/header/down-white.svg'
                alt='logo'
                width={40}
                height={40}
                className='size-[1rem] object-contain'
              />
              <div className='children-menu invisible absolute left-1/2 top-[100%] z-[52] !ml-0 -translate-x-[22%] opacity-0 transition-all delay-300 duration-300 group-hover:visible group-hover:opacity-100 group-hover:delay-0'>
                <ImageV2
                  src='/icons/homepage/header/triangle.svg'
                  alt='logo'
                  width={40}
                  height={40}
                  className='h-[2rem] w-[3rem] translate-x-[48rem] object-contain'
                />
                <div className='h-[22.5rem] w-[58rem] -translate-y-[1rem] rounded-[1.5rem] bg-white p-4'>
                  <div className='flex h-full items-start justify-between'>
                    <div className=''>
                      <p className='mb-[2.5rem] mt-2 pl-5 font-optima text-[2rem] font-medium leading-[1.2] tracking-[-0.065rem] text-greyscaletext-body'>
                        {data?.support_customer?.label}
                      </p>
                      <div className='flex flex-col pl-5'>
                        {Array.isArray(data?.support_customer?.list_support) &&
                          data.support_customer.list_support.map(
                            (child: ChildProgram, index) => (
                              <div
                                key={index}
                                className='flex flex-col'
                                onMouseEnter={() =>
                                  handleChangeUrlImageSupportCustomer(
                                    child.image?.url || '',
                                  )
                                }
                              >
                                <Link
                                  href={child.link}
                                  className='relative rounded-[0.75rem] p-[1rem_0.5rem] hover:bg-[linear-gradient(90deg,#F2EDE7_0%,rgba(242,237,231,0.00)100%)]'
                                  onClick={handleDisableHover}
                                >
                                  <p className='font-optima text-[1.25rem] font-medium uppercase tracking-[-0.035rem] text-greyscaletext-body'>
                                    {child.label}
                                  </p>
                                  {index <
                                    data?.support_customer?.list_support
                                      .length -
                                      1 && (
                                    <UnderLineHeader className='absolute bottom-0 left-[0rem] h-[2px] w-[22.8rem] object-contain' />
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
                          : (Array.isArray(
                              data?.support_customer?.list_support,
                            ) &&
                              data.support_customer.list_support.length > 0 &&
                              data.support_customer.list_support[0]?.image
                                ?.url) ||
                            ''
                      }
                      alt='logo'
                      width={500}
                      height={500}
                      className='h-full w-[26.5rem] rounded-[1rem] object-cover'
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
            src={data?.logo_mb?.url || '/imgs/homepage/header/d-IC-mb.png'}
            alt='logo'
            width={100}
            height={100}
            className='h-[2.25rem] w-[6.25244rem] object-contain'
          />
        </Link>
        <div className='flex items-center space-x-[1.5rem]'>
          <div
            className='flex hidden items-center'
            onClick={handleOpenLanguageMb}
          >
            <div className='relative mr-1 size-[1rem] rounded-[50%]'>
              <ImageV2
                src={isCurrentLanguage?.image_flag?.url || ''}
                alt='logo'
                width={40}
                height={40}
                className='absolute left-0 top-0 z-0 size-[1rem] h-full w-full rounded-[50%]'
              />
              <div className='absolute top-0 z-[1] h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
            </div>
            <span className='text-[0.75rem] font-medium leading-[1.5] text-greyscaletext-600'>
              {isCurrentLanguage.label}
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
            {data?.settlement_programs?.list_of_program.map(
              (item: Program, index: number) =>
                item.childrens ? (
                  <div
                    key={index}
                    className='relative flex h-[4.8125rem] w-full items-center justify-end rounded-[0.5rem] pr-[1.12rem]'
                    onClick={() => {
                      handleSelectChild(item)
                      handleToggleChild()
                    }}
                  >
                    {item?.background_mobile && (
                      <ImageV2
                        src={item?.background_mobile.url || ''}
                        alt='logo'
                        width={500}
                        height={500}
                        className='absolute left-0 top-0 h-full w-full rounded-[0.5rem] object-cover'
                      />
                    )}
                    <div className='relative z-10 w-[9.06rem]'>
                      <span className='text-[1rem] font-semibold leading-[150%] tracking-[-0.01rem] text-white'>
                        {item?.label}
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
                    href={item.link}
                    onClick={() => handleBeforeNavigate()}
                    prefetch
                    key={index}
                    className='relative flex h-[4.8125rem] w-full items-center justify-end rounded-[0.5rem] pr-[1.12rem]'
                  >
                    {item?.background_mobile && (
                      <ImageV2
                        src={item?.background_mobile?.url || ''}
                        alt='logo'
                        width={500}
                        height={500}
                        className='absolute left-0 top-0 h-full w-full rounded-[0.5rem] object-cover'
                      />
                    )}
                    <div className='relative z-10 w-[9.06rem]'>
                      <span className='text-[1rem] font-semibold leading-[150%] tracking-[-0.01rem] text-white'>
                        {item?.label}
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
              handleSelectChild({
                label: data?.other_programs?.label,
                childrens: data?.other_programs?.program_list,
              })
              handleToggleChild()
            }}
          >
            <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
              {data?.other_programs?.label}
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
            <div>
              <div
                className='flex items-center justify-between'
                onClick={() => {
                  handleSelectChild({
                    label: data?.support_customer?.label,
                    childrens: data?.support_customer?.list_support,
                  })
                  handleToggleChild()
                }}
              >
                <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
                  {data?.support_customer?.label}
                </span>
                <ImageV2
                  src='/icons/homepage/header/arrow_normal_mb.svg'
                  alt='arrow'
                  width={40}
                  height={40}
                  className='size-[1.125rem] object-contain'
                />
              </div>

              <div className='my-4 h-[1px] w-full bg-[rgba(0,0,0,0.10)]'></div>
            </div>
            {listMenuMobileLast.map((item, index) => (
              <Link
                href={'link' in item ? item.link : '/'}
                key={index}
                onClick={() => handleBeforeNavigate()}
                prefetch
              >
                <div className='flex items-center justify-between'>
                  <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
                    {item.label}
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
            ))}
          </div>

          <div className='mb-[7.5rem] mt-[2.5rem] flex items-center justify-center space-x-[0.75rem]'>
            {Array.isArray(dataFooter?.social) &&
              dataFooter.social.map((item: social, index: number) => (
                <Link
                  href={item.link || '/'}
                  key={index}
                  className='flex size-[2.75rem] items-center justify-center rounded-[0.5rem] border-[1px] border-[rgba(0,0,0,0.10)] xsm:rounded-[100%]'
                  onClick={() => handleBeforeNavigate()}
                  prefetch
                >
                  <ImageV2
                    src={item.icon?.url || ''}
                    alt='logo'
                    width={40}
                    height={40}
                    className='size-[1.5rem] object-contain [filter:brightness(0)_saturate(100%)_invert(15%)_sepia(58%)_saturate(1201%)_hue-rotate(345deg)_brightness(97%)_contrast(83%)]'
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
          {Array.isArray(data?.language?.languages) &&
            data.language.languages.map((item: Language, index: number) => (
              <div
                className='flex items-center space-x-[0.5rem] border-b-[1px] border-[#EBEBEB] p-[1rem_0.75rem]'
                key={index}
                onClick={() => {
                  handleChangeLanguage(item)
                  handleOpenLanguageMb()
                  handleLanguageChange(item.label.toLowerCase())
                }}
              >
                <ImageV2
                  src={item.image_flag?.url || ''}
                  alt='logo'
                  width={40}
                  height={40}
                  className='size-[1.5rem] rounded-[50%] object-contain'
                />
                <span
                  className={`${isCurrentLanguage.label === item.label ? 'font-bold' : 'font-normal'} text-[0.875rem] leading-[1.5] tracking-[-0.00875rem] text-greyscaletext-body`}
                >
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
              {selectedChild?.label}
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
          <div className='tru flex flex-col rounded-[0.75rem] bg-[#F1F0EC] p-4'>
            {Array.isArray(selectedChild?.childrens) &&
              selectedChild?.childrens.map(
                (item: ChildProgram, index: number) => (
                  <Link
                    href={item.link || '/'}
                    key={index}
                    onClick={() => handleBeforeNavigate()}
                    prefetch
                  >
                    <div className='flex items-center justify-between'>
                      <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
                        {item.label}
                      </span>
                      <ImageV2
                        src='/icons/homepage/header/arrow_normal_mb.svg'
                        alt='arrow'
                        width={40}
                        height={40}
                        className='size-[1.125rem] object-contain'
                      />
                    </div>
                    {selectedChild?.childrens &&
                      index < selectedChild.childrens.length - 1 && (
                        <div className='my-4 h-[1px] w-full bg-[rgba(0,0,0,0.10)]'></div>
                      )}
                  </Link>
                ),
              )}
          </div>
        </div>
      </div>
      <div
        className={`overlay-menu pointer-events-none fixed left-0 top-0 z-[50] h-full w-full bg-[rgba(0,0,0,0.16)] xsm:pointer-events-auto ${isActiveOverlay ? 'block' : 'hidden'}`}
        onClick={handleOpenLanguageMb}
      ></div>
      {dataPopup && <PopupForm dataPopup={dataPopup} />}
    </header>
  )
}

export default Header
