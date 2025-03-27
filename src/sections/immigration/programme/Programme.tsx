'use client'
import IConSeeMore from '@/components/icon/IConSeeMore'
import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {fetcher} from '@/lib/swr'
import {cn} from '@/lib/utils'
import {ICLoading} from '@/sections/blogs/connect-us/FormConnectUs'
import ICNext from '@/sections/document-appraisal/ICNext'
import FilterProgramme from '@/sections/immigration/programme/FilterPrograme'
import ItemProgramme from '@/sections/immigration/programme/ItemProgramme'
import {
  SortOptionProgramme,
  dataPrograms,
  dataProgramsAcf,
} from '@/types/dataAcfImmigration.interface'
import endpoints from '@/utils/endpoints'
import {useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useRef, useState, useTransition} from 'react'
import ReactPaginate from 'react-paginate'
import useSWR from 'swr'
import './style.css'

const sortOptions = [
  {name: 'Tất cả', value: 'all'},
  {name: 'Từ Z-A', value: 'desc'},
  {name: 'Từ A-Z', value: 'asc'},
  {name: 'Thời gian xét duyệt nhanh nhất', value: 'fastest'},
  {name: 'Thời gian xét duyệt chậm nhất', value: 'slowest'},
  {name: 'Mức ngân sách cao nhất', value: 'high-investment'},
  {name: 'Mức ngân sách thấp nhất', value: 'low-investment'},
]

export default function Programme({
  name,
  dataPrograms,
  slug,
  imgBg,
}: {
  name?: string
  dataPrograms: dataPrograms
  slug: string
  imgBg?: string
}) {
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const sectionRef = useRef<HTMLElement>(null)
  const slugPage = searchParams ? Number(searchParams.get('page')) : 1
  const slugOrder = searchParams ? searchParams.get('order') : ''
  const [listPrograms, setListPrograms] = useState<dataPrograms>()
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [isPending, setTransition] = useTransition()
  useEffect(() => {
    setListPrograms(dataPrograms)
  }, []) //eslint-disable-line
  const query = useMemo(() => {
    if (!searchParams?.size)
      return (
        endpoints.settlementPrograms +
        '?page=1&per_page=8&' +
        endpoints.taxonomiesSettlement +
        '=' +
        slug
      )
    return `${endpoints.settlementPrograms}?page=${slugPage === 0 ? 1 : slugPage}&per_page=8${slugOrder ? `&order=${slugOrder}` : ''}${search ? `&search=${search}` : ''}&${endpoints.taxonomiesSettlement}=${slug}`
  }, [searchParams, slugPage, slugOrder, search]) //eslint-disable-line
  const {data: posts} = useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionProgramme>(sortOptions[0])
  useEffect(() => {
    if (posts && slugPage && slugPage > 1) {
      const value = {
        success: posts?.success,
        pagination: {
          current_page: posts?.pagination?.current_page,
          per_page: posts?.pagination?.per_page,
          total_posts: posts?.pagination?.total_posts,
          total_pages: posts?.pagination?.total_pages,
        },
        data: [
          ...(listPrograms?.data || []), // Toàn bộ dữ liệu từ listPrograms?.data
          ...(posts?.data || []),
        ],
      }
      setListPrograms(value)
    } else if (posts) {
      setListPrograms(posts)
    }
  }, [posts]) //eslint-disable-line
  useEffect(() => {
    if (slugOrder) {
      const sortOption = sortOptions.find(
        (option) => option.value === slugOrder,
      )
      setSelectedSortOption(sortOption ?? sortOptions[0])
    }
  }, []) //eslint-disable-line
  useEffect(() => {
    if (page > 1) {
      setTransition(async () => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API!}${process.env.NEXT_PUBLIC_API_VERSION!}${endpoints.settlementPrograms}?page=${page}&per_page=8${slugOrder ? `&order=${slugOrder}` : ''}${search ? `&search=${search}` : ''}`,
            )
            const data = await response.json()
            if (data?.success) {
              const value = {
                success: data?.success,
                pagination: {
                  current_page: data?.pagination?.current_page,
                  per_page: data?.pagination?.per_page,
                  total_posts: data?.pagination?.total_posts,
                  total_pages: data?.pagination?.total_pages,
                },
                data: [...(listPrograms?.data || []), ...(data?.data || [])],
              }
              setListPrograms(value)
            }
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
        fetchData()
      })
    }
  }, [page]) //eslint-disable-line
  // console.log(posts);
  return (
    <section
      ref={sectionRef}
      className='relative mt-[5rem] w-full sm:pt-[7.75rem] xsm:mt-[3rem]'
    >
      <div className='w-full sm:sticky sm:top-[100vh] xsm:relative'>
        <ImageV2
          className='absolute left-0 h-[100vh] w-full sm:top-[-100vh] xsm:top-0 xsm:hidden'
          width={1600}
          height={788}
          alt=''
          src={imgBg || '/imgs/immigration/programme/d-bg-programmeV2.webp'}
        />
        <div className='absolute left-0 top-0 h-[30vh] w-full bg-[linear-gradient(176deg,rgba(246,246,244,1)_49%,_rgba(255,255,255,0)_73%)] sm:top-[-100vh] xsm:top-0 xsm:hidden'></div>
      </div>
      <div className='relative z-10 flex section-container sm:items-start sm:space-x-[6.19rem] xsm:w-full xsm:flex-col xsm:px-0'>
        <div className='sticky w-[23.9375rem] space-y-[2.5rem] sm:top-[7.75rem] sm:pb-[6.5rem] xsm:top-[1rem] xsm:z-10 xsm:w-full xsm:space-y-[1rem] xsm:bg-background xsm:px-[1rem] xsm:pb-[1rem]'>
          <h2 className='font-optima font-semibold text-orangetext-900 heading1 sm:capitalize'>
            Các chương trình định cư{' '}
            <span className='font-optima font-semibold capitalize text-orangetext-900 heading1'>
              {name}
            </span>
          </h2>
          <FilterProgramme
            sectionRef={sectionRef}
            sortOptions={sortOptions}
            search={search}
            setSearch={setSearch}
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
            setPage={setPage}
            page={page}
          />
        </div>
        <div className='flex flex-1 flex-col items-center pb-[9.5rem] xsm:mt-[1rem] xsm:w-full xsm:px-[1rem] xsm:pb-[2.5rem]'>
          <div className='grid w-full grid-cols-2 gap-[1.5rem] pb-[12.59rem] xsm:grid-cols-1 xsm:pb-[0rem]'>
            {listPrograms?.data?.map((e: dataProgramsAcf, index: number) => (
              <ItemProgramme
                key={index}
                className='sm:even:translate-y-[7.5rem]'
                dataPostProgramme={e}
                slug={slug}
              />
            ))}
          </div>
          {!isMobile &&
            listPrograms?.pagination?.current_page !==
              listPrograms?.pagination?.total_pages && (
              <div
                onClick={() => {
                  setPage(page + 1)
                }}
                className={cn(
                  'flex cursor-pointer items-center space-x-[1.12rem]',
                  isPending && 'pointer-events-none',
                )}
              >
                {isPending ? (
                  <ICLoading className='text-brown' />
                ) : (
                  <>
                    <IConSeeMore className='up-down size-[1.375rem] object-contain' />
                    <p className='text-brown body-14'>XEM THÊM</p>
                  </>
                )}
              </div>
            )}
          {isMobile &&
            listPrograms?.pagination?.current_page !==
              listPrograms?.pagination?.total_pages && (
              <ReactPaginate
                previousLabel={<ICNext className='' />}
                nextLabel={<ICNext className='rotate-[180deg]' />}
                pageCount={listPrograms?.pagination?.total_pages || 1}
                onPageChange={() => {
                  setPage(page + 1)
                }}
                containerClassName={
                  'flex mt-[1.5rem] w-full space-x-[1rem] items-center justify-center [&_.previous_a]:border-0 [&_.next_a]:border-0 [&_li_a]:flex-center [&_li_a]:size-[2rem] [&_li_a]:rounded-[0.75rem] [&_li_a]:border-[0.64px] [&_li_a]:border-solid [&_li_a]:border-[#EBEBEB] [&_li_a]:bg-white [&_li_a]:text-[0.7rem] [&_li_a]:text-[#3F2214] [&_li_a]:font-bold'
                }
                activeClassName={
                  '[&_a]:!bg-[#3F2214] [&_a]:!border-[0.8px] [&_a]:!border-solid [&_a]:!border-[#CFCECE] [&_a]:text-[0.7rem] [&_a]:!text-white [&_a]:font-bold'
                }
              />
            )}
        </div>
      </div>
    </section>
  )
}
