'use client'
import ButtonBorder from '@/components/button/ButtonBorder'
import ImageV2 from '@/components/image/ImageV2'
import {SuccessPopup} from '@/components/success-popup'
import CF7Request from '@/fetch/cf7Request'
import {isLockScroll} from '@/hooks/useBodyScrollLock'
import ICArrowRinght from '@/layout/footer/ICArrowRinght'
import {
  contactInformatio,
  dataFooter,
  linkInterface,
} from '@/types/dataFooter.interface'
import endpoints from '@/utils/endpoints'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'

interface social {
  icon: {
    url: string
    alt: string
  }
  link: string
}

export default function Footer({dataFooter}: {dataFooter: dataFooter}) {
  const [email, setEmail] = useState<string>('')
  const [validemail, setValidEmail] = useState<boolean>(false)
  const [popup, setPopup] = useState<boolean>(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setValidEmail(!validateEmail(value))
  }

  const handleSubmit = async () => {
    if (validateEmail(email)) {
      const values = {email: email}
      const request = new CF7Request(values)
      const response = await request.send(endpoints.contactFormAdvise)
      setEmail('')
      if (response?.status) {
        setPopup(true)
      }
      isLockScroll(true)
      // Đóng popup sau 5 giây
      timeoutRef.current = setTimeout(closePopup, 3500)
    } else {
    }
  }
  const closePopup = () => {
    isLockScroll(false)
    setPopup(false)
    // Clear the timeout reference
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }
  return (
    <footer className='relative bg-orangetext-900 pt-[6rem] xsm:pt-[2.5rem]'>
      <div className='mx-auto mb-[3.25rem] flex flex-col items-center space-y-[1.5rem] xsm:mb-[2.5rem] xsm:space-y-[1rem]'>
        <h3
          dangerouslySetInnerHTML={{
            __html: dataFooter?.title,
          }}
          className='w-[45.29138rem] text-center font-optima font-semibold tracking-[-0.05rem] text-textwhitetest heading2 xsm:w-full'
        ></h3>
        <ButtonBorder
          target={dataFooter?.customer_support?.target}
          title={dataFooter?.customer_support?.title}
          link={dataFooter?.customer_support?.url}
        />
      </div>
      <ImageV2
        alt='bg-footer'
        src={'/imgs/homepage/footer/bg-footer.png'}
        width={1600}
        height={522}
        className='absolute bottom-0 left-0 z-0 h-[calc(38.6875rem-6.06rem)] w-full opacity-[0.3] xsm:hidden'
      />
      <div className='relative h-[calc(38.6875rem-6.06rem)] space-y-[3.5rem] rounded-[2rem_2rem_0_0] bg-[rgba(255,255,255,0.03)] px-[6rem] pt-[4rem] section-container xsm:h-auto xsm:space-y-[2rem] xsm:p-[2.5rem_1rem]'>
        <div className='flex sm:justify-between xsm:flex-col'>
          <ImageV2
            alt={dataFooter?.logo_footer?.alt}
            src={dataFooter?.logo_footer?.url}
            width={190}
            height={223}
            className='h-[13.95613rem] w-[11.875rem] xsm:mx-auto xsm:h-[9.625rem] xsm:w-[8.18975rem]'
          />
          <div className='mt-[2rem] flex space-x-[5rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[2.5rem]'>
            <div className='w-[17.25rem] space-y-[2rem] xsm:w-full xsm:space-y-[1rem]'>
              <p className='font-medium text-white body16 xsm:font-bold'>
                {dataFooter?.contact_information?.title}
              </p>
              <div className='space-y-[1.25rem] xsm:space-y-[0.75rem]'>
                {dataFooter?.contact_information?.contact_information_repeater?.map(
                  (e: contactInformatio, index: number) => (
                    <Link
                      target={e?.link?.target}
                      key={index}
                      href={e?.link?.url}
                      className='flex items-start space-x-[1rem]'
                    >
                      <ImageV2
                        alt=''
                        src={e?.icon}
                        width={40}
                        height={40}
                        className='size-[1.25rem] object-contain'
                      />
                      <p className='text-white body16 xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                        {e?.link?.title}
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </div>
            <div className='space-y-[2rem] xsm:space-y-[1rem]'>
              <p className='font-medium text-white body16 xsm:font-bold'>
                {dataFooter?.menu?.title}
              </p>
              <div className='sm:space-y-[1.25rem] xsm:grid xsm:grid-cols-2 xsm:gap-y-[0.75rem]'>
                {dataFooter?.menu?.menu_repeater?.map(
                  (e: linkInterface, index: number) => (
                    <Link
                      key={index}
                      target={e?.target}
                      href={e?.url}
                      className='flex items-center space-x-[1rem]'
                    >
                      <p className='text-white body16 xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                        {e?.title}
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </div>
            <div className='w-[21.3125rem] xsm:w-full'>
              <p className='mb-[2rem] font-medium text-white heading5 sm:leading-[133.3%] xsm:mb-[1.5rem] xsm:body16-s'>
                {dataFooter?.describe}
              </p>
              <span className='font-semibold text-white sub-14'>
                Đăng ký để nhận tư vấn
              </span>
              <div className='mt-[1rem] flex rounded-[0.5rem] bg-white p-[0.75rem_0.5rem_0.75rem_1rem]'>
                <input
                  type='email'
                  placeholder='Email của bạn'
                  className='flex-1 tracking-[-0.02rem] body16 placeholder:text-greyscaletext-200 focus:outline-none focus-visible:outline-none'
                  value={email}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit()
                  }}
                />
                <div
                  onClick={handleSubmit}
                  className='cursor-pointer'
                >
                  <ICArrowRinght className='size-[1.5rem]' />
                </div>
              </div>
              {validemail && (
                <p className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16'>
                  Email không hợp lệ
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-between rounded-[1rem] bg-[rgba(112,115,124,0.08)] p-[1.5rem_1.5rem_1.5rem_2rem] xsm:flex-col-reverse xsm:bg-[rgba(112,115,124,0.16)] xsm:p-[1rem_1.5rem_1.5rem_1.5rem]'>
          <p className='font-bold text-white sub-14'>
            © 2024 iCanfield. Designed by OKHUB
          </p>
          <div className='flex items-center space-x-[0.75rem] xsm:mb-[1rem]'>
            {dataFooter?.social?.map((e: social, index: number) => (
              <Link
                key={index}
                href={e?.link}
                className='relative cursor-pointer p-[0.62rem] flex-center before:absolute before:bottom-0 before:left-0 before:z-[2] before:h-0 before:w-full before:rounded-[0.625rem] before:bg-primary-brown before:transition-all before:duration-700 hover:before:h-[2.75rem]'
              >
                <ImageV2
                  alt=''
                  src={e?.icon?.url}
                  width={40}
                  height={40}
                  className='z-[3] size-[1.5rem] object-contain'
                />
              </Link>
            ))}
          </div>
        </div>
        <SuccessPopup
          setActive={closePopup}
          active={popup}
        />
      </div>
    </footer>
  )
}
