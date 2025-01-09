'use client'
import {useState} from 'react'
import 'swiper/css'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import './style.css'
import {cn} from '@/lib/utils'
import ItemExpertTeam from '@/sections/aboutus/expert-team/ItemExpertTeam'
import ImageV2 from '@/components/image/ImageV2'
import ItemSliderMb from '@/sections/aboutus/expert-team/ItemSliderMb'
import PopupSliderMb from '@/sections/aboutus/expert-team/PopupSliderMb'
import useIsMobile from '@/hooks/useIsMobile'
import { IExpertTeamProps, IExpertTeamPropsItem } from '@/types/dataAcfAboutus.interface'

export default function ExpertTeam({dataExpertTeam}: {dataExpertTeam: IExpertTeamProps}) {
  const isMobile = useIsMobile()
  const [toggleMB, setToggleMB] = useState<boolean>(false)
  const [idActivePopupMB, setIdActivePopupMB] = useState<number>(0)

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [nextIndex, setNextIndex] = useState<number>(1)
  const handleSlideChange = (realIndex: number, length: number) => {
    setActiveIndex(realIndex)
    const nextSlideIndex = (realIndex + 1) % length
    setNextIndex(nextSlideIndex)
  }
  return (
    <section className='relative bg-[linear-gradient(180deg,rgba(255,244,228,0.50)_0%,rgba(249,245,240,0.80)_16.83%,#F6F6F4_50.9%)] pb-[10.75rem] pl-[5rem] pt-[5rem] xsm:pb-[4rem] xsm:pl-0 xsm:pt-[4rem]'>
      <h2 className='heading1 w-[44.3125rem] font-optima font-semibold text-brown xsm:mb-[1.5rem] xsm:w-full xsm:px-[1rem]'>
        {dataExpertTeam?.title}
      </h2>
      {!isMobile ? (
        <>
          <div className='absolute right-0 top-0 h-[42.87169rem] w-[61.5125rem] xsm:hidden'>
            <ImageV2
              className='size-full object-cover'
              alt=''
              width={1053}
              height={685}
              src={'/imgs/about-us/expert-team/backgroud-team.webp'}
            />
          </div>
          <div
            id='expert-team'
            className='relative mt-[1.06rem] flex flex-col xsm:hidden'
          >
            <div className='absolute left-0 top-[5.69rem] h-[28rem] w-[36.625rem] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(104deg,#FFF_58.51%,rgba(255,255,255,0.00)_74.37%)] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.03)]'>
              {Array.isArray(dataExpertTeam?.list_slider) &&
                dataExpertTeam?.list_slider?.map((e: IExpertTeamPropsItem, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      'scrollbar-hidden absolute h-[28rem] w-full overflow-hidden overflow-y-auto p-[0rem_14.75rem_1.56rem_2.5rem] transition-all duration-500',
                      activeIndex < i &&
                        'top-[7rem] z-[-1] opacity-0 duration-500',
                      activeIndex > i &&
                        'top-[-7rem] z-[-1] opacity-0 duration-1000',
                      activeIndex === i && 'top-0 z-[1] duration-1000',
                    )}
                  >
                    <div className='sticky top-0 bg-white pt-[2rem] pb-[1rem]'>
                      <span className='heading4 font-optima font-semibold text-brown'>
                        {e?.name}
                      </span>
                      <p className='body-14 mt-[0.25rem] text-orangetext-500'>
                        {e?.position}
                      </p>
                    </div>
                    <div 
                      dangerouslySetInnerHTML={{__html: e?.describe}}
                      className='pb-[1rem] [&_p]:text-justify [&_p]:body16 [&_p]:tracking-[-0.02rem] [&_p]:text-bodytext'>
                    </div>
                  </div>
                ))}
              <div className='absolute bottom-0 left-0 z-[1] h-[3rem] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_71.5%)]'></div>
            </div>
            <div className='absolute right-[5rem] top-[30%] z-10 flex translate-y-[-50%] items-center space-x-[0.75rem]'>
              <button className='expert-team__prev h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
                <ImageV2
                  className='size-[1.5rem] object-cover'
                  alt=''
                  width={1053}
                  height={685}
                  src={'/icons/arrow-right-brown.svg'}
                />
              </button>
              <button className='expert-team__next h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center'>
                <ImageV2
                  className='size-[1.5rem] rotate-180 object-cover'
                  alt=''
                  width={1053}
                  height={685}
                  src={'/icons/arrow-right-brown.svg'}
                />
              </button>
            </div>
            <Swiper
              speed={800}
              loop={true}
              slidesPerView={'auto'}
              className='!mr-0 h-[38.125rem] max-w-[72.125rem]'
              modules={[Navigation]}
              navigation={{
                nextEl: '.expert-team__next',
                prevEl: '.expert-team__prev',
              }}
              onSlideChange={(swiper) =>handleSlideChange(swiper.realIndex, dataExpertTeam?.list_slider?.length)}
            >
              {Array.isArray(dataExpertTeam?.list_slider) && dataExpertTeam?.list_slider?.map((e: IExpertTeamPropsItem, index: number) => (
                <SwiperSlide
                  className={cn(
                    '!w-[29.18769rem] transition-all duration-500 opacity-0 [&.swiper-slide-active]:opacity-100 [&.swiper-slide-next]:opacity-100 [&.swiper-slide-active_.item-expert-team]:w-[29.18769rem] [&.swiper-slide-active_.path-svg]:scale-[1] [&.swiper-slide-next]:pl-[4rem]',
                    nextIndex + 1 === index && '!translate-x-[-5rem] opacity-100',
                    nextIndex + 1 === dataExpertTeam?.list_slider?.length && index === 0 && '!translate-x-[-5rem] opacity-100',
                  )}
                  key={index}
                >
                  <ItemExpertTeam
                    index={index}
                    srcImage={e?.image?.url}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <>
          <div className='scrollbar-hidden w-full overflow-hidden overflow-x-auto px-[1rem]'>
            <div className='flex w-max space-x-[1rem]'>
              {Array.isArray(dataExpertTeam?.list_slider) && dataExpertTeam?.list_slider?.map((e: IExpertTeamPropsItem, index: number) => (
                <ItemSliderMb
                  key={index}
                  data={e}
                  index={index}
                  setToggleMB={setToggleMB}
                  setIdActivePopupMB={setIdActivePopupMB}
                />
              ))}
            </div>
          </div>
          <PopupSliderMb
            index={idActivePopupMB}
            data={dataExpertTeam?.list_slider[idActivePopupMB]}
            toggleMB={toggleMB}
            setToggleMB={setToggleMB}
          />
        </>
      )}
    </section>
  )
}
