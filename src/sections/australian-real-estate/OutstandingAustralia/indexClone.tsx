/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ItemAustralia from '@/components/itemAustralia'
import { IItemAustralia } from '@/components/itemAustralia/itemAustralia.interface'
import SkeletonItemBlog from '@/components/itemBlog/SkeletonItemBlog'
import { Pagination } from '@/components/pagination/Pagination'
import { fetcher } from '@/lib/swr'
// import {LIMIT_POSTS} from '@/sections/blogs/constant'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
// import IndexTabs from '@/sections/blogs/list-blogs/tab'
import { SortOption } from '@/types/blogs.interface'
// import endpoints from '@/utils/endpoints'
import { useSearchParams } from 'next/navigation'
import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'
import { usePathname } from 'next/navigation'
export interface IOutstandingProjectEB5Props {
  listItems: {
    success: boolean
    total: number
    totalPages: number
    page: number
    limit: number
    data: IItemAustralia[]
  }
  categories: {
    id: number
    name: string
    slug: string
    taxonomy: string
  }[]
}

const OutstandingAustraliaClone: FC<IOutstandingProjectEB5Props> = ({listItems}) => {
  const sortOptions = [
    {name: 'Tất cả', value: 'all', orderBy: 'all'},
    {name: 'Mới nhất', value: 'DESC', orderBy: 'date'},
    {name: 'Cũ nhất', value: 'ASC', orderBy: 'date'},
    {name: 'A-Z', value: 'A-Z', orderBy: 'title'},
    {name: 'Z-A', value: 'Z-A', orderBy: 'title'},
  ]
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const [totalPage, setTotalPage] = useState<number>(listItems.totalPages || 1)
  const path = usePathname() // Lấy đường dẫn hiện tại (vd: "/tour-nuoc-ngoai")
  const segment = path?.split('/').filter(Boolean).pop() // Lấy phần cuối cùng sau "/"
  const currentPath = `${segment}` // Lấy đường dẫn hiện tại không bao gồm phần query string
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(
    sortOptions[0],
  )
  //   function handleGetTaxonomy(categorySlug: string) {
  //     return categories.find(
  //       (category: Category) => category.slug === categorySlug,
  //     )?.taxonomy
  //   }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const query = useMemo(() => {
    if (!searchParams?.size) return null

    let url = `/get-post-australia?page=${currentPage}&limit=9&taxonomies=${currentPath}`

    // Thêm tham số sort nếu có
    if (selectedSortOption.value !== 'all') {
      url += `&sort=${selectedSortOption.value}`
    }

    // Thêm tham số orderby nếu có
    if (selectedSortOption.orderBy !== 'date') {
      url += `&orderby=${selectedSortOption.orderBy}`
    }

    return url
  }, [selectedSortOption.value, selectedSortOption.orderBy, currentPage])

  const {data: posts, isLoading} = useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })
  useEffect(() => {
    if (posts && searchParams?.size) {
      setTotalPage(posts.totalPages)
    }
  }, [posts])
  const dataLatest = useMemo(() => {
    return Array.isArray(posts?.data) ? posts?.data : listItems.data
  }, [searchParams, posts, listItems.data])
  return (
    <section
      className='pt-[3.5rem]'
      ref={sectionRef}
    >
      <div className='section-container'>
        <div className='mb-[2.5rem] flex items-center justify-between xsm:mb-[1.5rem] xsm:flex-col xsm:items-start xsm:justify-start'>
          <h2 className='mb-4 font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown xsm:text-[1.5rem]'>
            Dự án bất động sản Úc
          </h2>
          <div className='list-blogs__filters relative z-20 mb-[2rem] flex sm:items-center sm:justify-between xsm:sticky xsm:top-[3.75rem] xsm:mb-[2.19rem] xsm:flex-col xsm:bg-background xsm:pb-1'>
            <IndexSortAndSearchPosts
              sortOptions={sortOptions}
              search={search}
              selectedSortOption={selectedSortOption}
              setSearch={setSearch}
              setSelectedSortOption={setSelectedSortOption}
              className='gap-x-3 sm:flex sm:flex-row-reverse xsm:flex'
              backgroundInput='bg-[#EEE]'
            />
          </div>
        </div>
        <div className='grid w-full grid-cols-3 gap-y-[4.5rem] sm:gap-x-[1.88rem] xsm:grid-cols-1 xsm:gap-y-[1.5rem]'>
          {isLoading ? (
            <>
              {Array(dataLatest?.length || 9)
                .fill(0)
                .map((item, index) => (
                  <SkeletonItemBlog key={index} />
                ))}
            </>
          ) : (
            <>
              {Array.isArray(dataLatest) &&
                dataLatest.map((item, index: number) => (
                  <Fragment key={index}>
                    <ItemAustralia {...item} />
                  </Fragment>
                ))}
            </>
          )}
        </div>
        {posts && posts.totalPages > 1 && (
          <Pagination
            pageCurrent={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={totalPage}
            ref={sectionRef}
            className='mt-[1.38rem] xsm:mt-[1.75rem]'
          />
        )}
      </div>
    </section>
  )
}

export default OutstandingAustraliaClone
