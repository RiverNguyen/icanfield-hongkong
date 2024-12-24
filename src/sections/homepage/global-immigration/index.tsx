import ImageV2 from '@/components/image/ImageV2'
import CountNumber from '@/sections/homepage/global-immigration/CountNumber'

const GlobalImmigration = () => {
  return (
    <section className='relative sm:h-[80.75rem]'>
      <div className='xsm:hidden'>
        <ImageV2
          className='absolute bottom-[5.75rem] left-0 z-50 h-[69.375rem] w-full object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-aboutus.png'}
          alt=''
          width={1600}
          height={1110}
        />
        <ImageV2
          className='absolute left-[-11rem] top-[-2.16rem] z-[9] h-[48.78456rem] w-[49.179rem] object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-house.webp'}
          alt=''
          width={786}
          height={780}
        />
        <ImageV2
          className='absolute left-[6.31rem] top-[9.62rem] z-10 h-[42.625rem] w-[31.3125rem] object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/statue.webp'}
          alt=''
          width={501}
          height={682}
        />
        <ImageV2
          className='absolute left-[16.11rem] top-[18.15rem] z-[9] h-[45.83781rem] w-[45.83781rem] object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bridge.webp'}
          alt=''
          width={733}
          height={733}
        />
        <ImageV2
          className='absolute right-[12.37rem] top-[30.69rem] z-[51] h-[30.9725rem] w-[25.16263rem] object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/familyv2.webp'}
          alt=''
          width={378}
          height={534}
        />
        <ImageV2
          className='absolute left-0 top-0 h-[55.6875rem] w-full object-cover xsm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-city.png'}
          alt=''
          width={1600}
          height={700}
        />
        {/* <div className="xsm:hidden absolute w-full h-[55.6875rem] opacity-[0.5] top-0 left-0 bg-[linear-gradient(0deg,rgba(92,50,30,0.10)_0%,#5C321E_100%)]"></div> */}
      </div>
      <div className='z-[35] sm:absolute sm:right-[6.37rem] sm:top-[5rem] xsm:w-full xsm:px-[1rem] xsm:pt-[2.5rem]'>
        <h2 className='heading1 mb-[1rem] w-[39.1875rem] font-optima font-semibold text-brown xsm:mb-[0.75rem] xsm:w-full xsm:tracking-[-0.045rem]'>
          ICanfield tiên phong kiến tạo lộ trình định cư toàn cầu
        </h2>
        <p className='body16 xsm:body-14 w-[33.0625rem] text-greyscaletext-body xsm:w-full'>
          Với 12+ năm kinh nghiệm, iCanfield tự hào là cầu nối giúp hàng nghìn
          gia đình hiện thực hóa giấc mơ định cư nước ngoài
        </p>
        <div className='mt-[3rem] grid grid-cols-2 gap-[2.5rem] xsm:mt-[1.5rem] xsm:gap-[1.5rem]'>
          <div>
            <div className='flex items-end space-x-[0.69rem] xsm:space-x-[0.39rem]'>
              <CountNumber
                number={12}
                suffix='+'
              />
              <p className='sub-12 font-semibold uppercase leading-[1.4] tracking-[-0.0075rem] text-brown xsm:whitespace-nowrap xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]'>
                NĂM <br /> kinh nghiệm
              </p>
            </div>
            <div className='my-[0.5rem] h-[0.0625rem] w-full bg-black opacity-[0.1] xsm:h-[0.03456rem]'></div>
            <p className='body16-m xsm:sub-12 text-greyscaletext-400 xsm:font-medium xsm:tracking-[-0.015rem]'>
              Tư vấn Đầu tư định cư Quốc tế
            </p>
          </div>
          <div>
            <div className='flex items-end space-x-[0.69rem] xsm:space-x-[0.39rem]'>
              <CountNumber
                number={2100}
                suffix='+'
              />
              <p className='sub-12 font-semibold uppercase leading-[1.4] tracking-[-0.0075rem] text-brown xsm:whitespace-nowrap xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]'>
                HỒ SƠ <br /> khách hàng
              </p>
            </div>
            <div className='my-[0.5rem] h-[0.0625rem] w-full bg-black opacity-[0.1] xsm:h-[0.03456rem]'></div>
            <p className='body16-m xsm:sub-12 text-greyscaletext-400 xsm:font-medium xsm:tracking-[-0.015rem]'>
              Đầu tư, định cư và du học thành công
            </p>
          </div>
          <div>
            <div className='flex items-end space-x-[0.69rem] xsm:space-x-[0.39rem]'>
              <CountNumber
                number={25}
                suffix='+'
              />
              <p className='sub-12 font-semibold uppercase leading-[1.4] tracking-[-0.0075rem] text-brown xsm:whitespace-nowrap xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]'>
                NĂM <br /> kinh nghiệm
              </p>
            </div>
            <div className='my-[0.5rem] h-[0.0625rem] w-full bg-black opacity-[0.1] xsm:h-[0.03456rem]'></div>
            <p className='body16-m xsm:sub-12 text-greyscaletext-400 xsm:font-medium xsm:tracking-[-0.015rem]'>
              Đội ngũ cộng sự luật sư
            </p>
          </div>
          <div>
            <div className='flex items-end space-x-[0.69rem] xsm:space-x-[0.39rem]'>
              <CountNumber
                number={12}
                suffix='+'
              />
              <p className='sub-12 font-semibold uppercase leading-[1.4] tracking-[-0.0075rem] text-brown xsm:whitespace-nowrap xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]'>
                Dự án <br /> đầu tư
              </p>
            </div>
            <div className='my-[0.5rem] h-[0.0625rem] w-full bg-black opacity-[0.1] xsm:h-[0.03456rem]'></div>
            <p className='body16-m xsm:sub-12 text-greyscaletext-400 xsm:font-medium xsm:tracking-[-0.015rem]'>
              Thành công và sinh lời cao
            </p>
          </div>
        </div>
      </div>
      <div className='mt-[0.875rem] sm:hidden'>
        <ImageV2
          className='h-[27.8125rem] w-full object-cover sm:hidden'
          src={'/imgs/homepage/globalImmigration/bg-mb.png'}
          alt=''
          height={445}
          width={345}
        />
      </div>
    </section>
  )
}

export default GlobalImmigration
