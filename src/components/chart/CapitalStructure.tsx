'use client'

import { ComponentChart } from '@/components/chart/ComponentChart'
import { initChart } from '@/components/chart/constant'
import useInterView from '@/hooks/useInterView'
import { IDataAcfDetailEB5 } from '@/types/dataAcfDetailEB5.interface'
import { Fragment } from 'react'

export default function CapitalStructure({
  dataCapitalStructure,
}: {
  dataCapitalStructure: IDataAcfDetailEB5['acf']['eb5_projects_detail_capital']
}) {
  const {isVisible, elementRef} = useInterView({threshold: 0.1})

  const dataChart = [
    dataCapitalStructure.investors_capital,
    dataCapitalStructure.capital_from_senior_loans,
    dataCapitalStructure['eb-5_loan_capital'],
  ]
  return (
    <section className='section-container sm:py-[3.62rem] xsm:mt-[4rem] xsm:mb-[3.5rem]'>
      <h2 className='text-brown heading1 sm:mb-[2.5rem] xsm:mb-[1rem] font-optima xsm:font-semibold'>
        {dataCapitalStructure.title_section}
      </h2>
      <div
        ref={elementRef}
        className='relative w-[68.3125rem] rounded-[1.5rem] sm:bg-[linear-gradient(90deg,#FFF_57.87%,rgba(255,255,255,0.00)_90.37%)] sm:p-[4.5rem_5rem] xsm:flex xsm:w-full xsm:flex-col-reverse xsm:items-center'
      >
        <div className='xsm:mt-[3.5rem] xsm:w-full xsm:rounded-[1rem] xsm:bg-white xsm:p-[1rem]'>
          <p className='xsm:title18M mb-[2rem] font-optima text-[#254432] heading3 xsm:mb-[1rem] xsm:text-[1.125rem]'>
            Tổng nguồn vốn: {dataCapitalStructure?.total_capital} triệu USD, bao
            gồm:
          </p>
          <div className='w-[40rem] rounded-[1rem] bg-background p-[1.5rem] xsm:w-full xsm:rounded-[0.75rem] xsm:p-[1rem]'>
            {Array.isArray(dataChart) &&
              dataChart?.map(
                (
                  e: {
                    convert_percent: string
                    title: string
                  },
                  index: number,
                ) => (
                  <Fragment key={index}>
                    <div className='flex sm:items-end sm:space-x-[1rem] xsm:flex-col xsm:space-y-[0.62rem]'>
                      <div className='flex w-[18.75rem] items-center space-x-[0.75rem] xsm:w-full'>
                        <div
                          style={{background: initChart[index].fill}}
                          className='rounded-[0.5rem] p-[0.75rem_1.25rem] flex-center xsm:p-[0.5rem_0.75rem]'
                        >
                          <p className='tracking-[-0.0125rem] text-white sub-28B xsm:text-[1.25rem]'>
                            {e.convert_percent + '%'}
                          </p>
                        </div>
                        <div className='flex-1'>
                          <p className='text-[#333] body-14 xsm:sub-12'>
                            {initChart[index].title}
                          </p>
                          <p className='sub-20B xsm:body16-b text-brown font-bold '>
                            {e?.title}
                          </p>
                        </div>
                      </div>
                      <div className='relative h-[0.5rem] rounded-[0.375rem] bg-[rgba(0,0,0,0.10)] sm:flex-1 xsm:h-[0.25rem] xsm:w-full'>
                        <div
                          style={{
                            width: `${(isVisible ? Number(e.convert_percent) : 1).toFixed(0)}%`,
                            background: initChart[index].fill,
                          }}
                          className='duration-2000 absolute left-0 top-0 z-10 h-full rounded-[0.375rem] transition-all'
                        ></div>
                      </div>
                    </div>
                    <div className='my-[1.25rem] h-[1px] w-full bg-[rgba(0,0,0,0.10)] last:hidden xsm:my-[1rem]'></div>
                  </Fragment>
                ),
              )}
          </div>
        </div>
        <div className='sm:absolute sm:right-[-24.69rem] sm:top-[50%] sm:translate-y-[-50%] xsm:w-full'>
          <ComponentChart
            isInterView={isVisible}
            dataCapitalSource={dataChart}
          />
        </div>
      </div>
    </section>
  )
}
