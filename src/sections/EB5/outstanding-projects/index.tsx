/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import SkeletonItemBlog from '@/components/itemBlog/SkeletonItemBlog'
import ItemProjectsOutstanding from '@/components/itemProjects'
import {IProject} from '@/components/itemProjects/itemProjects.interface'
import {Pagination} from '@/components/pagination/Pagination'
import {fetcher} from '@/lib/swr'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
import IndexTabs from '@/sections/blogs/list-blogs/tab'
import {Category, SortOption} from '@/types/blogs.interface'
import endpoints from '@/utils/endpoints'
import {useSearchParams} from 'next/navigation'
import {FC, useEffect, useMemo, useRef, useState} from 'react'
import useSWR from 'swr'

export interface IOutstandingProjectEB5Props {
  listItems: {
    success: boolean
    total: number
    totalPages: number
    page: number
    limit: number
    data: IProject[]
  }
  categories: {
    id: number
    name: string
    slug: string
    taxonomy: string
  }[]
}

const OutstandingProjectEB5: FC<IOutstandingProjectEB5Props> = ({
  listItems,
  categories,
}) => {
  const sortOptions = [
    {name: 'Tất cả', value: 'all', orderBy: 'all'},
    {name: 'Mới nhất', value: 'DESC', orderBy: 'date'},
    {name: 'Phổ biến nhất', value: 'ASC', orderBy: 'index'},
  ]
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const [totalPage, setTotalPage] = useState<number>(listItems.totalPages || 1)

  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: 'Tất cả',
    slug: 'all',
    taxonomy: '',
  })

  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(
    sortOptions[0],
  )
  function handleGetTaxonomy(categorySlug: string) {
    return categories.find(
      (category: Category) => category.slug === categorySlug,
    )?.taxonomy
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const query = useMemo(() => {
    if (!searchParams?.size) return null
    return `${endpoints.eb5Project.list}?page=${currentPage}&limit=${LIMIT_POSTS}${selectedCategory.slug !== 'all' ? `&tax=${handleGetTaxonomy(selectedCategory.slug)}&${handleGetTaxonomy(selectedCategory.slug)}=${selectedCategory.slug}` : ''}${search ? `&s=${search}` : ''}${selectedSortOption.value !== sortOptions[0].value ? `&order=${selectedSortOption.value}` : ''}${selectedSortOption.orderBy !== sortOptions[0].orderBy ? `&orderby=${selectedSortOption.orderBy}` : ''}`
  }, [
    searchParams,
    currentPage,
    selectedCategory.slug,
    search,
    selectedSortOption.value,
    selectedSortOption.orderBy,
  ])

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
        <h2 className='mb-4 font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown'>
          Dự án EB-5 tiêu biểu
        </h2>
        <div className='list-blogs__filters relative z-20 mb-[2rem] flex sm:items-center sm:justify-between xsm:mb-[2.19rem] xsm:flex-col'>
          <IndexTabs
            categories={[
              {id: 0, name: 'Tất cả', slug: 'all', taxonomy: ''},
              ...categories,
            ]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <IndexSortAndSearchPosts
            sortOptions={sortOptions}
            search={search}
            selectedSortOption={selectedSortOption}
            setSearch={setSearch}
            setSelectedSortOption={setSelectedSortOption}
            className='sm:flex sm:flex-row-reverse gap-x-3 xsm:flex'
            backgroundInput='bg-[#EEE]'
          />
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
                dataLatest.map((item: IProject, index: number) => (
                  <ItemProjectsOutstanding
                    key={index}
                    {...item}
                  />
                ))}
            </>
          )}
        </div>
        <Pagination
          pageCurrent={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={totalPage}
          ref={sectionRef}
          className='mt-[1.38rem] xsm:mt-[1.75rem]'
        />
      </div>
    </section>
  )
}

export default OutstandingProjectEB5
