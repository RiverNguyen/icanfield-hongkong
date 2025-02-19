'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {Media} from '@/types/image.interface'
import {FC, useRef} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
export interface IProgramEligibilityProps {
  title?: string
  description?: string
  background?: Media
  items?: IProgramEligibilityItem[]
}

export const ProgramEligibility: FC<IProgramEligibilityProps> = ({
  title,
  description,
  background,
  items,
}) => {
  return (
    <section className='relative overflow-hidden bg-background lg:min-h-dvh sm:min-h-[49.25rem] sm:pt-[9.94rem] xsm:pb-[20.56rem] xsm:pt-[3.5rem]'>
      <ImageV2
        src={background?.url || ''}
        alt={background?.alt || ''}
        width={background?.width || 1000}
        height={background?.height || 1000}
        className='absolute right-0 min-h-[24.53731rem] min-w-[49.14544rem] object-contain sm:top-[-4.12rem] sm:h-[40.4375rem] sm:w-[80.99169rem] xsm:bottom-0'
      />
      <div className='relative z-10 mx-auto sm:max-w-[90rem] xsm:px-[1rem]'>
        <h2 className='mb-[0.75rem] font-optima font-semibold text-brown heading1 sm:mb-[0.88rem]'>
          {title}
        </h2>
        <p className='text-greyscaletext-body body16-r55 sm:max-w-[41.25rem] xsm:body-14'>
          {description}
        </p>
      </div>
      <div className='bottom-0 left-0 right-0 h-[31.1875rem] bg-[linear-gradient(180deg,rgba(100,54,32,0.00)_0%,rgba(100,54,32,0.06)_14.15%,rgba(100,54,32,0.16)_27.89%,rgba(100,54,32,0.32)_42.08%,#643620_74.88%)] sm:absolute xsm:hidden'></div>
      <div className='relative flex sm:absolute xsm:w-full sm:bottom-[6.25rem] sm:left-[4.5rem] z-[0] sm:w-[68rem]  sm:space-x-[1.25rem] xsm:mt-[1.62rem] xsm:flex-col xsm:space-y-[0.88rem] xsm:px-[1rem]'>
        <Swiper
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1.3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className='xsm:!w-full !w-full'
        >
          {items &&
            items.map((item, index) => (
              <SwiperSlide key={index} className='!flex !items-end'>
                <ProgramEligibilityItem {...item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <Marquee />
    </section>
  )
}

interface IProgramEligibilityItem {
  icon?: Media
  title?: string
  description?: string
}

interface IProgramEligibilityItemProps extends IProgramEligibilityItem {
  className?: string
}

const ProgramEligibilityItem: FC<IProgramEligibilityItemProps> = ({
  title,
  description,
  icon,
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const handleMouseOver = () => {
    if (isMobile) return
    if (!divRef.current || !pRef.current) return
    divRef.current.style.maxHeight = `${pRef.current.scrollHeight}px`
  }
  const handleMouseOut = () => {
    if (isMobile) return
    if (!divRef.current) return
    divRef.current.style.maxHeight = '0'
  }
  return (
    <div
      style={{
        transitionTimingFunction: 'cubic-bezier(0.69, -0.02, 0, 0.99)',
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={itemRef}
      className='group self-end rounded-[1.25rem] p-[1.5rem] text-white transition-all duration-500 sm:min-h-[16rem] sm:w-full sm:bg-[linear-gradient(180deg,#3F2214_31.22%,#A55934_100%)] sm:p-[2.25rem_1rem_2.25rem_1.63rem] sm:hover:bg-white sm:hover:bg-[radial-gradient(55.47%_55.27%_at_15.35%_3.04%,#F5C178_34.24%,rgba(255,255,255,0.00)_100%)] xsm:bg-white xsm:bg-[radial-gradient(67.03%_57.2%_at_7%_6.15%,rgba(245,193,120,0.20)_34.24%,rgba(255,255,255,0.00)_100%)] xsm:shadow-[0px_1.203px_4.812px_0px_rgba(0,0,0,0.10)]'
    >
      <ImageV2
        src={icon?.url || ''}
        alt={icon?.alt || ''}
        width={icon?.width || 1000}
        height={icon?.height || 1000}
        className='sm:group-hover:program-eligibility__icon-filter xsm:program-eligibility__icon-filter size-[2.875rem] !object-contain'
      />
      <h3 className='mb-[0.5rem] mt-[1rem] text-[1.25rem] font-semibold transition-all duration-500 sm:mt-[1.2rem] sm:group-hover:text-brown xsm:text-brown'>
        {title}
      </h3>
      <div
        // style={{
        //   transitionTimingFunction: 'cubic-bezier(0.69, -0.02, 0, 0.99)',
        // }}
        ref={divRef}
        className='overflow-hidden transition-all duration-500 sm:max-h-0'
      >
        <p
          style={{
            transitionTimingFunction: 'cubic-bezier(0.69, -0.02, 0, 0.99)',
          }}
          ref={pRef}
          className='text-greyscaletext-body transition-all duration-500 body-14 sm:translate-y-[11.3rem] sm:pb-[4.63rem] sm:group-hover:translate-y-0' dangerouslySetInnerHTML={{__html: description || ''}}
        >
        </p>
      </div>
    </div>
  )
}

const Marquee = ({speed = '20s'}: {speed?: string}) => {
  const ITEM_COUNT = 6
  return (
    <div className='program-eligibility-text absolute bottom-0 left-0 right-0 flex h-[10.4375rem] w-full items-center whitespace-nowrap bg-[#3F2214] text-[6rem] font-extrabold xsm:hidden'>
      <div
        className='slider'
        style={
          {
            '--duration': speed,
            '--quantity': `${ITEM_COUNT}`,
            '--item-width': '86rem',
            '--item-height': '6rem',
          } as React.CSSProperties
        }
      >
        <div className='slide-track'>
          {Array.from({length: ITEM_COUNT}, (_, index) => (
            <div
              key={index}
              className='slide'
            >
              <ImageV2
                src={
                  '/imgs/detail-settlement-programs/v_n_xa_c_ng_icanfield.webp'
                }
                alt={`marquee-image-${index}`}
                width={1000}
                height={100}
                className='inline-block h-[6rem] w-[78rem] object-contain'
              />
              <ImageV2
                src={'/imgs/detail-settlement-programs/download.webp'}
                alt={`marquee-image-${index}`}
                width={1000}
                height={100}
                className='inline-block h-auto w-[3.6875rem] object-contain'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* <div className='program-eligibility-text absolute bottom-0 left-0 right-0 flex h-[10.4375rem] w-full items-center overflow-hidden bg-[#3F2214] text-[6rem] font-extrabold'>
        <div className='flex'>
          {Array.from({length: 5}).map((_, index) => (
            <div
              key={index}
              className='animate-marqueeLine min-w-full flex-shrink-0 whitespace-nowrap'
              dangerouslySetInnerHTML={{__html: slogan}}
            ></div>
          ))}
        </div>
      </div> */
