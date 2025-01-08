'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export default function Share({className}: {className?: string}) {
  const [currentUrl, setCurrentUrl] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    const fullUrl = `${window.location.origin}${pathname}${window.location.search}`
    setCurrentUrl(fullUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleCopuUrl = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success('Sao chép thành công')
  }
  const handleShareToFacebook = () => {
    if (typeof window === 'undefined') return
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer')
  }
  return (
    <div
      className={cn(
        'flex items-center space-x-[0.75rem] xsm:space-x-[0.44rem]',
        className,
      )}
    >
      <p className='text-orangetext-900 body16-s'>Chia sẻ qua</p>
      <div
        onClick={handleShareToFacebook}
        className='size-[2.75rem] cursor-pointer rounded-[1.9375rem] border-[1px] border-solid border-[rgba(0,0,0,0.10)] flex-center xsm:size-[2rem]'
      >
        <ImageV2
          className='size-[1.5rem] object-contain xsm:size-[1.09094rem]'
          width={24}
          height={24}
          alt=''
          src={'/icons/detail-blogs/fb.svg'}
        />
      </div>
      <div
        onClick={handleCopuUrl}
        className='size-[2.75rem] cursor-pointer rounded-[1.9375rem] border-[1px] border-solid border-[rgba(0,0,0,0.10)] flex-center xsm:size-[2rem]'
      >
        <ImageV2
          className='size-[1.5rem] object-contain xsm:size-[1.09094rem]'
          width={24}
          height={24}
          alt=''
          src={'/icons/detail-blogs/link.svg'}
        />
      </div>
    </div>
  )
}
