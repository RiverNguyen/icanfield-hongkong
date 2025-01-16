import {cn} from '@/lib/utils'
import Link from 'next/link'
import {FC, Fragment} from 'react'

interface IBreadcrumbProps {
  items: {
    label: string
    href: string
  }[]
  className?: string
}

export const Breadcrumb: FC<IBreadcrumbProps> = ({items, className}) => {
  return (
    <nav
      className={cn(
        'relative z-10 mx-auto max-w-[90rem] py-[1.5rem] xsm:hidden',
        className,
      )}
    >
      <ul className='flex items-center space-x-[0.5rem] text-white'>
        {items.map((item, idx) => {
          if (idx === items.length - 1) {
            return (
              <li key={idx}>
                <span className='last--li text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem]'>
                  {item.label}
                </span>
              </li>
            )
          } else {
            return (
              <Fragment key={idx}>
                <li>
                  <Link
                    className={cn(
                      'item--li text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem]',
                      {'text-white/80': idx === 0},
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
                <li>
                  <span className='block size-[0.3125rem] rounded-full bg-white/60'></span>
                </li>
              </Fragment>
            )
          }
        })}
      </ul>
    </nav>
  )
}
