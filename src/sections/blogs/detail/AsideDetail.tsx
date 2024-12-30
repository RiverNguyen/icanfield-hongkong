'use client'
import ImageV2 from '@/components/image/ImageV2'
import Share from '@/components/share/Share';
import useIsMobile from '@/hooks/useIsMobile'
import IndexAside from '@/sections/blogs/detail/IndexAside'

export default function AsideDetail({dataContent}: {dataContent: string}) {
  const isMobile = useIsMobile();
  return (
    <aside className='w-[19rem] xsm:w-full'>
      <p className='text-orangetext-300 body-14 sm:mb-[6.37rem] xsm:text-[0.75rem] xsm:leading-[1.4] tracking-[-0.035rem] xsm:mb-[0.75rem]'>
        Ngày 24, tháng 6, 2023
      </p>
      {isMobile && (
        <h1 className='sm:hidden mb-[1.5rem] font-optima text-[1.125rem] text-orangetext-900 font-medium leading-[1.3] tracking-[-0.0225rem]'>Chương trình thẻ thường trú nhân Malta (MPRP) sẽ tăng phí từ ngày 01/01/2025 – Những điều nhà đầu tư cần biết</h1>
      )}
      <div className='sm:sticky sm:top-[8.4375rem] sm:pb-[1rem]'>
        <div className='mb-[1.5rem] p-[1.5rem] xsm:p-[0.94rem_1rem] rounded-[0.75rem] xsm:rounded-[0.625rem] border-[2px] border-solid border-[#eee] xsm:border-[0.4px] xsm:border-[rgba(0,0,0,0.10)] bg-[#F6F5F3]'>
          <div className='w-full xsm:flex xsm:justify-between xsm:items-center mb-[1.62rem] xsm:mb-[0.75rem]'>
            <p className='text-orangetext-900 text-[1.25rem] font-semibold tracking-[-0.0125rem] xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
              Nội dung bài viết
            </p>
            <ImageV2 className='sm:hidden size-[2.25rem] filter brightness-[100] invert-[100]' width={20} height={20} alt='' src={'/icons/blogs/down.svg'} />
          </div>
          <IndexAside htmlString={dataContent} />
        </div>
        <Share className='xsm:hidden'/>
      </div>
    </aside>
  )
}
