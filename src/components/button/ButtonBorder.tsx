import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import Link from 'next/link'

export default function ButtonBorder({
  title,
  link,
  className,
  target,
}: {
  title: string
  link: string
  className?: string
  target?: string
}) {
  return (
    <Link
      target={target}
      className={cn(
        'group flex w-max items-center p-[0.5rem_0.75rem_0.5rem_1.5rem] rounded-[0.5rem] border-[1px] border-solid border-textwhite85 transition-all duration-500 hover:bg-white',
        className,
      )}
      href={link || ''}
    >
      <p className='transition-all duration-500 text-white group-hover:text-greentext sub-14 font-medium tracking-[-0.0175rem]'>
        {title}
      </p>
      <ImageV2
        width={40}
        height={40}
        alt='arow'
        src={'/icons/homepage/footer/icon-arow.svg'}
        className='transition-all duration-500 size-[1.5rem] object-contain ml-[0.5rem] group-hover:filter group-hover:brightness-[100] group-hover:invert-[100]'
      />
    </Link>
  )
}
