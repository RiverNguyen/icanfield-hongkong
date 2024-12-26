import ImageV2 from '@/components/image/ImageV2'
import {ICountry} from '@/sections/aboutus/office-map/IndexMap'
import {IImageV2} from '@/types/image.interface'
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
  countries: ICountry[][]
}

export const OfficeMap: FC<IOfficeMapProps> = ({
  subtitle,
  description,
  title,
  info,
  countries,
}) => {
  return (
    <section className='relative rounded-[4rem] bg-white p-[5rem_0_7.94rem] shadow-[0px_3px_50px_0px_rgba(0,0,0,0.03)] before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:bg-[#F6F6F4] before:content-[""]'>
      <div className='mx-auto flex max-w-[90rem] justify-between'>
        <div className='flex max-w-[35.4375rem] flex-col'>
          <p className='line-clamp-5 text-[1rem] font-semibold leading-[150%] text-greyscaletext-body/70'>
            {subtitle}
          </p>
          <h2 className='heading1 mb-[1.5rem] mt-[0.5rem] font-optima font-bold leading-[1.2] tracking-[-0.06rem] text-brown'>
            {title}
          </h2>
          <p className='mb-[3rem] text-[1rem] leading-[1.5] tracking-[-0.02rem] text-bodytext'>
            {description}
          </p>
          {info.map((item, index) => (
            <Info
              key={index}
              {...item}
            />
          ))}
        </div>
        <IndexMap countries={countries} />
      </div>
    </section>
  )
}

interface IInfoProps {
  title: string
  label: string
  icon: IImageV2
}

function Info({title, label, icon}: IInfoProps) {
  return (
    <div className='mb-[1.5rem] flex items-center space-x-[1rem] last:mb-0'>
      <div className='size-[4.25rem] rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1.25rem]'>
        <ImageV2
          src={icon.src}
          alt={icon.alt}
          width={24 * 2}
          height={24 * 2}
          className='h-full w-full object-contain'
        />
      </div>
      <div>
        <p className='text-[1.5rem] font-bold leading-[1.5] text-brown'>
          {label}
        </p>
        <h3 className='heading6 mt-[0.25rem] font-semibold text-greyscaletext-300'>
          {title}
        </h3>
      </div>
    </div>
  )
}
