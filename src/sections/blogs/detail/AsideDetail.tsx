'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import IndexAside from '@/sections/blogs/detail/IndexAside'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function AsideDetail({dataContent}: {dataContent: string}) {
  const isMobile = useIsMobile();
  const [copyUrl, setCopyUrl] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    const fullUrl = `${window.location.origin}${pathname}${window.location.search}`
    setCurrentUrl(fullUrl)
  }, [])
  const handleCopuUrl = () => {
    setCopyUrl(true)
    navigator.clipboard.writeText(currentUrl)
    setTimeout(() => {
      setCopyUrl(false)
    }, 2000)
  }
  return (
    <aside className='w-[19rem] xsm:w-full'>
      <p className='text-orangetext-300 body-14 sm:mb-[6.37rem]'>
        Ngày 24, tháng 6, 2023
      </p>
      {isMobile && (
        <h1 className='sm:hidden font-optima text-[1.125rem] text-orangetext-900 font-medium leading-[1.3] tracking-[-0.0225rem]'>Chương trình thẻ thường trú nhân Malta (MPRP) sẽ tăng phí từ ngày 01/01/2025 – Những điều nhà đầu tư cần biết</h1>
      )}
      <div className='sticky top-[8.4375rem] pb-[1rem]'>
        <div className='mb-[1.5rem] p-[1.5rem] rounded-[0.75rem] border-[2px] border-solid border-[#eee] bg-[#F6F5F3]'>
          <p className='text-orangetext-900 text-[1.25rem] font-semibold tracking-[-0.0125rem] mb-[1.62rem]'>
            Nội dung bài viết
          </p>
          <IndexAside htmlString={dataContent} />
        </div>
        <div className='flex items-center space-x-[0.75rem]'>
          <p className='text-orangetext-900 body16-s'>Chia sẻ qua</p>
          <div className='cursor-pointer flex-center size-[2.75rem] rounded-[1.9375rem] border-[1px] border-solid border-[rgba(0,0,0,0.10)]'>
            <ImageV2
              className='object-contain size-[1.5rem]'
              width={24}
              height={24}
              alt=''
              src={'/icons/detail-blogs/fb.svg'}
            />
          </div>
          <div
            onClick={handleCopuUrl}
            className='cursor-pointer flex-center size-[2.75rem] rounded-[1.9375rem] border-[1px] border-solid border-[rgba(0,0,0,0.10)]'
          >
            {copyUrl ? (
              ''
            ) : (
              <ImageV2
                className='object-contain size-[1.5rem]'
                width={24}
                height={24}
                alt=''
                src={'/icons/detail-blogs/link.svg'}
              />
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
