import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'
import Image from 'next/image'

export default function Personnel({
  profile,
}: {
  profile: IDataAcfDetailHR['acf']['profile']
}) {
  return (
    <section className='relative flex items-center justify-center self-stretch px-[5rem] pb-[5.75rem] xsm:px-[0.75rem] xsm:pb-[1rem]'>
      <div className='relative mt-[-21.13rem] min-h-[42.25rem] w-[90rem] overflow-hidden rounded-[2rem] bg-white pb-[5.5rem] xsm:mt-[-8.125rem] xsm:min-h-full xsm:w-[21.9375rem] xsm:flex-col xsm:gap-[1.5rem] xsm:rounded-[1.25rem] xsm:bg-white xsm:px-[0.875rem] xsm:pb-[3.75rem] xsm:pt-[1.5rem]'>
        <div className='relative z-10 mx-auto flex w-[77.3125rem] items-center justify-between xsm:w-full xsm:flex-col-reverse xsm:gap-[1.5rem]'>
          <div className='flex w-[40.1875rem] shrink-0 flex-col items-start gap-[2rem] pt-[3.75rem] xsm:w-full xsm:gap-[0.875rem] xsm:self-stretch xsm:pt-0'>
            <div className='flex flex-col items-start gap-[1.125rem] self-stretch pr-[1rem] xsm:gap-[0.625rem]'>
              <div className='flex flex-col items-start'>
                <h1 className='font-optima text-[5rem] font-semibold uppercase not-italic leading-[120%] tracking-[-0.1rem] text-[#5C321E] xsm:text-[2.875rem] xsm:tracking-[-0.0575rem]'>
                  {profile?.name}
                </h1>
                <h2 className='font-optima text-[3.25rem] font-medium not-italic leading-[120%] tracking-[-0.065rem] text-[#5C321E] xsm:text-[1.25rem] xsm:font-semibold xsm:leading-[130%] xsm:tracking-[-0.025rem]'>
                  {profile?.position}
                </h2>
              </div>
              <p className='self-stretch text-[1.125rem] font-medium uppercase not-italic leading-[150%] text-[#5C321E] xsm:text-[0.75rem]'>
                {profile?.short_description}
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{__html: profile?.description}}
              className='flex flex-col items-start gap-[0.75rem] self-stretch text-[1rem] font-medium not-italic leading-[155%] text-[#333] xsm:gap-[0.625rem] xsm:text-[0.875rem] xsm:font-normal xsm:leading-[150%] xsm:tracking-[-0.00875rem]'
            ></div>
          </div>
          <div className='relative w-[28.125rem] shrink-0 xsm:w-[18.75rem]'>
            <Image
              src={profile?.avatar?.url}
              alt={profile?.avatar?.alt}
              width={profile?.avatar?.width}
              height={profile?.avatar?.height}
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
        <Image
          src='/imgs/detail-hr/banner/bg-personnel.webp'
          alt='Background Image Personnel'
          width={1440}
          height={676}
          className='absolute bottom-0 left-0 h-auto w-full xsm:hidden'
        />
        <Image
          src='/imgs/detail-hr/banner/bg-personnel-mb.webp'
          alt='Background Image Personnel'
          width={351}
          height={550}
          className='absolute bottom-0 left-0 hidden h-auto w-full xsm:block'
        />
      </div>
    </section>
  )
}
