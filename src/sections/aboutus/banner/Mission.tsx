'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import CountNumber from '@/sections/homepage/global-immigration/CountNumber'
import {useEffect, useRef, useState} from 'react'
import './style.css'
import { dataMission } from '@/types/dataAcfAboutus.interface'

export default function Mission({dataMission}: {dataMission: dataMission}) {
  const [activeInterFace, setActiveInterFace] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
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
    <section className='relative h-[88.25rem] xsm:h-[56.375rem]'>
      <ImageV2
        className='h-[82rem] w-full translate-y-[-16rem] object-contain opacity-[0.8] xsm:h-[62.5rem] xsm:object-cover'
        alt=''
        width={1300}
        height={1300}
        src={'/imgs/homepage/banner/BG-sky.png'}
      />
      <div
        className='absolute bottom-0 z-20 h-[64.9375rem] w-full xsm:h-[21.4375rem]'
      >
        <ImageV2
          className='size-full object-cover xsm:hidden'
          alt=''
          width={1300}
          height={1300}
          src={'/imgs/homepage/banner/bg-house.png'}
        />
        <ImageV2
          className='size-full object-cover sm:hidden'
          alt=''
          width={1300}
          height={1300}
          src={'/imgs/homepage/banner/bg-houseMBv3.webp'}
        />
      </div>
      <ImageV2
        className='absolute bottom-[-14rem] left-0 z-20 h-[24.0625rem] w-full object-cover xsm:bottom-[-4.7rem] xsm:h-auto'
        alt=''
        width={1300}
        height={1300}
        src={'/imgs/homepage/banner/silk-strip.png'}
      />
      <div
        ref={ref}
        className={cn(
          activeInterFace ? 'mission__fadein' : '',
          'absolute bottom-[3.5rem] left-[50%] z-10 translate-x-[-50%] transition-all sm:translate-y-[25%] xsm:bottom-[2.5rem] xsm:w-full xsm:px-[1rem]',
        )}
      >
        <div className='mb-[2.5rem] flex flex-col items-center space-y-[0.625rem] xsm:space-y-[0.5rem]'>
          <span className='body16 xsm:sub-12 font-semibold text-greyscaletext-400 xsm:font-medium xsm:tracking-[-0.015rem]'>
            {dataMission?.label}
          </span>
          <h2
            dangerouslySetInnerHTML={{__html: dataMission?.title}}
            className='xsm:heading1 w-[55.875rem] text-center font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown xsm:w-full'>
          </h2>
        </div>
        <div className='flex h-[60rem] w-[74.75rem] flex-col items-center justify-start rounded-[2.5rem] bg-[linear-gradient(180deg,rgba(220,157,96,0.92)_-18.75%,rgba(123,87,53,0.50)_54.27%,rgba(255,255,255,0.45)_63.95%)] opacity-[0.95] xsm:h-[38.5rem] xsm:w-full xsm:p-[1.5rem_1rem]'>
          <p className='xsm:heading2 font-optima mb-[2rem] w-[49.3125rem] text-center text-[2.25rem] font-semibold leading-[1.2] tracking-[-0.045rem] text-textwhitetest sm:mt-[2.44rem] xsm:w-full'>
            {dataMission?.decscripts}
          </p>
          <div className='flex sm:space-x-[6rem] xsm:grid xsm:grid-cols-2 xsm:gap-[2rem]'>
            {dataMission?.parameter?.successful_settlement?.data && dataMission?.parameter?.successful_settlement?.title && (
              <div className='flex flex-col items-center'>
                <CountNumber
                  interFace={!activeInterFace}
                  delay={isMobile ? 0 : 300}
                  number={dataMission?.parameter?.successful_settlement?.data}
                  suffix='+'
                  className={{
                    suffixClass: 'text-[1.875rem] font-bold text-white',
                    numberClass: 'text-white',
                  }}
                />
                <div className='my-[0.5rem] h-[0.0625rem] w-full bg-white opacity-[0.4]'></div>
                <p className='body16-m xsm:sub-12 text-white xsm:font-medium xsm:tracking-[-0.015rem]'>
                  {dataMission?.parameter?.successful_settlement?.title}
                </p>
              </div>
            )}
            {dataMission?.parameter?.study_abroad_successfully?.data && dataMission?.parameter?.study_abroad_successfully?.title && (
              <div className='flex flex-col items-center'>
                <CountNumber
                  interFace={!activeInterFace}
                  delay={isMobile ? 0 : 300}
                  number={dataMission?.parameter?.study_abroad_successfully?.data}
                  suffix='+'
                  className={{
                    suffixClass: 'text-[1.875rem] font-bold text-white',
                    numberClass: 'text-white',
                  }}
                />
                <div className='my-[0.5rem] h-[0.0625rem] w-full bg-white opacity-[0.4]'></div>
                <p className='body16-m xsm:sub-12 text-white xsm:font-medium xsm:tracking-[-0.015rem]'>
                  {dataMission?.parameter?.study_abroad_successfully?.title}
                </p>
              </div>
            )}
            {dataMission?.parameter?.investing_in_foreign_real_estate?.data && dataMission?.parameter?.investing_in_foreign_real_estate?.title && (
              <div className='flex flex-col items-center'>
                <CountNumber
                  interFace={!activeInterFace}
                  delay={isMobile ? 0 : 300}
                  number={dataMission?.parameter?.investing_in_foreign_real_estate?.data}
                  suffix='+'
                  className={{
                    suffixClass: 'text-[1.875rem] font-bold text-white',
                    numberClass: 'text-white',
                  }}
                />
                <div className='my-[0.5rem] h-[0.0625rem] w-full bg-white opacity-[0.4]'></div>
                <p className='body16-m xsm:sub-12 text-white xsm:font-medium xsm:tracking-[-0.015rem]'>
                  {dataMission?.parameter?.investing_in_foreign_real_estate?.title}
                </p>
              </div>
            )}
            {dataMission?.parameter?.global_partner?.data && dataMission?.parameter?.global_partner?.title && (
              <div className='flex flex-col items-center'>
                <CountNumber
                  interFace={!activeInterFace}
                  delay={isMobile ? 0 : 300}
                  number={dataMission?.parameter?.global_partner?.data}
                  suffix='+'
                  className={{
                    suffixClass: 'text-[1.875rem] font-bold text-white',
                    numberClass: 'text-white',
                  }}
                />
                <div className='my-[0.5rem] h-[0.0625rem] w-full bg-white opacity-[0.4]'></div>
                <p className='body16-m xsm:sub-12 text-white xsm:font-medium xsm:tracking-[-0.015rem]'>
                  {dataMission?.parameter?.global_partner?.title}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
