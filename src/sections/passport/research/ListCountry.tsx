/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import useStore from '@/app/(store)/store'
import ICSearch from '@/components/icon/ICSearch'
import {Input} from '@/components/ui/input'
import {ScrollArea} from '@/components/ui/scroll-area'
import {cn} from '@/lib/utils'
import {JSON_TYPE} from '@/types/passport'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import {useDebounceCallback} from 'usehooks-ts'

interface ICountry {
  code: string
  name: string
}

type Item = {
  name: string
  [key: string]: any
}

const tabs = [
  {
    label: 'Tất cả',
    color: JSON_TYPE.DEFAULT,
  },
  {
    label: 'Miễn thị thực',
    color: JSON_TYPE.FREE,
  },
  {
    label: 'Thị thực nhập cảnh tại sân bay',
    color: JSON_TYPE.AIRPORT,
  },
  {
    label: 'Yêu cầu thị thực',
    color: JSON_TYPE.REQUIRED,
  },
]

const ListCountry = ({data}: any) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const [dataLatest, setDataLatest] = useState(data || [])
  const {showCountry, setShowCountry} = useStore((state) => state)

  const [search, setSearch] = useState('')
  const debounced = useDebounceCallback(setSearch, 500)

  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (window.innerWidth < 640 && showCountry) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [showCountry])

  useEffect(() => {
    if (search) {
      setDataLatest(handleSearch(dataLatest, search))
    } else {
      setDataLatest([
        ...data?.visa_free_access,
        ...data?.visa_on_arrival,
        ...data?.visa_required,
      ])
    }
  }, [search])

  useEffect(() => {
    if (tab === 0) {
      setDataLatest([
        ...data?.visa_free_access,
        ...data?.visa_on_arrival,
        ...data?.visa_required,
      ])
    } else if (tab === 1) {
      setDataLatest([...data?.visa_free_access])
    } else if (tab === 2) {
      setDataLatest([...data?.visa_on_arrival])
    } else if (tab === 3) {
      setDataLatest([...data?.visa_required])
    }
  }, [tab])

  const handleSearch = (array: Item[], searchTerm: string): Item[] => {
    if (!searchTerm.trim()) return array // Nếu không có từ khóa, trả về toàn bộ mảng.

    const normalizedSearchTerm = searchTerm.trim().toLowerCase()

    return array.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearchTerm),
    )
  }

  const handleChangePassport = (code: string) => {
    const paramNew = new URLSearchParams(searchParams ?? '')
    paramNew.set('postal', code)
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
  }

  return (
    <>
      <div
        onClick={() => {
          setShowCountry(false)
        }}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[40] size-full bg-black/50 opacity-0 transition-all duration-700 sm:hidden',
          showCountry && 'pointer-events-auto opacity-100',
        )}
      ></div>
      <div
        className={cn(
          'pointer-events-none absolute left-0 top-0 z-[45] size-full bg-white p-[1.5rem] opacity-0 transition-all duration-300 ease-in-out xsm:fixed xsm:bottom-0 xsm:left-0 xsm:top-auto xsm:h-[72vh] xsm:translate-y-[110%] xsm:rounded-[1rem_1rem_0rem_0rem] xsm:p-0 xsm:pb-[1.5rem] xsm:pt-[1.5rem] xsm:duration-500',
          showCountry && 'pointer-events-auto opacity-100 xsm:translate-y-0',
        )}
      >
        <div className='mb-[1.5rem] flex w-full sm:h-[3rem] sm:items-center sm:justify-between xsm:mb-[1rem] xsm:flex-col'>
          <div className='hidden-scrollbar flex w-fit space-x-[1.75rem] xsm:w-full xsm:overflow-x-auto xsm:px-[1rem]'>
            {tabs.map((item, index) => (
              <button
                onClick={() => setTab(index)}
                key={index}
                className={cn(
                  'before: relative flex h-[2.5rem] w-fit items-center whitespace-nowrap text-black/60 transition-all duration-200 body16-m before:absolute before:bottom-0 before:left-0 before:w-0 before:border-b-[2px] before:border-solid before:border-[#95502F] before:text-[#95502F] before:transition-all before:duration-300',
                  index === tab && 'text-[#95502F] before:w-full',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className='relative flex h-[3rem] w-[16.9375rem] flex-shrink-0 items-center rounded-[0.5rem] bg-[#f3f3f3] xsm:mx-auto xsm:mt-[1rem] xsm:w-[calc(100%-2rem)]'>
            <Input
              name='search'
              placeholder='Tìm kiếm quốc gia'
              className='w-full border-none bg-transparent pl-[3rem] pr-[0.5rem] text-greyscaletext-800 shadow-none outline-none body-14-m'
              onChange={(e) => debounced(e.target.value)}
              autoComplete='off'
            />
            <ICSearch
              className={cn(
                'absolute left-[1rem] top-1/2 size-[1.5rem] -translate-y-1/2',
                search && '[&>path]:stroke-black',
              )}
            />
          </div>
        </div>
        <ScrollArea className='h-[31.4rem] w-full xsm:h-[26rem]'>
          {Array.isArray(dataLatest) &&
            dataLatest.map((item: ICountry, index: number) => (
              <div
                className='relative h-fit w-full xsm:px-[1rem]'
                key={index}
              >
                <button
                  onClick={() => handleChangePassport(item.code)}
                  className='flex h-[3.5rem] w-full items-center justify-between border-b border-solid border-[rgba(0,0,0,0.10)] lg:hover:bg-greyscaletext-100/50 xsm:h-[3rem]'
                >
                  <span className='inline-block flex-1 text-start font-semibold !tracking-[-0.02rem] !text-[#121212DE] body16-s xsm:-tracking-[-0.0175rem] xsm:body-14-s'>
                    {item.name}
                  </span>
                  <div
                    style={{
                      backgroundColor:
                        tab === 0 ? '#3F2214' : tabs?.[tab]?.color,
                    }}
                    className='flex h-[2.0625rem] items-center justify-center whitespace-nowrap rounded-[0.5rem] px-[1rem] tracking-[-0.0175rem] text-white body-14-m'
                  >
                    {tabs?.[tab]?.label}
                  </div>
                </button>
              </div>
            ))}
        </ScrollArea>
      </div>
    </>
  )
}

export default ListCountry
