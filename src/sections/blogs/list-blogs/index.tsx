'use client'
import React from 'react'
import {Category, SortOption} from '@/types/blogs.interface'
import ImageV2 from '@/components/image/ImageV2'
const ListBlogs = () => {
  const categories = [
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
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    categories[0],
  )
  const [selectedSortOption, setSelectedSortOption] =
    React.useState<SortOption>(sortOptions[0])
  //handle select category
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category)
  }
  //handle select sort option
  const handleSelectSortOption = (sortOption: SortOption) => {
    setSelectedSortOption(sortOption)
  }
  return (
    <section className='list-blogs section-container mb-[20rem]'>
      <h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown'>
        Tin tức khác
      </h2>
      <div className='list-blogs__filters mb-[2rem] flex items-center justify-between'>
        <div className='list-blogs__filters__category flex items-start space-x-[1.94rem]'>
          {categories.map((category: Category, index: number) => (
            <button
              key={index}
              className='flex w-fit flex-col space-y-2'
              onClick={() => handleSelectCategory(category)}
            >
              <span className='select-none text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-orangetext-500'>
                {category?.name}
              </span>
              <span
                className={`line h-[1px] w-full bg-orangetext-500 ${selectedCategory?.value === category?.value ? 'opacity-100' : 'opacity-0'}`}
              ></span>
            </button>
          ))}
        </div>
        <div className='flex items-center space-x-[1rem]'>
          <div className='juscify-between relative flex items-center justify-between px-4 py-3 bg-[#F3F3F3] rounded-[0.5rem] min-w-[16.9375rem] cursor-pointer'>
            <span className='text-[1rem] leading-[1.5] tracking-[-0.02rem] text-greyscaletext-body font-normal'>
              <b className='font-medium'>Lọc theo:</b>
              {selectedSortOption?.name}
            </span>
            <ImageV2
              className='size-[1.5rem]'
              src={'/icons/blogs/down.svg'}
              alt='arrow down'
              width={40}
              height={40}
            />
            <div className='absolute top-[110%] left-0 h-fit w-full flex flex-col bg-white rounded-[0.5rem] mt-[0.5rem] py-[0.5rem] px-[1rem] shadow-md'>
              {sortOptions.map((sortOption: SortOption, index: number) => (
                <button
                  key={index}
                  className='text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-orangetext-500'
                  onClick={() => handleSelectSortOption(sortOption)}
                >
                  {sortOption?.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ListBlogs
