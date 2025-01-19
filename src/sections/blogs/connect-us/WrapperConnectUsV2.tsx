'use client'
import ImageV2 from '@/components/image/ImageV2'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

const WrapperConnectUsV2 = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
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
      className='relative h-[93.26625rem] w-full bg-white xsm:h-[73.4rem] xsm:bg-background'
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
          'pointer-events-none absolute -top-[5rem] left-0 z-[2] h-[71.8rem] w-full translate-y-[20rem] opacity-50 transition-all duration-800 xsm:hidden',
          isActive && 'translate-y-0 opacity-100',
        )}
        alt='liberties'
        src={'/imgs/contact/form-bgphu.png'}
        width={1030}
        height={1150}
        quality={95}
      />
      <ImageV2
        className='absolute top-0 left-0 pointer-events-none z-[3] w-full !h-auto object-fill xsm:hidden'
        fill
        sizes='100vw'
        src={'/imgs/contact/about-usv3.png'}
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
        {children}
      </div>
    </section>
  )
}

export default WrapperConnectUsV2
