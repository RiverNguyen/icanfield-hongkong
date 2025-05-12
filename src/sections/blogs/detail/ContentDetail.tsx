'use client'

import Share from '@/components/share/Share'
import useIsMobile from '@/hooks/useIsMobile'

const addIdsToHeadings = (htmlString: string) => {
  let index = 1
  if (!htmlString) return ''
  return htmlString.replace(/<(h2|h3)[^>]*>/g, (match, tag:any) => { //eslint-disable-line
    return `${match.slice(0, -1)} id="section-${index++}">`
  })
}

export default function ContentDetail({
  dataContent,
  author,
  title,
}: {
  dataContent: string
  author: string
  title: string
}) {
  const isMobile = useIsMobile()
  const htmlWithIds = addIdsToHeadings(dataContent)
  const cleanedHtml = htmlWithIds
    ?.replace(/\[caption.*?\]/g, '<div class="wp-caption">')
    .replace(/\[\/caption\]/g, '</div>')

  return (
    <div className='w-[58.3125rem] xsm:w-full'>
      {!isMobile && (
        <h1 className='mb-[2.9rem] font-optima text-[2rem] font-semibold leading-[1.3] tracking-[-0.02rem] text-orangetext-900'>
          {title}
        </h1>
      )}
      <div
        className='[&_h2]:content-h2 [&_img]:content-img [&_.wp-caption]:text-gray-500 [&_.wp-caption]:italic [&_.wp-caption]:text-center  [&_p]:content-p [&_span]:content-span [&_ul]:content-ul [&_ul_li]:content-ul--li [&_strong]:content-strong [&_ol]:content-ol [&_ol_li]:content-ol--li flex-1 [&_a]:text-blue-600 [&_strong]:font-bold'
        dangerouslySetInnerHTML={{ __html: cleanedHtml || '' }}
      ></div>
      <div className='my-[1.5rem] h-[0.0625rem] w-full bg-[rgba(0,0,0,0.04)]'></div>
      <div className='flex w-full items-center justify-between'>
        <Share className='[&>p]:hidden' />
        <p className='w-full text-end text-orangetext-900 body16-s xsm:text-[0.875rem] xsm:font-semibold xsm:leading-[1.5] xsm:tracking-[-0.00875rem]'>
          Đăng bởi {author}
        </p>
      </div>
    </div>
  )
}