import ButtonBorder from "@/components/button/ButtonBorder";
import ImageV2 from "@/components/image/ImageV2";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='relative bg-orangetext-900 pt-[6rem] xsm:pt-[2.5rem]'>
      <div className='mx-auto mb-[3.25rem] flex flex-col items-center space-y-[1.5rem] xsm:mb-[2.5rem] xsm:space-y-[1rem]'>
        <h3 className='heading2 w-[45.29138rem] text-center font-optima font-semibold tracking-[-0.05rem] text-textwhitetest xsm:w-full'>
          Để iCanfield dẫn lối <br /> hành trình quốc tế hóa của bạn!
        </h3>
        <ButtonBorder title={"Hỗ trợ khách hàng"} link={"#"} />
      </div>
      <ImageV2
        alt="bg-footer"
        src={"/imgs/homepage/footer/bg-footer.png"}
        width={1600}
        height={522}
        className='absolute bottom-0 left-0 z-0 h-[calc(38.6875rem-6.06rem)] w-full opacity-[0.3] xsm:hidden'
      />
      <div className='section-container relative h-[calc(38.6875rem-6.06rem)] space-y-[3.5rem] rounded-[2rem_2rem_0_0] bg-[rgba(255,255,255,0.03)] px-[6rem] pt-[4rem] xsm:h-auto xsm:space-y-[2rem] xsm:p-[2.5rem_1rem]'>
        <div className='flex sm:justify-between xsm:flex-col'>
          <ImageV2
            alt="logo-footer"
            src={"/icons/homepage/footer/d-logofooter.svg"}
            width={190}
            height={223}
            className='h-[13.95613rem] w-[11.875rem] xsm:mx-auto xsm:h-[9.625rem] xsm:w-[8.18975rem]'
          />
          <div className='mt-[2rem] flex space-x-[5rem] xsm:flex-col xsm:space-x-0 xsm:space-y-[2.5rem]'>
            <div className='w-[17.25rem] space-y-[2rem] xsm:w-full xsm:space-y-[1rem]'>
              <p className='body16 font-medium text-white xsm:font-bold'>
                THÔNG TIN LIÊN HỆ
              </p>
              <div className="space-y-[1.25rem] xsm:space-y-[0.75rem]">
                <Link href="#" className="flex items-start space-x-[1rem]">
                  <ImageV2
                    alt=""
                    src={"/icons/homepage/footer/d-icon-local.svg"}
                    width={40}
                    height={40}
                    className="size-[1.25rem] object-contain"
                  />
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    Tầng 12, Tòa nhà President Place 93 Nguyễn Du, P. Bến Nghé,
                    Quận 1, TP.HCM
                  </p>
                </Link>
                <Link href="#" className="flex items-start space-x-[1rem]">
                  <ImageV2
                    alt=''
                    src={'/icons/homepage/footer/d-icon-local.svg'}
                    width={40}
                    height={40}
                    className='size-[1.25rem] object-contain'
                  />
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    contact@icanfield.com
                  </p>
                </Link>
                <Link href="#" className="flex items-start space-x-[1rem]">
                  <ImageV2
                    alt=''
                    src={'/icons/homepage/footer/d-icon-local.svg'}
                    width={40}
                    height={40}
                    className='size-[1.25rem] object-contain'
                  />
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    028 3822 0285
                  </p>
                </Link>
              </div>
            </div>
            <div className='space-y-[2rem] xsm:space-y-[1rem]'>
              <p className='body16 font-medium text-white xsm:font-bold'>
                MENU
              </p>
              <div className='sm:space-y-[1.25rem] xsm:grid xsm:grid-cols-2 xsm:gap-y-[0.75rem]'>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    Về Chúng Tôi
                  </p>
                </Link>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    Tư vấn định cư
                  </p>
                </Link>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    Tư vấn đầu tư
                  </p>
                </Link>
                <Link
                  href='#'
                  className='flex items-center space-x-[1rem]'
                >
                  <p className='body16 text-white xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
                    Tư vấn du học
                  </p>
                </Link>
              </div>
            </div>
            <div className='w-[21.3125rem] xsm:w-full'>
              <p className='heading5 xsm:body16-s mb-[2rem] font-medium text-white sm:leading-[133.3%] xsm:mb-[1.5rem]'>
                Kết nối ngay hôm nay, đội ngũ chuyên gia của chúng tôi sẵn sàng
                hỗ trợ bạn!
              </p>
              <span className='sub-14 font-semibold text-white'>
                Đăng ký để nhận tư vấn
              </span>
              <div className='mt-[1rem] flex rounded-[0.5rem] bg-white p-[0.75rem_0.5rem_0.75rem_1rem]'>
                <input
                  type='email'
                  placeholder='Email của bạn'
                  className='body16 flex-1 tracking-[-0.02rem] placeholder:text-greyscaletext-200 focus:outline-none focus-visible:outline-none'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-between rounded-[1rem] bg-[rgba(112,115,124,0.08)] p-[1.5rem_1.5rem_1.5rem_2rem] xsm:flex-col-reverse xsm:bg-[rgba(112,115,124,0.16)] xsm:p-[1rem_1.5rem_1.5rem_1.5rem]'>
          <p className='sub-14 font-bold text-white'>
            © 2024 iCanfield. Designed by OKHUB
          </p>
          <div className='flex items-center space-x-[0.75rem] xsm:mb-[1rem]'>
            {new Array(4).fill(0).map((e, index) => (
              <Link
                href={''}
                className='flex-center cursor-pointer p-[0.62rem] relative before:transition-all before:duration-700 hover:before:h-[2.75rem] before:absolute before:w-full before:h-0 before:bottom-0 before:left-0 before:rounded-[0.625rem] before:bg-primary-brown before:z-[2]'
                key={index}
              >
                <ImageV2
                  alt=''
                  src={'/icons/homepage/footer/d-fb.svg'}
                  width={40}
                  height={40}
                  className='size-[1.5rem] object-contain z-[3]'
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
