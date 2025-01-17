'use client'
import ImageV2 from '@/components/image/ImageV2'
import useInterView from '@/hooks/useInterView'
import {cn} from '@/lib/utils'

export default function ContactV2({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const {isVisible, elementRef} = useInterView({threshold: 0.4})
  return (
    <section
      ref={elementRef}
      className='relative flex h-[100vh] bg-[linear-gradient(180deg,#F6F6F4_0%,#FAF8F1_100%)] xsm:h-max'
    >
      <div className='relative h-full w-[57rem] xsm:hidden'>
        <ImageV2
          alt=''
          width={912}
          height={825}
          src={'/imgs/homepage/section-ketnoi/banner-formlh.png'}
          className={cn(
            'absolute h-[51.5625rem] w-[57rem] object-cover transition-all duration-700 xsm:hidden',
            isVisible ? 'bottom-[-10rem]' : 'bottom-[-21rem]',
          )}
        />
      </div>
      <ImageV2
        alt=''
        width={912}
        height={825}
        src={'/imgs/homepage/section-ketnoi/bg-sectionform.png'}
        className='absolute bottom-0 right-0 h-[44rem] w-[81.5rem] object-cover xsm:hidden'
      />
      {children}
    </section>
  )
}
