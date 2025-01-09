'use client'
import ImageV2 from '@/components/image/ImageV2'
import fetchData from '@/fetch/fetchData'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import Link from 'next/link'
import {FC, useEffect, useState} from 'react'

interface ISuccessPopupProps {
  className?: string
  active: boolean
  // eslint-disable-next-line no-unused-vars
  setActive: (active: boolean) => void
}

interface ISocial {
  icon: Media
  link: string
}

export const SuccessPopup: FC<ISuccessPopupProps> = ({
  className,
  active,
  setActive,
}) => {
  const [socials, setSocials] = useState<ISocial[]>([])
  useEffect(() => {
    const fetchSocials = async () => {
      // fetch socials
      const {
        data: {social},
      } = await fetchData({api: '/footer-options', method: 'GET'})
      setSocials(social)
    }
    fetchSocials()
  }, [])
  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className={cn(
          'fixed left-0 top-0 z-[55] flex h-full w-full cursor-pointer items-center justify-center transition-all duration-300',
          {
            'visible bg-black/50': active,
            'invisible bg-black/0': !active,
          },
          className,
        )}
      ></div>
      <div
        className={cn(
          'fixed left-1/2 top-1/2 z-[55] flex min-h-[23.75rem] w-[21.4375rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[1rem] bg-white p-[2.5rem_1.88rem_2rem] transition-all duration-300 sm:min-h-[28.125rem] sm:w-[50rem] sm:p-[3.5rem_5.35rem_2.5rem]',
          {
            'visible opacity-100': active,
            'invisible opacity-0': !active,
          },
        )}
      >
        <MailIcon className='size-[3.75rem] sm:size-[5rem]' />
        <p className='mb-[0.5rem] mt-[2rem] text-center font-optima text-[1.25rem] font-medium uppercase leading-[1.2] tracking-[-0.025rem] text-brown sm:mb-[1rem] sm:mt-[2.25rem] sm:text-[2.25rem] sm:tracking-[-0.045rem]'>
          Cảm ơn bạn đã liên hệ!
        </p>
        <p className='mb-auto text-center text-[0.875rem] leading-[1.5rem] tracking-[-0.00875rem] text-bodytext sm:text-[1rem] sm:tracking-[-0.02rem]'>
          Thông tin của bạn đã được gửi thành công. Đội ngũ iCanfield sẽ phản
          hồi bạn trong thời gian sớm nhất. Hãy kiểm tra email để cập nhật thêm
          thông tin!
        </p>
        <button
          onClick={() => setActive(!active)}
          className='absolute right-[1rem] top-[1rem] sm:right-[2rem] sm:top-[2rem]'
        >
          <CloseIcon className='size-[1.5rem]' />
        </button>
        <div className='flex space-x-[0.75rem]'>
          {socials.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target='_blank'
              className='flex size-[2.5rem] items-center justify-center rounded-[0.625rem] border border-black/10 p-[0.57rem] sm:size-[2.75rem] sm:p-[0.62rem]'
            >
              <ImageV2
                src={item.icon.url || ''}
                alt={item.icon.alt}
                width={item.icon.width}
                height={item.icon.height}
                className='popup-icon-filter h-full w-full cursor-pointer'
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
function MailIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='80'
      height='80'
      viewBox='0 0 80 80'
      fill='none'
    >
      <path
        d='M0 29.6142L38.0262 53.8149C38.4605 54.1357 38.9738 54.2936 39.4872 54.2936C40.0005 54.2936 40.5138 54.1357 40.9482 53.8149L78.9744 29.6142L40.9679 0.492359C40.5404 0.172723 40.021 0 39.4872 0C38.9534 0 38.4339 0.172723 38.0064 0.492359L0 29.6142Z'
        fill='#E0A868'
      />
      <path
        d='M64.1666 0H14.8076C12.0879 0 9.8717 2.21622 9.8717 4.9359V59.2308C9.8717 60.5931 10.9773 61.6987 12.3397 61.6987H66.6345C67.9968 61.6987 69.1025 60.5931 69.1025 59.2308V4.9359C69.1025 2.21622 66.8912 0 64.1666 0Z'
        fill='#DAF2AF'
      />
      <path
        d='M22.2115 14.8089H56.7628C58.1251 14.8089 59.2307 13.7033 59.2307 12.341C59.2307 10.9787 58.1251 9.87305 56.7628 9.87305H22.2115C20.8492 9.87305 19.7435 10.9787 19.7435 12.341C19.7435 13.7033 20.8492 14.8089 22.2115 14.8089ZM56.7628 19.7448H22.2115C20.8492 19.7448 19.7435 20.8505 19.7435 22.2128C19.7435 23.5751 20.8492 24.6807 22.2115 24.6807H56.7628C58.1251 24.6807 59.2307 23.5751 59.2307 22.2128C59.2307 20.8505 58.1251 19.7448 56.7628 19.7448ZM41.9551 29.6166H22.2115C20.8492 29.6166 19.7435 30.7223 19.7435 32.0846C19.7435 33.4469 20.8492 34.5525 22.2115 34.5525H41.9551C43.3174 34.5525 44.423 33.4469 44.423 32.0846C44.423 30.7223 43.3174 29.6166 41.9551 29.6166Z'
        fill='#95502F'
      />
      <path
        d='M40.9482 53.8159C40.5138 54.1368 40.0005 54.2947 39.4872 54.2947C38.9738 54.2947 38.4605 54.1368 38.0262 53.8159L0 29.6152V74.0383C0 76.7629 2.21128 78.9742 4.9359 78.9742H74.0385C76.7631 78.9742 78.9744 76.7629 78.9744 74.0383V29.6152L40.9482 53.8159Z'
        fill='#BC9247'
      />
      <path
        d='M74.0385 78.974H4.9359C2.16686 78.974 0 76.8071 0 74.0381C0.000220717 73.6508 0.0914647 73.269 0.266371 72.9235C0.441278 72.5779 0.69495 72.2784 1.00692 72.0489L38.0262 47.3694C38.4605 47.0486 38.9738 46.8906 39.4872 46.8906C40.0005 46.8906 40.5138 47.0486 40.9482 47.3694L77.9674 72.0489C78.2794 72.2784 78.5331 72.5779 78.708 72.9235C78.8829 73.269 78.9741 73.6508 78.9744 74.0381C78.9744 76.8071 76.8075 78.974 74.0385 78.974Z'
        fill='#E0A868'
      />
    </svg>
  )
}

function CloseIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001'
        stroke='#5C5C5C'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
