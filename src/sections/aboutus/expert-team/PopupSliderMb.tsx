'use client'
import ImageV2 from '@/components/image/ImageV2'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import {cn} from '@/lib/utils'
import ItemExpertTeam from '@/sections/aboutus/expert-team/ItemExpertTeam'
import {IExpertTeamPropsItem} from '@/types/dataAcfAboutus.interface'

export default function PopupSliderMb({
  toggleMB,
  setToggleMB,
  data,
  index,
}: {
  toggleMB: boolean
  // eslint-disable-next-line no-unused-vars
  setToggleMB: (value: boolean) => void
  data: IExpertTeamPropsItem
  index: number
}) {
  const lockScroll = useBodyScrollLock(false)
  return (
    <>
      <div
        onClick={() => {
          setToggleMB(false)
          //hook
          lockScroll()
        }}
        className={cn(
          'fixed inset-0 z-[39] bg-[#00000054] transition-all duration-1000',
          toggleMB
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none z-[-10] opacity-0',
        )}
      ></div>
      <div
        className={cn(
          'fixed bottom-0 left-0 z-40 h-[37.5rem] w-[23.4375rem] rounded-[1rem_1rem_0rem_0rem] bg-white p-[1rem_1rem_2.5rem_1rem] transition-all duration-700',
          toggleMB ? 'translate-y-0' : 'translate-y-[100%]',
        )}
      >
        <div className='scrollbar-hidden h-[37.5rem] overflow-hidden overflow-y-auto'>
          <div className='sticky top-0 z-10 bg-white'>
            <p className='font-optima font-semibold capitalize text-brown heading2'>
              {data?.name}
            </p>
            <p className='mt-[0.38rem] text-[0.75rem] font-medium tracking-[-0.015rem] text-orangetext-500'>
              {data?.position}
            </p>
          </div>
          <ItemExpertTeam
            className='xsm:mx-auto xsm:h-[19.59588rem] xsm:w-[16.87925rem] xsm:before:absolute xsm:before:top-[1.3rem] xsm:before:z-10 xsm:before:h-[0.1rem] xsm:before:w-full xsm:before:bg-white [&_svg]:xsm:h-[19.59588rem]'
            index={index}
            uniqueId={`popup-${data?.name}-${index}`}
            srcImage={data?.image?.url}
          />
          <div
            dangerouslySetInnerHTML={{__html: data?.describe || ''}}
            className='mt-[1.5rem] [&_p]:text-bodytext [&_p]:body-14'
          ></div>
        </div>
        <div
          onClick={() => {
            setToggleMB(false)
            // hook
            lockScroll()
          }}
          className='absolute right-[1rem] top-[1.25rem] z-20'
        >
          <ImageV2
            className='size-[1.5rem] object-contain'
            width={24}
            height={24}
            alt=''
            src={'/icons/close.svg'}
          />
        </div>
      </div>
    </>
  )
}
