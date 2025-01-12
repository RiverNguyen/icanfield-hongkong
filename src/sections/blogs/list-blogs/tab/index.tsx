
'use client'
import {Category} from '@/types/blogs.interface'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'

const IndexTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[]
  selectedCategory: Category
  // eslint-disable-next-line no-unused-vars
  setSelectedCategory: (category: Category) => void
}) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get('category')) {
      const category = categories.find(
        (category: Category) => category.slug === searchParams.get('category'),
      )
      setSelectedCategory(category ?? categories[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
  //handle select category
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category)
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (category.slug === 'all') {
      paramNew.delete('category')
    } else {
      paramNew.set('category', category.slug)
    }
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
  }

  return (
    <div className='list-blogs__filters__category hidden-scrollbar flex items-start space-x-[1.94rem] xsm:mb-[0.75rem] xsm:overflow-x-auto'>
      {Array.isArray(categories) &&
        categories.map((category: Category, index: number) => (
          <button
            key={index}
            className='flex w-fit flex-col justify-end sm:space-y-2 xsm:h-[2.3rem]'
            onClick={() => handleSelectCategory(category)}
          >
            <span
              className={`block select-none whitespace-nowrap text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] xsm:mb-[0.5rem] xsm:text-[0.875rem] xsm:-tracking-[0.0175rem] ${selectedCategory?.slug === category?.slug ? 'text-orangetext-500' : 'text-black/60'}`}
            >
              {category?.name}
            </span>
            <span
              className={`line h-[1px] w-full bg-orangetext-500 ${selectedCategory?.slug === category?.slug ? 'opacity-100' : 'opacity-0'}`}
            ></span>
          </button>
        ))}
    </div>
  )
}

export default IndexTabs
