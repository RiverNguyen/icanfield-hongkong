/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useStore from '@/app/(store)/store'
import {Skeleton} from '@/components/ui/skeleton'
import ICArrowRinght from '@/layout/footer/ICArrowRinght'
import {fetcher} from '@/lib/swr'
import {cn} from '@/lib/utils'
import {JSON_TYPE} from '@/types/passport'
import Image from 'next/image'
import {useEffect} from 'react'
import useSWR from 'swr'
interface IProps {
  codePostal: string
}
type PassportRank = {
  id: number // Unique identifier for the record
  passport_id: number // Identifier for the passport
  rank: number // Rank of the passport
  year: number // Year of the ranking
  score: number // Score associated with the passport's rank
}

const fetcherWithCustomBase = (url: string) =>
  fetcher(url, process.env.NEXT_PUBLIC_API_PASSPORT)
const ResultPassport = ({codePostal}: IProps) => {
  const {setShowCountry, showCountry} = useStore((state) => state)

  const {data} = useSWR(
    codePostal ? `/v3/visa-single/${codePostal}` : null,
    fetcherWithCustomBase,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )

  const {data: rankings, isLoading} = useSWR(
    codePostal ? `/passports/${codePostal}/rankings` : null,
    fetcherWithCustomBase,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (data?.visa_free_access) {
      setShowCountry(false)
    }
  }, [data])

  const getKeyPassport = (
    rankings: PassportRank[],
    key: keyof PassportRank,
  ) => {
    if (!Array.isArray(rankings)) return ''
    const currentYear = new Date().getFullYear()
    return rankings.find(
      (ranking: PassportRank) => Number(ranking.year) === Number(currentYear),
    )?.[key]
  }

  const calculateWidths = (data: {
    visa_free_access?: any[]
    visa_on_arrival?: any[]
    visa_required?: any[]
  }) => {
    if (!data) return {freeWidth: 0, arrivalWidth: 0, requiredWidth: 0}

    const totalLength =
      (data.visa_free_access?.length || 0) +
      (data.visa_on_arrival?.length || 0) +
      (data.visa_required?.length || 0)

    if (totalLength === 0) {
      return {freeWidth: 0, arrivalWidth: 0, requiredWidth: 0}
    }

    const freeWidth = ((data.visa_free_access?.length || 0) / totalLength) * 100
    const arrivalWidth =
      ((data.visa_on_arrival?.length || 0) / totalLength) * 100
    const requiredWidth =
      ((data.visa_required?.length || 0) / totalLength) * 100

    return {freeWidth, arrivalWidth, requiredWidth}
  }

  const widths = calculateWidths(data)

  return (
    <div className='mt-[1rem] min-h-[26rem] rounded-[1.25rem] bg-white p-[1.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:mt-[18.125rem] xsm:min-h-[24rem] xsm:p-[1rem]'>
      <span className='mb-[1.5rem] inline-block text-tagtext body-14-m xsm:mb-[1rem]'>
        Kết quả tra cứu
      </span>
      {isLoading ? (
        <Skeleton className='size-full h-[6.25rem] w-full rounded-[0.5rem] xsm:h-[5.1rem]' />
      ) : (
        <>
          {data?.visa_free_access ? (
            <div className='flex h-fit w-full items-end space-x-[1rem]'>
              <div className='h-[5.73738rem] w-[4rem] flex-shrink-0 xsm:h-[5.1rem] xsm:w-[3.5rem]'>
                <Image
                  className='size-full object-contain'
                  src={process.env.NEXT_PUBLIC_PASSPORT + codePostal + '.png'}
                  alt={'passport'}
                  width={120}
                  height={172}
                />
              </div>
              <div className='flex-1'>
                <div className='mb-[0.75rem] flex items-end space-x-[0.62rem] border-b border-solid border-[rgba(0,0,0,0.10)] pb-[0.25rem] xsm:mb-[0.62rem] xsm:space-x-[0.5rem] xsm:pb-[0.12rem]'>
                  <span className='inline-block text-[2.5rem] font-semibold leading-[1.2] tracking-[-0.075rem] text-Phase-1-Brown xsm:text-[1.5rem] xsm:leading-[1.3] xsm:tracking-[-0.045rem]'>
                    {getKeyPassport(rankings, 'rank')}
                  </span>
                  <span className='inline-block whitespace-nowrap pb-[0.25rem] font-semibold text-greentext body16-s xsm:-tracking-[0.0175rem] xsm:body-14-s'>
                    Xếp hạng quyền lực hộ chiếu
                  </span>
                </div>
                <div className='flex w-full space-x-[0.12rem]'>
                  <div
                    className='flex h-[2rem] min-w-[3.25rem] items-center justify-center rounded-[0.375rem] font-semibold tracking-[-0.0175rem] text-white body-14-s xsm:h-[1.625rem] xsm:font-medium xsm:-tracking-[-0.015rem] xsm:sub-12'
                    style={{
                      width: `${widths.freeWidth}%`,
                      background: JSON_TYPE.FREE,
                    }}
                  >
                    {data?.visa_free_access?.length}
                  </div>
                  <div
                    className='flex h-[2rem] min-w-[3.25rem] items-center justify-center rounded-[0.375rem] font-semibold tracking-[-0.0175rem] text-white body-14-s xsm:h-[1.625rem] xsm:font-medium xsm:-tracking-[-0.015rem] xsm:sub-12'
                    style={{
                      width: `${widths.arrivalWidth}%`,
                      background: JSON_TYPE.AIRPORT,
                    }}
                  >
                    {data?.visa_on_arrival?.length}
                  </div>
                  <div
                    className='flex h-[2rem] min-w-[3.25rem] items-center justify-center rounded-[0.375rem] font-semibold tracking-[-0.0175rem] text-white body-14-s xsm:h-[1.625rem] xsm:font-medium xsm:-tracking-[-0.015rem] xsm:sub-12'
                    style={{
                      width: `${widths.requiredWidth}%`,
                      background: JSON_TYPE.REQUIRED,
                    }}
                  >
                    {data?.visa_required?.length}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='h-[6.25rem] w-full xsm:h-[5.1rem]'>
              <span className='inline-block pb-[0.25rem] font-semibold text-greentext body16-s'>
                Không tìm thấy thông tin!
              </span>
            </div>
          )}
        </>
      )}
      <div className='mt-[1rem] w-full space-y-[0.5rem] rounded-[0.5rem] bg-[#F6F6F6] p-[0.75rem_1rem]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div
              className='mr-[0.38rem] size-[0.75rem] rounded-full'
              style={{background: JSON_TYPE.FREE}}
            ></div>
            <span className='font-normal text-greyscaletext-body body-14'>
              Miễn thị thực
            </span>
          </div>
          <span className='font-semibold text-Phase-1-Brown heading6'>
            {data?.visa_free_access?.length}
          </span>
        </div>
        <div className='w-full border-b border-solid border-[rgba(0,0,0,0.10)]'></div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div
              className='mr-[0.38rem] size-[0.75rem] rounded-full'
              style={{background: JSON_TYPE.AIRPORT}}
            ></div>
            <span className='font-normal text-greyscaletext-body body-14'>
              Thị thực nhập cảnh tại sân bay
            </span>
          </div>
          <span className='font-semibold text-Phase-1-Brown heading6'>
            {data?.visa_on_arrival?.length}
          </span>
        </div>
        <div className='w-full border-b border-solid border-[rgba(0,0,0,0.10)]'></div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div
              className='mr-[0.38rem] size-[0.75rem] rounded-full'
              style={{background: JSON_TYPE.REQUIRED}}
            ></div>
            <span className='font-normal text-greyscaletext-body body-14'>
              Yêu cầu thị thực
            </span>
          </div>
          <span className='font-semibold text-Phase-1-Brown heading6'>
            {data?.visa_required?.length}
          </span>
        </div>
      </div>
      <button
        onClick={() => setShowCountry(!showCountry)}
        className={cn(
          'mt-[1rem] flex h-[3rem] w-full items-center justify-center rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] px-[1rem] text-white body-14-m xsm:h-[4.125rem] xsm:justify-between xsm:pl-[1rem] xsm:pr-[0.75rem]',
          !data?.visa_free_access && 'pointer-events-none opacity-50',
        )}
      >
        <span className='xsm:w-[90%] xsm:text-start'>
          {!showCountry
            ? 'Xem danh sách các quốc gia miễn/ yêu cầu thị thực'
            : 'Ẩn danh sách các quốc gia miễn/ yêu cầu thị thực'}
        </span>
        <ICArrowRinght className='ml-[0.5rem] size-[1.5rem] [&>path]:stroke-white' />
      </button>
    </div>
  )
}

export default ResultPassport
