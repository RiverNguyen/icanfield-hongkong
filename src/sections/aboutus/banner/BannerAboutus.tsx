'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {useEffect, useRef, useState} from 'react'
import './style.css'

export default function BannerAboutus() {
  const [activeInterFace, setActiveInterFace] = useState<boolean>(false)
  const ref = useRef<HTMLSelectElement>(null)
  const isMobile = useIsMobile()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (ref.current) {
            setActiveInterFace(true)
            observer.disconnect()
          }
        }
      },
      {
        threshold: 0.1,
      },
    )
    if (ref.current) observer.observe(ref.current)
  }, [])
  return (
    <section
      ref={ref}
      className='relative z-10 sm:h-[100vh] w-full overflow-hidden'
    >
      {isMobile ? (
        <ImageV2
          className='w-full h-full'
          alt=''
          width={1600}
          height={700}
          src={'/imgs/about-us/banner/d-hero_bannermbv2.webp'}
        />
      ) : (
        <ImageV2
          className='w-full h-full'
          alt=''
          width={1600}
          height={700}
          src={'/imgs/about-us/banner/d-hero_bannerv2.webp'}
        />
      )}
      <ImageV2
        className={cn(
          activeInterFace && 'active__plane',
          'absolute left-[11.83rem] top-[14.87rem] h-[16.69144rem] w-[24.98719rem] object-cover transition-all xsm:left-[-0.29rem] xsm:top-[21.31rem] xsm:h-[6.31106rem] xsm:w-[10.14275rem] xsm:rotate-[-5.462deg]',
        )}
        alt=''
        width={399}
        height={267}
        src={'/imgs/about-us/may_bay.webp'}
      />
      <div
        className={cn(
          activeInterFace && 'active__about',
          'absolute top-[13.87rem] z-10 space-y-[1.5rem] transition-all sm:right-[11.94rem] sm:translate-y-[100%] sm:opacity-0 xsm:left-[50%] xsm:top-[4.44rem] xsm:w-[18.25rem] xsm:translate-x-[-50%] xsm:space-y-[1rem]',
        )}
      >
        <p className='font-optima text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] text-white xsm:text-[1.75rem] xsm:font-semibold xsm:tracking-[-0.035rem]'>
          Chúng tôi là
        </p>
        <ImageV2
          className='h-[10.35025rem] w-[33.6875rem] object-contain xsm:h-[5.60719rem] xsm:w-[18.25rem]'
          alt=''
          width={539}
          height={165}
          src={'/imgs/about-us/d-name-icanfield.png'}
        />
        <h1 className='fixed top-[-100%] opacity-0'>Icanfield Việt Nam</h1>
      </div>
      <div
        className={cn(
          activeInterFace && 'active__content',
          'absolute bottom-[3rem] left-[5rem] w-[41.625rem] space-y-[1.19rem] transition-all sm:translate-y-[100%] sm:opacity-0 xsm:bottom-0 xsm:left-[50%] xsm:w-full xsm:translate-x-[-50%] xsm:space-y-[1rem] xsm:p-[2.5rem_1rem]',
        )}
      >
        <span className='font-optima text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.09rem] text-brown xsm:text-[1.25rem] xsm:leading-[1.2] xsm:tracking-[-0.025rem]'>
          Tập đoàn Di trú Hàng đầu <br /> Khu vực Châu Á - Thái Bình Dương
        </span>
        <div className='body-14 tracking-[-0.00875rem] text-greyscaletext-800'>
          <p>
            Là thành viên của iCanfield Group, iCanfield Vietnam tự hào cung cấp
            dịch vụ tư vấn đầu tư quốc tế và định cư toàn cầu theo mô hình
            One-Stop Shop.
            <br />
            Chúng tôi đồng hành cùng các nhà đầu tư Việt Nam, giúp tối ưu hóa
            thời gian và chi phí, đồng thời mang lại hiệu quả đầu tư vượt trội.
            Chúng tôi đồng hành cùng các nhà đầu tư Việt Nam, giúp tối ưu hóa
            thời gian và chi phí, đồng thời mang lại hiệu quả đầu tư vượt trội.
          </p>
        </div>
      </div>
    </section>
  )
}
