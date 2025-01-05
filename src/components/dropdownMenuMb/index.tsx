import React from 'react'
import ImageV2 from '@/components/image/ImageV2'
import Link from 'next/link'
export const Dropdown = ({
  title,
  listItems,
  isActive,
  handleToggle,
  refDropdown,
  height,
}: {
  title: string
  listItems: Array<{
    href: string
    imgUrl: string
    title: string
    flagUrl: string
  }>
  isActive: boolean
  handleToggle: () => void
  refDropdown: React.RefObject<HTMLDivElement>
  height: number
}) => {
  return (
    <div
      className='mt-2 rounded-[0.75rem] bg-[#F1F0EC] p-4'
      onClick={handleToggle}
    >
      <div className='flex items-center justify-between'>
        <span className='line-clamp-1 text-[1rem] font-semibold leading-[1.5] tracking-[-0.01rem] text-greyscaletext-body'>
          {title}
        </span>
        <ImageV2
          src='/icons/homepage/header/arrow-down-mb.svg'
          alt='logo'
          width={40}
          height={40}
          className={`size-[1.5rem] object-contain ${isActive ? 'transform -rotate-180' : ''} transition-all duration-300`}
        />
      </div>
      <div
        className={`rounded-[0.5rem] bg-[rgba(70,70,70,0.05)] px-4 transition-all duration-300 ${
          isActive ? 'mt-4' : 'mt-0 overflow-hidden'
        }`}
        ref={refDropdown}
        style={{height: `${height}px`}}
      >
        {listItems.map((item, index) => (
          <Link
            href={item.href || '/'}
            key={index}
            className='flex items-center space-x-[0.5rem] py-4'
          >
            <ImageV2
              src={item.flagUrl || ''}
              alt='logo'
              width={80}
              height={80}
              className='size-[1.5rem] rounded-[50%] object-cover'
            />
            <span className='text-[0.875rem] font-medium leading-[1.4] tracking-[-0.0175rem] text-[#333]'>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
