import ICArrowRinght from '@/layout/footer/ICArrowRinght'
import Image from 'next/image'
import Link from 'next/link'

const CardPrograms = ({data}: any) => {
  return (
    <div className='relative h-[13.75rem] w-full overflow-hidden rounded-[0.75rem]'>
      <div className='relative size-full'>
        <Image
          src={data.image}
          alt={data.title}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_18.17%,rgba(0,0,0,0.64)_87.72%)]' />
      </div>

      <div className='absolute inset-0 flex flex-col justify-between p-[1rem]'>
        <div className='flex items-center space-x-[0.62rem]'>
          <div className='relative size-[2.75rem] flex-shrink-0 overflow-hidden rounded-full'>
            <Image
              className='size-full object-contain'
              src={data.flag}
              alt=''
              fill
            />
          </div>
          <div className='flex-1 text-white'>
            <h3 className='font-medium text-white heading5'>{data.title}</h3>
            <span className='font-normal text-white body-14'>
              {data.subtitle}
            </span>
          </div>
        </div>

        <Link
          href={'/'}
          className='group flex h-[3rem] w-full items-center justify-center rounded-[0.5rem] border border-solid border-[rgba(255,255,255,0.85)] pl-[1.5rem] pr-[0.75rem] transition-all duration-500 lg:hover:bg-white'
        >
          <span className='text-white transition-all duration-500 body-14-m lg:group-hover:text-black'>
            Tìm hiểu thêm
          </span>
          <ICArrowRinght className='ml-[0.5rem] size-[1.5rem] [&>path]:stroke-white [&>path]:transition-all [&>path]:duration-500 lg:group-hover:[&>path]:stroke-black' />
        </Link>
      </div>
    </div>
  )
}

export default CardPrograms
