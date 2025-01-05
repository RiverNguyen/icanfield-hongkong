import ImageV2 from '@/components/image/ImageV2'
import './style.css'
import {dataAcfPioneeringMissionItem} from '@/types/dataAcfAboutus.interface'

export default function ItemPioneering({
  index,
  data,
}: {
  index: number
  data: dataAcfPioneeringMissionItem
}) {
  return (
    <div className='item__pioneering group relative h-[25rem] w-[43.85rem] overflow-hidden rounded-[1.5rem] bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.03)] xsm:h-[11.875rem] xsm:w-full xsm:rounded-[0.75rem] xsm:shadow-[0px_1.938px_4.845px_0px_rgba(0,0,0,0.03)]'>
      <ImageV2
        className='pointer-events-none absolute bottom-0 right-0 h-[25rem] w-[31rem] xsm:hidden'
        height={400}
        width={496}
        alt=''
        src={'/imgs/about-us/pioneering-mission/Image-container.png'}
      />
      <ImageV2
        className='absolute left-[2.08rem] top-[1.38rem] z-[9] h-[3.5625rem] w-[4.0625rem] transition-all duration-700 group-hover:opacity-[0.25] xsm:left-[0.88rem] xsm:top-[0.75rem] xsm:h-[1.5rem] xsm:w-[1.875rem] xsm:opacity-[0.25]'
        height={57}
        width={65}
        alt=''
        src={'/icons/about-us/pioneering-mission/comma.svg'}
      />
      <div className='relative z-10 flex h-full w-[29.4375rem] flex-col justify-between p-[3rem_1rem_2rem_3rem] xsm:w-[16.25rem] xsm:p-[1.25rem_0rem_1rem_1.25rem]'>
        <div
          dangerouslySetInnerHTML={{__html: data?.decscripts}}
          className='[&_p]:sub-24S [&_strong]:sub-24S [&_p]:text-greyscaletext-200 [&_p]:transition-all [&_p]:delay-300 group-hover:[&_p]:text-white xsm:[&_p]:text-[0.8125rem] xsm:[&_p]:font-medium xsm:[&_p]:leading-[1.5] xsm:[&_p]:tracking-[0.00813rem] xsm:[&_p]:text-white [&_strong]:text-greyscaletext-900 [&_strong]:transition-all [&_strong]:delay-300 group-hover:[&_strong]:font-normal group-hover:[&_strong]:text-white xsm:[&_strong]:text-[0.8125rem] xsm:[&_strong]:font-medium xsm:[&_strong]:text-white'
        ></div>
        <p className='xsm:heading2 font-optima text-[2.5rem] font-semibold tracking-[-0.05rem] text-brown transition-all delay-300 duration-700 group-hover:font-semibold group-hover:text-white xsm:font-semibold xsm:text-white'>
          {index + 1}. {data?.title}
        </p>
      </div>
      <div className='transition-all delay-300 duration-700 size-full group-hover:bg-[linear-gradient(270deg,rgba(51,44,3,0.00)_3.4%,rgba(46,39,2,0.60)_78.42%)] xsm:bg-[linear-gradient(270deg,rgba(51,44,3,0.00)_3.4%,rgba(46,39,2,0.60)_78.42%)] absolute left-0 top-0 z-[8]'></div>
      <ImageV2
        className='clip_path absolute left-0 top-0 z-[7] size-full object-cover transition-all duration-700'
        height={400}
        width={708}
        alt={data?.image?.alt}
        src={data?.image?.url || ''}
      />
    </div>
  )
}
