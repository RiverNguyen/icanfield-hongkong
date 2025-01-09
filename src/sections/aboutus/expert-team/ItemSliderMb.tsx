'use client'
import ImageV2 from '@/components/image/ImageV2'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import ItemExpertTeam from '@/sections/aboutus/expert-team/ItemExpertTeam'
import {IExpertTeamPropsItem} from '@/types/dataAcfAboutus.interface'

export default function ItemSliderMb({
  data,
  index,
  setToggleMB,
  setIdActivePopupMB,
}: {
  data: IExpertTeamPropsItem
  index: number
  setToggleMB: (value: boolean) => void
  setIdActivePopupMB: (value: number) => void
}) {
  const lockScroll = useBodyScrollLock(false)

  const handlePreview = () => {
    setToggleMB(true)
    setIdActivePopupMB(index)
    lockScroll()
  }
  return (
    <div className='w-[17rem] rounded-[1rem] bg-white p-[0rem_1rem_1rem_1rem]'>
      <ItemExpertTeam
        className='xsm:before:absolute xsm:before:top-[2.9rem] xsm:before:z-10 xsm:before:h-[0.2rem] xsm:before:w-full xsm:before:bg-white'
        index={index}
        srcImage={data?.image?.url}
      />
      <p className='heading2 mt-[1.5rem] font-semibold text-brown capitalize'>
        {data?.name}
      </p>
      <p className='sub-12 mb-[0.5rem] mt-[0.38rem] font-medium tracking-[-0.015rem] text-orangetext-500'>
        {data?.position}
      </p>
      <div
        onClick={handlePreview}
        className='space-x-[0.5rem] rounded-[0.5rem] border-[1px] border-solid border-[rgba(18,18,18,0.16)] p-[0.5rem_0.75rem_0.5rem_1rem] flex-center'
      >
        <p className='text-[0.875rem] font-medium tracking-[-0.0175rem] text-greyscaletext-body'>
          Xem hồ sơ
        </p>
        <ImageV2
          width={24}
          height={24}
          alt='arow'
          src={'/icons/homepage/footer/icon-arow.svg'}
          className='size-[1.5rem] object-contain brightness-[100] invert-[100] filter'
        />
      </div>
    </div>
  )
}
