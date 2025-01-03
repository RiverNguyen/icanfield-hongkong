'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import FormConnectUs from '@/sections/blogs/connect-us/FormConnectUs'
import {useEffect, useRef, useState} from 'react'

const WrapperConnectUs = () => {
  const [isActive, setIsActive] = useState(false)
  const sectionFef = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )
    if (sectionFef.current) observer.observe(sectionFef.current)
  }, [])
  return (
    <section
      ref={sectionFef}
      className='relative h-[118.25rem] w-full overflow-hidden bg-white xsm:h-[73.4rem]'
    >
      <div
        style={{
          transitionTimingFunction: 'cubic-bezier(0.83,0,0.2,0.98)',
        }}
        className='pointer-events-none absolute left-0 top-0 z-[1] h-[56.9rem] w-full transition-all duration-800'
      >
        <ImageV2
          className={cn(
            'size-full object-fill opacity-0 xsm:hidden',
            isActive && 'opacity-100 delay-100',
          )}
          alt='background building'
          fill
          sizes='100vw'
          src={'/imgs/blogs/background-building.webp'}
          quality={95}
        />
      </div>
      <ImageV2
        style={{
          transitionTimingFunction: 'cubic-bezier(0.83,0,0.2,0.98)',
        }}
        className={cn(
          'pointer-events-none absolute -top-[5rem] left-[2rem] z-[2] h-[71.8rem] w-[64.5rem] translate-y-[20rem] opacity-50 transition-all duration-800 xsm:hidden',
          isActive && 'translate-y-0 opacity-100',
        )}
        alt='liberties'
        src={'/imgs/blogs/liberties.webp'}
        width={1030}
        height={1150}
        quality={95}
      />
      <ImageV2
        className='pointer-events-none z-[3] size-full object-fill xsm:hidden'
        fill
        sizes='100vw'
        src={'/imgs/blogs/background-connect-us-pc.webp'}
        alt='background connect us'
        quality={95}
      />
      <div className='pointer-events-none absolute bottom-0 left-0 z-[3rem] h-[69.4rem] w-full sm:hidden'>
        <ImageV2
          className='size-full object-fill sm:hidden'
          fill
          sizes='100vw'
          src={'/imgs/blogs/background-connect-us-mb.webp'}
          alt='background connect us'
          quality={95}
        />
      </div>
      <div className='bg-[background: linear-gradient(180deg,#F6F6F4_0%,rgba(246,246,244,0.00)_100%)] pointer-events-none absolute left-0 top-0 h-[17rem] w-full sm:hidden'></div>
      <ImageV2
        style={{
          transitionTimingFunction: 'cubic-bezier(0.83,0,0.2,0.98)',
        }}
        className={cn(
          'pointer-events-none absolute left-[27rem] top-[7.75rem] z-[5] h-auto w-[5.8rem] -translate-x-[5rem] translate-y-[2rem] object-contain opacity-0 transition-all duration-800 xsm:hidden',
          isActive && 'translate-x-0 translate-y-0 opacity-100 delay-500',
        )}
        alt='airport'
        src={'/imgs/blogs/airport.webp'}
        quality={95}
        width={94}
        height={62}
      />
      <ImageV2
        style={{
          transitionTimingFunction: 'cubic-bezier(0.83,0,0.2,0.98)',
        }}
        className={cn(
          'pointer-events-none absolute left-[36.88rem] top-[26rem] z-[5] h-auto w-[12.56rem] -translate-x-[10rem] translate-y-[10rem] object-contain opacity-0 transition-all duration-800 xsm:hidden',
          isActive && 'translate-x-0 translate-y-0 opacity-100 delay-500',
        )}
        alt='airport'
        src={'/imgs/blogs/bird.webp'}
        quality={95}
        width={200}
        height={165}
      />
      <div className='absolute right-[6.13rem] top-[3.38rem] z-10 w-[36.5rem] xsm:right-0 xsm:top-[2.5rem] xsm:w-full xsm:px-[1rem]'>
        <FormConnectUs />
      </div>
      <div className='section-container absolute bottom-[12.31rem] left-1/2 z-10 w-[90rem] -translate-x-1/2 xsm:bottom-[2rem] xsm:w-full xsm:max-w-full xsm:px-[1rem]'>
        <div className='flex w-full items-center justify-between xsm:flex-col'>
          <ImageV2
            className='h-auto w-[38.9rem] object-contain xsm:w-[18.4rem]'
            src={'/imgs/blogs/slogan-blogs.webp'}
            alt='slogan'
            width={630}
            height={170}
            quality={95}
          />
          <div className='flex-shrink-0 sm:w-[37.82rem] xsm:mt-[2.5rem]'>
            <p className='mb-[1rem] font-optima text-[2rem] font-semibold leading-[1.3] -tracking-[0.08rem] text-Phase-1-Brown xsm:text-[1.25rem]'>
              Cuộc sống là một hành trình, và mỗi bước đi đúng đắn hôm nay sẽ mở
              ra cánh cửa cho một tương lai tươi sáng và tràn đầy hy vọng.
            </p>
            <span className='font-optima text-[1.5rem] font-medium leading-[1.3] -tracking-[0.06rem] text-greyscaletext-300 xsm:text-[1rem]'>
              Khuyết danh
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WrapperConnectUs
