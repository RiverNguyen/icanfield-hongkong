'use client'

import IConSeeMore from '@/components/icon/IConSeeMore'
import postData from '@/fetch/postData'
import useIsMobile from '@/hooks/useIsMobile'
import ICNext from '@/sections/document-appraisal/ICNext'
import ItemProgramme from '@/sections/immigration/programme/ItemProgramme'
import { dataProgramsAcf } from '@/types/dataAcfImmigration.interface'
import { dataPostFilter, valueFilterPost } from '@/types/dataAppraisal.interface'
import { useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'

export default function ProgramResult({
  dataPostFilter,
  valueFilter,
  setDataPostFilter,
}: {
  dataPostFilter?: dataPostFilter
  valueFilter?: valueFilterPost
  setDataPostFilter?: React.Dispatch<
    React.SetStateAction<dataPostFilter | null>
  >
}) {
  const isMobile = useIsMobile()
  const elemtRef = useRef<HTMLDivElement>(null)
  const [limitPage, setLimitPage] = useState<number>(9)
  if (!dataPostFilter) {
    return <div></div>
  }
  const handlePageClick = async (event: {selected: number}): Promise<void> => {
    const dataFilter = {
      ...valueFilter,
      page: event?.selected + 1,
    }
    const dataPost = await postData({
      api: '/settlementdocument',
      option: {
        revalidate: 10,
      },
      values: dataFilter,
    })
    if (setDataPostFilter) {
      setDataPostFilter(dataPost)
    }
    if (elemtRef?.current) {
      elemtRef?.current.scrollIntoView({behavior: 'smooth'})
    }
  }
  return (
    <div
      ref={elemtRef}
      className='mt-[3rem] section-container xsm:mb-[1rem]'
    >
      <h3 className='mb-[2.12rem] w-full text-center text-brown heading2'>
        Kết quả chương trình của bạn
      </h3>
      <div className='grid grid-cols-3 gap-[1.5rem] xsm:grid-cols-1'>
        {dataPostFilter?.posts?.map((e: dataProgramsAcf, index: number) => (
          <ItemProgramme
            key={index}
            slug={e?.nation?.[0]}
            dataPostProgramme={e}
          />
        ))}
      </div>
      {!isMobile &&
        dataPostFilter?.pagination?.currentPage <
          dataPostFilter?.pagination?.totalPages && (
          <div
            onClick={async () => {
              const dataFilter = {
                ...valueFilter,
                perPage: limitPage + 9,
              }
              const dataPost = await postData({
                api: '/settlementdocument',
                option: {
                  revalidate: 10,
                },
                values: dataFilter,
              })
              setLimitPage(limitPage + 9)
              if (setDataPostFilter) {
                setDataPostFilter(dataPost)
              }
            }}
            className='mt-[2rem] flex w-full cursor-pointer items-center justify-center space-x-[1.12rem]'
          >
            <IConSeeMore className='up-down size-[1.375rem] object-contain' />
            <p className='text-brown body-14'>XEM THÊM</p>
          </div>
        )}
      {isMobile &&
        dataPostFilter?.pagination?.currentPage <
          dataPostFilter?.pagination?.totalPages && (
          <ReactPaginate
            previousLabel={<ICNext className='' />}
            nextLabel={<ICNext className='rotate-[180deg]' />}
            pageCount={dataPostFilter?.pagination?.totalPages}
            onPageChange={handlePageClick}
            containerClassName={
              'flex mt-[1.5rem] w-full space-x-[1rem] items-center justify-center [&_.previous_a]:border-0 [&_.next_a]:border-0 [&_li_a]:flex-center [&_li_a]:size-[2rem] [&_li_a]:rounded-[0.75rem] [&_li_a]:border-[0.64px] [&_li_a]:border-solid [&_li_a]:border-[#EBEBEB] [&_li_a]:bg-white [&_li_a]:text-[0.7rem] [&_li_a]:text-[#3F2214] [&_li_a]:font-bold'
            }
            activeClassName={
              '[&_a]:!bg-[#3F2214] [&_a]:!border-[0.8px] [&_a]:!border-solid [&_a]:!border-[#CFCECE] [&_a]:text-[0.7rem] [&_a]:!text-white [&_a]:font-bold'
            }
          />
        )}
    </div>
  )
}
