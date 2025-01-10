import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import {FC} from 'react'

export interface IProgramBenefitsProps {
  title: string
  description: string
  backgroundPc: Media
  backgroundMb: Media
  items: IProgramBenefitsItem[]
}

export const ProgramBenefits: FC<IProgramBenefitsProps> = ({
  title,
  description,
  backgroundPc,
  backgroundMb,
  items,
}) => {
  return (
    <section className='relative p-[3.5rem_0] lg:min-h-lvh sm:p-[7.94rem_0_7.25rem]'>
      <ImageV2
        src={backgroundPc.url}
        alt={backgroundPc.alt}
        width={backgroundPc.width}
        height={backgroundPc.height}
        className='absolute left-0 top-0 h-full w-full xsm:hidden'
      />
      <ImageV2
        src={backgroundMb.url}
        alt={backgroundMb.alt}
        width={backgroundMb.width}
        height={backgroundMb.height}
        className='absolute left-0 top-0 h-full w-full sm:hidden'
      />
      <div className='absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,rgba(70,59,53,0.80)_7.5%,rgba(70,59,53,0.40)_60%)]'></div>
      <div className='relative px-[1rem] text-white sm:hidden'>
        <h2 className='mb-[0.88rem] font-optima font-medium heading2 xsm:text-[1.5rem] xsm:font-semibold xsm:tracking-[-0.045rem]'>
          {title}
        </h2>
        <p className='font-normal body16 xsm:body-14'>{description}</p>
      </div>
      <div className='hidden-scrollbar relative mx-auto flex text-white sm:max-w-[90rem] sm:flex-wrap xsm:overflow-auto'>
        <div className='mr-auto max-w-[36.625rem] xsm:hidden'>
          <h2 className='mb-[1.25rem] font-optima font-medium heading2'>
            {title}
          </h2>
          <p className='font-normal body16'>{description}</p>
        </div>
        {items.map((item, index) => (
          <ProgramBenefitsItem
            {...item}
            key={index}
            number={index + 1}
          />
        ))}
      </div>
    </section>
  )
}

interface IProgramBenefitsItem {
  title: string
  content: string
}

interface IProgramBenefitsItemProps extends IProgramBenefitsItem {
  number: number
}

const ProgramBenefitsItem: FC<IProgramBenefitsItemProps> = ({
  title,
  content,
  number,
}) => {
  return (
    <div
      className={cn(
        'program-benefits__item-bg group ml-[1.5rem] mt-[1.5rem] flex max-w-[19.0625rem] flex-wrap rounded-[1rem] border border-white/10 p-[1.25rem] transition-all sm:max-w-[21.375rem] sm:p-[1.5rem] sm:hover:bg-white sm:hover:bg-none xsm:ml-0 xsm:mr-[0.75rem] xsm:flex-none',
        {
          'sm:ml-0': number == 3,
          'xsm:ml-[1rem]': number == 1,
        },
      )}
    >
      <h3 className='font-medium transition-all body16 sm:font-semibold sm:group-hover:text-brown'>
        {title}
      </h3>
      <div className='m-[1rem_0] h-[1px] w-full bg-white/10 sm:group-hover:bg-black/10'></div>
      <span className='sm:group-hover:program-benefits__item-title-gradient--hover program-benefits__item-title-gradient max-w-[3.6125rem] self-start font-optima font-semibold leading-none heading1 xsm:text-[3rem]'>
        {number < 10 ? `0${number}` : number}
      </span>
      <div
        className='ml-[1.5rem] flex-1 pb-[1.81rem] font-normal transition-all body-14 sm:pb-[3.06rem] sm:group-hover:text-bodytext'
        dangerouslySetInnerHTML={{__html: content}}
      ></div>
    </div>
  )
}
