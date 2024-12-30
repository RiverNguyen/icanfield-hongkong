'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Category} from '@/types/blogs.interface'
import {useEffect} from 'react'

const IndexTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[]
  selectedCategory: Category
  setSelectedCategory: (category: Category) => void
}) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get('category')) {
      const category = categories.find(
        (category: Category) => category.value === searchParams.get('category'),
      )
      setSelectedCategory(category ?? categories[0])
    }
  }, [searchParams])

  //handle select category
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category)
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (category.value === 'all') {
      paramNew.delete('category')
    } else {
      paramNew.set('category', category.value)
    }
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
  }
  return (
    <div className='list-blogs__filters__category hidden-scrollbar flex items-start space-x-[1.94rem] xsm:mb-[0.75rem] xsm:overflow-x-auto'>
      {categories.map((category: Category, index: number) => (
        <button
          key={index}
          className='flex w-fit flex-col justify-end sm:space-y-2 xsm:h-[2.3rem]'
          onClick={() => handleSelectCategory(category)}
        >
          <span
            className={`block select-none whitespace-nowrap text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] xsm:mb-[0.5rem] xsm:text-[0.875rem] xsm:-tracking-[0.0175rem] ${selectedCategory?.value === category?.value ? 'text-orangetext-500' : 'text-black/60'}`}
          >
            {category?.name}
          </span>
          <span
            className={`line h-[1px] w-full bg-orangetext-500 ${selectedCategory?.value === category?.value ? 'opacity-100' : 'opacity-0'}`}
          ></span>
        </button>
      ))}
    </div>
  )
}

export default IndexTabs
