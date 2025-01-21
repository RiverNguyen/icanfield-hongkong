import ImageV2 from "@/components/image/ImageV2"
import { Input } from "@/components/ui/input"
import useClickOutside from "@/hooks/useClickOutSide"
import { cn } from "@/lib/utils"
import { SortOptionProgramme } from "@/types/dataAcfImmigration.interface"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment, RefObject, useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"

export default function FilterProgramme({
  sortOptions,
  className,
  selectedSortOption,
  setSelectedSortOption,
  setSearch,
  backgroundInput = 'bg-[#EEE]',
  search,
  placeholder = 'Tìm kiếm trong chương trình',
  sectionRef,
  setPage,
  page
}: {
  sortOptions: SortOptionProgramme[]
  className?: string
  selectedSortOption: SortOptionProgramme
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOptionProgramme>>
  backgroundInput?: string
  search: string
  placeholder?: string
  sectionRef: RefObject<HTMLElement>
  setPage?: React.Dispatch<React.SetStateAction<number>>
  page?: number
}) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const debounced = useDebounceCallback(setSearch, 700)
  const { ref, isOutside } = useClickOutside<HTMLDivElement>()
  const [isOpenSelectCategory, setIsOpenSelectCategory] = useState<boolean>(false)
  useEffect(() => {
    if (isOutside) {
      setIsOpenSelectCategory(false)
    }
  }, [isOutside])

  const handleSelectSortOption = (sortOption: SortOptionProgramme) => {
    setSelectedSortOption(sortOption)
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (sortOption.value === 'all') {
      paramNew.delete('order')
      paramNew.delete('page')
    } else {
      paramNew.set('order', sortOption.value)
    }
    router.push(pathName + paramNew.toString() && '?' + paramNew.toString(), {
      scroll: false,
    })
    if (sectionRef.current instanceof HTMLElement) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } 
  }
  useEffect(() => {
    const paramNew = new URLSearchParams(searchParams ?? '')
    if (search) {
      paramNew.delete('page')
      paramNew.set('search', search)
    } else {
      paramNew.delete('search')
    }
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
    if (search) {
      if (sectionRef.current instanceof HTMLElement) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [search])
    // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value)
    if (page && setPage && page > 1) {
      setPage(1)
    }
  }
  return (
    <div
      className={`${className ? className : 'flex sm:flex-col items-center justify-between sm:space-y-[1rem] mb-[2rem]'} `}
    >
      <div className='relative h-[3rem] sm:w-full xsm:w-[calc((100%-0.5rem)/2)] ]'>
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
      <div
        ref={ref}
        className='relative sm:min-w-full xsm:order-2 xsm:w-[calc((100%-0.5rem)/2)]'
      >
        <button
          onClick={() => setIsOpenSelectCategory(!isOpenSelectCategory)}
          className={`flex h-[3rem] w-full items-center justify-between rounded-[0.5rem] ${backgroundInput} px-[0.75rem] sm:px-4`}
        >
          <span className='flex items-center whitespace-nowrap text-[1rem] font-normal leading-[1.5] tracking-[-0.02rem] text-greyscaletext-body xsm:line-clamp-1 xsm:text-[0.75rem] xsm:text-[#3F2214]'>
            <b className='whitespace-nowrap font-medium sm:font-bold'>
              Lọc theo:{''}
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
            'pointer-events-none max-h-[22rem] overflow-hidden overflow-y-auto absolute left-0 top-[110%] mt-[0.5rem] flex w-full flex-col space-y-[0.5rem] rounded-[0.5rem] bg-white p-[0.5rem] opacity-0 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:order-1 xsm:space-y-[0.15rem]',
            isOpenSelectCategory && 'pointer-events-auto opacity-100',
          )}
        >
          {Array.isArray(sortOptions) &&
            sortOptions.map((sortOption: SortOptionProgramme, index: number) => (
              <Fragment key={index}>
                <button
                  className={`sm:border-b-[1px] sm:border-solid sm:border-[rgba(0,0,0,0.10)] text-start px-[1rem] h-[3rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-orangetext-500 hover:bg-greyscaletext-200/20 hover:rounded-[0.3rem] xsm:h-[2.625rem] xsm:text-[0.875rem] ${sortOption.value === selectedSortOption.value ? 'bg-greyscaletext-200/20 rounded-[0.3rem]' : ''}`}
                  onClick={() => {
                    handleSelectSortOption(sortOption)
                    setIsOpenSelectCategory(false)
                    if (setPage) {
                      setPage(1)
                    }
                  }}
                >
                  {sortOption?.name}
                </button>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}
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
