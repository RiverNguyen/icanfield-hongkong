'use client'

import {Button} from '@/components/ui/button'
import {
  Form,
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
import CF7Request from '@/fetch/cf7Request'
import postData from '@/fetch/postData'
import {isLockScroll} from '@/hooks/useBodyScrollLock'
import useIsMobile from '@/hooks/useIsMobile'
import {cn} from '@/lib/utils'
import {ICLoading} from '@/sections/blogs/connect-us/FormConnectUs'
import IConArrowdown from '@/sections/document-appraisal/IConArrowdown'
import ItemSlider from '@/sections/document-appraisal/ItemSlider'
import ProgramResult from '@/sections/document-appraisal/ProgramResult'
import {
  Taxonomies,
  Term,
  dataPostFilter,
  filter,
  valueFilterPost,
} from '@/types/dataAppraisal.interface'
import endpoints from '@/utils/endpoints'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRef, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Trường này ít nhất phải có 2 ký tự.',
  }),
  email: z
    .string({
      required_error: 'Trường này không được để trống.',
    })
    .email(),
  phone: z
    .string({
      required_error: 'Trường này không được để trống.',
    })
    .regex(
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{0,14}$/,
      {message: 'Định dạng không hợp lệ'},
    ),
  location: z.string().optional(),
  nation: z.string({
    required_error: 'Trường này không được để trống.',
  }),
  educationlevel: z.string({
    required_error: 'Trường này không được để trống.',
  }),
  languageproficiency: z.string({
    required_error: 'Trường này không được để trống.',
  }),
  managementexperience: z.string({
    required_error: 'Trường này không được để trống.',
  }),
})
interface valueFilter {
  value: number
  percent: number
}
interface valueContactForm {
  username: string
  email: string
  phone: string
  location?: string
}
interface fieldForm {
  nation: boolean
  educationlevel: boolean
  languageproficiency: boolean
  managementexperience: boolean
}
export default function FormAppraisal({
  otherInformation,
  dataTaxonomies,
}: {
  otherInformation: filter
  dataTaxonomies: Taxonomies
}) {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [isPending, setTransition] = useTransition()
  const [valueBudget, setValueBudget] = useState<valueFilter>({
    value: Number(otherInformation?.estimated_investment_budget?.to) / 2,
    percent: 50,
  })
  const [valuePossibility, setValuePossibility] = useState<valueFilter>({
    value: Number(otherInformation?.possibility_of_residence?.to) / 2,
    percent: 50,
  })
  const [valueTotalAssets, setValueTotalAssets] = useState<valueFilter>({
    value: Number(otherInformation?.total_assets?.to) / 2,
    percent: 50,
  })
  const [valueAge, setValueAge] = useState<valueFilter>({
    value: Number(otherInformation?.age?.to) / 2,
    percent: 50,
  })
  const [valueNumberOfChildren, setValueNumberOfChildren] =
    useState<valueFilter>({
      value: Number(otherInformation?.number_of_children?.to) / 2,
      percent: 50,
    })
  const [valueContactForm, setValueContactForm] = useState<valueContactForm>({
    username: '',
    email: '',
    phone: '',
    location: '',
  })
  const [valueFilter, setValueFilter] = useState<valueFilterPost>()
  const [dataPostFilter, setDataPostFilter] = useState<dataPostFilter | null>(
    null,
  )
  const [dataPopupMb, setDataPopupMb] = useState<fieldForm>({
    nation: false,
    educationlevel: false,
    languageproficiency: false,
    managementexperience: false,
  })
  const [errorField, setErrorField] = useState<boolean>(false)
  const [textNationMb, setTextNationMb] = useState<string>('')
  const [textEducationlevel, setTextEducationlevel] = useState<string>('')
  const [textLanguageproficiency, setTextLanguageproficiency] =
    useState<string>('')
  const [textManagementexperience, setTextManagementexperience] =
    useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  const {setValue} = form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      const dataFilter: valueFilterPost = {
        nation: values?.nation,
        languageproficiency: values?.languageproficiency,
        educationlevel: values?.educationlevel,
        managementexperience: values?.managementexperience,
        estimatedInvestmentBudget: String(valueBudget?.value),
        possibilityOfResidence: String(valuePossibility?.value),
        totalAssets: String(valueTotalAssets?.value),
        age: String(valueAge?.value),
        numberOfChildren: String(valueNumberOfChildren?.value),
        page: '1',
        perPage: '9',
      }
      // Kiểm tra giá trị đã thay đổi hay chưa
      const hasFormChanged = !Object.keys(valueContactForm).every((key) => {
        return (
          valueContactForm[key as keyof valueContactForm] ===
          values[key as keyof valueContactForm]
        )
      })
      if (!hasFormChanged) {
        const valueContactForm = {
          ...dataFilter,
          username: values?.username,
          email: values?.email,
          phone: values?.phone,
          location: values?.location || '',
        }
        const request = new CF7Request(valueContactForm)
        const response = await request.send(
          endpoints.contactFormSettlementDocuments,
        )
        if (response?.invalid_fields?.length === 0) {
          setValueContactForm({
            username: valueContactForm?.username,
            email: valueContactForm?.email,
            phone: valueContactForm?.phone,
            location: valueContactForm?.location,
          })
          toast.success('Gửi thông tin thành công')
        }
      }
      const dataPost = await postData({
        api: '/settlementdocument',
        option: {next: {revalidate: 10}},
        values: dataFilter,
      })
      if (dataPost?.status) {
        setValueFilter(dataFilter)
        setDataPostFilter(dataPost)
        toast.success(
          'Có ' + dataPost?.pagination?.total + ' chương trình phù hợp với bạn',
        )
        if (sectionRef?.current) {
          sectionRef?.current.scrollIntoView({behavior: 'smooth'})
        }
        setErrorField(false)
      } else {
        toast.error(
          'Hiện tại chưa có chương trình phù hợp. Liên hệ với chúng tôi để được tư vẫn thêm',
        )
        setDataPostFilter(dataPost)
        setErrorField(true)
      }
    })
  }
  function decodeHTMLEntities(text:string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    return doc.body.textContent
  }
  return (
    <>
      <section className='relative mt-[-14.31rem] w-[54.125rem] sm:mx-auto xsm:mt-[-4.31rem] xsm:w-full xsm:px-[1rem]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-[2.5rem] xsm:space-y-[1.5rem]'
          >
            <div className='space-y-[2rem] rounded-[1.25rem] bg-white p-[2.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-[1.5rem] xsm:p-[2.375rem_1.125rem_1.125rem_1.125rem]'>
              <h3 className='font-optima text-brown heading3 xsm:heading1'>
                Thông tin cơ bản
              </h3>
              <div className='flex items-center sm:space-x-[2rem] xsm:flex-col xsm:space-y-[1.5rem]'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({field}) => (
                    <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                          {...field}
                        />
                      </FormControl>
                      {!field?.value && (
                        <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                          Họ và tên<span>*</span>
                        </p>
                      )}
                      <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({field}) => (
                    <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                          {...field}
                        />
                      </FormControl>
                      {!field?.value && (
                        <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                          Điện thoại<span>*</span>
                        </p>
                      )}
                      <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex items-center sm:space-x-[2rem] xsm:flex-col xsm:space-y-[1.5rem]'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({field}) => (
                    <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                          {...field}
                        />
                      </FormControl>
                      {!field?.value && (
                        <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                          Email<span>*</span>
                        </p>
                      )}
                      <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location'
                  render={({field}) => (
                    <FormItem className='relative flex-1 space-y-0 xsm:w-full'>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown body16 placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 xsm:h-[2.5rem] xsm:rounded-[0.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14'
                          {...field}
                        />
                      </FormControl>
                      {!field?.value && (
                        <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] tracking-[-0.02rem] text-greyscaletext-200 body16 xsm:top-[0.5rem] xsm:body-14 [&_span]:text-errtext'>
                          Tỉnh/thành phố
                        </p>
                      )}
                      <FormMessage className='!mt-[0.5rem] tracking-[-0.02rem] text-errtext body16 xsm:body-14' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='rounded-[1.25rem] bg-white p-[2.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:p-[2.375rem_1.125rem_1.125rem_1.125rem]'>
              <h3 className='mb-[2rem] font-optima text-brown heading3 xsm:mb-[1.5rem] xsm:heading1'>
                Thông tin khác
              </h3>
              <FormField
                control={form.control}
                name='nation'
                render={({field}) => (
                  <FormItem className='mb-[1.75rem] xsm:relative xsm:mb-[1.5rem]'>
                    <Select
                      disabled={isMobile}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className='h-[3rem] rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] xsm:!opacity-100 [&>div]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5]'>
                        <SelectTrigger>
                          {isMobile ? (
                            !field.value && (
                              <p className='hidden text-start text-greyscaletext-800 body16-m'>
                                Quốc gia bạn quan tâm
                                <span className='text-errtext'>*</span>
                              </p>
                            )
                          ) : (
                            <p className='hidden text-start text-greyscaletext-800 body16-m'>
                              Quốc gia bạn quan tâm
                              <span className='text-errtext'>*</span>
                            </p>
                          )}
                          {isMobile && field.value && (
                            <div className='hidden text-start text-greyscaletext-800 body16-m'>
                              {textNationMb}
                            </div>
                          )}
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                        {dataTaxonomies?.nation?.map(
                          (e: Term, index: number) => (
                            <SelectItem
                              key={index}
                              className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                              value={e?.slug}
                            >
                              {e?.name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <div
                      onClick={() => {
                        if (isMobile) {
                          setDataPopupMb({
                            ...dataPopupMb,
                            nation: true,
                          })
                          isLockScroll(true)
                        }
                      }}
                      className='absolute left-0 top-0 z-40 size-full bg-transparent sm:hidden'
                    ></div>
                    <div
                      className={cn(
                        'fixed bottom-0 left-0 z-[52] !mt-0 max-h-[60vh] w-full translate-y-[calc(100%+2rem)] overflow-hidden overflow-y-auto rounded-[0.5rem_0.5rem_0_0] bg-white p-[1rem] transition-all sm:hidden',
                        dataPopupMb?.nation && 'translate-y-0 shadow-inner',
                      )}
                    >
                      {dataTaxonomies?.nation?.map((e: Term, index: number) => (
                        <p
                          key={index}
                          className={cn(
                            'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                            field?.value === e?.slug && 'bg-background',
                          )}
                          onClick={() => {
                            setValue('nation', e?.slug, {shouldValidate: true})
                            setTextNationMb(e?.name)
                            setDataPopupMb({
                              ...dataPopupMb,
                              nation: false,
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
                        dataPopupMb?.nation && 'block',
                      )}
                      onClick={() => {
                        setDataPopupMb({
                          nation: false,
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
              <div className='mt-[1.75rem] flex w-full items-center sm:space-x-[1.5rem] xsm:mt-[1.5rem] xsm:flex-col'>
                <FormField
                  control={form.control}
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
                                  Trình độ học vấn
                                  <span className='text-errtext'>*</span>
                                </p>
                              )
                            ) : (
                              <p className='hidden text-start text-greyscaletext-800 body16-m'>
                                Trình độ học vấn
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
                          {dataTaxonomies?.educationLevel?.map(
                            (e: Term, index: number) => (
                              <SelectItem
                                key={index}
                                className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                                value={e?.slug}
                              >
                                {e?.name}
                              </SelectItem>
                            ),
                          )}
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
                          dataPopupMb?.educationlevel &&
                            'translate-y-0 shadow-inner',
                        )}
                      >
                        {dataTaxonomies?.educationLevel?.map(
                          (e: Term, index: number) => (
                            <p
                              key={index}
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
                          ),
                        )}
                      </div>
                      <div
                        className={cn(
                          'fixed left-0 top-0 z-[51] !mt-0 hidden h-[100vh] w-full bg-black opacity-[0.5]',
                          dataPopupMb?.educationlevel && 'block',
                        )}
                        onClick={() => {
                          setDataPopupMb({
                            nation: false,
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
                  control={form.control}
                  name='languageproficiency'
                  render={({field}) => (
                    <FormItem className='mb-[1.75rem] flex-1 xsm:relative xsm:w-full'>
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
                                  Trình độ ngoại ngữ
                                  <span className='text-errtext'>*</span>
                                </p>
                              )
                            ) : (
                              <p className='hidden text-start text-greyscaletext-800 body16-m'>
                                Trình độ ngoại ngữ
                                <span className='text-errtext'>*</span>
                              </p>
                            )}
                            {isMobile && field.value && (
                              <div className='hidden flex-1 text-start text-greyscaletext-800 body16-m'>
                                {textLanguageproficiency}
                              </div>
                            )}
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]'>
                          {dataTaxonomies?.foreignLanguageProficiency?.map(
                            (e: Term, index: number) => (
                              <SelectItem
                                key={index}
                                className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                                value={e?.slug}
                              >
                                {decodeHTMLEntities(e?.name)}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <div
                        onClick={() => {
                          if (isMobile) {
                            setDataPopupMb({
                              ...dataPopupMb,
                              languageproficiency: true,
                            })
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
                        {dataTaxonomies?.foreignLanguageProficiency?.map(
                          (e: Term, index: number) => (
                            <p
                              key={index}
                              className={cn(
                                'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                                field?.value === e?.slug && 'bg-background',
                              )}
                              onClick={() => {
                                setValue('languageproficiency', e?.slug, {
                                  shouldValidate: true,
                                })
                                setTextLanguageproficiency(e?.name)
                                setDataPopupMb({
                                  ...dataPopupMb,
                                  languageproficiency: false,
                                })
                                isLockScroll(false)
                              }}
                            >
                              {e?.name}
                            </p>
                          ),
                        )}
                      </div>
                      <div
                        className={cn(
                          'fixed left-0 top-0 z-[51] !mt-0 hidden h-[100vh] w-full bg-black opacity-[0.5]',
                          dataPopupMb?.languageproficiency && 'block',
                        )}
                        onClick={() => {
                          setDataPopupMb({
                            nation: false,
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
                  control={form.control}
                  name='managementexperience'
                  render={({field}) => (
                    <FormItem className='mb-[1.75rem] flex-1 xsm:relative xsm:w-full'>
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
                                  Kinh nghiệm quản lí
                                  <span className='text-errtext'>*</span>
                                </p>
                              )
                            ) : (
                              <p className='hidden text-start text-greyscaletext-800 body16-m'>
                                Kinh nghiệm quản lí
                                <span className='text-errtext'>*</span>
                              </p>
                            )}
                            {isMobile && field.value && (
                              <div className='hidden flex-1 text-start text-greyscaletext-800 body16-m'>
                                {textManagementexperience}
                              </div>
                            )}
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='rounded-[0.5rem] bg-white p-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)] xsm:!hidden'>
                          {dataTaxonomies?.managementExperience?.map(
                            (e: Term, index: number) => (
                              <SelectItem
                                key={index}
                                className='cursor-pointer border-b-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[0.75rem_1rem]'
                                value={e?.slug}
                              >
                                {e?.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <div
                        onClick={() => {
                          if (isMobile) {
                            setDataPopupMb({
                              ...dataPopupMb,
                              managementexperience: true,
                            })
                            isLockScroll(true)
                          }
                        }}
                        className='absolute left-0 top-0 z-40 size-full bg-transparent sm:hidden'
                      ></div>
                      <div
                        className={cn(
                          'fixed bottom-0 left-0 z-[52] !mt-0 max-h-[60vh] w-full translate-y-[calc(100%+2rem)] overflow-hidden overflow-y-auto rounded-[0.5rem_0.5rem_0_0] bg-white p-[1rem] transition-all sm:hidden',
                          dataPopupMb?.managementexperience &&
                            'translate-y-0 shadow-inner',
                        )}
                      >
                        {dataTaxonomies?.managementExperience?.map(
                          (e: Term, index: number) => (
                            <p
                              key={index}
                              className={cn(
                                'border-b-[1px] border-solid p-[1rem] last:border-b-0',
                                field?.value === e?.slug && 'bg-background',
                              )}
                              onClick={() => {
                                setValue('managementexperience', e?.slug, {
                                  shouldValidate: true,
                                })
                                setTextManagementexperience(e?.name)
                                setDataPopupMb({
                                  ...dataPopupMb,
                                  managementexperience: false,
                                })
                                isLockScroll(false)
                              }}
                            >
                              {e?.name}
                            </p>
                          ),
                        )}
                      </div>
                      <div
                        className={cn(
                          'fixed left-0 top-0 z-[51] !mt-0 hidden h-[100vh] w-full bg-black opacity-[0.5]',
                          dataPopupMb?.managementexperience && 'block',
                        )}
                        onClick={() => {
                          setDataPopupMb({
                            nation: false,
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
              </div>
              <div className='mb-[1.5rem] h-[0.0625rem] w-full bg-[rgba(0,0,0,0.10)]'></div>
              <Button
                className='flex h-[3rem] w-full items-center justify-center gap-0 space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'
                type='submit'
                disabled={isPending}
              >
                <p className='text-white body-14-m'>Xem kết quả chương trình</p>
                {!isPending ? (
                  <IConArrowdown className='size-[1.5rem] object-contain' />
                ) : (
                  <ICLoading />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
      {dataPostFilter?.status && (
        <section ref={sectionRef}>
          <ProgramResult
            valueFilter={valueFilter}
            dataPostFilter={dataPostFilter}
            setDataPostFilter={setDataPostFilter}
          />
        </section>
      )}
      {errorField && (
        <div className='my-[2rem] text-center text-brown body-14-m'>
          Hiện tại chưa có chương trình phù hợp.
        </div>
      )}
    </>
  )
}
