import {ICArrow} from '@/components/itemBlog'
import {Skeleton} from '@/components/ui/skeleton'

const SkeletonItemBlog = () => {
  return (
    <div className='rounded-[1.04663rem group relative block h-[32.5rem] w-full overflow-hidden rounded-[1.25rem] p-[2rem] xsm:h-[25rem] xsm:p-[1.5rem]'>
      <Skeleton className='absolute left-0 top-0 size-full' />
      <div className='relative z-[3] flex size-full flex-col justify-between xsm:justify-end'>
        <div className='relative ml-auto flex h-[2.75rem] w-[8.8125rem] justify-end xsm:hidden'>
          <button className='z-[1] flex h-full w-[2.75rem] items-center justify-end rounded-[0.9375rem] bg-[#D9D9D9] px-[0.62rem] transition-all duration-500'>
            <ICArrow className='size-[1.5rem] transition-all duration-700' />
          </button>
        </div>
        <div>
          <div className='relative flex h-[1.625rem] w-fit items-center rounded-[0.375rem] bg-[rgba(248,244,241,0.48)] px-[0.75rem] text-[0.75rem] font-bold uppercase leading-[1.2] text-transparent backdrop-blur-[15px] xsm:h-[1.36063rem] xsm:px-[0.63rem] xsm:text-[0.625rem]'>
            skeleton
            <Skeleton className='absolute left-0 top-0 size-full' />
          </div>
          <h3 className='relative my-[0.68rem] line-clamp-2 font-optima text-[1.25rem] font-semibold leading-normal text-transparent xsm:my-[0.74rem] xsm:text-[0.875rem]'>
            skeleton
            <Skeleton className='absolute left-0 top-0 size-full' />
          </h3>
          <div className='relative flex w-fit items-center'>
            <div className='mr-[0.38rem] size-[1.01794rem] flex-shrink-0 xsm:mr-[0.32rem] xsm:size-[0.85238rem]'></div>
            <span className='text-[0.875rem] font-normal leading-normal text-transparent xsm:text-[0.75rem]'>
              skeleton
            </span>
            <Skeleton className='absolute left-0 top-0 size-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonItemBlog
