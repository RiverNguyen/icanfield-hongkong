'use client'

import {memo} from 'react'
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useLocale} from 'next-intl'
import PhoneInput from './PhoneInput'
import {Control, UseFormSetValue} from 'react-hook-form'

interface BasicInfoSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  defaultCalling?: string
  t: (k: string) => string
}

function BasicInfoSectionComponent({
  control,
  setValue,
  defaultCalling,
  t,
}: BasicInfoSectionProps) {
  const locale = useLocale()

  return (
    <div className='space-y-[2rem] rounded-[1.25rem] bg-white p-[2.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-[1.5rem] xsm:p-[2.375rem_1.125rem_1.125rem_1.125rem]'>
      <h3 className='font-optima text-brown heading3 xsm:heading1'>
        {t('thong_tin_co_ban')}
      </h3>
      <div className='flex items-center sm:space-x-[2rem] xsm:flex-col xsm:space-y-[1.5rem]'>
        <FormField
          control={control}
          name='username'
          render={({field}) => (
            <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
              <FormControl>
                <Input
                  placeholder=''
                  className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              {!field?.value && (
                <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                  {t('ho_ten')}
                  <span>*</span>
                </p>
              )}
              <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='phone'
          render={({field}) => (
            <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
              <div className='flex items-center gap-2'>
                <PhoneInput
                  value={field.value}
                  setValue={setValue}
                  defaultCalling={defaultCalling}
                  locale={locale}
                />
              </div>
              <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
            </FormItem>
          )}
        />
      </div>
      <div className='flex items-center sm:space-x-[2rem] xsm:flex-col xsm:space-y-[1.5rem]'>
        <FormField
          control={control}
          name='email'
          render={({field}) => (
            <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
              <FormControl>
                <Input
                  placeholder=''
                  className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              {!field?.value && (
                <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                  {t('email')}
                  <span>*</span>
                </p>
              )}
              <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='location'
          render={({field}) => (
            <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
              <FormControl>
                <Input
                  placeholder=''
                  className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              {!field?.value && (
                <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                  {t('tinh_thanh_pho')}
                </p>
              )}
              <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default memo(BasicInfoSectionComponent)
