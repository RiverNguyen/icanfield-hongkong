'use client'

import ItemSlider from '@/sections/document-appraisal/ItemSlider'
import {valueFilter, filter} from '@/types/dataAppraisal.interface'

interface OtherInfoSlidersSectionProps {
  otherInformation: filter
  valueBudget: valueFilter
  setValueBudget: (v: valueFilter) => void
  valuePossibility: valueFilter
  setValuePossibility: (v: valueFilter) => void
  valueTotalAssets: valueFilter
  setValueTotalAssets: (v: valueFilter) => void
  valueAge: valueFilter
  setValueAge: (v: valueFilter) => void
  valueNumberOfChildren: valueFilter
  setValueNumberOfChildren: (v: valueFilter) => void
}

export default function OtherInfoSlidersSection({
  otherInformation,
  valueBudget,
  setValueBudget,
  valuePossibility,
  setValuePossibility,
  valueTotalAssets,
  setValueTotalAssets,
  valueAge,
  setValueAge,
  valueNumberOfChildren,
  setValueNumberOfChildren,
}: OtherInfoSlidersSectionProps) {
  return (
    <div className='w-full space-y-[1.75rem] xsm:space-y-[1.5rem]'>
      <ItemSlider
        data={otherInformation?.estimated_investment_budget}
        value={valueBudget}
        setValue={setValueBudget}
      />
      <ItemSlider
        data={otherInformation?.possibility_of_residence}
        value={valuePossibility}
        setValue={setValuePossibility}
      />
      <ItemSlider
        data={otherInformation?.total_assets}
        value={valueTotalAssets}
        setValue={setValueTotalAssets}
      />
      <ItemSlider
        data={otherInformation?.age}
        value={valueAge}
        setValue={setValueAge}
      />
      <ItemSlider
        data={otherInformation?.number_of_children}
        value={valueNumberOfChildren}
        setValue={setValueNumberOfChildren}
      />
      <div className='h-[0.0625rem] w-full bg-[#000] opacity-[0.08] sm:hidden'></div>
    </div>
  )
}

