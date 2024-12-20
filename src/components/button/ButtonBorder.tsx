import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import Link from 'next/link'

export default function ButtonBorder({
  title,
  link,
  className,
}: {
  title: string
  link: string
  className?: string
}) {
  return (
    <Link
      className={cn(
        'flex w-max items-center p-[0.5rem_0.75rem_0.5rem_1.5rem] rounded-[0.5rem] border-[1px] border-solid border-textwhite85',
        className,
      )}
      href={link || ''}
    >
      <p className='text-white sub-14 font-medium tracking-[-0.0175rem]'>
        {title}
      </p>
      <ImageV2
        width={24}
        height={24}
        alt='arow'
        src={'/icons/homepage/footer/icon-arow.svg'}
        className='size-[1.5rem] object-contain ml-[0.5rem]'
      />
    </Link>
  )
}
