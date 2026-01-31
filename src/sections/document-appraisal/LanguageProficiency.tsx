'use client'

/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// runtime certificates only (fetched). No static LANGUAGE_CERTIFICATES import.
import {isLockScroll} from '@/hooks/useBodyScrollLock'
import {cn} from '@/lib/utils'
import {UseFormSetValue, Control, useFormContext} from 'react-hook-form'
import {useEffect, useState} from 'react'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Button} from '@/components/ui/button'
import fetchData from '@/fetch/fetchData'

interface ICertificate {
  name: string
  type: 'number' | 'text'
  labels:
    | boolean
    | {
        label: string
      }[]
}

export default function LanguageProficiency({
  control,
  setValue,
  watch,
  isMobile,
  t,
  dataPopupMb,
  setDataPopupMb,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: (_name: string) => any
  isMobile: boolean
  t: (_k: string) => string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataPopupMb: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDataPopupMb: (_v: any) => void
}) {
  const [certificate, setCertificate] = useState<ICertificate[]>()
  const languageProficiencyType = watch('languageproficiencytype')
  const languageProficiencySelected = watch('languageproficiency')
  const {clearErrors} = useFormContext()

  useEffect(() => {
    const fetchCertificate = async () => {
      const res = await fetchData({
        api: '/smart-form/certificate',
      })
      setCertificate(res)
    }
    fetchCertificate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // clear validation for selection when user picks a certificate
    if (languageProficiencySelected) {
      try {
        clearErrors(['languageproficiency'])
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageProficiencySelected])
  const [popoverOpen, setPopoverOpen] = useState(false)
  useEffect(() => {
    const score = watch('languageproficiency_score')
    if (score !== undefined && score !== null && String(score).trim() !== '') {
      try {
        clearErrors(['languageproficiency_score'])
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('languageproficiency_score')])
  const runtimeCerts = (certificate ?? []).map((c: ICertificate) => {
    const scale = c.type === 'number' ? 'number' : 'enum'
    const values =
      Array.isArray(c.labels) && c.labels.length > 0
        ? (c.labels as {label: string}[]).map((l) => String(l.label))
        : undefined
    return {
      name: c.name,
      scale,
      values,
    }
  })

  const mergedCertificates = runtimeCerts

  const selectedCertConfig =
    mergedCertificates.find(
      (c: {name: string}) => c.name === languageProficiencySelected,
    ) ?? undefined

  return (
    <>
      <FormField
        control={control}
        name='languageproficiencytype'
        render={({field}) => (
          <FormItem className='relative mb-[1.75rem] flex-1 xsm:mb-[1.5rem] xsm:w-full'>
            <Select
              disabled={isMobile}
              onValueChange={(val) => {
                field.onChange(val)
                // update languageproficiency accordingly
                if (val === 'certificate') {
                  setValue('languageproficiency', '', {shouldValidate: true})
                  setValue('languageproficiency_score', '', {
                    shouldValidate: true,
                  })
                  // keep effective_from for certificate (no reset)
                } else if (val === 'none') {
                  setValue('languageproficiency', 'None', {
                    shouldValidate: true,
                  })
                  setValue('languageproficiency_score', null, {
                    shouldValidate: true,
                  })
                  // reset effective from when not certificate
                  try {
                    setValue('languageproficiency_effective_from', undefined, {
                      shouldValidate: false,
                    })
                  } catch {
                    // ignore
                  }
                } else {
                  setValue('languageproficiency', 'Basic communication', {
                    shouldValidate: true,
                  })
                  setValue('languageproficiency_score', null, {
                    shouldValidate: true,
                  })
                  // reset effective from when not certificate
                  try {
                    setValue('languageproficiency_effective_from', undefined, {
                      shouldValidate: false,
                    })
                  } catch {
                    // ignore
                  }
                }
              }}
              value={field.value ?? ''}
            >
              <FormControl className='h-[3rem] justify-start whitespace-normal rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:!opacity-100 [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start [&>span]:body16-m [&>div]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>span]:[&[data-placeholder]]:hidden'>
                <SelectTrigger>
                  {isMobile ? (
                    !field.value && (
                      <p className='line-clamp-1 hidden whitespace-nowrap text-start text-greyscaletext-800 body16-m'>
                        {t('chon_hinh_thuc_ngoai_ngu')}
                        <span className='text-errtext'>*</span>
                      </p>
                    )
                  ) : (
                    <p className='line-clamp-1 hidden text-start text-greyscaletext-800 body16-m'>
                      <span className='whitespace-nowrap'>
                        {t('chon_hinh_thuc_ngoai_ngu')}
                      </span>
                      <span className='text-errtext'>*</span>
                    </p>
                  )}
                  <SelectValue placeholder='' />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                <SelectItem
                  className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                  value='none'
                >
                  {t('khong')}
                </SelectItem>
                <SelectItem
                  className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                  value='basic'
                >
                  {t('giao_tiep_co_ban')}
                </SelectItem>
                <SelectItem
                  className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                  value='certificate'
                >
                  {t('chung_chi')}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='languageproficiency'
        render={({field}) => (
          <FormItem className='mb-[1.75rem] flex-1 xsm:relative xsm:w-full'>
            <Select
              disabled={isMobile || languageProficiencyType !== 'certificate'}
              onValueChange={(val) => {
                field.onChange(val)
                try {
                  // value is certificate name now
                  setValue('languageproficiency_score', '', {
                    shouldValidate: false,
                  })
                } catch {
                  // ignore
                }
              }}
              value={field.value ?? ''}
            >
              <FormControl className='h-[3rem] justify-start whitespace-normal rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:!opacity-100 [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start [&>span]:body16-m [&>div]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>span]:[&[data-placeholder]]:hidden'>
                <SelectTrigger>
                  {isMobile ? (
                    !field.value && (
                      <p className='line-clamp-1 hidden text-start text-greyscaletext-800 body16-m'>
                        {t('trinh_do_ngoai_ngu')}
                      </p>
                    )
                  ) : (
                    <p className='line-clamp-1 hidden text-start text-greyscaletext-800 body16-m'>
                      {t('trinh_do_ngoai_ngu')}
                    </p>
                  )}
                  <SelectValue placeholder='' />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]'>
                {mergedCertificates.map((c: {name: string}, index: number) => (
                  <SelectItem
                    key={c.name ?? `lang-${index}`}
                    value={c.name}
                    className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div
              onClick={() => {
                if (isMobile && languageProficiencyType === 'certificate') {
                  setDataPopupMb({...dataPopupMb, languageproficiency: true})
                  isLockScroll(true)
                }
              }}
              className='absolute left-0 top-0 z-40 size-full bg-transparent sm:hidden'
            ></div>
            <div
              className={cn(
                'fixed bottom-0 left-0 z-[52] !mt-0 max-h-[60vh] w-full translate-y-[calc(100%+2rem)] overflow-hidden overflow-y-auto rounded-[0.5rem_0.5rem_0_0] bg-white p-[1rem] transition-all sm:hidden',
                dataPopupMb?.languageproficiency &&
                  'translate-y-0 shadow-inner',
              )}
            >
              {mergedCertificates.map((c: {name: string}, index: number) => (
                <p
                  key={c.name ?? `lang-mb-${index}`}
                  className={cn(
                    'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                    field?.value === c.name && 'bg-background',
                  )}
                  onClick={() => {
                    if (languageProficiencyType === 'certificate') {
                      setValue('languageproficiency', c.name, {
                        shouldValidate: true,
                      })
                      setValue('languageproficiency_score', '', {
                        shouldValidate: false,
                      })
                      setDataPopupMb({
                        ...dataPopupMb,
                        languageproficiency: false,
                      })
                      isLockScroll(false)
                    }
                  }}
                >
                  {c.name}
                </p>
              ))}
            </div>
            <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
          </FormItem>
        )}
      />

      <div className='mb-[1.75rem] flex flex-1 xsm:relative xsm:w-full'>
        <FormField
          control={control}
          name='languageproficiency_score'
          render={({field}) => (
            <FormItem className='relative mr-1 flex-1 xsm:w-full'>
              <FormControl>
                {selectedCertConfig?.scale === 'enum' ? (
                  <Select
                    disabled={
                      isMobile || languageProficiencyType !== 'certificate'
                    }
                    onValueChange={(val) => {
                      setValue('languageproficiency_score', val, {
                        shouldValidate: true,
                      })
                    }}
                    value={field.value ?? ''}
                  >
                    <FormControl className='h-[3rem] justify-start whitespace-normal rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:!opacity-100 [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start [&>span]:body16-m [&>div]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>span]:[&[data-placeholder]]:hidden'>
                      <SelectTrigger>
                        {isMobile ? (
                          !field.value && (
                            <p className='hidden text-start text-greyscaletext-800 body16-m'>
                              {t('diem')}
                            </p>
                          )
                        ) : (
                          <p className='hidden text-start text-greyscaletext-800 body16-m'>
                            {t('diem')}
                          </p>
                        )}
                        <SelectValue placeholder='' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                      {selectedCertConfig?.values?.map((v: string) => (
                        <SelectItem
                          className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                          key={v}
                          value={v}
                        >
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    disabled={languageProficiencyType !== 'certificate'}
                    placeholder={
                      selectedCertConfig?.name &&
                      selectedCertConfig.name.toLowerCase().includes('ielts')
                        ? t('vi_du_diem_ielts')
                        : selectedCertConfig?.name &&
                            selectedCertConfig.name
                              .toLowerCase()
                              .includes('clb')
                          ? t('vi_du_diem_clb')
                          : t('vi_du_diem')
                    }
                    value={field.value ?? ''}
                    onChange={(e) => {
                      let v = String(e.target.value)
                      // allow numbers with optional single decimal point
                      v = v.replace(/[^0-9.]/g, '')
                      const firstDot = v.indexOf('.')
                      if (firstDot !== -1) {
                        v =
                          v.slice(0, firstDot + 1) +
                          v.slice(firstDot + 1).replace(/\./g, '')
                      }
                      setValue('languageproficiency_score', v, {
                        shouldValidate: true,
                      })
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                  />
                )}
              </FormControl>
              <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='languageproficiency_effective_from'
          render={({field}) => (
            <FormItem className='relative flex-1 xsm:w-full'>
              <FormControl>
                <Popover
                  open={popoverOpen}
                  onOpenChange={setPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='ghost'
                      className='h-[3rem] w-full justify-start rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] text-left text-brown body16 placeholder:text-greyscaletext-200 xsm:h-[2.5rem] xsm:rounded-[0.5rem]'
                      disabled={languageProficiencyType !== 'certificate'}
                    >
                      {field.value ? (
                        new Date(field.value).toLocaleDateString()
                      ) : (
                        <span className='text-greyscaletext-800 opacity-50 body16'>
                          {t('hieu_luc_tu') || 'Effective from'}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side='bottom'
                    align='start'
                    className='w-auto p-0'
                  >
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date instanceof Date && !isNaN(date.getTime())) {
                          const iso = date.toISOString().split('T')[0]
                          field.onChange(iso)
                          setPopoverOpen(false)
                        } else {
                          field.onChange(undefined)
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
