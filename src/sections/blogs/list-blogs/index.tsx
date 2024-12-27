/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ItemBlog from '@/components/itemBlog'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
import IndexTabs from '@/sections/blogs/list-blogs/tab'

const ListBlogs = () => {
  return (
    <section className='list-blogs section-container mb-[6.75rem] xsm:mb-[3.25rem]'>
      <h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown xsm:mb-[1rem] xsm:text-[1.5rem] xsm:leading-[1.3] xsm:-tracking-[0.045rem]'>
        Tin tức khác
      </h2>
      <div className='list-blogs__filters relative z-20 mb-[2rem] flex sm:items-center sm:justify-between xsm:mb-[2.19rem] xsm:flex-col'>
        <IndexTabs />
        <IndexSortAndSearchPosts />
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
    </section>
  )
}

export default ListBlogs
