import ImageV2 from '@/components/image/ImageV2'
import {Slider} from '@/components/ui/slider'
import {cn} from '@/lib/utils'
import {filterValue} from '@/types/dataAppraisal.interface'

interface value {
  value: number
  percent: number
}

export default function ItemSlider({
  data,
  value,
  setValue,
}: {
  data: filterValue
  value: value
  setValue: React.Dispatch<React.SetStateAction<value>>
}) {
  return (
    <div className='flex w-full sm:items-center sm:space-x-[3.38rem] xsm:flex-col'>
      <div className='flex flex-1 items-center space-x-[0.75rem] xsm:space-x-[0.37rem]'>
        <ImageV2
          width={24 * 2}
          height={24 * 2}
          alt=''
          src={data?.icon}
          className='size-[1.5rem] object-contain xsm:size-[1rem]'
        />
        <p className='text-greyscaletext-800 body16-m xsm:text-[0.75rem] xsm:font-semibold xsm:tracking-[-0.015rem]'>
          {data?.title}
          <span className='text-[#EA3434] body16 xsm:text-[0.75rem] xsm:font-semibold xsm:tracking-[-0.015rem]'>
            *
          </span>
        </p>
      </div>
      <div className='relative flex w-[31rem] flex-col justify-between space-y-[0.5rem] xsm:w-full xsm:space-y-[0.75rem]'>
        <div
          style={{left: value?.percent + '%'}}
          className={cn(
            'absolute h-[1.125rem] w-max translate-x-[-50%] text-[#5C321E] transition-all body-14-s sm:top-0 xsm:top-[0.5rem]',
            value?.percent < 5 && 'translate-x-0',
            value?.percent > 95 && 'translate-x-[-100%]',
          )}
        >
          {Math.floor(value?.value)} {data?.unit}
        </div>
        <div className='h-[1.125rem]'></div>
        <Slider
          onValueChange={(newValue) => {
            const budgetTo = Number(data?.to) || 1 // Tránh chia cho 0 hoặc undefined
            const value = Number(newValue)
            const percent = budgetTo !== 0 ? (value / budgetTo) * 100 : 0
            setValue({value: value, percent: percent})
          }}
          className='[&_.span-active]:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] [&_.span-down]:cursor-pointer [&_.span-down]:border-none [&_.span-down]:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] focus-visible:[&_.span-down]:shadow-none focus-visible:[&_.span-down]:outline-0 [&_.span-up]:bg-[#E0E0E0]'
          defaultValue={[Number(data?.to) / 2]}
          max={Number(data?.to)}
          step={Number(data?.step)}
        />
        <div className='flex h-[1.125rem] w-full items-center justify-between'>
          <p className='text-[0.75rem] text-[rgba(18,18,18,0.72)]'>
            {data?.from}
          </p>
          <p className='text-[0.75rem] text-[rgba(18,18,18,0.72)]'>
            {data?.to} {data?.unit}
          </p>
        </div>
      </div>
    </div>
  )
}
