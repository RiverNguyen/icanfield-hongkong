/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageV2 from '@/components/image/ImageV2'
import {Category, DataItem} from '@/types/blogs.interface'
import Link from 'next/link'

interface IProps {
  data: DataItem
}

const ItemBlog = ({data}: IProps) => {
  function handleFindPrimaryCategory(category: Category[]) {
    return category.find((category: Category) => category.primary)?.name
  }
  return (
    <Link
      prefetch={false}
      href={data?.slug ? `/tin-tuc/${data?.slug}` : '/blogs'}
      className='rounded-[1.04663rem group relative block h-[32.5rem] w-full overflow-hidden rounded-[1.25rem] p-[2rem] xsm:h-[25rem] xsm:p-[1.5rem]'
    >
      <ImageV2
        src={data?.image?.url}
        alt='item blog'
        className='z-[1] size-full origin-center object-cover transition-all duration-700 lg:group-hover:scale-[1.15]'
        fill
        sizes='30vw'
      />
      <div className='absolute left-0 top-0 z-[2] size-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_22.87%,rgba(0,0,0,0.57)_63.62%,rgba(0,0,0,0.84)_89.8%)]'></div>
      <div className='relative z-[3] flex size-full flex-col justify-between xsm:justify-end'>
        <div className='relative ml-auto flex h-[2.75rem] w-[8.8125rem] justify-end xsm:hidden'>
          <span className='absolute left-[1.25rem] top-1/2 z-10 -translate-y-1/2 text-[0.875rem] font-semibold leading-normal text-[#3F2214] opacity-0 transition-all delay-100 duration-500 lg:group-hover:opacity-100'>
            Xem thêm
          </span>
          <button className='z-[1] flex h-full w-[2.75rem] items-center justify-end rounded-[0.9375rem] bg-[#D9D9D9] px-[0.62rem] transition-all duration-500 lg:group-hover:w-full'>
            <ICArrow className='size-[1.5rem] transition-all duration-700 lg:group-hover:rotate-45' />
          </button>
        </div>
        <div>
          <div className='flex h-[1.625rem] w-fit items-center justify-center rounded-[0.375rem] bg-[rgba(248,244,241,0.48)] px-[0.75rem] text-[0.75rem] font-bold uppercase leading-[1.2] text-white backdrop-blur-[15px] xsm:h-[1.36063rem] xsm:px-[0.63rem] xsm:text-[0.625rem]'>
            {handleFindPrimaryCategory(data.category)}
          </div>
          <h3 className='my-[0.68rem] line-clamp-2 font-optima text-[1.25rem] font-semibold leading-normal text-white xsm:my-[0.74rem] xsm:text-[0.875rem]'>
            {data.title}
          </h3>
          <div className='flex items-center'>
            <ICCalendar className='mr-[0.38rem] h-auto w-[1.01794rem] flex-shrink-0 xsm:mr-[0.32rem] xsm:w-[0.85238rem]' />
            <span className='text-[0.875rem] font-normal leading-normal text-greyscaletext-100 xsm:text-[0.75rem]'>
              {data.date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemBlog

export const ICArrow = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M7.04928 16.9497L16.9488 7.05025M16.9488 7.05025H8.46349M16.9488 7.05025V15.5355'
        stroke='#3F2214'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const ICCalendar = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
      className={className}
    >
      <path
        d='M2.71484 5.7856H13.5731M2.71484 5.7856V11.7578C2.71484 12.5179 2.71484 12.8978 2.86278 13.1882C2.99291 13.4435 3.20039 13.6514 3.45578 13.7815C3.74584 13.9293 4.12574 13.9293 4.8844 13.9293H11.4036C12.1622 13.9293 12.5416 13.9293 12.8316 13.7815C13.087 13.6514 13.2952 13.4435 13.4253 13.1882C13.5731 12.8981 13.5731 12.5187 13.5731 11.7601V5.7856M2.71484 5.7856V5.24282C2.71484 4.48267 2.71484 4.10231 2.86278 3.81197C2.99291 3.55658 3.20039 3.34909 3.45578 3.21897C3.74612 3.07103 4.12648 3.07103 4.88663 3.07103H5.42941M13.5731 5.7856V5.24059C13.5731 4.48192 13.5731 4.10203 13.4253 3.81197C13.2952 3.55658 13.087 3.34909 12.8316 3.21897C12.5413 3.07103 12.1618 3.07103 11.4016 3.07103H10.8586M10.8586 1.71375V3.07103M10.8586 3.07103H5.42941M5.42941 1.71375V3.07103'
        stroke='#C0C0C0'
        strokeWidth='1.52695'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
