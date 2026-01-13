import IConArrow from '@/components/icon/IConArrow'
import {cn} from '@/lib/utils'
import Link from 'next/link'

export default function ButtonBrown({
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
      href={link || 'immigration-application-assessment'}
      className={cn(
        'flex cursor-pointer items-center space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:flex-1 xsm:justify-center xsm:py-[0.5rem]',
        className,
      )}
    >
      <p className='tracking-[-0.0175rem] text-white body-14-m'>
        {title || 'Xem chi tiết'}
      </p>
      <IConArrow className='size-[1.5rem]' />
    </Link>
  )
}
