/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ItemBlog from '@/components/itemBlog'
import SkeletonItemBlog from '@/components/itemBlog/SkeletonItemBlog'
import {Pagination} from '@/components/pagination/Pagination'
import {fetcher} from '@/lib/swr'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
import IndexTabs from '@/sections/blogs/list-blogs/tab'
import {
  ApiResponse,
  Category,
  DataItem,
  SortOption,
} from '@/types/blogs.interface'
import endpoints from '@/utils/endpoints'
import {useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useRef, useState} from 'react'
import useSWR from 'swr'

const sortOptions = [
  {name: 'Tất cả', value: 'all', orderBy: 'all'},
  {name: 'Mới nhất', value: 'DESC', orderBy: 'date'},
  {name: 'Phổ biến nhất', value: 'ASC', orderBy: 'index'},
]

interface IProps {
  dataPosts: ApiResponse
  dataCategories: Category[]
}

const ListBlogs = ({dataPosts, dataCategories}: IProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    dataCategories.length
      ? dataCategories[0]
      : {id: 0, name: 'All', slug: 'all', taxonomy: ''}, // Default fallback
  )
  const [search, setSearch] = useState<string>('')
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(
    sortOptions[0],
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(dataPosts.totalPages || 1)

  function handleGetTaxonomy(categorySlug: string) {
    return dataCategories.find(
      (category: Category) => category.slug === categorySlug,
    )?.taxonomy
  }

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
    return Array.isArray(posts?.data) ? posts?.data : dataPosts.data
  }, [searchParams, posts, dataPosts.data])

  if (!Array.isArray(dataCategories) || !Array.isArray(dataPosts.data)) {
    console.error('Invalid dataCategories or dataPosts')
    return null
  }
  return (
    <section
      ref={sectionRef}
      className='list-blogs mb-[6.75rem] pt-[6.75rem] section-container xsm:mb-[3.25rem] xsm:pt-[3rem]'
    >
      <h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown xsm:mb-[1rem] xsm:text-[1.5rem] xsm:leading-[1.3] xsm:-tracking-[0.045rem]'>
        Tin tức khác
      </h2>
      <div className='list-blogs__filters relative z-20 mb-[2rem] flex sm:items-center sm:justify-between xsm:mb-[2.19rem] xsm:flex-col'>
        <IndexTabs
          categories={dataCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <IndexSortAndSearchPosts
          sortOptions={sortOptions}
          search={search}
          selectedSortOption={selectedSortOption}
          setSearch={setSearch}
          setSelectedSortOption={setSelectedSortOption}
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
              dataLatest.map((item: DataItem, index: number) => (
                <ItemBlog
                  data={item}
                  key={index}
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
    </section>
  )
}

export default ListBlogs
