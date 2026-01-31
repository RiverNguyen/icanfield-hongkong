'use client'

import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {isLockScroll} from '@/hooks/useBodyScrollLock'
import {cn} from '@/lib/utils'
import {Term} from '@/types/dataAppraisal.interface'
import {Control, UseFormSetValue} from 'react-hook-form'
import {Input} from '@/components/ui/input'

interface EducationAndManagementSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  uniqueEducationLevels: Term[]
  uniqueManagementExperiences: Term[]
  uniqueInvestmentPurpose: Term[]
  isMobile: boolean
  t: (_key: string) => string
  dataPopupMb: {
    nation: boolean
    visapurpose: boolean
    educationlevel: boolean
    languageproficiency: boolean
    managementexperience: boolean
  }
  setDataPopupMb: (
    _v: EducationAndManagementSectionProps['dataPopupMb'],
  ) => void
  textEducationlevel: string
  setTextEducationlevel: (v: string) => void
  textManagementexperience: string
  setTextManagementexperience: (v: string) => void
}

export default function EducationAndManagementSection({
  control,
  setValue,
  uniqueEducationLevels,
  uniqueManagementExperiences,
  uniqueInvestmentPurpose,
  isMobile,
  t,
  dataPopupMb,
  setDataPopupMb,
  textEducationlevel,
  setTextEducationlevel,
  textManagementexperience,
  setTextManagementexperience,
}: EducationAndManagementSectionProps) {
  // reference unused props to avoid linter unused errors
  void uniqueManagementExperiences
  void textManagementexperience
  void setTextManagementexperience
  return (
    <div className='mt-[1.75rem] flex w-full items-center sm:space-x-[1.5rem] xsm:mt-[1.5rem] xsm:flex-col'>
      <FormField
        control={control}
        name='visapurpose'
        render={({field}) => (
          <FormItem className='mb-[1.75rem] flex-1 xsm:relative xsm:mb-[1.5rem] xsm:w-full'>
            <Select
              disabled={isMobile}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl className='h-[3rem] justify-start whitespace-normal rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:!opacity-100 [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start [&>span]:body16-m [&>div]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>span]:[&[data-placeholder]]:hidden'>
                <SelectTrigger>
                  {isMobile ? (
                    !field.value && (
                      <p className='hidden text-start text-greyscaletext-800 body16-m'>
                        {t('muc_dich_visa')}
                        <span className='text-errtext'>*</span>
                      </p>
                    )
                  ) : (
                    <p className='hidden text-start text-greyscaletext-800 body16-m'>
                      {t('muc_dich_visa')}
                      <span className='text-errtext'>*</span>
                    </p>
                  )}
                  <SelectValue placeholder='' />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                {uniqueInvestmentPurpose.map((e: Term, index: number) => (
                  <SelectItem
                    key={'investment-purpose' + e.slug + index}
                    className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                    value={e.slug}
                  >
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div
              onClick={() => {
                if (isMobile) {
                  setDataPopupMb({
                    ...dataPopupMb,
                    visapurpose: true,
                  })
                  isLockScroll(true)
                }
              }}
              className='absolute left-0 top-0 z-40 size-full bg-transparent sm:hidden'
            ></div>
            <div
              className={cn(
                'fixed bottom-0 left-0 z-[52] !mt-0 max-h-[60vh] w-full translate-y-[calc(100%+2rem)] overflow-hidden overflow-y-auto rounded-[0.5rem_0.5rem_0_0] bg-white p-[1rem] transition-all sm:hidden',
                dataPopupMb?.visapurpose && 'translate-y-0 shadow-inner',
              )}
            >
              {[
                'study',
                'work',
                'investment',
                'family',
                'tourism',
                'other',
              ].map((slug) => (
                <p
                  key={slug}
                  className={cn(
                    'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                    field?.value === slug && 'bg-background',
                  )}
                  onClick={() => {
                    setValue('visapurpose', slug, {shouldValidate: true})
                    setDataPopupMb({...dataPopupMb, visapurpose: false})
                    isLockScroll(false)
                  }}
                >
                  {slug === 'study'
                    ? 'Study'
                    : slug === 'work'
                      ? 'Work'
                      : slug === 'investment'
                        ? 'Investment'
                        : slug === 'family'
                          ? 'Family'
                          : slug === 'tourism'
                            ? 'Tourism'
                            : 'Other'}
                </p>
              ))}
            </div>
            <div
              className={cn(
                'fixed left-0 top-0 z-[51] !mt-0 hidden h-[100vh] w-full bg-black opacity-[0.5]',
                dataPopupMb?.visapurpose && 'block',
              )}
              onClick={() => {
                setDataPopupMb({
                  ...dataPopupMb,
                  visapurpose: false,
                })
                isLockScroll(false)
              }}
            ></div>
            <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='educationlevel'
        render={({field}) => (
          <FormItem className='mb-[1.75rem] flex-1 xsm:relative xsm:mb-[1.5rem] xsm:w-full'>
            <Select
              disabled={isMobile}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl className='h-[3rem] justify-start whitespace-normal rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:!opacity-100 [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start [&>span]:body16-m [&>div]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>span]:[&[data-placeholder]]:hidden'>
                <SelectTrigger>
                  {isMobile ? (
                    !field.value && (
                      <p className='hidden text-start text-greyscaletext-800 body16-m'>
                        {t('trinh_do_hoc_van')}
                        <span className='text-errtext'>*</span>
                      </p>
                    )
                  ) : (
                    <p className='hidden text-start text-greyscaletext-800 body16-m'>
                      {t('trinh_do_hoc_van')}
                      <span className='text-errtext'>*</span>
                    </p>
                  )}
                  {isMobile && field.value && (
                    <div className='hidden flex-1 text-start text-greyscaletext-800 body16-m'>
                      {textEducationlevel}
                    </div>
                  )}
                  <SelectValue placeholder='' />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                {uniqueEducationLevels.map((e: Term, index: number) => (
                  <SelectItem
                    key={e?.slug ?? `edu-${index}`}
                    className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                    value={e?.slug}
                  >
                    {e?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div
              onClick={() => {
                if (isMobile) {
                  setDataPopupMb({
                    ...dataPopupMb,
                    educationlevel: true,
                  })
                  isLockScroll(true)
                }
              }}
              className='absolute left-0 top-0 z-40 size-full bg-transparent sm:hidden'
            ></div>
            <div
              className={cn(
                'fixed bottom-0 left-0 z-[52] !mt-0 max-h-[60vh] w-full translate-y-[calc(100%+2rem)] overflow-hidden overflow-y-auto rounded-[0.5rem_0.5rem_0_0] bg-white p-[1rem] transition-all sm:hidden',
                dataPopupMb?.educationlevel && 'translate-y-0 shadow-inner',
              )}
            >
              {uniqueEducationLevels.map((e: Term, index: number) => (
                <p
                  key={e?.slug ?? `edu-mb-${index}`}
                  className={cn(
                    'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                    field?.value === e?.slug && 'bg-background',
                  )}
                  onClick={() => {
                    setValue('educationlevel', e?.slug, {
                      shouldValidate: true,
                    })
                    setTextEducationlevel(e?.name)
                    setDataPopupMb({
                      ...dataPopupMb,
                      educationlevel: false,
                    })
                    isLockScroll(false)
                  }}
                >
                  {e?.name}
                </p>
              ))}
            </div>
            <div
              className={cn(
                'fixed left-0 top-0 z-[51] !mt-0 hidden h-[100vh] w-full bg-black opacity-[0.5]',
                dataPopupMb?.educationlevel && 'block',
              )}
              onClick={() => {
                setDataPopupMb({
                  nation: false,
                  visapurpose: false,
                  educationlevel: false,
                  languageproficiency: false,
                  managementexperience: false,
                })
                isLockScroll(false)
              }}
            ></div>
            <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='managementexperience'
        render={({field}) => (
          <FormItem className='mb-[1.75rem] flex-1 xsm:relative xsm:w-full'>
            <FormControl>
              <Input
                placeholder={t('kinh_nghiem_quan_ly')}
                value={field.value ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const digits = String(e.target.value).replace(/\D/g, '')
                  field.onChange(digits)
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                inputMode='numeric'
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
