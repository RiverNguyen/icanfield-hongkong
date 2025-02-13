/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageV2 from '@/components/image/ImageV2'
import ICArrowRinght from '@/layout/footer/ICArrowRinght'
import { DataItem } from '@/types/comparePrograms.interface'
import Image from 'next/image'
import Link from 'next/link'

const CardPrograms = ({ data }: { data: DataItem }) => {
  return (
    <div className='relative h-[13.75rem] w-full overflow-hidden rounded-[0.75rem] xsm:h-[10rem]'>
      <div className='relative size-full'>
        <ImageV2
          src={data?.image}
          alt={data?.title}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_18.17%,rgba(0,0,0,0.64)_87.72%)]' />
      </div>

      <div className='absolute inset-0 flex flex-col justify-between p-[1rem] xsm:p-[0.62rem]'>
        <div className='flex items-center space-x-[0.62rem] xsm:space-x-[0.38rem]'>
          <div className='relative size-[2.75rem] flex-shrink-0 overflow-hidden rounded-full xsm:size-[2rem]'>
            <ImageV2
              className='size-full object-cover'
              src={data?.category?.[0]?.flag?.url || data?.image}
              alt=''
              fill
            />
          </div>
          <div className='flex flex-1 flex-col justify-center text-white'>
            <h3 className='line-clamp-1 font-optima font-medium text-white heading5 xsm:text-[0.875rem] xsm:tracking-[-0.0175rem]'>
              {data?.title}
            </h3>
            <span className='font-normal text-white body-14 xsm:tracking-[-0.00625rem] xsm:sub-10'>
              Định cư {Array.isArray(data?.category) && data?.category?.[0]?.name}
            </span>
          </div>
        </div>

        <Link
          href={Array.isArray(data?.category) ? data?.category?.[0]?.slug + data?.slug : '#'}
          className='group flex h-[3rem] w-full items-center justify-center rounded-[0.5rem] border border-solid border-[rgba(255,255,255,0.85)] pl-[1.5rem] pr-[0.75rem] transition-all duration-500 lg:hover:bg-white xsm:h-[2.5rem]'
        >
          <span className='text-white transition-all duration-500 body-14-m lg:group-hover:text-black xsm:sub-12-m'>
            Tìm hiểu thêm
          </span>
          <ICArrowRinght className='ml-[0.5rem] size-[1.5rem] xsm:size-[1rem] [&>path]:stroke-white [&>path]:transition-all [&>path]:duration-500 lg:group-hover:[&>path]:stroke-black' />
        </Link>
      </div>
    </div>
  )
}

export default CardPrograms
