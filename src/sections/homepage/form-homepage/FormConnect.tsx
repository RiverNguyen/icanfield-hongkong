'use client'
import {Button} from '@/components/ui/button'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {z} from 'zod'
import {Textarea} from '@/components/ui/textarea'
import ImageV2 from '@/components/image/ImageV2'
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
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{10}$/,
      {
        message: 'Định dạng không hợp lệ',
      },
    ),
  mess: z.string().optional(), // Trường không bắt buộc, không cần message bắt buộc
})

const FormConnect = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      mess: '',
      phone: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className='flex-1 p-[1.5rem_5rem] xsm:p-[1.5rem_1rem_2.5rem_1rem] pl-0 h-max sm:mt-[6.5rem] relative z-20'>
      <div className='space-y-[0.5rem] mb-[2rem]'>
        <span className='body16 xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem] text-greyscaletext-body opacity-[0.7] font-semibold'>
          KẾT NỐI VỚI CHÚNG TÔI
        </span>
        <p className='text-brown font-optima heading3 xsm:heading1 font-semibold xsm:tracking-[-0.045rem]'>
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
                    className='p-[1rem_0.75rem] h-[3rem] body16 tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] rounded-[0.75rem] border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                {!field?.value && (
                  <p className='pointer-events-none absolute top-[0.75rem] left-[1rem] body16 tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                    Họ và tên<span>*</span>
                  </p>
                )}
                <FormMessage className='body16 tracking-[-0.02rem] text-errtext !mt-[0.5rem]' />
              </FormItem>
            )}
          />
          <div className='flex space-x-[1rem] xsm:space-x-[0.5rem] w-full mt-[1.5rem] xsm:mt-[0.75rem]'>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem className='relative space-y-0 flex-1'>
                  <FormControl>
                    <Input
                      placeholder=''
                      className='p-[1rem_0.75rem] h-[3rem] body16 tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] rounded-[0.75rem] border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                  {!field?.value && (
                    <p className='pointer-events-none absolute top-[0.75rem] left-[1rem] body16 tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                      Email<span>*</span>
                    </p>
                  )}
                  <FormMessage className='body16 tracking-[-0.02rem] text-errtext !mt-[0.5rem]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({field}) => (
                <FormItem className='relative space-y-0 flex-1'>
                  <FormControl>
                    <Input
                      placeholder=''
                      className='p-[1rem_0.75rem] h-[3rem] body16 tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] rounded-[0.75rem] border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                  {!field?.value && (
                    <p className='pointer-events-none absolute top-[0.75rem] left-[1rem] body16 tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                      Số điện thoại<span>*</span>
                    </p>
                  )}
                  <FormMessage className='body16 tracking-[-0.02rem] text-errtext !mt-[0.5rem]' />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='mess'
            render={({field}) => (
              <FormItem className='relative space-y-0 flex-1 mt-[1.5rem] xsm:mt-[0.75rem]'>
                <FormControl>
                  <Textarea
                    placeholder=''
                    className='resize-none p-[1rem_0.75rem] h-[6.25rem] body16 tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] rounded-[0.75rem] border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                {!field?.value && (
                  <p className='pointer-events-none absolute top-[0.75rem] left-[1rem] body16 tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                    Lời nhắn của bạn
                  </p>
                )}
                <FormMessage className='body16 tracking-[-0.02rem] text-errtext !mt-[0.5rem]' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='mt-[1.5rem] gap-0 w-max xsm:w-full space-x-[0.5rem] p-[0.5rem_0.75rem_0.5rem_1.5rem] h-[3rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'
          >
            <p className='text-white body-14-m tracking-[-0.0175rem]'>
              Gửi thông tin
            </p>
            <ImageV2
              className='size-[1.5rem]'
              src={'/icons/homepage/footer/icon-arow.svg'}
              alt=''
              width={40}
              height={40}
            />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default FormConnect
