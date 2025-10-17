'use client'
import {SubmitHandler, useForm} from 'react-hook-form'
import z from 'zod'
import InputGroup from './InputGroup'
import Image from 'next/image'
import {zodResolver} from '@hookform/resolvers/zod'
import './style.css'

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

export default function FormContact() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit: SubmitHandler<Contact> = (data) => {
    console.log(data)
  }

  return (
    <div className='absolute bottom-[-11.36rem] left-1/2 z-30 -translate-x-1/2 xsm:bottom-[-10.99rem]'>
      <div className='w-[90rem] rounded-[1.25rem] bg-[#F6F6F4] px-20 py-10 xsm:w-[21.4375rem] xsm:px-4 xsm:py-5'>
        <div className='mb-8 xsm:mb-5'>
          <h3 className='mb-2 text-base font-semibold uppercase leading-[150%] text-greyscaletext-body opacity-70 xsm:text-sm xsm:leading-[140%] xsm:tracking-[-0.0175rem]'>
            KẾT NỐI VỚI CHÚNG TÔI
          </h3>
          <h2 className='font-optima font-semibold text-Phase-1-Brown heading3 xsm:text-[1.125rem] xsm:tracking-[-0.0225rem]'>
            Khám Phá Hành Trình Quốc Tế của Bạn
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-3 gap-x-4 gap-y-6 xsm:grid-cols-1 xsm:gap-4'
        >
          <InputGroup
            label='Họ và tên'
            id='fullName'
            {...register('fullName')}
            error={errors.fullName?.message}
            required
          />
          <InputGroup
            label='Email'
            id='email'
            {...register('email')}
            error={errors.email?.message}
            required
          />
          <InputGroup
            label='Số điện thoại'
            id='phone'
            {...register('phone')}
            error={errors.phone?.message}
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
