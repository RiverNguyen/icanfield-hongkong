'use client'
import ImageV2 from '@/components/image/ImageV2'
import Share from '@/components/share/Share'
import useIsMobile from '@/hooks/useIsMobile'
import IndexAside from '@/sections/blogs/detail/IndexAside'

export default function AsideDetail({
  dataContent,
  date,
  title,
}: {
  dataContent: string
  date: string
  title: string
}) {
  const isMobile = useIsMobile()
  const formatDate = (dateString: string): string => {
    if (!dateString) {
      return 'Invalid date'
    }
    const [day, month, year] = dateString.split('/')
    const date = new Date(`${year}-${month}-${day}`)

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: undefined, // Bỏ thứ nếu không cần
    }

    return date.toLocaleDateString('vi-VN', options) // 'vi-VN' cho tiếng Việt
  }
  const formattedDate = formatDate(date)
  return (
    <aside className='w-[19rem] xsm:w-full'>
      <p className='body-14 tracking-[-0.035rem] text-orangetext-300 sm:mb-[6.37rem] xsm:mb-[0.75rem] xsm:text-[0.75rem] xsm:leading-[1.4]'>
        {formattedDate}
      </p>
      {isMobile && (
        <h1 className='mb-[1.5rem] font-optima text-[1.125rem] font-medium leading-[1.3] tracking-[-0.0225rem] text-orangetext-900 sm:hidden'>
          {title}
        </h1>
      )}
      <div className='sm:sticky sm:top-[8.4375rem] sm:pb-[1rem]'>
        <div className='mb-[1.5rem] rounded-[0.75rem] border-[2px] border-solid border-[#eee] bg-[#F6F5F3] p-[1.5rem] xsm:rounded-[0.625rem] xsm:border-[0.4px] xsm:border-[rgba(0,0,0,0.10)] xsm:p-[0.94rem_1rem]'>
          <div className='mb-[1.62rem] w-full xsm:mb-[0.75rem] xsm:flex xsm:items-center xsm:justify-between'>
            <p className='text-[1.25rem] font-semibold tracking-[-0.0125rem] text-orangetext-900 xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]'>
              Nội dung bài viết
            </p>
            <ImageV2
              className='size-[2.25rem] xsm:size-[1.25rem] brightness-[100] invert-[100] filter sm:hidden'
              width={20}
              height={20}
              alt=''
              src={'/icons/blogs/downV2.svg'}
            />
          </div>
          <IndexAside htmlString={dataContent} />
        </div>
        <Share className='xsm:hidden' />
      </div>
    </aside>
  )
}
