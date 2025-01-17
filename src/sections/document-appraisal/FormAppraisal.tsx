"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import CF7Request from "@/fetch/cf7Request"
import postData from "@/fetch/postData"
import useIsMobile from "@/hooks/useIsMobile"
import { cn } from "@/lib/utils"
import { ICLoading } from "@/sections/blogs/connect-us/FormConnectUs"
import IConArrowdown from "@/sections/document-appraisal/IConArrowdown"
import ItemSlider from "@/sections/document-appraisal/ItemSlider"
import ProgramResult from "@/sections/document-appraisal/ProgramResult"
import { Taxonomies, Term, dataPostFilter, filter, valueFilterPost } from "@/types/dataAppraisal.interface"
import endpoints from "@/utils/endpoints"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Trường này ít nhất phải có 2 ký tự.',
    }),
    email: z.string({
      required_error: "Trường này không được để trống.",
    }).email(),
    phone: z.string({
      required_error: "Trường này không được để trống.",
    }).regex(
      /^(999|998|997|996|995|994|993|992|991|990|979|978|977|976|975|974|973|972|971|970|969|968|967|966|965|964|963|962|961|960|899|898|897|896|895|894|893|892|891|890|889|888|887|886|885|884|883|882|881|880|879|878|877|876|875|874|873|872|871|870|859|858|857|856|855|854|853|852|851|850|839|838|837|836|835|834|833|832|831|830|809|808|807|806|805|804|803|802|801|800|699|698|697|696|695|694|693|692|691|690|689|688|687|686|685|684|683|682|681|680|679|678|677|676|675|674|673|672|671|670|599|598|597|596|595|594|593|592|591|590|509|508|507|506|505|504|503|502|501|500|429|428|427|426|425|424|423|422|421|420|389|388|387|386|385|384|383|382|381|380|379|378|377|376|375|374|373|372|371|370|359|358|357|356|355|354|353|352|351|350|299|298|297|296|295|294|293|292|291|290|289|288|287|286|285|284|283|282|281|280|269|268|267|266|265|264|263|262|261|260|259|258|257|256|255|254|253|252|251|250|249|248|247|246|245|244|243|242|241|240|239|238|237|236|235|234|233|232|231|230|229|228|227|226|225|224|223|222|221|220|219|218|217|216|215|214|213|212|211|210|98|95|94|93|92|91|90|86|84|0|82|81|66|65|64|63|62|61|60|58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{0,14}$/,
      {message: 'Định dạng không hợp lệ'},
    ),
    location: z.string().optional(),
    nation: z.string({
      required_error: "Trường này không được để trống.",
    }),
    educationlevel: z.string({
      required_error: "Trường này không được để trống.",
    }),
    languageproficiency: z.string({
      required_error: "Trường này không được để trống.",
    }),
    managementexperience: z.string({
      required_error: "Trường này không được để trống.",
    }),
})
interface valueFilter {
    value: number,
    percent: number
}
interface valueContactForm {
    username: string,
    email: string,
    phone: string,
    location?: string,
}
interface fieldForm {
    nation: boolean
    educationlevel: boolean
    languageproficiency: boolean
    managementexperience: boolean
}
export default function FormAppraisal({ otherInformation, dataTaxonomies }: { otherInformation: filter, dataTaxonomies: Taxonomies }) {
    const isMobile = useIsMobile()
    const sectionRef = useRef<HTMLElement>(null)
    const [isPending, setTransition] = useTransition()
    const [valueBudget, setValueBudget] = useState<valueFilter>({
        value: Number(otherInformation?.estimated_investment_budget?.to)/2,
        percent: 50,
    })
    const [valuePossibility, setValuePossibility] = useState<valueFilter>({
        value: Number(otherInformation?.possibility_of_residence?.to)/2,
        percent: 50,
    })
    const [valueTotalAssets, setValueTotalAssets] = useState<valueFilter>({
        value: Number(otherInformation?.total_assets?.to)/2,
        percent: 50,
    })
    const [valueAge, setValueAge] = useState<valueFilter>({
        value: Number(otherInformation?.age?.to)/2,
        percent: 50,
    })
    const [valueNumberOfChildren, setValueNumberOfChildren] = useState<valueFilter>({
        value: Number(otherInformation?.number_of_children?.to)/2,
        percent: 50,
    })
    const [valueContactForm, setValueContactForm] = useState<valueContactForm>({
        username: '',
        email: '',
        phone: '',
        location: '',
    })
    const [valueFilter, setValueFilter] = useState<valueFilterPost>()
    const [dataPostFilter, setDataPostFilter] = useState<dataPostFilter | null>(null)
    const [dataPopupMb, setDataPopupMb] = useState<fieldForm>({
        nation: false,
        educationlevel: false,
        languageproficiency: false,
        managementexperience: false,
    })
    const [textNationMb, setTextNationMb] = useState<string>('')
    const [textEducationlevel, setTextEducationlevel] = useState<string>('')
    const [textLanguageproficiency, setTextLanguageproficiency] = useState<string>('')
    const [textManagementexperience, setTextManagementexperience] = useState<string>('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
    const { setValue } = form;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setTransition(async () => {
            const dataFilter: valueFilterPost  = {
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
                return valueContactForm[key as keyof valueContactForm] === values[key as keyof valueContactForm];
            });
            if (!hasFormChanged) {
                const valueContactForm = {
                    ...dataFilter,
                    username: values?.username,
                    email: values?.email,
                    phone: values?.phone,
                    location: values?.location || '',
                }
                const request = new CF7Request(valueContactForm)
                const response = await request.send(endpoints.contactFormSettlementDocuments)
                if (response?.invalid_fields.length === 0) {
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
                option: { revalidate: 10},
                values: dataFilter
            })
            if (dataPost?.status) {
                setValueFilter(dataFilter)
                setDataPostFilter(dataPost)
                toast.success('Có ' + dataPost?.pagination?.total + ' chương trình phù hợp với bạn')
                if (sectionRef?.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                toast.error('Hiện tại chưa có chương trình phù hợp liên hệ với chúng tôi để được tư vẫn thêm')
                setDataPostFilter(dataPost)
            }
        })
    }
    return (
        <>
            <section className="w-[54.125rem] xsm:w-full xsm:px-[1rem] sm:mx-auto mt-[-14.31rem] xsm:mt-[-4.31rem] relative z-30">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[2.5rem] xsm:space-y-[1.5rem]">
                        <div className="space-y-[2rem] xsm:space-y-[1.5rem] p-[2.5rem] xsm:p-[2.375rem_1.125rem_1.125rem_1.125rem] rounded-[1.25rem] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                            <h3 className="font-optima heading3 xsm:heading1 text-brown">Thông tin cơ bản</h3>
                            <div className="flex xsm:flex-col items-center sm:space-x-[2rem] xsm:space-y-[1.5rem]">
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({field}) => (
                                        <FormItem className='relative space-y-0 flex-1 xsm:w-full'>
                                            <FormControl>
                                                <Input
                                                    placeholder=''
                                                    className='xsm:rounded-[0.5rem] xsm:h-[2.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14 body16 h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            {!field?.value && (
                                                <p className='xsm:body-14 body16 pointer-events-none absolute left-[1rem] top-[0.75rem] xsm:top-[0.5rem] tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                                                    Họ và tên<span>*</span>
                                                </p>
                                            )}
                                            <FormMessage className='body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext' />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='phone'
                                    render={({field}) => (
                                        <FormItem className='relative space-y-0 flex-1 xsm:w-full'>
                                            <FormControl>
                                                <Input
                                                    placeholder=''
                                                    className='xsm:rounded-[0.5rem] xsm:h-[2.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14 body16 h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            {!field?.value && (
                                                <p className='xsm:body-14 body16 pointer-events-none absolute left-[1rem] top-[0.75rem] xsm:top-[0.5rem] tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                                                    Điện thoại<span>*</span>
                                                </p>
                                            )}
                                            <FormMessage className='xsm:body-14 body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex xsm:flex-col items-center sm:space-x-[2rem] xsm:space-y-[1.5rem]">
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field}) => (
                                        <FormItem className='relative space-y-0 flex-1 xsm:w-full'>
                                            <FormControl>
                                                <Input
                                                    placeholder=''
                                                    className='xsm:rounded-[0.5rem] xsm:h-[2.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14 body16 h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            {!field?.value && (
                                                <p className='xsm:body-14 body16 pointer-events-none absolute left-[1rem] top-[0.75rem] xsm:top-[0.5rem] tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                                                    Email<span>*</span>
                                                </p>
                                            )}
                                            <FormMessage className='xsm:body-14 body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext' />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='location'
                                    render={({field}) => (
                                        <FormItem className='relative space-y-0 flex-1 xsm:w-full'>
                                            <FormControl>
                                                <Input
                                                    placeholder=''
                                                    className='xsm:rounded-[0.5rem] xsm:h-[2.5rem] xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:body-14 body16 h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem] tracking-[-0.02rem] text-brown placeholder:text-greyscaletext-200 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                                    {...field}
                                                />
                                            </FormControl>
                                            {!field?.value && (
                                                <p className='xsm:body-14 body16 pointer-events-none absolute left-[1rem] top-[0.75rem] xsm:top-[0.5rem] tracking-[-0.02rem] text-greyscaletext-200 [&_span]:text-errtext'>
                                                    Tỉnh/thành phố
                                                </p>
                                            )}
                                            <FormMessage className='xsm:body-14 body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="xsm:p-[2.375rem_1.125rem_1.125rem_1.125rem] p-[2.5rem] rounded-[1.25rem] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                            <h3 className="mb-[2rem] xsm:mb-[1.5rem] heading3 xsm:heading1 font-optima text-brown">Thông tin khác</h3>
                            <FormField
                                control={form.control}
                                name="nation"
                                render={({ field }) => (
                                    <FormItem className="mb-[1.75rem] xsm:mb-[1.5rem] xsm:relative">
                                        <Select disabled={isMobile} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="xsm:!opacity-100 [&>p]:[&[data-placeholder]]:block [&>p]:[&[data-placeholder]]:opacity-[0.5] h-[3rem] p-[0.75rem_0.5rem_0.75rem_1rem] rounded-[0.75rem] bg-[#F6F6F6]">
                                                <SelectTrigger>
                                                    {isMobile ? !field.value &&
                                                        <p className="hidden body16-m text-greyscaletext-800 text-start">Quốc gia bạn quan tâm<span className="text-errtext">*</span></p>
                                                        : 
                                                        <p className="hidden body16-m text-greyscaletext-800 text-start">Quốc gia bạn quan tâm<span className="text-errtext">*</span></p>
                                                    }
                                                    {isMobile && field.value &&  
                                                        <div className="body16-m text-greyscaletext-800 text-start">{textNationMb}</div>
                                                    }
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="xsm:!hidden bg-white p-[0.5rem] rounded-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]">
                                                {dataTaxonomies?.nation?.map((e: Term, index: number) => (
                                                    <SelectItem
                                                        key={index}
                                                        className="cursor-pointer p-[0.75rem_1rem] border-b-[1px] border-solid border-[rgba(0,0,0,0.10)]"
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
                                                        nation: true,
                                                    })
                                                }
                                            }}
                                            className="bg-transparent sm:hidden absolute top-0 left-0 size-full z-40"
                                        >
                                        </div>
                                        <div className={cn("p-[1rem] !mt-0 transition-all translate-y-[calc(100%+2rem)] z-[49] rounded-[0.5rem_0.5rem_0_0] overflow-hidden overflow-y-auto sm:hidden max-h-[60vh] fixed bottom-0 left-0 w-full bg-white",
                                            dataPopupMb?.nation && 'translate-y-0 shadow-inner'
                                        )}>
                                            {dataTaxonomies?.nation?.map((e: Term, index: number) => (
                                                <p
                                                    key={index}
                                                    className={cn("p-[1rem] border-b-[1px] border-solid last:border-b-0",
                                                        field?.value === e?.slug && 'bg-background'
                                                    )}
                                                    onClick={() => {
                                                        setValue('nation', e?.slug, { shouldValidate: true })
                                                        setTextNationMb(e?.name)
                                                        setDataPopupMb({
                                                            ...dataPopupMb,
                                                            nation: false,
                                                        })
                                                    }}
                                                >
                                                    {e?.name}
                                                </p>
                                            ))}
                                        </div>
                                        <div
                                            className={cn("fixed hidden top-0 left-0 w-full h-[100vh] bg-black opacity-[0.5] z-[48]",
                                                dataPopupMb?.nation && 'block'
                                            )}
                                            onClick={() => {
                                                setDataPopupMb({
                                                    nation: false,
                                                    educationlevel: false,
                                                    languageproficiency: false,
                                                    managementexperience: false,
                                                })
                                            }}
                                        >
                                        </div>
                                        <FormMessage className='body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext'/>
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-[1.75rem] xsm:space-y-[1.5rem] w-full">
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
                                <div className="sm:hidden h-[0.0625rem] w-full opacity-[0.08] bg-[#000]"></div>
                            </div>
                            <div className="w-full flex xsm:flex-col items-center sm:space-x-[1.5rem] mt-[1.75rem] xsm:mt-[1.5rem]">
                                <FormField
                                    control={form.control}
                                    name="educationlevel"
                                    render={({ field }) => (
                                        <FormItem className="mb-[1.75rem] xsm:mb-[1.5rem] xsm:relative xsm:w-full flex-1">
                                            <Select disabled={isMobile} onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="xsm:!opacity-100 xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:rounded-[0.5rem] xsm:h-[2.5rem] [&>span]:body16-m [&>p]:[&[data-placeholder]]:block [&>span]:[&[data-placeholder]]:hidden [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start whitespace-normal justify-start h-[3rem] p-[0.75rem_0.5rem_0.75rem_1rem] rounded-[0.75rem] bg-[#F6F6F6]">
                                                    <SelectTrigger>
                                                        {isMobile ? !field.value &&
                                                            <p className="hidden body16-m text-greyscaletext-800 text-start">Trình độ học vấn<span className="text-errtext">*</span></p>
                                                            : 
                                                            <p className="hidden body16-m text-greyscaletext-800 text-start">Trình độ học vấn<span className="text-errtext">*</span></p>
                                                        }
                                                        {isMobile && field.value &&  
                                                            <div className="flex-1 body16-m text-greyscaletext-800 text-start">{textEducationlevel}</div>
                                                        }
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="xsm:!hidden bg-white p-[0.5rem] rounded-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]">
                                                    {dataTaxonomies?.educationLevel?.map((e: Term, index: number) => (
                                                        <SelectItem
                                                            key={index}
                                                            className="cursor-pointer p-[0.75rem_1rem] border-b-[1px] border-solid border-[rgba(0,0,0,0.10)]"
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
                                                    }
                                                }}
                                                className="bg-transparent sm:hidden absolute top-0 left-0 size-full z-40"
                                            >
                                            </div>
                                            <div className={cn("p-[1rem] !mt-0 transition-all translate-y-[calc(100%+2rem)] z-[49] rounded-[0.5rem_0.5rem_0_0] overflow-hidden overflow-y-auto sm:hidden max-h-[60vh] fixed bottom-0 left-0 w-full bg-white",
                                                dataPopupMb?.educationlevel && 'translate-y-0 shadow-inner'
                                            )}>
                                                {dataTaxonomies?.educationLevel?.map((e: Term, index: number) => (
                                                    <p
                                                        key={index}
                                                        className={cn("p-[1rem] border-b-[1px] border-solid last:border-b-0",
                                                            field?.value === e?.slug && 'bg-background'
                                                        )}
                                                        onClick={() => {
                                                            setValue('educationlevel', e?.slug, { shouldValidate: true })
                                                            setTextEducationlevel(e?.name)
                                                            setDataPopupMb({
                                                                ...dataPopupMb,
                                                                educationlevel: false,
                                                            })
                                                        }}
                                                    >
                                                        {e?.name}
                                                    </p>
                                                ))}
                                            </div>
                                            <div
                                                className={cn("fixed hidden top-0 left-0 w-full h-[100vh] bg-black opacity-[0.5] z-[48]",
                                                    dataPopupMb?.educationlevel && 'block'
                                                )}
                                                onClick={() => {
                                                    setDataPopupMb({
                                                        nation: false,
                                                        educationlevel: false,
                                                        languageproficiency: false,
                                                        managementexperience: false,
                                                    })
                                                }}
                                            >
                                            </div>
                                            <FormMessage className='body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext'/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="languageproficiency"
                                    render={({ field }) => (
                                        <FormItem className="mb-[1.75rem] xsm:relative xsm:w-full flex-1">
                                            <Select disabled={isMobile} onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="xsm:!opacity-100 xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:rounded-[0.5rem] xsm:h-[2.5rem] [&>span]:body16-m [&>p]:[&[data-placeholder]]:block [&>span]:[&[data-placeholder]]:hidden [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start whitespace-normal justify-start h-[3rem] p-[0.75rem_0.5rem_0.75rem_1rem] rounded-[0.75rem] bg-[#F6F6F6]">
                                                    <SelectTrigger>
                                                        {isMobile ? !field.value &&
                                                            <p className="hidden body16-m text-greyscaletext-800 text-start">Trình độ ngoại ngữ<span className="text-errtext">*</span></p>
                                                            : 
                                                            <p className="hidden body16-m text-greyscaletext-800 text-start">Trình độ ngoại ngữ<span className="text-errtext">*</span></p>
                                                        }
                                                        {isMobile && field.value &&  
                                                            <div className="flex-1 body16-m text-greyscaletext-800 text-start">{textLanguageproficiency}</div>
                                                        }
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white p-[0.5rem] rounded-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]">
                                                    {dataTaxonomies?.foreignLanguageProficiency?.map((e: Term, index: number) => (
                                                        <SelectItem
                                                            key={index}
                                                            className="cursor-pointer p-[0.75rem_1rem] border-b-[1px] border-solid border-[rgba(0,0,0,0.10)]"
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
                                                            languageproficiency: true,
                                                        })
                                                    }
                                                }}
                                                className="bg-transparent sm:hidden absolute top-0 left-0 size-full z-40"
                                            >
                                            </div>
                                            <div className={cn("p-[1rem] !mt-0 transition-all translate-y-[calc(100%+2rem)] z-[49] rounded-[0.5rem_0.5rem_0_0] overflow-hidden overflow-y-auto sm:hidden max-h-[60vh] fixed bottom-0 left-0 w-full bg-white",
                                                dataPopupMb?.languageproficiency && 'translate-y-0 shadow-inner'
                                            )}>
                                                {dataTaxonomies?.foreignLanguageProficiency?.map((e: Term, index: number) => (
                                                    <p
                                                        key={index}
                                                        className={cn("p-[1rem] border-b-[1px] border-solid last:border-b-0",
                                                            field?.value === e?.slug && 'bg-background'
                                                        )}
                                                        onClick={() => {
                                                            setValue('languageproficiency', e?.slug, { shouldValidate: true })
                                                            setTextLanguageproficiency(e?.name)
                                                            setDataPopupMb({
                                                                ...dataPopupMb,
                                                                languageproficiency: false,
                                                            })
                                                        }}
                                                    >
                                                        {e?.name}
                                                    </p>
                                                ))}
                                            </div>
                                            <div
                                                className={cn("fixed hidden top-0 left-0 w-full h-[100vh] bg-black opacity-[0.5] z-[48]",
                                                    dataPopupMb?.languageproficiency && 'block'
                                                )}
                                                onClick={() => {
                                                    setDataPopupMb({
                                                        nation: false,
                                                        educationlevel: false,
                                                        languageproficiency: false,
                                                        managementexperience: false,
                                                    })
                                                }}
                                            >
                                            </div>
                                            <FormMessage className='body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext'/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="managementexperience"
                                    render={({ field }) => (
                                        <FormItem className="mb-[1.75rem] xsm:w-full xsm:relative flex-1">
                                            <Select disabled={isMobile} onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="xsm:!opacity-100 xsm:p-[0.5rem_0.5rem_0.5rem_0.75rem] xsm:rounded-[0.5rem] xsm:h-[2.5rem] [&>span]:body16-m [&>p]:[&[data-placeholder]]:block [&>span]:[&[data-placeholder]]:hidden [&>p]:[&[data-placeholder]]:opacity-[0.5] [&>p]:flex-1 [&>span]:flex-1 [&>span]:text-start whitespace-normal justify-start h-[3rem] p-[0.75rem_0.5rem_0.75rem_1rem] rounded-[0.75rem] bg-[#F6F6F6]">
                                                    <SelectTrigger>
                                                        {isMobile ? !field.value &&
                                                            <p className="hidden body16-m text-greyscaletext-800 text-start">Kinh nghiệm quản lí<span className="text-errtext">*</span></p>
                                                            : 
                                                            <p className="hidden body16-m text-greyscaletext-800 text-start">Kinh nghiệm quản lí<span className="text-errtext">*</span></p>
                                                        }
                                                        {isMobile && field.value &&  
                                                            <div className="flex-1 body16-m text-greyscaletext-800 text-start">{textManagementexperience}</div>
                                                        }
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="xsm:!hidden bg-white p-[0.5rem] rounded-[0.5rem] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]">
                                                    {dataTaxonomies?.managementExperience?.map((e: Term, index: number) => (
                                                        <SelectItem
                                                            key={index}
                                                            className="cursor-pointer p-[0.75rem_1rem] border-b-[1px] border-solid border-[rgba(0,0,0,0.10)]"
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
                                                            managementexperience: true,
                                                        })
                                                    }
                                                }}
                                                className="bg-transparent sm:hidden absolute top-0 left-0 size-full z-40"
                                            >
                                            </div>
                                            <div className={cn("p-[1rem] !mt-0 transition-all translate-y-[calc(100%+2rem)] z-[49] rounded-[0.5rem_0.5rem_0_0] overflow-hidden overflow-y-auto sm:hidden max-h-[60vh] fixed bottom-0 left-0 w-full bg-white",
                                                dataPopupMb?.managementexperience && 'translate-y-0 shadow-inner'
                                            )}>
                                                {dataTaxonomies?.managementExperience?.map((e: Term, index: number) => (
                                                    <p
                                                        key={index}
                                                        className={cn("p-[1rem] border-b-[1px] border-solid last:border-b-0",
                                                            field?.value === e?.slug && 'bg-background'
                                                        )}
                                                        onClick={() => {
                                                            setValue('managementexperience', e?.slug, { shouldValidate: true })
                                                            setTextManagementexperience(e?.name)
                                                            setDataPopupMb({
                                                                ...dataPopupMb,
                                                                managementexperience: false,
                                                            })
                                                        }}
                                                    >
                                                        {e?.name}
                                                    </p>
                                                ))}
                                            </div>
                                            <div
                                                className={cn("fixed hidden top-0 left-0 w-full h-[100vh] bg-black opacity-[0.5] z-[48]",
                                                    dataPopupMb?.managementexperience && 'block'
                                                )}
                                                onClick={() => {
                                                    setDataPopupMb({
                                                        nation: false,
                                                        educationlevel: false,
                                                        languageproficiency: false,
                                                        managementexperience: false,
                                                    })
                                                }}
                                            >
                                            </div>
                                            <FormMessage className='body16 !mt-[0.5rem] tracking-[-0.02rem] text-errtext'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full h-[0.0625rem] bg-[rgba(0,0,0,0.10)] mb-[1.5rem]"></div>
                            <Button
                                className="w-full gap-0 flex items-center justify-center space-x-[0.5rem] h-[3rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]"
                                type="submit"
                            >
                                <p className="text-white body-14-m">Xem kết quả chương trình</p>
                                {!isPending ? 
                                    <IConArrowdown className="size-[1.5rem] object-contain" />
                                    : 
                                    <ICLoading />
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
            {dataPostFilter?.status && 
                <section ref={sectionRef}>
                    <ProgramResult
                        valueFilter={valueFilter}
                        dataPostFilter={dataPostFilter}
                        setDataPostFilter={setDataPostFilter}
                    />
                </section>
            }
        </>
    )
}
