'use client'
import IConSeeMore from '@/components/icon/IConSeeMore'
import ImageV2 from '@/components/image/ImageV2'
import {fetcher} from '@/lib/swr'
import FilterProgramme from '@/sections/immigration/programme/FilterPrograme'
import ItemProgramme from '@/sections/immigration/programme/ItemProgramme'
import {
  SortOptionProgramme,
  dataPrograms,
  dataProgramsAcf,
} from '@/types/dataAcfImmigration.interface'
import endpoints from '@/utils/endpoints'
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useRef, useState} from 'react'
import useSWR from 'swr'
import './style.css'

const sortOptions = [
  {name: 'Tất cả', value: 'all'},
  {name: 'Từ Z-A', value: 'desc'},
  {name: 'Từ A-Z', value: 'asc'},
  {name: 'Thời gian xét duyệt nhanh nhất', value: 'fastest'},
  {name: 'Thời gian xét duyệt chậm nhất', value: 'slowest'},
]

export default function Programme({
  dataPrograms,
  slug,
}: {
  dataPrograms: dataPrograms
  slug: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const paramNew = new URLSearchParams(searchParams?.toString() || '')
  const slugPage = searchParams ? Number(searchParams.get('page')) : 1
  const slugOrder = searchParams ? searchParams.get('order') : ''
  const [listPrograms, setListPrograms] = useState<dataPrograms>()
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    setListPrograms(dataPrograms)
  }, [])
  const query = useMemo(() => {
    if (!searchParams?.size) return null
    return `${endpoints.settlementPrograms}?page=${slugPage === 0 ? 1 : slugPage}&per_page=8${slugOrder ? `&order=${slugOrder}` : ''}${search ? `&search=${search}` : ''}`
  }, [searchParams, slugPage, slugOrder, search])
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
  }, [posts])
  useEffect(() => {
    if (slugOrder) {
      const sortOption = sortOptions.find(
        (option) => option.value === slugOrder,
      )
      setSelectedSortOption(sortOption ?? sortOptions[0])
    }
  }, [])
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
          src={'/imgs/immigration/programme/d-bg-programmeV2.webp'}
        />
      </div>
      <div className='relative z-10 flex section-container sm:items-start sm:space-x-[6.19rem] xsm:w-full xsm:flex-col xsm:px-0'>
        <div className='sticky w-[23.9375rem] space-y-[2.5rem] sm:top-[7.75rem] sm:pb-[6.5rem] xsm:top-[1rem] xsm:z-10 xsm:w-full xsm:space-y-[1rem] xsm:bg-background xsm:px-[1rem] xsm:pb-[1rem]'>
          <h2 className='font-optima font-semibold text-orangetext-900 heading1 sm:capitalize'>
            Các chương trình định cư{' '}
            <span className='font-optima font-semibold capitalize text-orangetext-900 heading1'>
              {slug}
            </span>
          </h2>
          <FilterProgramme
            sectionRef={sectionRef}
            sortOptions={sortOptions}
            search={search}
            setSearch={setSearch}
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
          />
        </div>
        <div className='flex flex-1 flex-col items-center pb-[9.5rem] xsm:mt-[1rem] xsm:w-full xsm:px-[1rem] xsm:pb-[2.5rem]'>
          <div className='grid w-full grid-cols-2 gap-[1.5rem] pb-[12.59rem] xsm:grid-cols-1 xsm:pb-[2rem]'>
            {listPrograms?.data?.map((e: dataProgramsAcf, index: number) => (
              <ItemProgramme
                key={index}
                className='sm:even:translate-y-[7.5rem]'
                dataPostProgramme={e}
                slug={slug}
              />
            ))}
          </div>
          {listPrograms?.pagination?.current_page !==
            listPrograms?.pagination?.total_pages && (
            <div
              onClick={() => {
                paramNew.set(
                  'page',
                  String(Number(listPrograms?.pagination?.current_page) + 1),
                )
                router.push(`?${paramNew.toString()}`, {
                  scroll: false,
                })
              }}
              className='flex cursor-pointer items-center space-x-[1.12rem]'
            >
              <IConSeeMore className='up-down size-[1.375rem] object-contain' />
              <p className='text-brown body-14'>XEM THÊM</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
