import ImageV2 from '@/components/image/ImageV2'
import React from 'react'

export type ProjectOverviewProps = {
  name: string
  location: string
  product: string
  quantity: {
    title: string
    items: string[]
  }
  description: string[]
  images: string[]
  info: {
    name: string
    value: string
    icon: string
  }[]
}

const ProjectOverview = ({
  description,
  images,
  info,
  name,
  location,
  product,
  quantity,
}: ProjectOverviewProps) => {
  return (
    <div className='rounded-[1.25rem] bg-white p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-8 xsm:p-0 xsm:shadow-none'>
      <h2 className='heading3 font-optima font-medium text-Phase-1-Brown xsm:text-xl xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
        Tổng quan dự án
      </h2>
      <ul className='body16-r55 xsm:body-14 mt-[1.875rem] flex list-disc flex-col space-y-[0.875rem] pl-6 text-greyscaletext-400'>
        <li>
          <p className='flex items-center space-x-1'>
            <b className='font-semibold text-textgreybody'>Tên dư án: </b>{' '}
            <span className='background_clip--text flex-1 bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'>
              {name}
            </span>
          </p>
        </li>
        <li>
          <p>
            <b className='font-semibold text-textgreybody'>Vị trí: </b>{' '}
            {location}
          </p>
        </li>
        <li>
          <p>
            <b className='font-semibold text-textgreybody'>Sản phẩm: </b>{' '}
            {product}
          </p>
        </li>
        <li>
          <p>
            <b className='font-semibold text-textgreybody'>Số lượng: </b>{' '}
            {quantity.title}
          </p>
          <ul className='pl-16 xsm:pl-0'>
            {quantity.items.map((item, index) => (
              <li key={index}>+ {item}</li>
            ))}
          </ul>
        </li>
      </ul>
      <div className='body16-r55 xsm:body-14 mt-[0.875rem] flex flex-col space-y-[2.375rem] text-greyscaletext-400 [&>img]:h-[26.4375rem] [&>img]:w-full [&>img]:rounded-2xl xsm:[&>img]:h-[13.93755rem] xsm:[&>img]:rounded-2xl'>
        <p>{description[0]}</p>
        <ImageV2
          src={images[0]}
          alt=''
          width={1920}
          height={1080}
        />
        <p>{description[1]}</p>
        <div className='grid grid-cols-[min(15rem)_1fr] gap-y-9 xsm:grid-cols-1'>
          {info.map((item, index) => (
            <div
              key={index}
              className='flex items-center space-x-[0.875rem]'
            >
              <ImageV2
                width={80}
                height={80}
                src={item.icon}
                alt=''
              />
              <div>
                <h3 className='body-14-b background_clip--text bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'>
                  {item.name}
                </h3>
                <p className='body-14 text-textgreybody/[.72]'>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        {images.slice(1).map((image, index) => (
          <ImageV2
            key={index}
            src={image}
            alt=''
            width={1920}
            height={1080}
          />
        ))}
      </div>
    </div>
  )
}
export default ProjectOverview
