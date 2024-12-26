'use client'
import ImageV2 from '@/components/image/ImageV2'
import IndexAside from '@/sections/blogs/detail/IndexAside'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
const fakeContent = `
  <h2>Phần Tiêu Đề 1</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet orci ac arcu cursus consectetur non vitae nulla. Phasellus in lacus eget nunc posuere vehicula.</p>
  <ul>
    <li>Điểm nổi bật 1</li>
    <li>Điểm nổi bật 2</li>
    <li>Điểm nổi bật 3</li>
  </ul>

  <h2>Phần Tiêu Đề 2</h2>
  <p>Nunc scelerisque, nulla in sagittis luctus, felis velit hendrerit risus, a eleifend libero augue id augue. Vestibulum quis diam vel ligula congue vestibulum.</p>
  <blockquote>
    "Một câu nói nổi bật ở đây, nhấn mạnh ý tưởng quan trọng."
  </blockquote>

  <h2>Phần Tiêu Đề 3</h2>
  <p>Praesent malesuada, sem vitae fermentum vehicula, nisi ex bibendum elit, a consectetur lorem est in sapien. Sed lacinia mauris nec elit efficitur vehicula.</p>
  <ol>
    <li>Bước 1: Lorem ipsum dolor sit amet.</li>
    <li>Bước 2: Praesent malesuada sem vitae.</li>
    <li>Bước 3: Sed lacinia mauris nec elit.</li>
  </ol>
`
export default function AsideDetail() {
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
    <aside className='w-[19rem]'>
      <p className='text-orangetext-300 body-14 mb-[6.37rem]'>
        Ngày 24, tháng 6, 2023
      </p>
      <div className='sticky top-[8.4375rem] pb-[1rem]'>
        <div className='mb-[1.5rem] p-[1.5rem] rounded-[0.75rem] border-[2px] border-solid border-[#eee] bg-[#F6F5F3]'>
          <p className='text-orangetext-900 text-[1.25rem] font-semibold tracking-[-0.0125rem] mb-[1.62rem]'>
            Nội dung bài viết
          </p>
          <IndexAside htmlString={fakeContent} />
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
