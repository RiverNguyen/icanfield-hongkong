import IConArrow from '@/components/icon/IConArrow'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function ButtonBrown({
  title,
  link,
  className,
  target
}: {
  title: string
  link: string
  className?: string
  target?: string
}) {
  return (
    <Link
        target={target}
        href={link || '#'}
        className={cn('xsm:flex-1 cursor-pointer flex items-center xsm:justify-center space-x-[0.5rem] p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:py-[0.62rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]',
            className
        )}
    >
        <p className="body-14-m tracking-[-0.0175rem] text-white">{title || 'Xem chi tiết'}</p>
        <IConArrow className="size-[1.5rem]" />
    </Link>
  )
}
