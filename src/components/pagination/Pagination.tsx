/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ReactPaginate from 'react-paginate'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {cn} from '@/lib/utils'
import {forwardRef, useEffect} from 'react'
import useIsMobile from '@/hooks/useIsMobile'
type TProps = {
  pageCurrent: number
  pageCount: number
  className?: string
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
const Pagination = forwardRef(
  (
    {pageCurrent, pageCount = 10, className, setCurrentPage}: TProps,
    ref?: any,
  ) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    const isMobile = useIsMobile()

    useEffect(() => {
      if (searchParams?.get('page')) {
        setCurrentPage(Number(searchParams.get('page')))
      }
    }, [searchParams])

    function handleChangePage(page: number) {
      if (page === pageCurrent) return
      const paramNew = new URLSearchParams(searchParams ?? '')

      if (page <= 1) {
        paramNew.delete('page')
        setCurrentPage(1)
      } else {
        paramNew.set('page', String(page))
        setCurrentPage(Number(page))
      }
      if (ref) {
        ref?.current?.scrollIntoView({behavior: 'smooth'})
      }
      return router.push(pathName + '?' + paramNew.toString(), {
        scroll: false,
      })
    }

    return (
      <ReactPaginate
        activeClassName='!bg-[#3F2214] text-white lg:hover:bg-[#3F2214]'
        pageClassName='size-[2.5rem] xsm:size-[2rem] rounded-[0.75rem] flex-center border border-solid border-[#CFCECE] text-[#3F2214] text-[0.875rem] font-bold leading-normal bg-white [&>a]:size-full [&>a]:flex-center select-none lg:hover:bg-[#3F2214]/20 xsm:text-[0.7rem]'
        previousLabel={
          <button className='group size-[2.5rem] rounded-[0.75rem] flex-center lg:hover:bg-[#3F2214]/20 sm:!mr-[0.62rem] xsm:size-[2rem]'>
            <ICArrowPagination className='size-[1.23656rem] transition-all duration-300 ease-pagination-bezier lg:group-hover:scale-[1.2]' />
          </button>
        }
        nextLabel={
          <button className='group size-[2.5rem] rounded-[0.75rem] flex-center lg:hover:bg-[#3F2214]/20 sm:!ml-[0.62rem] xsm:size-[2rem]'>
            <ICArrowPagination className='size-[1.23656rem] rotate-180 transition-all duration-300 ease-pagination-bezier lg:group-hover:scale-[1.2]' />
          </button>
        }
        breakClassName='size-[2.5rem] xsm:size-[2rem] rounded-[0.75rem] flex-center border border-solid border-[#CFCECE] text-[#3F2214] text-[0.875rem] font-bold leading-normal bg-white select-none lg:hover:bg-[#3F2214]/20'
        breakLabel='...'
        onPageChange={(e) => {
          handleChangePage(Number(e?.selected) + 1)
        }}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={isMobile ? 1 : 2}
        forcePage={pageCurrent - 1}
        className={cn(
          'mx-auto flex w-fit items-center space-x-[1rem]',
          className,
        )}
      />
    )
  },
)

Pagination.displayName = 'Pagination'
export {Pagination}

const ICArrowPagination = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='21'
      height='20'
      viewBox='0 0 21 20'
      fill='none'
      className={className}
    >
      <path
        d='M7.6845 9.49768L13.3457 3.27612C13.4617 3.14731 13.6098 3.08291 13.7901 3.08291C13.9705 3.08291 14.1186 3.14731 14.2345 3.27612C14.3633 3.41782 14.4277 3.58527 14.4277 3.77849C14.4277 3.9717 14.3633 4.13272 14.2345 4.26153L9.03701 10L14.2345 15.7386C14.3633 15.8674 14.4277 16.0284 14.4277 16.2216C14.4277 16.4148 14.3633 16.5823 14.2345 16.724C14.1186 16.8528 13.9705 16.9172 13.7901 16.9172C13.6098 16.9172 13.4617 16.8528 13.3457 16.724L7.6845 10.5024C7.55568 10.3607 7.49128 10.1933 7.49128 10C7.49128 9.80683 7.55568 9.63937 7.6845 9.49768Z'
        fill='#3F2214'
      />
    </svg>
  )
}
