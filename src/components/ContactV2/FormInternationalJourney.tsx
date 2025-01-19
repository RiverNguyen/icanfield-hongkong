'use client'
import ImageV2 from '@/components/image/ImageV2'
import { SuccessPopup } from '@/components/success-popup'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import CF7Request from '@/fetch/cf7Request'
import { isLockScroll } from '@/hooks/useBodyScrollLock'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import { Term } from '@/types/dataAppraisal.interface'
import endpoints from '@/utils/endpoints'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z
    .string()
    .min(2, {message: 'Tên người dùng phải có ít nhất 2 ký tự.'}) // Tùy chỉnh message cho min
    .max(50, {message: 'Tên người dùng không được vượt quá 50 ký tự.'}) // Thêm ràng buộc max và message
    .nonempty({message: 'Vui lòng nhập tên người dùng.'}), // Tùy chỉnh message cho trường bắt buộc (nonempty)
  email: z
    .string()
    .email({message: 'Địa chỉ email không hợp lệ.'}) // Tùy chỉnh message cho email
    .nonempty({message: 'Vui lòng nhập địa chỉ email.'}), // Tùy chỉnh message cho trường bắt buộc (nonempty)
  phone: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại của bạn')
    .regex(
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{0,14}$/,
      {
        message: 'Định dạng không hợp lệ',
      },
    ),
  mess: z.string().optional(), // Trường không bắt buộc, không cần message bắt buộc
  nationSettlement: z.string({
    required_error: 'Trường này không được để trống.',
  }),
})

const FormInternationalJourney = ({
  dataNationSettlement,
}: {
  dataNationSettlement: Term[]
}) => {
  const isMobile = useIsMobile()
  const [isSubmitting, setIsSubmitting] = useState({
    isSubmitting: false,
    isSuccess: false,
  })
  const [textSelect, setTextSelect] = useState<string>('')
  const [dataPopupMb, setDataPopupMb] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      mess: '',
      phone: '',
    },
  })
  const {setValue} = form
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting({isSubmitting: true, isSuccess: false})

      // Gửi yêu cầu
      const request = new CF7Request(values)
      const response = await request.send(endpoints.contactForm)
      console.log(response)

      // Cập nhật trạng thái khi gửi thành công
      setIsSubmitting({isSubmitting: false, isSuccess: true})
      isLockScroll(true)

      // Đóng popup sau 5 giây
      timeoutRef.current = setTimeout(closePopup, 3500)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      // Đảm bảo trạng thái được cập nhật sau khi hoàn thành
      setIsSubmitting((prev) => ({...prev, isSubmitting: false}))
      form.reset()
    }
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
    <>
      <div className='relative z-20 h-max flex-1 p-[1.5rem_5rem] pl-0 sm:mt-[6.5rem] xsm:p-[1.5rem_1rem_2.5rem_1rem]'>
        <div className='mb-[2rem] space-y-[0.5rem]'>
          <span className='font-semibold text-greyscaletext-body opacity-[0.7] body16 xsm:font-medium xsm:tracking-[-0.015rem] xsm:sub-12'>
            KẾT NỐI VỚI CHÚNG TÔI
          </span>
          <p className='font-optima font-semibold text-brown heading3 xsm:tracking-[-0.045rem] xsm:heading1'>
            Khám Phá Hành Trình Quốc Tế của Bạn
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=''
          >
            <FormField
              control={form.control}
              name='username'
              render={({field}) => (
                <FormItem className='relative space-y-0'>
                  <FormControl>
                    <Input
                      placeholder=''
                      className='h-[3rem] rounded-[0.75rem] border-none bg-white p-[1rem_0.75rem] tracking-[-0.02rem] text-brown shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                  {!field?.value && (
                    <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 [&_span]:text-errtext'>
                      Họ và tên<span>*</span>
                    </p>
                  )}
                  <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                </FormItem>
              )}
            />
            <div className='mt-[1.5rem] flex w-full sm:space-x-[1rem] xsm:mt-[0.75rem] xsm:flex-col xsm:space-y-[0.5rem]'>
              <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem className='relative flex-1 space-y-0'>
                    <FormControl>
                      <Input
                        placeholder=''
                        className='h-[3rem] rounded-[0.75rem] border-none bg-white p-[1rem_0.75rem] tracking-[-0.02rem] text-brown shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        {...field}
                      />
                    </FormControl>
                    {!field?.value && (
                      <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 [&_span]:text-errtext'>
                        Email<span>*</span>
                      </p>
                    )}
                    <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({field}) => (
                  <FormItem className='relative flex-1 space-y-0'>
                    <FormControl>
                      <Input
                        placeholder=''
                        className='h-[3rem] rounded-[0.75rem] border-none bg-white p-[1rem_0.75rem] tracking-[-0.02rem] text-brown shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        {...field}
                      />
                    </FormControl>
                    {!field?.value && (
                      <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 [&_span]:text-errtext'>
                        Số điện thoại<span>*</span>
                      </p>
                    )}
                    <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='nationSettlement'
              render={({field}) => (
                <FormItem className='xsm:relative'>
                  <Select
                    disabled={isMobile}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className='mt-[1.5rem] h-[3rem] rounded-[0.75rem] border-none bg-white p-[1rem_0.75rem] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] xsm:mt-[0.75rem] xsm:!opacity-100 [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5]'>
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
                      {Array.isArray(dataNationSettlement) &&
                        dataNationSettlement?.map((e: Term, index: number) => (
                          <SelectItem
                            key={index}
                            className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                            value={'Chương trình định cư' + e?.slug}
                          >
                            Chương trình định cư {e?.name || ''}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div
                    onClick={() => {
                      if (isMobile) {
                        setDataPopupMb(true)
                        isLockScroll(true)
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
                    {Array.isArray(dataNationSettlement) && dataNationSettlement?.map((e: Term, index: number) => (
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
                          setTextSelect('Chương trình định cư' + e?.name || '')
                          setDataPopupMb(false)
                        }}
                      >
                        Chương trình định cư {e?.name || ''}
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
                      isLockScroll(false)
                    }}
                  ></div>
                  <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mess'
              render={({field}) => (
                <FormItem className='relative mt-[1.5rem] flex-1 space-y-0 xsm:mt-[0.75rem]'>
                  <FormControl>
                    <Textarea
                      placeholder=''
                      className='h-[6.25rem] resize-none rounded-[0.75rem] border-none bg-white p-[1rem_0.75rem] tracking-[-0.02rem] text-brown shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                  {!field?.value && (
                    <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 [&_span]:text-errtext'>
                      Lời nhắn của bạn
                    </p>
                  )}
                  <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isSubmitting?.isSubmitting}
              className='mt-[1.5rem] h-[3rem] w-max gap-0 space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] p-[0.5rem_0.75rem_0.5rem_1.5rem] xsm:w-full'
            >
              <p className='tracking-[-0.0175rem] text-white body-14-m'>
                Gửi thông tin
              </p>
              <ImageV2
                className={cn('size-[1.5rem]', {
                  hidden: isSubmitting.isSubmitting,
                })}
                src={'/icons/homepage/footer/icon-arow.svg'}
                alt=''
                width={40}
                height={40}
              />
              <LoadingSpinner
                className={cn('size-[1.5rem] text-white', {
                  hidden: !isSubmitting.isSubmitting,
                })}
              />
            </Button>
          </form>
        </Form>
      </div>
      <SuccessPopup
        setActive={closePopup}
        active={isSubmitting.isSuccess}
      />
    </>
  )
}

export default FormInternationalJourney

function LoadingSpinner({className}: {className?: string}) {
  return (
    <div role='status'>
      <svg
        aria-hidden='true'
        className={cn(
          'h-8 w-8 animate-spin fill-brown text-gray-200 dark:text-gray-600',
          className,
        )}
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
