import ImageV2 from '@/components/image/ImageV2'
import React from 'react'
import Link from 'next/link'
import ArrowRight from '@/components/svg/ArrowRight'
export interface IItemInvestmentOpportunities {
  title: string
  description: string
}
const ProjectTransparency = () => {
  const Criteria = [
    {
      title: 'Chủ đầu tư và Tình trạng Xây dựng của Dự án',
      desc: '<p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>  <p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>',
    },
    {
      title: 'Số lượng Việc làm Tạo ra',
      desc: '<p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>  <p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>',
    },
    {
      title: 'Khu vực Dự án',
      desc: '<p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>  <p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>',
    },
    {
      title: 'Cơ cấu vốn',
      desc: '<p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>  <p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>',
    },
    {
      title: 'Chiến lược Thoái Vốn',
      desc: '<p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>  <p>Điều này liên quan đến việc Chủ đầu tư quản lý và sử dụng vốn, ảnh hưởng đến tiến độ xây dựng và hoàn thành dự án.</p>',
    },
  ]
  return (
    <section className='relative mt-[5rem] h-[100.94rem] w-full overflow-hidden xsm:h-[62.81rem]'>
      <div className='pointer-events-none absolute z-0 h-[59rem] w-full bg-[linear-gradient(180deg,#F6F6F4_0%,#ECE6E2_15.4%,#7D3613_84.9%)] xsm:h-[49.56rem]'></div>
      <div className='pointer-events-none absolute left-1/2 top-[2.81rem] z-10 h-[153.9375rem] w-[186.25rem] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(180deg,#EABB67_0%,#FFF_100%)] opacity-20 shadow-[0px_-5px_50px_0px_rgba(54,42,5,0.15)] xsm:top-[2.81rem] xsm:h-[59.125rem] xsm:w-[61.625rem]'></div>
      <div className='pointer-events-none absolute left-1/2 top-[4.25rem] z-20 h-[138.0625rem] w-[151rem] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(180deg,#FFF_0%,rgba(214,179,116,0.00)14.85%)] opacity-30 shadow-[0px_-5px_50px_0px_rgba(54,42,5,0.15)] xsm:top-[3.38rem] xsm:h-[53rem] xsm:w-[50rem]'></div>
      <ImageV2
        src='/imgs/EB5/projects-transparency/sydney4.webp'
        alt='banner'
        width={2000}
        height={2000}
        className='pointer-events-none absolute bottom-0 left-0 z-10 h-[66.625rem] w-full object-cover xsm:h-[24.25rem]'
      />
                  <div className='absolute w-full h-[28.25rem] left-0 bottom-0 sm:hiden z-[11] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.45)100%)]'></div>
      <h2 className='absolute left-1/2 top-[8.75rem] z-20 -translate-x-1/2 text-center font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown xsm:top-[5.38rem] xsm:w-[17.5rem] xsm:text-[1.5rem]'>
        Các tiêu chí <br />
        đánh giá dự án EB-5 an toàn
      </h2>

      <h3 className='absolute bottom-[5.12rem] left-[5rem] z-20 font-optima text-[4rem] font-medium tracking-[-0.2rem] text-white xsm:bottom-[20.25rem] xsm:left-[1rem] xsm:-translate-x-0 xsm:text-[2rem] [&_b]:text-[7.5rem] [&_b]:font-medium [&_b]:leading-[1.2] [&_b]:tracking-[-0.15rem] xsm:[&_b]:text-[3.625rem]'>
        Chìa khóa đến <br /> <b>Giấc Mơ Mỹ</b>
      </h3>
      <ImageV2
        src='/imgs/EB5/projects-transparency/dau_phay.webp'
        alt='dauphay'
        width={300}
        height={300}
        className='pointer-events-none absolute bottom-[1.75rem] right-[-1.62rem] z-20 h-[14.625rem] w-[16.5625rem] xsm:bottom-[2.44rem] xsm:right-[1.06rem] xsm:h-[6rem] xsm:w-[6.8125rem]'
      />
      <div className='absolute bottom-[5rem] right-[5rem] z-20 w-[34.625rem] xsm:bottom-[2.44rem] xsm:right-1/2 xsm:w-[21rem] xsm:translate-x-1/2'>
        <p className='font-optima text-[2rem] font-medium leading-[1.2] tracking-[-0.04rem] text-white xsm:text-[1rem]'>
          Đầu tư cho tương lai của bạn và gia đình, chương trình EB-5 là cánh
          cửa đưa bạn đến giấc mơ định cư Mỹ một cách an toàn và vững chắc.
        </p>
        <Link
          href='/'
          className='mt-[1.5rem] flex w-fit items-center justify-center rounded-[0.5rem] bg-[linear-gradient(97deg,_#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] px-[1.5rem] py-3'
        >
          <span className='text-[0.875rem] leading-[1.5] tracking-[-0.0175rem] text-white'>
            Tìm hiểu ngay
          </span>
          <ArrowRight className='ml-[0.5rem] size-[1.5rem]  text-white xsm:translate-y-[1px]' />
        </Link>
      </div>
      <div className='absolute scrollbar-hidden left-1/2 top-[22.5rem] z-[9] grid w-[90rem] -translate-x-1/2 grid-cols-5 xsm:left-0 xsm:top-[11rem] xsm:flex xsm:w-full xsm:-translate-x-0 xsm:overflow-x-auto xsm:pl-4'>
        {Criteria.map((item, index) => (
          <div
            key={index}
            className='group  relative h-[38.75rem] cursor-pointer rounded-[1rem] border-[0.8px] border-[rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-white sm:bg-[linear-gradient(306deg,rgba(78,53,7,0.15)_17.79%,rgba(230,245,121,0.15)_82.21%)] sm:hover:translate-y-[-3rem] xsm:mr-4 xsm:h-[20rem] xsm:w-[18rem] xsm:bg-white'
          >
            <div className='pointer-events-none absolute left-0 top-0 z-0 h-[18rem] w-[18rem] rounded-[1rem] opacity-0 transition-all duration-300 group-hover:bg-[radial-gradient(55.47%_55.27%_at_15.35%_3.04%,#F5C178_34.24%,rgba(255,255,255,0.00)100%)] group-hover:opacity-100 xsm:h-[13rem] xsm:w-[13rem] xsm:bg-[radial-gradient(55.47%_55.27%_at_15.35%_3.04%,#F5C178_34.24%,rgba(255,255,255,0.00)100%)] xsm:opacity-100'></div>
            <span className='relative xsm:leading-[1] z-10 block p-[1.75rem] font-optima text-[4rem] font-semibold leading-[1.3] tracking-[-0.16rem] text-white xsm:w-fit xsm:p-[1.5rem] xsm:text-[2.5rem]'>
              0{index + 1}
            </span>
            <div className='mx-auto mb-4 mt-3 h-[0.0625rem] w-[16.5rem] bg-[linear-gradient(90deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.00)100%)] group-hover:bg-[linear-gradient(90deg,rgba(0,0,0,0.10)0%,rgba(0,0,0,0.00)100%)] xsm:mb-4 xsm:ml-4 xsm:mt-0 xsm:bg-[linear-gradient(90deg,rgba(0,0,0,0.10)0%,rgba(0,0,0,0.00)100%)]'></div>
            <h3 className='px-4 xsm:font-bold line-clamp-2  sm:font-optima text-[1.25rem] font-semibold leading-[1.33] tracking-[-0.025rem] text-white group-hover:bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] group-hover:bg-clip-text group-hover:text-transparent xsm:mb-2 xsm:bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] xsm:bg-clip-text xsm:text-[1rem] xsm:text-transparent'>
              {item.title}
            </h3>
            <div
              className='group-hover: xsm:text-[&_p]:text-[rgba(18,18,18,0.87)] px-4 [&_p]:mt-[1rem] [&_p]:text-[1rem] [&_p]:font-normal [&_p]:leading-[150%] [&_p]:tracking-[-0.02rem] xsm:[&_p]:text-[rgba(18,18,18,0.87)] group-hover:[&_p]:text-[rgba(18,18,18,0.87)] [&_p]:text-white xsm:[&_p]:mt-2 xsm:[&_p]:text-[0.875rem] xsm:[&_p]:tracking-[-0.03rem]'
              dangerouslySetInnerHTML={{__html: item.desc}}
            ></div>

          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectTransparency
