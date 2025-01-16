import ICChat from '@/components/icon/ICChat'
import ICTwoline from '@/components/icon/ICTwoline'
import ImageV2 from '@/components/image/ImageV2'
import {IProject} from '@/components/itemProjects/itemProjects.interface'
import Link from 'next/link'
const ItemProjectsOutstanding = (data: IProject) => {
  const {
    location,
    slug,
    title,
    image,
    type,
    project_scale,
    eb5_capital_ratio,
    jobs_created,
    contact,
  } = data
  console.log('location', location)
  return (
    <Link
      href={'/EB5/' + slug || ''}
      className='group/item overflow-hidden rounded-[1.25rem] border-[0.8px] border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11.1px_0px_rgba(114,114,114,0.08)]'
    >
      <div className='relative h-[18.5625rem] w-full overflow-hidden xsm:h-[14.25rem]'>
        <ImageV2
          src={image?.url || ''}
          alt={image?.alt || ''}
          width={image?.width || 500}
          height={image?.height || 500}
          className='h-full w-full object-cover transition-all duration-300 group-hover/item:scale-[1.1]'
        />
        <div className='absolute bottom-0 left-0 right-0 z-10 h-full w-full bg-[linear-gradient(180deg,rgba(92,50,30,0.00)0.15%,rgba(40,14,2,0.90)95.57%)]'></div>
        <div className='absolute bottom-[1.5rem] left-[1.5rem] z-[11]'>
          <h3 className='font-optima text-[2rem] font-medium leading-[1.2] tracking-[-0.04rem] text-white xsm:text-[1.25rem]'>
            {title}
          </h3>
          <div className='mt-2 flex items-center space-x-2'>
            <ImageV2
              src={'/icons/EB5/pioneering-values/location.svg'}
              alt='location'
              width={40}
              height={40}
              className='size-3'
            />
            <span className='text-[0.875rem] font-bold capitalize leading-[1.33] text-white opacity-[0.72] xsm:text-[0.75rem]'>
              {location &&
                location.reduce((acc, cur) => {
                  if (cur.primary) {
                    return cur.name
                  }
                  return acc
                }, 'Đang cập nhật...')}
            </span>
          </div>
        </div>
      </div>
      <div className='px-[1.5rem] py-[1.25rem]'>
        <div className='col grid grid-cols-2 gap-x-[2rem] gap-y-[1.12rem] xsm:grid-cols-[3fr_2fr] xsm:gap-x-0 xsm:gap-y-3 [&>div]:flex-col [&>div]:space-y-1 [&>div_p]:line-clamp-1 [&>div_p]:text-[1rem] [&>div_p]:font-bold [&>div_p]:leading-[1.33] [&>div_p]:tracking-[-0.02rem] [&>div_p]:text-orangetext-500 [&>div_span]:text-[0.875rem] [&>div_span]:leading-[1.5] [&>div_span]:tracking-[-0.00875rem] [&>div_span]:text-greyscaletext-200'>
          <div className=''>
            <span>Loại hình:</span>
            <p>{type}</p>
          </div>
          <div>
            <span>Quy mô dự án:</span>
            <p>{project_scale}</p>
          </div>
          <div>
            <span>Tỷ lệ vốn EB-5:</span>
            <p>{eb5_capital_ratio}%</p>
          </div>
          <div>
            <span>Việc làm tạo ra:</span>
            <p>{jobs_created}%</p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between border-t-[1px] border-[rgba(0,0,0,0.08)] px-[1.5rem] py-[1.25rem] pb-[1.5rem] xsm:justify-start xsm:space-x-2 xsm:p-4'>
        <div className='group flex items-center space-x-3'>
          <div className='relative rounded-full bg-orangetext-50 p-[0.875rem] transition-all duration-300 group-hover:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'>
            <ICChat className='size-[1.25rem] group-hover:[&_path]:fill-white' />
            <ICTwoline className='absolute left-1/2 top-1/2 h-[0.33856rem] w-[0.57813rem] -translate-x-1/2 -translate-y-3/4 group-hover:[&_path]:fill-[#5C321E]' />
          </div>
          <Link
            href={'tel:' + contact}
            className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-Phase-1-Brown xsm:hidden'
          >
            Liên hệ tư vấn
          </Link>
        </div>
        <div className='flex cursor-pointer items-center space-x-2 rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] px-[1.5rem] py-[0.75rem] xsm:flex-1 xsm:justify-center'>
          <span className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.0175rem] text-white'>
            Xem chi tiết
          </span>
          <ImageV2
            src={'/icons/EB5/pioneering-values/Arrow_item.svg'}
            alt='Arrow'
            width={40}
            height={40}
            className='size-6'
          />
        </div>
      </div>
    </Link>
  )
}

export default ItemProjectsOutstanding
