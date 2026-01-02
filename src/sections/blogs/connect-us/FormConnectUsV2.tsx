'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {SuccessPopup} from '@/components/success-popup'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import CF7Request from '@/fetch/cf7Request'
import {isLockScroll} from '@/hooks/useBodyScrollLock'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {Term} from '@/sections/homepage/banner/bannerHp.interface'
import endpoints from '@/utils/endpoints'
import {useRef, useState, useTransition} from 'react'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Trường này ít nhất phải có 2 ký tự.',
  }),
  email: z.string().email({message: 'Địa chỉ email không hợp lệ.'}),
  phone: z
    .string()
    .min(1, {message: 'Trường này không được để trống.'})
    .regex(
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{0,14}$/,
      {message: 'Định dạng không hợp lệ'},
    ),
  mess: z.string(),
  nationSettlement: z.string({
    required_error: 'Trường này không được để trống.',
  }),
})

const FormConnectUsV2 = ({dataTaxonomies}: {dataTaxonomies: Term[]}) => {
  const isMobile = useIsMobile()
  const [focus, setFocus] = useState({
    fullName: false,
    email: false,
    phone: false,
  })
  const [isSubmitting, setIsSubmitting] = useState({
    isSubmitting: false,
    isSuccess: false,
  })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [textSelect, setTextSelect] = useState<string>('')
  const [isPending, setTransition] = useTransition()
  const [dataPopupMb, setDataPopupMb] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      mess: '',
      nationSettlement: '',
    },
  })
  const {setValue} = form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      const request = new CF7Request(values)
      await request.send(endpoints.contactForm)
      setIsSubmitting({isSubmitting: false, isSuccess: true})
      isLockScroll(true)
      timeoutRef.current = setTimeout(closePopup, 5000)
      form.reset()
    })
  }
  const closePopup = () => {
    isLockScroll(false)
    setIsSubmitting((prev) => ({...prev, isSuccess: false}))

    // Clear the timeout reference
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }
  return (
    <div className='relative h-fit w-full'>
      <h2 className='mb-[2rem] font-optima font-semibold text-Phase-1-Brown heading2 xsm:mb-[1.88rem] xsm:text-[1.5rem]'>
        Hãy kết nối với chúng tôi
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[1.5rem]'
        >
          <FormField
            control={form.control}
            name='username'
            render={({field}) => (
              <FormItem className='relative space-x-0 space-y-0'>
                <FormLabel
                  className={cn(
                    'absolute left-[1rem] top-1/2 flex -translate-y-1/2 items-center font-normal -tracking-[0.02rem] transition-all duration-200 body16',
                    (focus.fullName || field.value) &&
                      'pointer-events-none opacity-0',
                  )}
                >
                  <span className='text-greyscaletext-200'>Họ và tên</span>
                  <span className='text-errtext'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className='flex h-[3rem] w-full items-center rounded-[0.5rem] border border-solid border-[#0000001A] bg-[#F3F3F3] font-medium -tracking-[0.02rem] body16 xsm:h-[2.75rem]'
                    type='text'
                    {...field}
                    onFocus={() =>
                      setFocus((prev) => ({...prev, fullName: true}))
                    }
                    onBlur={() =>
                      setFocus((prev) => ({...prev, fullName: false}))
                    }
                  />
                </FormControl>
                <FormMessage className='absolute bottom-[-0.2rem] left-0 translate-y-full text-errtext xsm:-bottom-[0.1rem]' />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 sm:gap-x-[1rem] xsm:grid-cols-1 xsm:gap-y-[1.5rem]'>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem className='relative space-x-0 space-y-0'>
                  <FormLabel
                    className={cn(
                      'absolute left-[1rem] top-1/2 flex -translate-y-1/2 items-center font-normal -tracking-[0.02rem] transition-all duration-200 body16',
                      (focus.email || field.value) &&
                        'pointer-events-none opacity-0',
                    )}
                  >
                    <span className='text-greyscaletext-200'>Email</span>
                    <span className='text-errtext'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='flex h-[3rem] w-full items-center rounded-[0.5rem] border border-solid border-[#0000001A] bg-[#F3F3F3] font-medium -tracking-[0.02rem] body16 xsm:h-[2.75rem]'
                      type='text'
                      {...field}
                      onFocus={() =>
                        setFocus((prev) => ({...prev, email: true}))
                      }
                      onBlur={() =>
                        setFocus((prev) => ({...prev, email: false}))
                      }
                    />
                  </FormControl>
                  <FormMessage className='absolute bottom-[-0.2rem] left-0 translate-y-full text-errtext xsm:-bottom-[0.1rem]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({field}) => (
                <FormItem className='relative space-x-0 space-y-0'>
                  <FormLabel
                    className={cn(
                      'absolute left-[1rem] top-1/2 flex -translate-y-1/2 items-center font-normal -tracking-[0.02rem] transition-all duration-200 body16',
                      (focus.phone || field.value) &&
                        'pointer-events-none opacity-0',
                    )}
                  >
                    <span className='text-greyscaletext-200'>
                      Số điện thoại
                    </span>
                    <span className='text-errtext'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='flex h-[3rem] w-full items-center rounded-[0.5rem] border border-solid border-[#0000001A] bg-[#F3F3F3] font-medium -tracking-[0.02rem] body16 xsm:h-[2.75rem]'
                      type='tel'
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        // Use a regex to remove any non-numeric characters
                        const filteredValue = value.replace(/[^\d]/g, '')
                        field.onChange(filteredValue)
                      }}
                      onFocus={() =>
                        setFocus((prev) => ({...prev, phone: true}))
                      }
                      onBlur={() =>
                        setFocus((prev) => ({...prev, phone: false}))
                      }
                    />
                  </FormControl>
                  <FormMessage className='absolute bottom-[-0.2rem] left-0 translate-y-full text-errtext xsm:-bottom-[0.1rem]' />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='nationSettlement'
            render={({field}) => (
              <FormItem className='relative'>
                <Select
                  disabled={isMobile}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='mt-[1.5rem] h-[3rem] rounded-[0.75rem] border border-solid border-[#0000001A] bg-[#F3F3F3] p-[1rem_0.75rem] xsm:mt-[0.75rem] xsm:!opacity-100 [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5]'>
                    <SelectTrigger>
                      {isMobile ? (
                        !field.value && (
                          <p className='hidden text-start text-greyscaletext-800 body16-m'>
                            Chương trình định cư bạn quan tâm
                            <span className='text-errtext'>*</span>
                          </p>
                        )
                      ) : (
                        <p className='hidden text-start text-greyscaletext-800 body16-m'>
                          Chương trình định cư bạn quan tâm
                          <span className='text-errtext'>*</span>
                        </p>
                      )}
                      {isMobile && field.value && (
                        <div className='text-start text-greyscaletext-800 body16-m'>
                          {textSelect}
                        </div>
                      )}
                      <SelectValue placeholder='' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                    {dataTaxonomies?.map((e: Term, index: number) => (
                      <SelectItem
                        key={index}
                        className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                        value={'Chương trình định cư' + e?.slug}
                      >
                        Chương trình định cư {e?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div
                  onClick={() => {
                    if (isMobile) {
                      setDataPopupMb(true)
                    }
                  }}
                  className='absolute left-0 top-0 z-40 size-full bg-transparent sm:hidden'
                ></div>
                <div
                  className={cn(
                    'fixed bottom-0 left-0 z-[49] !mt-0 max-h-[60vh] w-full translate-y-[calc(100%+2rem)] overflow-hidden overflow-y-auto rounded-[0.5rem_0.5rem_0_0] bg-white p-[1rem] transition-all sm:hidden',
                    dataPopupMb && 'translate-y-0 shadow-inner',
                  )}
                >
                  {dataTaxonomies?.map((e: Term, index: number) => (
                    <p
                      key={index}
                      className={cn(
                        'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                        field?.value === e?.slug && 'bg-background',
                      )}
                      onClick={() => {
                        setValue(
                          'nationSettlement',
                          'Chương trình định cư' + e?.slug,
                          {shouldValidate: true},
                        )
                        setTextSelect('Chương trình định cư' + e?.name)
                        setDataPopupMb(false)
                      }}
                    >
                      Chương trình định cư {e?.name}
                    </p>
                  ))}
                </div>
                <div
                  className={cn(
                    'fixed left-0 top-0 z-[48] hidden h-[100vh] w-full bg-black opacity-[0.5]',
                    dataPopupMb && 'block',
                  )}
                  onClick={() => {
                    setDataPopupMb(false)
                  }}
                ></div>
                <FormMessage className='absolute bottom-[-0.2rem] left-0 translate-y-full text-errtext xsm:-bottom-[0.1rem]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mess'
            render={({field}) => (
              <FormItem className='relative space-x-0 space-y-0'>
                <FormControl>
                  <Input
                    className='flex h-[3rem] w-full items-center rounded-[0.5rem] border border-solid border-[#0000001A] bg-[#F3F3F3] font-medium -tracking-[0.02rem] body16 placeholder:text-[1rem] placeholder:font-normal placeholder:leading-normal placeholder:-tracking-[0.02rem] placeholder:text-greyscaletext-200 xsm:h-[2.75rem]'
                    type='text'
                    placeholder='Lời nhắn của bạn'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            className={cn(
              'flex h-[3rem] w-fit min-w-[9.5rem] items-center justify-center rounded-[0.5rem] bg-btn-gradient px-[0.75rem] pl-[1.5rem]',
              isPending && 'px-[1.5rem]',
            )}
          >
            {isPending ? (
              <ICLoading />
            ) : (
              <>
                <span className='body14 font-medium -tracking-[0.0175rem] text-white'>
                  Gửi thông tin
                </span>
                <ICArrow className='ml-[0.5rem] size-[1.5rem] flex-shrink-0' />
              </>
            )}
          </button>
        </form>
      </Form>
      <SuccessPopup
        setActive={closePopup}
        active={isSubmitting.isSuccess}
      />
    </div>
  )
}

export default FormConnectUsV2

const ICArrow = ({className}: {className?: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M7 12H17M17 12L13 8M17 12L13 16'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export const ICLoading = ({className}: {className?: string}) => {
  return (
    <svg
      className={cn('h-[2rem] w-[2rem] animate-spin text-white', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      ></circle>
      <path
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  )
}
