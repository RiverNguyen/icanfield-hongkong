'use client'
import ImageV2 from '@/components/image/ImageV2'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Mousewheel} from 'swiper/modules'
import React, {useState, useRef, useEffect} from 'react'
import 'swiper/css'
import './styles.css'
const TeaEB5Section = () => {
  const [isExpanded1, setIsExpanded1] = useState(false)
  const [canExpand1, setCanExpand1] = useState(false)
  const pRef1 = useRef<HTMLParagraphElement>(null)
  const [p1Height, setP1Height] = useState(0)

  const [isExpanded2, setIsExpanded2] = useState(false)
  const [canExpand2, setCanExpand2] = useState(false)
  const pRef2 = useRef<HTMLParagraphElement>(null)
  const [p2Height, setP2Height] = useState(0)

  useEffect(() => {
    if (pRef1.current) {
      setP1Height(pRef1.current.scrollHeight + 30)
      if (pRef1.current.scrollHeight > pRef1.current.offsetHeight) {
        setCanExpand1(true)
      }
    }

    if (pRef2.current) {
      setP2Height(pRef2.current.scrollHeight + 30)
      if (pRef2.current.scrollHeight > pRef2.current.offsetHeight) {
        setCanExpand2(true)
      }
    }
  }, [])

  const toggleExpand1 = () => {
    setIsExpanded1(!isExpanded1)
  }

  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2)
  }
  return (
    <section className='xsm:rounded-tr-0 relative z-20 h-[49.25rem] -translate-y-[3rem] overflow-hidden rounded-tl-[2.5rem] rounded-tr-[2.5rem] bg-background xsm:h-fit xsm:translate-y-0 xsm:overflow-visible xsm:rounded-none'>
      <div className='absolute left-[-17.19rem] top-[-27.75rem] z-0 size-[56.125rem] rounded-full bg-[linear-gradient(180deg,#FFF_30.17%,#D7B578_100%)] opacity-45 xsm:hidden'></div>
      <h2 className='absolute left-[12.25rem] top-[16.28rem] z-0 font-optima text-[13.75rem] font-normal leading-[1.2] tracking-[-0.275rem] text-Phase-1-Gradient xsm:hidden'>
        EB-5
      </h2>
      <Swiper
        direction={'vertical'}
        speed={800}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1.3,
          },
        }}
        modules={[Mousewheel]}
        slideToClickedSlide={true}
        mousewheel={true}
        className='swiper-tea-eb5 absolute left-[35.44rem] top-0 !ml-0 h-full w-[57rem] !pt-[3.38rem] xsm:!hidden'
      >
        <SwiperSlide>
          <div className='container-item__eb5 flex h-full w-full items-end justify-start'>
            <div className='item-tea-eb5 relative h-[30.8125rem] w-[52rem] rounded-[1.5rem] p-[3rem]'>
              <ImageV2
                src='/imgs/EB5/Banner/d-sky.webp'
                alt='tea-eb5-1'
                width={1600}
                height={1600}
                className='absolute left-0 top-0 z-0 h-full w-full rounded-[1.5rem] object-cover'
              />
              <div className='relative z-[1] w-[32rem]'>
                <h3 className='mb-6 font-optima text-[2.5rem] font-semibold leading-[1.2] tracking-[-0.075rem] text-white'>
                  Dự án EB-5 & vùng khuyến khích đầu tư TEA
                </h3>
                <p className='text-[1rem] leading-[1.55] text-white'>
                  Chương trình EB-5 cho phép nhà đầu tư nước ngoài góp vốn vào
                  doanh nghiệp thương mại mới (thành lập sau 29/11/1990) để nhận
                  thẻ xanh Mỹ. Mức đầu tư thông thường là 1.050.000 USD, đầu tư
                  trực tiếp hoặc gián tiếp qua Trung Tâm Vùng được USCIS cấp
                  phép. Nếu đầu tư vào dự án thuộc Vùng khuyến khích phát triển
                  kinh tế (TEA), mức đầu tư ưu đãi chỉ còn 800.000 USD. Mỗi năm,
                  có 10.000 visa EB-5 được cấp (mỗi quốc gia tối đa 700 visa).
                  Do nhu cầu cao, các nước như Việt Nam, Trung Quốc, Ấn Độ
                  thường bị tồn đọng hồ sơ. Từ tháng 5/2022, chương trình ưu
                  tiên cấp visa cho dự án nông thôn (20%), dự án TEA (10%) và dự
                  án cơ sở hạ tầng (2%). Vì vậy, đầu tư vào dự án nông thôn hoặc
                  TEA giúp nhà đầu tư nhận visa nhanh hơn.
                </p>
              </div>
              <ImageV2
                src={'/imgs/EB5/Banner/statue.webp'}
                alt='tea-eb5-1'
                width={1600}
                height={1600}
                className='absolute -right-[5rem] bottom-0 z-0 h-[36.6875rem] w-[37.25rem] object-cover'
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='container-item__eb5 item-second flex h-full w-full items-start justify-start'>
            <div className='item-tea-eb5 relative h-[30.8125rem] w-[52rem] rounded-[1.5rem] p-[3rem]'>
              <ImageV2
                src='/imgs/EB5/Banner/d-city.webp'
                alt='tea-eb5-1'
                width={1600}
                height={1600}
                className='absolute left-0 top-0 z-0 h-full w-full rounded-[1.5rem] object-cover'
              />
              <div className='item-tea-eb5 relative z-[1] w-[32rem]'>
                <h3 className='mb-6 font-optima text-[2.5rem] font-semibold leading-[1.2] tracking-[-0.075rem] text-white'>
                  Trung tâm vùng EB-5
                </h3>
                <p className='text-[1rem] leading-[1.55] text-white'>
                  Trung tâm Vùng EB-5 là đơn vị kinh tế (nhà nước hoặc tư nhân)
                  được USCIS cấp phép để thúc đẩy tăng trưởng kinh tế thông qua
                  chương trình EB-5. Trước tháng 11/2019, có hơn 900 Trung tâm
                  Vùng. Sau thay đổi luật EB-5 vào tháng 10/2022 (với tiêu chuẩn
                  TEA khắt khe hơn và mức đầu tư tăng), số lượng giảm còn 632.
                  Nhà đầu tư cần tìm hiểu kỹ và chọn Trung tâm Vùng uy tín.
                  Trung tâm Vùng AVS, do Luật sư José E. Latour sở hữu, là trung
                  tâm duy nhất có văn phòng và đội ngũ chuyên gia tại Việt Nam,
                  hỗ trợ trực tiếp và miễn phí cho khách hàng, giúp nhà đầu tư
                  tương tác trực tiếp với luật sư và ban điều hành dự án từ đầu
                  đến khi hoàn vốn.
                </p>
              </div>
              <ImageV2
                src={'/imgs/EB5/Banner/tower.webp'}
                alt='tea-eb5-1'
                width={1600}
                height={1600}
                className='absolute -right-[2.69rem] bottom-0 z-0 h-[40.928rem] w-[21.21906rem] object-cover'
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className='flex flex-col space-y-[5rem] px-4 pt-[3.5rem] sm:hidden'>
        <div className='relative rounded-[1rem] bg-white'>
          <div className='relative'>
            <ImageV2
              src='/imgs/EB5/Banner/d-sky.webp'
              alt='tea-eb5-1'
              width={500}
              height={500}
              className='h-[12.70275rem] rounded-[1.5rem] object-cover'
            />
            <ImageV2
              src='/imgs/EB5/Banner/d-statue_mb.webp'
              alt='tea-eb5-1'
              width={500}
              height={500}
              className='absolute bottom-0 right-0 z-20 h-[19.24906rem] w-[19.54419rem] object-cover'
            />
          </div>
          <div className='p-4'>
            <h3 className='font-optima text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.025rem] text-Phase-1-Brown'>
              Dự án EB-5 & vùng khuyến khích đầu tư TEA
            </h3>
            <p
              ref={pRef1}
              style={{
                height: isExpanded1 ? `${p1Height}px` : '6rem',
                transition: 'height 0.3s ease',
              }}
              className='overflow-hidden text-[0.875rem] leading-[1.5] tracking-[-0.00875rem] text-bodytext'
            >
              Chương trình EB-5 cho phép nhà đầu tư nước ngoài góp vốn vào doanh
              nghiệp thương mại mới (thành lập sau 29/11/1990) để nhận thẻ xanh
              Mỹ. Mức đầu tư thông thường là 1.050.000 USD, đầu tư trực tiếp
              hoặc gián tiếp qua Trung Tâm Vùng được USCIS cấp phép. Nếu đầu tư
              vào dự án thuộc Vùng khuyến khích phát triển kinh tế (TEA), mức
              đầu tư ưu đãi chỉ còn 800.000 USD. Mỗi năm, có 10.000 visa EB-5
              được cấp (mỗi quốc gia tối đa 700 visa). Do nhu cầu cao, các nước
              như Việt Nam, Trung Quốc, Ấn Độ thường bị tồn đọng hồ sơ. Từ tháng
              5/2022, chương trình ưu tiên cấp visa cho dự án nông thôn (20%),
              dự án TEA (10%) và dự án cơ sở hạ tầng (2%). Vì vậy, đầu tư vào dự
              án nông thôn hoặc TEA giúp nhà đầu tư nhận visa nhanh hơn.
            </p>
          </div>
          {canExpand1 && (
            <div
              className='absolute bottom-0 right-0 z-0 flex h-[3.125rem] w-full cursor-pointer items-center justify-center rounded-bl-[1rem] rounded-br-[1rem] bg-[linear-gradient(176deg,rgba(255,255,255,0.00)-89.03%,#FFF_36.97%)]'
              onClick={toggleExpand1}
            >
              <span className='text-[0.75rem] font-semibold uppercase leading-[1.5] text-Phase-1-Brown'>
                {isExpanded1 ? 'Thu Gọn' : 'Xem Thêm'}
              </span>
            </div>
          )}
        </div>
        <div className='relative rounded-[1rem] bg-white'>
          <div className='relative'>
            <ImageV2
              src='/imgs/EB5/Banner/d-city.webp'
              alt='tea-eb5-1'
              width={500}
              height={500}
              className='h-[12.70275rem] rounded-[1.5rem] object-cover'
            />
            <ImageV2
              src='/imgs/EB5/Banner/d-tower_mb.webp'
              alt='tea-eb5-1'
              width={500}
              height={500}
              className='absolute bottom-0 right-0 z-20 h-[17.42906rem] w-[8.50181rem] object-cover'
            />
          </div>
          <div className='p-4'>
            <h3 className='font-optima text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.025rem] text-Phase-1-Brown'>
              Dự án EB-5 & vùng khuyến khích đầu tư TEA
            </h3>
            <p
              ref={pRef2}
              style={{
                height: isExpanded2 ? `${p2Height}px` : '6rem',
                transition: 'height 0.3s ease',
              }}
              className='overflow-hidden text-[0.875rem] leading-[1.5] tracking-[-0.00875rem] text-bodytext'
            >
              Chương trình EB-5 cho phép nhà đầu tư nước ngoài góp vốn vào doanh
              nghiệp thương mại mới (thành lập sau 29/11/1990) để nhận thẻ xanh
              Mỹ. Mức đầu tư thông thường là 1.050.000 USD, đầu tư trực tiếp
              hoặc gián tiếp qua Trung Tâm Vùng được USCIS cấp phép. Nếu đầu tư
              vào dự án thuộc Vùng khuyến khích phát triển kinh tế (TEA), mức
              đầu tư ưu đãi chỉ còn 800.000 USD. Mỗi năm, có 10.000 visa EB-5
              được cấp (mỗi quốcx gia tối đa 700 visa). Do nhu cầu cao, các nước
              như Việt Nam, Trung Quốc, Ấn Độ thường bị tồn đọng hồ sơ. Từ tháng
              5/2022, chương trình ưu tiên cấp visa cho dự án nông thôn (20%),
              dự án TEA (10%) và dự án cơ sở hạ tầng (2%). Vì vậy, đầu tư vào dự
              án nông thôn hoặc TEA giúp nhà đầu tư nhận visa nhanh hơn.
            </p>
          </div>
          {canExpand2 && (
            <div
              className='absolute bottom-0 right-0 z-0 flex h-[3.125rem] w-full cursor-pointer items-center justify-center rounded-bl-[1rem] rounded-br-[1rem] bg-[linear-gradient(176deg,rgba(255,255,255,0.00)-89.03%,#FFF_36.97%)]'
              onClick={toggleExpand2}
            >
              <span className='text-[0.75rem] font-semibold uppercase leading-[1.5] text-Phase-1-Brown'>
                {isExpanded2 ? 'Thu Gọn' : 'Xem Thêm'}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TeaEB5Section
