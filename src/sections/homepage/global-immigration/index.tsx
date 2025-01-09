'use client'
import ImageV2 from '@/components/image/ImageV2'
import CountNumber from '@/sections/homepage/global-immigration/CountNumber'
import { useEffect, useRef, useState } from 'react'
import './styles.css'

export interface IGlobalImmigrationProps {
  data: {
    title: string
    description: string
    count_number: {
      number: string
      label: string
      title: string
    }[]
  }
}

const GlobalImmigration = ({data}: IGlobalImmigrationProps) => {
  const refSection = useRef(null)
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setIsActive(true)
          }
        })
      },
      {
        threshold: [0.5], // 20% of the element is visible
      },
    )

    const currentRef = refSection.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section
      className={`global-immigration relative sm:h-[75.75rem] ${isActive ? 'active' : ''}`}
      ref={refSection}
    >
      <div className='xsm:hidden'>
        <ImageV2
          className='absolute bottom-[0] left-0 z-30 h-[69.375rem] w-full object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-aboutus-2.png'}
          alt=''
          width={1600}
          height={1110}
        />
        <ImageV2
          className='house-animation absolute left-[-11rem] top-[-2.16rem] z-[9] h-[48.78456rem] w-[49.179rem] translate-y-[15rem] object-cover opacity-0 transition-all duration-1000 xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-house.webp'}
          alt=''
          width={786}
          height={780}
        />
        <ImageV2
          className='statue-animation absolute left-[6.31rem] top-[9.62rem] z-10 h-[42.625rem] w-[31.3125rem] translate-y-[15rem] object-cover opacity-0 transition-all duration-1000 xsm:hidden'
          src={'/imgs/homepage/globalImmigration/statue.webp'}
          alt=''
          width={501}
          height={682}
        />
        <ImageV2
          className='bridge-animation absolute left-[16.11rem] top-[18.15rem] z-[9] h-[45.83781rem] w-[45.83781rem] translate-y-[15rem] object-cover opacity-0 transition-all duration-1000 xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bridge.webp'}
          alt=''
          width={733}
          height={733}
        />
        <ImageV2
          className='absolute right-[12.37rem] top-[30.69rem] z-[31] h-[30.9725rem] w-[25.16263rem] object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/familyV2-x4.png'}
          alt=''
          width={378}
          height={534}
        />
        <ImageV2
          className='absolute left-0 top-0 h-[55.6875rem] w-full object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-city.png'}
          alt=''
          width={1600}
          height={700}
        />
        {/* <div className="xsm:hidden absolute w-full h-[55.6875rem] opacity-[0.5] top-0 left-0 bg-[linear-gradient(0deg,rgba(92,50,30,0.10)_0%,#5C321E_100%)]"></div> */}
      </div>
      <div className='text-container-animation z-[35] translate-y-[15rem] object-cover opacity-0 transition-all duration-1000 sm:absolute sm:right-[6.37rem] sm:top-[5rem] xsm:w-full xsm:px-[1rem] xsm:pt-[2.5rem]'>
        <h2 className='mb-[1rem] w-[39.1875rem] font-optima font-semibold text-brown heading1 xsm:mb-[0.75rem] xsm:w-full xsm:tracking-[-0.045rem]'>
          {data.title}
        </h2>
        <p className='w-[33.0625rem] text-greyscaletext-body body16 xsm:w-full xsm:body-14'>
          {data.description}
        </p>
        <div className='mt-[3rem] grid grid-cols-2 gap-[2.5rem] xsm:mt-[1.5rem] xsm:gap-[1.5rem]'>
          {data.count_number.map((item, index) => {
            return (
              <div key={index}>
                <div className='flex items-end space-x-[0.69rem] xsm:space-x-[0.39rem]'>
                  <CountNumber
                    number={parseInt(item.number)}
                    interFace={!isActive}
                    suffix='+'
                    delay={500}
                  />
                  <div
                    className='font-semibold uppercase leading-[1.4] tracking-[-0.0075rem] text-brown sub-12 xsm:whitespace-nowrap xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]'
                    dangerouslySetInnerHTML={{__html: item.label}}
                  ></div>
                </div>
                <div className='my-[0.5rem] h-[0.0625rem] w-full bg-black opacity-[0.1] xsm:h-[0.03456rem]'></div>
                <p className='text-greyscaletext-400 body16-m xsm:font-medium xsm:tracking-[-0.015rem] xsm:sub-12'>
                  {item.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-[0.875rem] sm:hidden'>
        <ImageV2
          className='h-[27.8125rem] w-full object-cover sm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-mb.png'}
          alt=''
          height={445}
          width={345}
        />
      </div>
    </section>
  )
}

export default GlobalImmigration
