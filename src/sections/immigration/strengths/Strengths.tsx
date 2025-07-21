'use client'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import IConLine from '@/sections/immigration/strengths/IConLine'
import { dataStrength } from '@/types/dataAcfImmigration.interface'
import { Fragment, useState } from 'react'

export default function Strengths({
  dataStrength,
}: {
  dataStrength: dataStrength[];
}) {
  const isMobile = useIsMobile()
  const [indexActive, setIndexActive] = useState<number>(0)
  const handleMouseEnter = (index: number) => {
    setIndexActive(index)
  }
  console.log(dataStrength)
  return (
    <section className="relative z-10 h-[100vh] xsm:h-auto w-full xsm:py-[1.5rem]">
      {isMobile ? (
        <div className="w-full overflow-hidden overflow-x-auto sm:hidden scrollbar-hidden">
          <div className="flex p-[1rem] w-max items-center space-x-[1rem]">
            {dataStrength && dataStrength?.map((e: dataStrength, index: number) => (
              <div
                key={index}
                className="relative w-[19.375rem] h-[22rem] flex flex-col justify-end rounded-[1rem] shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.10)]"
              >
                <div className="absolute top-[2.93rem] left-0 z-[9] h-[6.4375rem] w-full bg-[linear-gradient(180deg,rgba(100,54,32,0.00)_0%,rgba(100,54,32,0.06)_14.15%,rgba(100,54,32,0.16)_27.89%,rgba(100,54,32,0.32)_42.08%,#643620_74.88%)]"></div>
                <ImageV2
                  className="absolute top-0 left-0 w-full h-[9.54219rem] object-cover rounded-[1rem]"
                  alt={e?.bacground?.alt}
                  width={310}
                  height={152}
                  src={e?.bacground?.url}
                />
                <div className="relative z-10 min-h-[14.625rem] p-[1.25rem] rounded-[1rem] bg-[linear-gradient(0deg,#5C321E_0%,#95502F_100%)]">
                  <ImageV2
                    className="size-[2.5rem] object-contain"
                    alt={e?.icon?.alt}
                    width={40}
                    height={40}
                    src={e?.icon?.url}
                  />
                  <p className="body-14-b text-white mt-[1.25rem] mb-[0.5rem]">
                    {e?.title}
                  </p>
                  <p className="body-14 font-normal text-[rgba(255,255,255,0.85)] line-clamp-5">
                    {e?.describe || e?.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
            <div className="size-full xsm:hidden relative">
              <div className='absolute top-0 left-0 w-full h-[15rem] bg-[linear-gradient(180deg,rgba(246,246,244,1)_30%,rgba(255,255,255,0)_100%)] z-10 pointer-events-none'></div>
            {dataStrength && dataStrength?.map((e: dataStrength, index: number) => (
              <ImageV2
                key={index}
                className={cn(
                  'size-full object-cover absolute transition-all duration-500 opacity-0',
                  indexActive === index && 'opacity-100'
                )}
                width={2600}
                height={1860}
                alt={e?.bacground?.alt}
                src={e?.bacground?.url}
              />
            ))}
          </div>
          <div className="xsm:hidden absolute size-full inset-0 z-10 pl-[5rem] pt-[5rem]">
            <IConLine className="w-[59.75rem] ml-[-5rem]" />
            <div className="relative w-[59.75rem] mt-[1.62rem]">
              {dataStrength && dataStrength?.map((e: dataStrength, index: number) => (
                <div
                  key={index}
                  className={cn(
                    'absolute w-full flex items-center justify-between transition-all duration-500',
                    indexActive === index ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <div className="space-y-[0.31rem]">
                    <h2 className="text-[2.625rem] font-medium leading-[1.2] tracking-[-0.0525rem] uppercase font-optima background_clip--text bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)]">
                      {e?.title}
                    </h2>
                    <p className="text-[rgba(18,18,18,0.87)] font-optima text-[1rem] font-medium leading-[1.2] tracking-[-0.0375rem]">
                      {e?.label}
                    </p>
                  </div>
                  <p className="w-[21.375rem] pc-13se uppercase">
                    {e?.describe}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="xsm:hidden absolute w-full h-[18.75rem] bottom-0 z-10">
            <div className="size-full bg-[linear-gradient(180deg,rgba(100,54,32,0.00)_0%,rgba(100,54,32,0.06)_14.15%,rgba(100,54,32,0.16)_27.89%,rgba(100,54,32,0.32)_42.08%,#643620_74.88%)]"></div>
            <div className="absolute bottom-0 w-full h-[8.6875rem] flex items-end">
              {dataStrength && dataStrength?.map((e: dataStrength, index: number) => (
                <Fragment key={index}>
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    className={cn(
                      'cursor-pointer pt-[1.38rem] pl-[2.5rem] space-y-[0.625rem] rounded-[1rem_1rem_0rem_0rem] flex-1 transition-all duration-500',
                      indexActive === index
                        ? '[&>p]:opacity-100 h-[10.25rem] bg-[linear-gradient(359deg,#FFE2CC_-11.71%,rgba(255,226,204,0.00)_38.57%),linear-gradient(192deg,#95502F_13.11%,#D79D61_108.7%,#F5C178_165.57%,#F5C178_230.98%)]'
                        : '[&>p]:opacity-[0.7] h-[8.6875rem] bg-[linear-gradient(0deg,#5C321E_0%,#95502F_100%)]'
                    )}
                  >
                    <ImageV2
                      className="size-[2.5rem] "
                      width={38}
                      height={34}
                      alt={e?.icon?.alt}
                      src={e?.icon?.url}
                    />
                    <p className="text-white text-[0.75rem] font-bold uppercase">
                      {e?.title}
                    </p>
                  </div>
                  <div className="last:hidden w-[0.1875rem] h-[8.6875rem] opacity-[0.7] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_6.89%,#FFF_47.4%,#5F331F_100%)]"></div>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
