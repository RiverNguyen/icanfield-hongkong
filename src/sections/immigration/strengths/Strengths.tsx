'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import IConLine from '@/sections/immigration/strengths/IConLine'
import {dataStrength} from '@/types/dataAcfImmigration.interface'
import {Fragment, useState} from 'react'

export default function Strengths({
  dataStrength,
}: {
  dataStrength: dataStrength[]
}) {
  const isMobile = useIsMobile()
  const [indexActive, setIndexActive] = useState<number>(0)
  const handleMouseEnter = (index: number) => {
    setIndexActive(index)
  }
  return (
    <section className='relative z-10 h-[100vh] w-full xsm:h-auto xsm:py-[1.5rem]'>
      {isMobile ? (
        <div className='scrollbar-hidden w-full overflow-hidden overflow-x-auto sm:hidden'>
          <div className='flex w-max items-center space-x-[1rem] p-[1rem]'>
            {dataStrength &&
              dataStrength?.map((e: dataStrength, index: number) => (
                <div
                  key={index}
                  className='relative flex h-[22rem] w-[19.375rem] flex-col justify-end rounded-[1rem] shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.10)]'
                >
                  <div className='absolute left-0 top-[2.93rem] z-[9] h-[6.4375rem] w-full bg-[linear-gradient(180deg,rgba(100,54,32,0.00)_0%,rgba(100,54,32,0.06)_14.15%,rgba(100,54,32,0.16)_27.89%,rgba(100,54,32,0.32)_42.08%,#643620_74.88%)]'></div>
                  <ImageV2
                    className='absolute left-0 top-0 h-[9.54219rem] w-full rounded-[1rem] object-cover'
                    alt={e?.bacground?.alt}
                    width={310}
                    height={152}
                    src={e?.bacground?.url}
                  />
                  <div className='relative z-10 min-h-[14.625rem] overflow-hidden rounded-[1rem] bg-[linear-gradient(0deg,#5C321E_0%,#95502F_100%)] p-[1.25rem]'>
                    <ImageV2
                      className='size-[2.5rem] object-contain'
                      alt={e?.icon?.alt}
                      width={40}
                      height={40}
                      src={e?.icon?.url}
                    />
                    <p className='mb-[0.5rem] mt-[1.25rem] text-white body-14-b'>
                      {e?.title}
                    </p>
                    <p
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#ad6903 transparent',
                      }}
                      className='pb-[2rem] font-normal text-[rgba(255,255,255,0.85)] body-14 xsm:block xsm:!h-[7rem] xsm:overflow-y-auto'
                    >
                      {e?.describe || e?.label}
                    </p>
                    <div className='pointer-events-none absolute bottom-0 left-0 z-[1] h-[5rem] w-full bg-[linear-gradient(0deg,rgba(92,50,30,1)_0%,rgba(92,50,30,0)100%)]'></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className='relative size-full xsm:hidden'>
            <div className='pointer-events-none absolute left-0 top-0 z-10 h-[15rem] w-full bg-[linear-gradient(180deg,rgba(246,246,244,1)_30%,rgba(255,255,255,0)_100%)]'></div>
            {dataStrength &&
              dataStrength?.map((e: dataStrength, index: number) => (
                <ImageV2
                  key={index}
                  className={cn(
                    'absolute size-full object-cover opacity-0 transition-all duration-500',
                    indexActive === index && 'opacity-100',
                  )}
                  width={2600}
                  height={1860}
                  alt={e?.bacground?.alt}
                  src={e?.bacground?.url}
                />
              ))}
          </div>
          <div className='absolute inset-0 z-10 size-full pl-[5rem] pt-[5rem] xsm:hidden'>
            <IConLine className='ml-[-5rem] w-[59.75rem]' />
            <div className='relative mt-[1.62rem] w-[59.75rem]'>
              {dataStrength &&
                dataStrength?.map((e: dataStrength, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      'absolute flex w-full items-center justify-between transition-all duration-500',
                      indexActive === index ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    <div className='space-y-[0.31rem]'>
                      <h2 className='background_clip--text bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] font-optima text-[2.625rem] font-medium uppercase leading-[1.2] tracking-[-0.0525rem]'>
                        {e?.title}
                      </h2>
                      <p className='text-[1.25rem] font-normal leading-[1.2] tracking-[-0.0375rem] text-[rgba(18,18,18,0.87)]'>
                        {e?.label}
                      </p>
                    </div>
                    <p className='pc-13se w-[21.375rem] uppercase'>
                      {e?.describe}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className='absolute bottom-0 z-10 h-[18.75rem] w-full xsm:hidden'>
            <div className='size-full bg-[linear-gradient(180deg,rgba(100,54,32,0.00)_0%,rgba(100,54,32,0.06)_14.15%,rgba(100,54,32,0.16)_27.89%,rgba(100,54,32,0.32)_42.08%,#643620_74.88%)]'></div>
            <div className='absolute bottom-0 flex h-[8.6875rem] w-full items-end'>
              {dataStrength &&
                dataStrength?.map((e: dataStrength, index: number) => (
                  <Fragment key={index}>
                    <div
                      onMouseEnter={() => handleMouseEnter(index)}
                      className={cn(
                        'flex-1 cursor-pointer space-y-[0.625rem] rounded-[1rem_1rem_0rem_0rem] pl-[2.5rem] pt-[1.38rem] transition-all duration-500',
                        indexActive === index
                          ? 'h-[10.25rem] bg-[linear-gradient(359deg,#FFE2CC_-11.71%,rgba(255,226,204,0.00)_38.57%),linear-gradient(192deg,#95502F_13.11%,#D79D61_108.7%,#F5C178_165.57%,#F5C178_230.98%)] [&>p]:opacity-100'
                          : 'h-[8.6875rem] bg-[linear-gradient(0deg,#5C321E_0%,#95502F_100%)] [&>p]:opacity-[0.7]',
                      )}
                    >
                      <ImageV2
                        className='size-[2.5rem]'
                        width={38}
                        height={34}
                        alt={e?.icon?.alt}
                        src={e?.icon?.url}
                      />
                      <p className='text-[0.75rem] font-bold uppercase text-white'>
                        {e?.title}
                      </p>
                    </div>
                    <div className='h-[8.6875rem] w-[0.1875rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_6.89%,#FFF_47.4%,#5F331F_100%)] opacity-[0.7] last:hidden'></div>
                  </Fragment>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
