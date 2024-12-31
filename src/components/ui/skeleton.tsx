import {cn} from '@/lib/utils'

function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-[hsl(210_36%_79%)]',
        className,
      )}
      {...props}
    />
  )
}

export {Skeleton}
