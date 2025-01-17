'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {IDataAcfDetailEB5} from '@/types/dataAcfDetailEB5.interface'

type LocationItem = {
  title: string
  description: string
  image: string
}

const LocationItem = ({
  description,
  thumbnail,
  title,
}: IDataAcfDetailEB5['acf']['eb5_projects_detail_location']['prime_location'][0]) => {
  return (
    <div className='shadow-SHADOW relative flex items-start space-x-6 overflow-hidden rounded-3xl bg-white p-6'>
      <div className='absolute -top-[0.02088rem] right-0 h-[7.5rem] w-[7.5rem] rotate-90 transform bg-[radial-gradient(95.02%_94.67%_at_-6.67%_-10.42%,#F5C178_34.9%,rgba(255,255,255,0.00)_100%)] opacity-80' />
      <ImageV2
        src={thumbnail.url}
        alt={thumbnail.alt}
        width={200}
        height={200}
        className='h-[12.5rem] w-[12.5rem] rounded-[0.5rem] object-cover'
      />
      <div className='flex flex-1 flex-col space-y-4 p-2'>
        <h2 className='bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] bg-clip-text font-optima text-xl font-semibold uppercase leading-normal tracking-[-0.025rem] text-transparent'>
          {title}
        </h2>
        <div className='h-[1px] w-full bg-[linear-gradient(90deg,rgba(112,115,124,0.22)_24.3%,rgba(112,115,124,0.00)_82.57%)]' />
        <p className='text-greyscaletext-body body-14'>{description}</p>
      </div>
    </div>
  )
}

const LocationItemMobile = ({
  description,
  thumbnail,
  title,
}: IDataAcfDetailEB5['acf']['eb5_projects_detail_location']['prime_location'][0]) => {
  return (
    <div className='shadow-SHADOW flex flex-col space-y-4 rounded-3xl bg-white p-4'>
      <ImageV2
        src={thumbnail.url}
        alt={thumbnail.alt}
        width={800}
        height={800}
        className='h-[12.5rem] w-full rounded-[0.5rem] object-cover'
      />
      <div className='flex flex-1 flex-col space-y-4 p-2'>
        <h2 className='font-optima text-base font-medium uppercase leading-normal tracking-[-0.02rem] text-Phase-1-Brown'>
          {title}
        </h2>
        <div className='h-[1px] w-full bg-[linear-gradient(90deg,rgba(112,115,124,0.22)_24.3%,rgba(112,115,124,0.00)_82.57%)]' />
        <p className='font-normal text-greyscaletext-body body-14'>
          {description}
        </p>
      </div>
    </div>
  )
}

export type ProjectLocationProps = {
  title: string
  subTitle: string
  description: string
  subDescription: string
  locationImage: string
  locationItems: LocationItem[]
}

const ProjectLocation = ({
  description,
  title_section,
  subtitle,
  description_subtitle,
  google_map,
  prime_location,
}: IDataAcfDetailEB5['acf']['eb5_projects_detail_location']) => {
  const isMobile = useIsMobile()
  return (
    <section className='flex space-x-[6.5rem] pl-20 sm:pb-[5rem] xsm:flex-col-reverse xsm:space-x-0 xsm:space-y-6 xsm:px-4 xsm:mt-[9rem]'>
      <div className='flex-1 pt-20 xsm:pt-4'>
        <h1 className='font-optima font-semibold text-Phase-1-Brown heading1'>
          {title_section}
        </h1>
        <p className='mt-[0.875rem] text-[1rem] font-normal text-greyscaletext-body xsm:body-14'>
          {description}
        </p>
        <h4 className='mt-14 font-optima font-semibold text-Phase-1-Brown heading4 xsm:mt-8 xsm:text-[1.125rem] xsm:leading-[1.4] xsm:tracking-[-0.0225rem]'>
          {subtitle}
        </h4>
        <p className='mt-4 text-[1rem] font-normal text-greyscaletext-body xsm:body-14'>
          {description_subtitle}
        </p>
        <div className='mt-6 flex flex-col space-y-8 xsm:mt-4 xsm:space-y-4'>
          {prime_location.map((item, index) => {
            if (isMobile) {
              return (
                <LocationItemMobile
                  key={index}
                  {...item}
                />
              )
            } else
              return (
                <LocationItem
                  key={index}
                  {...item}
                />
              )
          })}
        </div>
      </div>
      <div className='sticky top-8 h-[49.25rem] w-[47.825rem] py-20 xsm:static xsm:aspect-square xsm:h-auto xsm:w-full xsm:py-0'>
        <iframe
          src={google_map}
          width='600'
          height='450'
          style={{border: 0}}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='h-full w-full rounded-l-2xl object-cover xsm:rounded-2xl'
        ></iframe>
      </div>
    </section>
  )
}
export default ProjectLocation
