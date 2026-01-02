'use client'
import ImageV2 from '@/components/image/ImageV2'
import Link from 'next/link'
import React from 'react'
import './styles.css'

interface ContactButtonsItems {
  icon: string
  link: string
}

interface ContactButtonsProps {
  data: ContactButtonsItems[]
}

const ContactButtons = ({data}: ContactButtonsProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='fixed bottom-12 right-7 z-[999]'>
      <div className='main-div relative'>
        {/* Nút chính */}
        <div
          className={`${
            isOpen
              ? 'wave bg-[linear-gradient(0deg,rgb(20_50_100/12%)_0%,rgba(246,245,242,0)_8%,rgb(20_50_100/9%)_100%)]'
              : 'shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
          } mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={handleClick}
        >
          <ImageV2
            src='/icons/buttons/close2.svg'
            alt='icon'
            width={24}
            height={24}
            className={`h-6 w-6 ${isOpen ? 'hidden' : ''}`}
          />
          <ImageV2
            src='/icons/buttons/comment2.svg'
            alt='icon'
            width={24}
            height={24}
            className={`h-6 w-6 ${isOpen ? '' : 'hidden'}`}
          />
        </div>

        {/* Các nút phụ */}
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
              className={
                'absolute mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(360deg,#95502F_-4.54%,#F5C178_95.42%)] shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl'
              }
              style={{
                bottom: !isOpen ? `${(index + 1) * 3.5}rem` : '0rem',
                opacity: !isOpen ? 1 : 0,
                pointerEvents: !isOpen ? 'auto' : 'none',
              }}
            >
              <ImageV2
                src={item.icon}
                alt='icon'
                width={24}
                height={24}
                className='h-6 w-6 [filter:_brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(7500%)_hue-rotate(131deg)_brightness(111%)_contrast(111%);]'
              />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default ContactButtons
