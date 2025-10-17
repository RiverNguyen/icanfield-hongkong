import Image from 'next/image'

export default function Personnel() {
  return (
    <section className='relative flex items-center justify-center self-stretch bg-[#F6F6F4] px-[5rem] pb-[5.75rem] xsm:px-[0.75rem] xsm:pb-[1rem]'>
      <div className='relative mt-[-21.13rem] h-[42.25rem] w-[90rem] overflow-hidden rounded-[2rem] bg-white xsm:mt-[-8.125rem] xsm:h-full xsm:w-[21.9375rem] xsm:flex-col xsm:gap-[1.5rem] xsm:rounded-[1.25rem] xsm:bg-white xsm:px-[0.875rem] xsm:pb-[3.75rem] xsm:pt-[1.5rem]'>
        <div className='relative z-10 mx-auto flex w-[77.3125rem] items-center justify-between xsm:w-full xsm:flex-col-reverse xsm:gap-[1.5rem]'>
          <div className='flex w-[40.1875rem] shrink-0 flex-col items-start gap-[2rem] pt-[3.75rem] xsm:w-full xsm:gap-[0.875rem] xsm:self-stretch xsm:pt-0'>
            <div className='flex flex-col items-start gap-[1.125rem] self-stretch pr-[1rem] xsm:gap-[0.625rem]'>
              <div className='flex flex-col items-start'>
                <h2 className='font-optima text-[5rem] font-semibold not-italic leading-[120%] tracking-[-0.1rem] text-[#5C321E] xsm:text-[2.875rem] xsm:tracking-[-0.0575rem]'>
                  JIMMY VU
                </h2>
                <p className='font-optima text-[3.25rem] font-medium not-italic leading-[120%] tracking-[-0.065rem] text-[#5C321E] xsm:text-[1.25rem] xsm:font-semibold xsm:leading-[130%] xsm:tracking-[-0.025rem]'>
                  CEO iCanfield Viet Nam
                </p>
              </div>
              <p className='self-stretch text-[1.125rem] font-medium uppercase not-italic leading-[150%] text-[#5C321E] xsm:text-[0.75rem]'>
                Dẫn lỗi đầu tư - Kiến tạo tương lai toàn cầu
              </p>
            </div>
            <div className='flex flex-col items-start gap-[0.75rem] self-stretch text-[1rem] font-medium not-italic leading-[155%] text-[#333] xsm:gap-[0.625rem] xsm:text-[0.875rem] xsm:font-normal xsm:leading-[150%] xsm:tracking-[-0.00875rem]'>
              <p>
                Tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS,
                Australia, ông Jimmy đã có hơn 7 năm sinh sống, học tập và làm
                việc tại Úc trước khi trở về Việt Nam.
              </p>
              <p>
                Trở về nước, ông Jimmy đảm nhiệm các vai trò quản lý dự án và
                phát triển các dự án bất động sản trong nước và quốc tế, đồng
                thời phụ trách phát triển các sản phẩm đầu tư và định cư, xây
                dựng mối quan hệ sâu rộng với các luật sư di trú hàng đầu và chủ
                đầu tư lớn trên toàn thế giới.
              </p>
              <p>
                Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, ông
                Jimmy đã trực tiếp tư vấn thành công cho hàng trăm nhà đầu tư,
                đạt 100% tỷ lệ xử lý hồ sơ thành công - một thành tích khẳng
                định uy tín và năng lực của một chuyên gia đầu ngành.
              </p>
            </div>
          </div>
          <div className='relative h-[36.73694rem] w-[28.125rem] shrink-0 xsm:h-[21.80025rem] xsm:w-[18.75rem]'>
            <Image
              src='/imgs/detail-hr/banner/personnel.webp'
              alt='Personel Image'
              fill
              className='object-contain'
            />
          </div>
        </div>
        <Image
          src='/imgs/detail-hr/banner/bg-personnel.webp'
          alt='Background Image Personnel'
          width={1990}
          height={882.651}
          className='absolute bottom-0 left-0 h-auto w-full xsm:hidden'
        />
        <Image
          src='/imgs/detail-hr/banner/bg-personnel-mb.webp'
          alt='Background Image Personnel'
          width={1637.56}
          height={726.329}
          className='absolute bottom-0 left-0 hidden h-auto w-full xsm:block'
        />
      </div>
    </section>
  )
}
