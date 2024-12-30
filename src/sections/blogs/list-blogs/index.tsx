/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ItemBlog from '@/components/itemBlog'
import Pagination from '@/components/pagination/Pagination'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
import IndexTabs from '@/sections/blogs/list-blogs/tab'
import {Category, SortOption} from '@/types/blogs.interface'
import {useRef, useState} from 'react'

// INIT DATA
const categories = [
  {name: 'Tất cả', value: 'all'},
  {name: 'Sự kiện', value: 'event'},
  {name: 'Tin định cư', value: 'news'},
  {name: 'Tin du học', value: 'guide'},
  {name: 'Câu chuyện thành công', value: 'other'},
]

const sortOptions = [
  {name: 'Tất cả', value: 'all'},
  {name: 'Mới nhất', value: 'newest'},
  {name: 'Phổ biến nhất', value: 'popular'},
]
const ListBlogs = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0],
  )
  const [search, setSearch] = useState<string>('')

  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(
    sortOptions[0],
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)

  return (
    <section
      ref={sectionRef}
      className='list-blogs section-container mb-[6.75rem] pt-[6.75rem] xsm:mb-[3.25rem] xsm:pt-[3rem]'
    >
      <h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown xsm:mb-[1rem] xsm:text-[1.5rem] xsm:leading-[1.3] xsm:-tracking-[0.045rem]'>
        Tin tức khác
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
        />
      </div>
      <div className='grid w-full grid-cols-3 gap-y-[4.5rem] sm:gap-x-[1.88rem] xsm:grid-cols-1 xsm:gap-y-[1.5rem]'>
        {Array(9)
          .fill(0)
          .map((item: any, index: number) => (
            <ItemBlog
              data={item}
              key={index}
            />
          ))}
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
