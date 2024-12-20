'use client'
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import {talentedTeam} from './constants'
import 'swiper/css'
import ImageV2 from '@/components/image/ImageV2'
const TalentedTeam = () => {
  return (
    <section className='talented-team py-[6.5rem]'>
      <h2 className='heading1 text-center font-optima text-brown'>
        Đội ngũ tài năng từ iCanfield
      </h2>
      <div className='section-container mt-[2.5rem]'>
          <Swiper
            spaceBetween={30}
            slidesPerView={5}
            modules={[Navigation]}
            className='mySwiper'
          >
            {talentedTeam.map((item, index) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col items-center justify-center'>
                  <ImageV2
                    src={item.imgUrl}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                  <div className='flex flex-col items-center justify-center'>
                    <h3 className='text-brown font-semibold text-[1.25rem] leading-[140%] tracking-[-0.025rem] uppercase'>{item.name}</h3>
                    <p className='text-greentext opacity-70 font-medium leading-[1.5] text-[0.875rem]'>{item.position}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='next-btn-talented-team'>
            <ImageV2
              src='/icons/homepage/talented-team/next.svg'
              alt='next'
              width={20}
              height={20}
              className='size-[1.25rem] object-contain'
            />
          </div>
      </div>
    </section>
  )
}

export default TalentedTeam
