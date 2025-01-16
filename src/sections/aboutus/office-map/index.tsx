import ImageV2 from '@/components/image/ImageV2'
import { DataMapHomepage } from '@/sections/homepage/map-discover/dataMap.interface'
import dynamic from 'next/dynamic'
import {FC} from 'react'
const IndexMap = dynamic(
  () => import('@/sections/aboutus/office-map/IndexMap'),
  {
    ssr: false,
  },
)
export interface IOfficeMapProps {
  subtitle: string
  description: string
  title: string
  info: IInfoProps[]
  countries: DataMapHomepage
}

export const OfficeMap: FC<IOfficeMapProps> = ({
  subtitle,
  description,
  title,
  info,
  countries,
}) => {
  return (
    <section className='relative rounded-[1.5rem] bg-white p-[2rem_1rem_1rem] shadow-[0px_2px_50px_0px_rgba(0,0,0,0.05)] before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:bg-[#F6F6F4] before:content-[""] sm:rounded-[4rem] sm:p-[5rem_0_7.94rem] sm:shadow-[0px_3px_50px_0px_rgba(0,0,0,0.03)] xsm:mb-[0rem]'>
      <div className='mx-auto flex max-w-[90rem] flex-col justify-between sm:flex-row'>
        <div className='flex max-w-[35.4375rem] flex-col'>
          <p className='sub-12 font-medium text-greyscaletext-body/70 sm:line-clamp-5 sm:text-[1rem] sm:font-semibold sm:leading-[150%]'>
            {subtitle}
          </p>
          <h2 className='heading1 mb-[1.5rem] mt-[0.5rem] font-optima font-bold leading-[1.2] tracking-[-0.06rem] text-brown' dangerouslySetInnerHTML={{__html: title}}>

          </h2>
          <p className='mb-[1.5rem] text-[0.875rem] leading-[1.5] tracking-[-0.00875rem] text-bodytext sm:mb-[3rem] sm:text-[1rem] sm:tracking-[-0.02rem]'>
            {description}
          </p>
          {info?.map((item, index) => (
            <Info
              key={index}
              {...item}
            />
          ))}
        </div>
        <IndexMap countries={countries?.countries_data} dataOffice={countries?.offices_data} />
      </div>
    </section>
  )
}

export interface IInfoProps {
  data: string
  label: string
  icon: string
}

function Info({data, label, icon}: IInfoProps) {
  return (
    <div className='mb-[0.62rem] flex items-center space-x-[1rem] last:mb-0 sm:mb-[1.5rem] xsm:border-b xsm:border-b-[rgba(0,0,0,0.10)] xsm:pb-[0.62rem]'>
      <div className='size-[3rem] rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1rem] sm:size-[4.25rem] sm:p-[1.25rem]'>
        <ImageV2
          src={icon || ''}
          alt={label}
          width={24 * 2}
          height={24 * 2}
          className='h-full w-full object-contain mr-2'
        />
      </div>
      <div>
        <p className='text-[1rem] font-bold leading-[1.5] text-brown sm:text-[1.5rem]'>
          {data}
        </p>
        <h3 className='heading6 mt-[0.25rem] font-semibold text-greyscaletext-300 xsm:text-[0.875rem] xsm:font-normal xsm:leading-[1.5]'>
          {label}
        </h3>
      </div>
    </div>
  )
}
