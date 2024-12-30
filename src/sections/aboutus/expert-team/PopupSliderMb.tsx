import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import ItemExpertTeam from '@/sections/aboutus/expert-team/ItemExpertTeam'

type DataType = {
  name: string
  position: string
  srcimage: string
  content: string
}
export default function PopupSliderMb({
  toggleMB,
  setToggleMB,
  data,
  index,
}: {
  toggleMB: boolean
  setToggleMB: (value: boolean) => void
  data: DataType
  index: number
}) {
  return (
    <>
      <div
        onClick={() => {
          setToggleMB(false)
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
          <p className='heading2 font-optima font-semibold text-brown'>
            {data?.name}
          </p>
          <p className='mt-[0.38rem] text-[0.75rem] font-medium tracking-[-0.015rem] text-orangetext-500'>
            {data?.position}
          </p>
          <ItemExpertTeam
            className='xsm:mx-auto xsm:h-[19.59588rem] xsm:w-[16.87925rem] xsm:before:absolute xsm:before:top-[1.3rem] xsm:before:z-10 xsm:before:h-[0.1rem] xsm:before:w-full xsm:before:bg-white [&_svg]:xsm:h-[19.59588rem]'
            index={index}
            srcImage={data?.srcimage}
          />
          <div className='[&_p]:body-14 mt-[1.5rem] [&_p]:text-bodytext'>
            <p>{data?.content}</p>
          </div>
        </div>
        <div
          onClick={() => {
            setToggleMB(false)
          }}
          className='absolute right-[1rem] top-[1.25rem]'
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
