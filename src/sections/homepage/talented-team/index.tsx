'use client'
import ImageV2 from '@/components/image/ImageV2'
import {Media} from '@/types/image.interface'
import {useState} from 'react'
import 'swiper/css'
import {Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
interface ITalentedTeamProps {
  data: {
    title: string
    talented_team: {
      image: Media
      name: string
      position: string
    }[]
  }
}
const TalentedTeam = ({data: {title, talented_team}}: ITalentedTeamProps) => {
  const [activeIndex, setActiveIndex] = useState(0) // Theo dõi slide active
  return (
    <section className='talented-team py-[6.5rem] xsm:py-[2.5rem]'>
      <h2 className='heading1 text-center font-optima text-brown'>{title}</h2>
      <div className='section-container relative mx-auto mt-[2.5rem] w-[83.75rem] xsm:mt-[1.5rem] xsm:w-full xsm:px-0'>
        <Swiper
          spaceBetween={23}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: '.next-btn-talented-team',
            prevEl: '.prev-btn-talented-team',
          }}
          modules={[Navigation]}
          className='mySwiper'
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Cập nhật trạng thái activeIndex
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {talented_team.map((item, index) => (
            <SwiperSlide
              key={index}
              className='!overflow-visible'
            >
              <div className='flex cursor-pointer flex-col items-center justify-center !overflow-visible'>
                <ImageV2
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width * 2}
                  height={item.image.height * 2}
                  className='h-[22.04544rem] w-full scale-95 object-contain transition-transform duration-300 hover:scale-100'
                />
                <div
                  className={`flex flex-col items-center justify-center transition-opacity duration-300 ${
                    activeIndex === index
                      ? 'xsm:opacity-100'
                      : 'xsm:pointer-events-none xsm:opacity-0'
                  }`}
                >
                  <h3 className='text-[1.25rem] font-semibold uppercase leading-[140%] tracking-[-0.025rem] text-brown'>
                    {item.name}
                  </h3>
                  <p className='text-[0.875rem] font-medium leading-[1.5] text-greentext opacity-70'>
                    {item.position}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='prev-btn-talented-team absolute left-0 top-1/3 z-10 flex size-[2.5rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(245,193,120,0.20)] xsm:translate-x-1/2'>
          <ImageV2
            src='/icons/homepage/talented-team/prev.svg'
            alt='next'
            width={40}
            height={40}
            className='size-[1.5rem] object-contain'
          />
        </div>
        <div className='next-btn-talented-team absolute right-0 top-1/3 z-10 flex size-[2.5rem] -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(245,193,120,0.20)] xsm:-translate-x-1/2'>
          <ImageV2
            src='/icons/homepage/talented-team/prev.svg'
            alt='next'
            width={40}
            height={40}
            className='size-[1.5rem] rotate-180 object-contain'
          />
        </div>
      </div>
    </section>
  )
}

export default TalentedTeam
