import ButtonBorder from '@/components/button/ButtonBorder'
import ImageV2 from '@/components/image/ImageV2'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='relative pt-[6rem] bg-orangetext-900'>
      <div className='mx-auto flex flex-col items-center space-y-[1.5rem] mb-[3.25rem]'>
        <h3 className='font-optima w-[45.29138rem] text-textwhitetest heading2 font-semibold tracking-[-0.05rem] text-center'>
          Để iCanfield dẫn lối <br /> hành trình quốc tế hóa của bạn!
        </h3>
        <ButtonBorder
          title={'Hỗ trợ khách hàng'}
          link={'#'}
        />
      </div>
      <ImageV2
        alt='bg-footer'
        src={'/images/homepage/bg-footer.png'}
        width={1600}
        height={522}
        className='absolute bottom-0 left-0 w-full h-[calc(38.6875rem-6.06rem)] z-0 opacity-[0.3]'
      />
      <div className='px-[6rem] pt-[4rem] space-y-[3.5rem] section-container relative h-[calc(38.6875rem-6.06rem)] rounded-[2rem_2rem_0_0] bg-[rgba(255,255,255,0.03)]'>
        <div className='flex justify-between'>
          <ImageV2
            alt='logo-footer'
            src={'/icons/homepage/d-logofooter.svg'}
            width={190}
            height={223}
            className='w-[11.875rem] h-[13.95613rem] '
          />
          <div className='flex mt-[2rem] space-x-[5rem]'>
            <div className='space-y-[2rem] w-[17.25rem]'>
              <p className='text-white semi-16-pc font-medium'>
                THÔNG TIN LIÊN HỆ
              </p>
              <div className='space-y-[1.25rem]'>
                <Link
                  href='#'
                  className='flex items-start space-x-[1rem]'
                >
                  <ImageV2
                    alt=''
                    src={'/icons/homepage/d-icon-local.svg'}
                    width={20}
                    height={20}
                    className='size-[1.25rem] object-contain'
                  />
                  <p className='text-white semi-16-pc '>
                    Tầng 12, Tòa nhà President Place 93 Nguyễn Du, P. Bến Nghé,
                    Quận 1, TP.HCM
                  </p>
                </Link>
                <Link
                  href='#'
                  className='flex items-start space-x-[1rem]'
                >
                  <ImageV2
                    alt=''
                    src={'/icons/homepage/d-icon-local.svg'}
                    width={20}
                    height={20}
                    className='size-[1.25rem] object-contain'
                  />
                  <p className='text-white semi-16-pc '>
                    contact@icanfield.com
                  </p>
                </Link>
                <Link
                  href='#'
                  className='flex items-start space-x-[1rem]'
                >
                  <ImageV2
                    alt=''
                    src={'/icons/homepage/d-icon-local.svg'}
                    width={20}
                    height={20}
                    className='size-[1.25rem] object-contain'
                  />
                  <p className='text-white semi-16-pc '>028 3822 0285</p>
                </Link>
              </div>
            </div>
            <div className='space-y-[2rem]'>
              <p className='text-white semi-16-pc font-medium'>MENU</p>
              <div className='space-y-[1.25rem]'>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='text-white semi-16-pc '>Về Chúng Tôi</p>
                </Link>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='text-white semi-16-pc '>Tư vấn định cư</p>
                </Link>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='text-white semi-16-pc '>Tư vấn đầu tư</p>
                </Link>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='text-white semi-16-pc '>Tư vấn du học</p>
                </Link>
              </div>
            </div>
            <div className='w-[21.3125rem]'>
              <p className='mb-[2rem] text-white heading5 leading-[133.3%] font-medium'>
                Kết nối ngay hôm nay, đội ngũ chuyên gia của chúng tôi sẵn sàng
                hỗ trợ bạn!
              </p>
              <span className='text-white sub-14 font-semibold'>
                Đăng ký để nhận tư vấn
              </span>
              <div className='mt-[1rem] flex p-[0.75rem_0.5rem_0.75rem_1rem] bg-white rounded-[0.5rem]'>
                <input
                  type='email'
                  placeholder='Email của bạn'
                  className='flex-1 semi-16-pc tracking-[-0.02rem] placeholder:text-greyscaletext-200 focus:outline-none focus-visible:outline-none'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full p-[1.5rem_1.5rem_1.5rem_2rem] flex justify-between items-center rounded-[1rem] bg-[rgba(112,115,124,0.08)]'>
          <p className='text-white sub-14 font-bold'>
            © 2024 iCanfield. Designed by OKHUB
          </p>
          <div className='flex space-x-[0.75rem] items-center'>
            {new Array(4).fill(0).map((e, index) => (
              <div
                className='p-[0.62rem]'
                key={index}
              >
                <ImageV2
                  alt=''
                  src={'/icons/homepage/d-fb.svg'}
                  width={24}
                  height={24}
                  className='size-[1.5rem] object-contain'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
