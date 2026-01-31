'use client'

import ItemSlider from '@/sections/document-appraisal/ItemSlider'
import {filter} from '@/types/dataAppraisal.interface'
import {Dispatch, SetStateAction} from 'react'

interface value {
  value: number
  percent: number
}

interface OtherInfoSlidersSectionProps {
  otherInformation: filter
  valueBudget: value
  setValueBudget: Dispatch<SetStateAction<value>>
  valuePossibility: value
  setValuePossibility: Dispatch<SetStateAction<value>>
  valueTotalAssets: value
  setValueTotalAssets: Dispatch<SetStateAction<value>>
  valueAge: value
  setValueAge: Dispatch<SetStateAction<value>>
  valueNumberOfChildren: value
  setValueNumberOfChildren: Dispatch<SetStateAction<value>>
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
