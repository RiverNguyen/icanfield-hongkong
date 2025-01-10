/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import {useState, useEffect, useMemo, useRef} from 'react'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
import IndexTabs from '@/sections/blogs/list-blogs/tab'
import {Category, SortOption} from '@/types/blogs.interface'
import {categories, fakeDataProjects} from './constants'
import SkeletonItemBlog from '@/components/itemBlog/SkeletonItemBlog'
import endpoints from '@/utils/endpoints'
import {useSearchParams} from 'next/navigation'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import useSWR from 'swr'
import {fetcher} from '@/lib/swr'
import {Pagination} from '@/components/pagination/Pagination'
import {Project} from '@/components/itemProjects/itemProjects.interface'
import ItemProjectsOutstanding from '@/components/itemProjects'

const OutstandingProjectEB5 = () => {
  const sortOptions = [
    {name: 'Tất cả', value: 'all', orderBy: 'all'},
    {name: 'Mới nhất', value: 'DESC', orderBy: 'date'},
    {name: 'Phổ biến nhất', value: 'ASC', orderBy: 'index'},
  ]
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const [totalPage, setTotalPage] = useState<number>(
    fakeDataProjects.totalPages || 1,
  )
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories.length
      ? categories[0]
      : {id: 0, name: 'All', slug: 'all', taxonomy: ''}, // Default fallback
  )
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
    return `${endpoints.blog.list}?page=${currentPage}&limit=${LIMIT_POSTS}${selectedCategory.slug !== 'all' ? `&tax=${handleGetTaxonomy(selectedCategory.slug)}&${handleGetTaxonomy(selectedCategory.slug)}=${selectedCategory.slug}` : ''}${search ? `&s=${search}` : ''}${selectedSortOption.value !== sortOptions[0].value ? `&order=${selectedSortOption.value}` : ''}${selectedSortOption.orderBy !== sortOptions[0].orderBy ? `&orderby=${selectedSortOption.orderBy}` : ''}`
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
    return Array.isArray(posts?.data) ? posts?.data : fakeDataProjects.data
  }, [searchParams, posts, fakeDataProjects.data])
  return (
    <section
      className='pt-[3.5rem]'
      ref={sectionRef}
    >
      <div className='section-container'>
        <h2 className='mb-4 font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown'>
          Dự án EB-5 tiêu biểu{' '}
        </h2>
        <div className='list-blogs__filters relative z-20 mb-[2rem] flex sm:items-center sm:justify-between xsm:mb-[2.19rem] xsm:flex-col'>
          <IndexTabs
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <IndexSortAndSearchPosts
            sortOptions={sortOptions}
            search={search}
            selectedSortOption={selectedSortOption}
            setSearch={setSearch}
            setSelectedSortOption={setSelectedSortOption}
            className='grid grid-cols-2 gap-4 xsm:flex'
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
                dataLatest.map((item: Project, index: number) => (
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
