'use client'
import {cn} from '@/lib/utils'
import React, {ChangeEvent, ForwardedRef, forwardRef, useState} from 'react'

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  wrapperClassName?: string
}

export default forwardRef(function InputGroup(
  {wrapperClassName, label, error, required, ...props}: InputGroupProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className={cn(wrapperClassName)}>
      <div className='relative'>
        <input
          type='text'
          {...props}
          ref={ref}
          onChange={onChange}
          className={cn(
            'w-full rounded-xl border border-transparent bg-white py-3 pl-4 pr-2 text-base leading-[150%] text-greyscaletext-body shadow-[0_2px_10px_0_rgba(0,0,0,0.05)] outline-none transition-all duration-300 ease-in-out focus:border-Phase-1-Brown',
            error && 'border-[#EA3434] focus:border-[#EA3434]',
          )}
        />
        <label
          htmlFor={props.id}
          className={cn(
            'absolute left-4 top-1/2 flex -translate-y-1/2 items-start',
            value && 'hidden',
          )}
        >
          <span className='text-base leading-[150%] tracking-[-0.02rem] text-[#A1A1A1]'>
            {label}
          </span>
          {required && (
            <span className='text-base leading-[150%] tracking-[-0.02rem] text-[#EA3434]'>
              *
            </span>
          )}
        </label>
      </div>
      {error && <p className='mt-1 text-sm text-[#EA3434]'>{error}</p>}
    </div>
  )
})
