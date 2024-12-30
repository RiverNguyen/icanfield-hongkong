<<<<<<< HEAD
"use client"
import ImageV2 from "@/components/image/ImageV2";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { cn } from "@/lib/utils";
import ItemExpertTeam from "@/sections/aboutus/expert-team/ItemExpertTeam";
=======
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import ItemExpertTeam from '@/sections/aboutus/expert-team/ItemExpertTeam'
>>>>>>> 4ca6713 (feat: add LeafletMap styles and improve investment opportunities layout)

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
<<<<<<< HEAD
          setToggleMB(false);
          //hook
          useBodyScrollLock(false)
=======
          setToggleMB(false)
>>>>>>> 4ca6713 (feat: add LeafletMap styles and improve investment opportunities layout)
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
<<<<<<< HEAD
        <div className="overflow-hidden overflow-y-auto scrollbar-hidden h-[37.5rem]">
          <div className="sticky top-0 bg-white z-10">
            <p className="text-brown heading2 font-optima font-semibold">
              {data?.name}
            </p>
            <p className="mt-[0.38rem] text-orangetext-500 text-[0.75rem] font-medium tracking-[-0.015rem]">
              {data?.position}
            </p>
          </div>
=======
        <div className='scrollbar-hidden h-[37.5rem] overflow-hidden overflow-y-auto'>
          <p className='heading2 font-optima font-semibold text-brown'>
            {data?.name}
          </p>
          <p className='mt-[0.38rem] text-[0.75rem] font-medium tracking-[-0.015rem] text-orangetext-500'>
            {data?.position}
          </p>
>>>>>>> 4ca6713 (feat: add LeafletMap styles and improve investment opportunities layout)
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
<<<<<<< HEAD
            setToggleMB(false);
            // hook
            useBodyScrollLock(false)
          }}
          className="absolute top-[1.25rem] right-[1rem] z-20"
=======
            setToggleMB(false)
          }}
          className='absolute right-[1rem] top-[1.25rem]'
>>>>>>> 4ca6713 (feat: add LeafletMap styles and improve investment opportunities layout)
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
