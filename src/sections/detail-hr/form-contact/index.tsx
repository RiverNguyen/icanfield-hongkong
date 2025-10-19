'use client'
import {SubmitHandler, useForm} from 'react-hook-form'
import z from 'zod'
import InputGroup from './InputGroup'
import Image from 'next/image'
import {zodResolver} from '@hookform/resolvers/zod'
import './style.css'
import {toast} from 'sonner'

const vietnamPhoneRegex =
  /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/

const contactSchema = z.object({
  fullName: z.string().min(1, {message: 'Họ và tên bắt buộc'}),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().regex(vietnamPhoneRegex, {
    message: 'Số điện thoại không hợp lệ',
  }),
  message: z.string().optional(),
})

type Contact = z.infer<typeof contactSchema>

export default function FormContact({title}: {title: string}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful},
  } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit: SubmitHandler<Contact> = (data) => {
    console.log(data)
    toast.success('Đã gửi liên hệ')
    reset()
  }

  return (
    <div className='absolute left-1/2 top-[calc(100%-15.28rem)] z-30 -translate-x-1/2 xsm:top-[calc(100%-19.69rem)]'>
      <div className='w-[90rem] rounded-[1.25rem] bg-[#F6F6F4] px-20 py-10 xsm:w-[21.4375rem] xsm:px-4 xsm:py-5'>
        <div
          dangerouslySetInnerHTML={{__html: title}}
          className='footer-title mb-8 xsm:mb-5'
        ></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-3 gap-x-4 gap-y-6 xsm:grid-cols-1 xsm:gap-4'
        >
          <InputGroup
            placeholder='Họ và tên'
            id='fullName'
            {...register('fullName')}
            error={errors.fullName?.message}
            isSubmitSuccessful={isSubmitSuccessful}
            autoComplete='off'
            required
          />
          <InputGroup
            placeholder='Email'
            id='email'
            {...register('email')}
            error={errors.email?.message}
            isSubmitSuccessful={isSubmitSuccessful}
            autoComplete='off'
            required
          />
          <InputGroup
            placeholder='Số điện thoại'
            id='phone'
            {...register('phone')}
            error={errors.phone?.message}
            isSubmitSuccessful={isSubmitSuccessful}
            autoComplete='off'
            required
          />
          <textarea
            id='message'
            {...register('message')}
            className='col-span-3 h-[6.25rem] w-full rounded-xl border border-transparent bg-white py-3 pl-4 pr-2 text-base leading-[150%] text-greyscaletext-body shadow-[0_2px_10px_0_rgba(0,0,0,0.05)] outline-none transition-all duration-300 ease-in-out focus:border-Phase-1-Brown xsm:col-span-1'
            placeholder='Lời nhắn của bạn'
          ></textarea>
          <div className='col-span-3 xsm:col-span-1'>
            <button
              type='submit'
              className='h-12 space-x-2 rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] py-2 pl-6 pr-3 text-sm font-medium leading-[150%] tracking-[-0.0175rem] text-white flex-center xsm:w-full'
            >
              <span>Gửi thông tin</span>
              <Image
                src={'/icons/arrow-right.svg'}
                alt='Arrow Right'
                width={24}
                height={24}
                className='size-6 object-cover'
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
