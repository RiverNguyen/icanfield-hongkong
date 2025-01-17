'use client'
import ImageV2 from '@/components/image/ImageV2'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {IDataAcfDetailEB5} from '@/types/dataAcfDetailEB5.interface'
import {useState} from 'react'

export type ProjectInvestorDeveloperProps = {
  title: string
  description: string
  investor: {
    title: string
    description: string[]
    image: string
    logo: string
    achievements: {
      name: string
      value: string
    }[]
  }
  developer: {
    title: string
    description: string[]
    image: string
    logos: string[]
  }
}

const ProjectInvestorDeveloper = ({
  title_section,
  description,
  investor,
  development,
}: IDataAcfDetailEB5['acf']['eb5_projects_detail_quality']) => {
  const [tab, setTab] = useState<'investor' | 'developer'>('investor')

  return (
    <div className='relative flex h-[50rem] w-full items-end p-20 xsm:h-auto xsm:flex-col xsm:items-start xsm:p-0 xsm:mt-[2.5rem]'>
      <ImageV2
        src='/imgs/detail-eb5/bg-project-investor-developer.webp'
        alt='Investor'
        className='absolute inset-0 h-full w-full rounded-t-[2rem] object-cover xsm:bottom-auto xsm:h-[29.875rem]'
        width={1920}
        height={1080}
      />
      <div className='absolute inset-0 rounded-t-[2rem] bg-black/30' />
      <div className='absolute left-20 top-[4.02rem] z-10 w-[38.8125rem] px-4 py-8 xsm:static xsm:w-full'>
        <h2
          className='font-optima font-semibold text-greyscaletext-50 heading1'
          dangerouslySetInnerHTML={{__html: title_section}}
        ></h2>
        <p className='mt-[0.625rem] text-white body16 xsm:body-14'>
          {description}
        </p>
      </div>
      <div className='z-10 flex w-full items-end space-x-6 xsm:flex-col-reverse xsm:space-x-0'>
        <div className='h-[23.75rem w-full flex-1 rounded-3xl border border-white/10 bg-[linear-gradient(95deg,rgba(124,62,33,0.50)_-4.54%,rgba(245,193,120,0.50)_95.42%)] bg-origin-border p-6 backdrop-blur-[25px] xsm:rounded-none xsm:border-none xsm:p-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-white xsm:h-[3.367rem] xsm:w-[3.367rem]'>
              <ImageV2
                alt='icon'
                src='/icons/detail-eb5/check-v2.svg'
                width={24}
                height={24}
                className='h-[1.61388rem] w-[1.61388rem]'
              />
            </div>
            {tab === 'investor' ? (
              <div>
                <h3 className='font-semibold text-white sub-24S xsm:body16-s'>
                  {investor.name}
                </h3>
                <p className='mt-1 font-medium text-white/85 body-14 xsm:sub-12-m'>
                  Chủ đầu tư dự án
                </p>
              </div>
            ) : (
              <h3 className='font-semibold uppercase text-white sub-24S xsm:body16-s'>
                Các đơn vị <br />
                phát triển dự án
              </h3>
            )}
          </div>
          <div className='mt-6 xsm:mt-4'>
            {tab === 'investor' ? (
              <>
                <div className='h-[6.625rem] w-full rounded-2xl bg-white/15 p-6 flex-center'>
                  <ImageV2
                    src={investor.logo.url}
                    alt={investor.logo.alt}
                    width={400}
                    height={300}
                    className='h-10 w-auto xsm:h-[1.7rem]'
                  />
                </div>
                <div className='mt-4 grid grid-cols-3 gap-4'>
                  {investor.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className='flex flex-col justify-center space-y-[0.375rem] rounded-xl bg-white/15 px-4 py-3 xsm:p-3'
                    >
                      <h4 className='text-white hero-title xsm:heading1'>
                        {achievement.value}
                      </h4>
                      <div className='h-[1px] w-full bg-white/20' />
                      <p className='font-normal text-white text-[1rem] leading-[1.5] xsm:body-14 xsm:font-normal'>
                        {achievement.name}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='grid grid-cols-2 gap-4'>
                {development.logos.map((logo, index) => (
                  <div
                    key={index}
                    className='h-[7.125rem] w-full rounded-xl bg-white/15 p-[1.3125rem] flex-center xsm:h-[5.75rem]'
                  >
                    <ImageV2
                      src={logo.url}
                      alt={logo.alt}
                      width={400}
                      height={300}
                      className='h-full w-auto'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='h-[33.3125rem] flex-1 rounded-3xl bg-orangetext-50 xsm:rounded-b-none'>
          <Tabs
            onValueChange={(value) => setTab(value as 'investor' | 'developer')}
            value={tab}
            className='flex h-full flex-col'
          >
            <TabsList className='grid h-auto w-full grid-cols-2 p-3 xsm:p-2'>
              <TabsTrigger
                className='heading3-s data-[state=active]:shadow-SHADOW rounded-2xl py-5 font-semibold text-[#12121261] flex-center data-[state=active]:bg-white data-[state=active]:text-Phase-1-Brown xsm:py-4 xsm:text-sm xsm:leading-[1.4] xsm:tracking-[-0.0175rem]'
                value='investor'
              >
                Chủ đầu tư dự án
              </TabsTrigger>
              <TabsTrigger
                className='heading3-s data-[state=active]:shadow-SHADOW rounded-2xl py-5 font-semibold text-[#12121261] flex-center data-[state=active]:bg-white data-[state=active]:text-Phase-1-Brown xsm:py-4 xsm:text-sm xsm:leading-[1.4] xsm:tracking-[-0.0175rem]'
                value='developer'
              >
                Đơn vị phát triển dự án
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className='mt-0'
              value='investor'
            >
              <div className='flex h-[28rem] items-start space-x-6 rounded-2xl rounded-b-3xl bg-white p-6 shadow-[0px_-1px_6.3px_0px_rgba(0,0,0,0.04)] xsm:h-auto xsm:flex-col xsm:space-x-0 xsm:space-y-4 xsm:rounded-b-none xsm:p-4'>
                <div className='flex flex-col space-y-4'>
                  <h2 className='font-optima font-medium uppercase text-Phase-1-Brown heading3 xsm:text-[1.125rem] xsm:leading-[1.2] xsm:tracking-[-0.0225rem]'>
                    Chủ đầu tư {investor.name}
                  </h2>
                  <div
                    className='flex flex-col space-y-2 text-greyscaletext-300 body-14'
                    dangerouslySetInnerHTML={{__html: investor.description}}
                  ></div>
                </div>
                <ImageV2
                  src={investor.thumbnail.url}
                  alt={investor.thumbnail.alt}
                  width={600}
                  height={600}
                  className='h-full w-[18.25rem] rounded-xl object-cover xsm:h-[14.29169rem] xsm:w-full'
                />
              </div>
            </TabsContent>
            <TabsContent
              className='mt-0'
              value='developer'
            >
              <div className='flex h-[28rem] items-start space-x-6 rounded-2xl rounded-b-3xl bg-white p-6 shadow-[0px_-1px_6.3px_0px_rgba(0,0,0,0.04)] xsm:h-auto xsm:flex-col xsm:space-x-0 xsm:space-y-4 xsm:rounded-b-none xsm:p-4'>
                <div className='flex flex-col space-y-4'>
                  <h2 className='font-optima font-medium uppercase text-Phase-1-Brown heading3 xsm:text-[1.125rem] xsm:leading-[1.2] xsm:tracking-[-0.0225rem]'>
                    CÁC ĐƠN VỊ PHÁT TRIỂN UY TÍN
                  </h2>
                  <div
                    className='flex flex-col space-y-2 text-greyscaletext-300 body-14'
                    dangerouslySetInnerHTML={{__html: investor.description}}
                  ></div>
                </div>
                <ImageV2
                  src={development.thumbnail.url}
                  alt={development.thumbnail.alt}
                  width={600}
                  height={600}
                  className='h-full w-[18.25rem] rounded-xl object-cover xsm:h-[14.29169rem] xsm:w-full'
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
export default ProjectInvestorDeveloper
