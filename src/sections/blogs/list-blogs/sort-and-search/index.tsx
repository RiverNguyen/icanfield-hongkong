/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ImageV2 from '@/components/image/ImageV2'
import {Input} from '@/components/ui/input'
import useClickOutside from '@/hooks/useClickOutSide'
import {cn} from '@/lib/utils'
import {SortOption} from '@/types/blogs.interface'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {useDebounceCallback} from 'usehooks-ts'

const IndexSortAndSearchPosts = ({
  sortOptions,
  setSelectedSortOption,
  setSearch,
  selectedSortOption,
  search,
  className,
  placeholder = 'Tìm kiếm trong danh sách',
  backgroundInput = 'bg-[#F3F3F3]',
}: {
  sortOptions: SortOption[]
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOption>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
  selectedSortOption: SortOption
  search: string
  className?: string
  placeholder?: string
  backgroundInput?: string
}) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const debounced = useDebounceCallback(setSearch, 500)

  const [isOpenSelectCategory, setIsOpenSelectCategory] =
    useState<boolean>(false)

  // hook
  const {ref, isOutside} = useClickOutside<HTMLDivElement>()

  useEffect(() => {
    if (searchParams?.get('sort')) {
      const sortOption = sortOptions.find(
        (option) => option.value === searchParams.get('sort'),
      )
      setSelectedSortOption(sortOption ?? sortOptions[0])
    }
    if (searchParams?.get('search')) {
      setSearch(searchParams.get('search') ?? '')
    }
  }, [searchParams])

  useEffect(() => {
    if (isOutside) {
      setIsOpenSelectCategory(false)
    }
  }, [isOutside])

  useEffect(() => {
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (search) {
      paramNew.set('search', search)
    } else {
      paramNew.delete('search')
    }
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
  }, [search])

  //handle select sort option
  const handleSelectSortOption = (sortOption: SortOption) => {
    setSelectedSortOption(sortOption)
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (sortOption.value === 'all') {
      paramNew.delete('sort')
      paramNew.delete('orderby')
    } else {
      paramNew.set('sort', sortOption.value)
      paramNew.set('orderby', sortOption.orderBy)
    }
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
  }

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value)
  }

  return (
    <div
      className={`${className ? className : 'flex items-center justify-between sm:space-x-[1rem]'} `}
    >
      <div
        ref={ref}
        className='relative sm:min-w-[16.9375rem] xsm:order-2 xsm:w-[calc((100%-1.25rem)/2)]'
      >
        <button
          onClick={() => setIsOpenSelectCategory(!isOpenSelectCategory)}
          className={`flex h-[3rem] w-full items-center justify-between rounded-[0.5rem] ${backgroundInput} px-[0.75rem] sm:px-4`}
        >
          <span className='flex items-center whitespace-nowrap text-[1rem] font-normal leading-[1.5] tracking-[-0.02rem] text-greyscaletext-body xsm:line-clamp-1 xsm:text-[0.75rem] xsm:text-[#3F2214]'>
            <b className='whitespace-nowrap font-medium sm:font-bold'>
              Lọc theo:{' '}
            </b>
            {selectedSortOption?.name}
          </span>
          <ImageV2
            className='size-[1.5rem]'
            src={'/icons/blogs/down.svg'}
            alt='arrow down'
            width={40}
            height={40}
          />
        </button>
        <div
          className={cn(
            'pointer-events-none absolute left-0 top-[110%] mt-[0.5rem] flex h-fit w-full flex-col space-y-[0.5rem] rounded-[0.5rem] bg-white p-[0.5rem] opacity-0 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:order-1 xsm:space-y-[0.3rem]',
            isOpenSelectCategory && 'pointer-events-auto opacity-100',
          )}
        >
          {Array.isArray(sortOptions) &&
            sortOptions.map((sortOption: SortOption, index: number) => (
              <button
                key={index}
                className={`h-[3rem] rounded-[0.3rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-orangetext-500 hover:bg-greyscaletext-200/20 xsm:h-[2.625rem] xsm:text-[0.875rem] ${sortOption.value === selectedSortOption.value ? 'bg-greyscaletext-200/20' : ''}`}
                onClick={() => {
                  handleSelectSortOption(sortOption)
                  setIsOpenSelectCategory(false)
                }}
              >
                {sortOption?.name}
              </button>
            ))}
        </div>
      </div>
      <div className='] relative h-[3rem] sm:w-[16.9375rem] xsm:h-auto xsm:w-[calc((100%-1.25rem)/2)]'>
        <ICSearch
          className={`absolute left-[1rem] top-1/2 size-[1.5rem] -translate-y-1/2 xsm:left-[0.5rem] xsm:size-[1.125rem] ${search ? '[&>path]:stroke-black' : ''}`}
        />
        <Input
          defaultValue={search}
          onChange={handleSearch}
          className={`body14 size-full rounded-[0.5rem] border-none ${backgroundInput} pl-[3rem] pr-[0.5rem] font-medium tracking-[-0.0175rem] placeholder:text-greyscaletext-200 xsm:pl-[1.88rem] xsm:text-[0.75rem] xsm:placeholder:text-[0.75rem]`}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default IndexSortAndSearchPosts
const ICSearch = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
        stroke='#A1A1A1'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
