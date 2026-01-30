'use client'

import {Button} from '@/components/ui/button'
import {Form} from '@/components/ui/form'
// postData not used in single-submit flow
import useIsMobile from '@/hooks/useIsMobile'
import {ICLoading} from '@/sections/blogs/connect-us/FormConnectUs'
import IConArrowdown from '@/sections/document-appraisal/IConArrowdown'
import ProgramResult from '@/sections/document-appraisal/ProgramResult'
import {
  Taxonomies,
  Term,
  filter,
  AppraisalResponse,
} from '@/types/dataAppraisal.interface'
// endpoints not needed for single submit
import {zodResolver} from '@hookform/resolvers/zod'
import {useRef, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
// toast not used in single-submit flow
import {z} from 'zod'
import LanguageProficiency from './LanguageProficiency'
import NationButtons from './NationButtons'
import {buildFormSchema} from './formSchema'
import {useTranslations} from 'next-intl'
import BasicInfoSection from './BasicInfoSection'
import OtherInfoSlidersSection from './OtherInfoSlidersSection'
import EducationAndManagementSection from './EducationAndManagementSection'
import postData from '@/fetch/postData'

interface valueFilter {
  value: number
  percent: number
}
interface fieldForm {
  nation: boolean
  visapurpose: boolean
  educationlevel: boolean
  languageproficiency: boolean
  managementexperience: boolean
}
export default function FormAppraisal({
  otherInformation,
  dataTaxonomies,
  defaultCalling,
}: {
  otherInformation: filter
  dataTaxonomies: Taxonomies
  defaultCalling?: string
}) {
  const t = useTranslations()
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
  // contact info will be sent directly in the single payload
  const [dataPopupMb, setDataPopupMb] = useState<fieldForm>({
    nation: false,
    visapurpose: false,
    educationlevel: false,
    languageproficiency: false,
    managementexperience: false,
  })
  // errorField is used to show "no results" message
  const [errorField, setErrorField] = useState<boolean>(false)
  const [textEducationlevel, setTextEducationlevel] = useState<string>('')
  // removed unused mobile text state
  const [textManagementexperience, setTextManagementexperience] =
    useState<string>('')
  // New state for appraisal API response
  const [appraisalResponse, setAppraisalResponse] =
    useState<AppraisalResponse | null>(null)
  const formSchema = buildFormSchema(t)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  const {setValue, watch} = form
  const [selectedNations, setSelectedNations] = useState<string[]>([])
  // phone validation is now handled by zod schema; live updates use setValue(..., { shouldValidate: true })
  // Deduplicate taxonomy arrays by slug to avoid duplicate React keys
  const uniqueNations: Term[] = dataTaxonomies?.nation
    ? Array.from(
        new Map(
          dataTaxonomies.nation.map((item) => [item?.slug, item]),
        ).values(),
      )
    : []
  const uniqueEducationLevels: Term[] = dataTaxonomies?.educationLevel
    ? Array.from(
        new Map(
          dataTaxonomies.educationLevel.map((item) => [item?.slug, item]),
        ).values(),
      )
    : []

  const uniqueManagementExperiences: Term[] =
    dataTaxonomies?.managementExperience
      ? Array.from(
          new Map(
            dataTaxonomies.managementExperience.map((item) => [
              item?.slug,
              item,
            ]),
          ).values(),
        )
      : []

  const uniqueInvestmentPurpose: Term[] = dataTaxonomies?.investmentPurpose
    ? Array.from(
        new Map(
          dataTaxonomies.investmentPurpose.map((item) => [item?.slug, item]),
        ).values(),
      )
    : []

  // helper to read form values safely
  const read = (values: Record<string, unknown>, key: string) =>
    (values[key] as string) ?? ''

  function buildPayload(
    values: z.infer<typeof formSchema>,
  ): Record<string, unknown> {
    const callingcode = read(values as Record<string, unknown>, 'callingcode')
    const phone = read(values as Record<string, unknown>, 'phone')
    const managementRaw = (values as Record<string, unknown>)[
      'managementexperience'
    ]
    const managementYears =
      typeof managementRaw === 'number'
        ? managementRaw
        : Number(String(managementRaw ?? '') || NaN)

    const langType = read(
      values as Record<string, unknown>,
      'languageproficiencytype',
    )
    const langSlug = read(
      values as Record<string, unknown>,
      'languageproficiency',
    )
    const certScore = read(
      values as Record<string, unknown>,
      'languageproficiency_score',
    )
    const certEffective = read(
      values as Record<string, unknown>,
      'languageproficiency_effective_from',
    )
    const certName = read(
      values as Record<string, unknown>,
      'languageproficiency_name',
    )
    const nationRaw = read(values as Record<string, unknown>, 'nation')
    const interestedCountries = nationRaw
      ? nationRaw
          .split(',')
          .map((s) => String(s).trim())
          .filter(Boolean)
      : []

    return {
      facts: {
        residency_days_available: Math.floor(
          Number(valuePossibility?.value ?? 0),
        ),
        visa_purposes: read(values as Record<string, unknown>, 'visapurpose')
          ? [read(values as Record<string, unknown>, 'visapurpose')]
          : [],
        interested_countries: interestedCountries,
        asset_amount: Number(valueTotalAssets?.value ?? 0),
        education_level: read(
          values as Record<string, unknown>,
          'educationlevel',
        ),
        experience_years: Number.isFinite(managementYears)
          ? managementYears
          : String(managementRaw ?? ''),
        english: {
          type: langType || '',
          ...(langType === 'certificate'
            ? {
                certificate: {
                  name: certName || langSlug,
                  score: certScore ?? '',
                },
                effective_from: certEffective || undefined,
              }
            : {}),
        },
        age: Number(valueAge?.value ?? 0),
      },
      lead: {
        username: read(values as Record<string, unknown>, 'username'),
        email: read(values as Record<string, unknown>, 'email'),
        phone: phone,
        location: read(values as Record<string, unknown>, 'location'),
        callingcode: callingcode,
        numberOfChildren: Number(valueNumberOfChildren?.value ?? 0),
      },
      page: 1,
      perPage: 9,
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      // values are validated by zod resolver; ensure phone is set from selectedCalling + input if not provided
      if (!values.phone) {
        values.phone = ''
      }
      const payload = buildPayload(values)
      console.log('payload', JSON.stringify(payload))
      const response = (await postData({
        api: '/smart-form/match?lang=' + t('langCode'),
        option: {next: {revalidate: 10}},
        values: payload,
      })) as AppraisalResponse
      console.log('appraisal response', response)

      // Handle new appraisal API response
      if (response?.programs && response.programs.length > 0) {
        setAppraisalResponse(response)
        if (sectionRef?.current) {
          sectionRef?.current.scrollIntoView({behavior: 'smooth'})
        }
      } else {
        setErrorField(true)
      }
    })
  }

  return (
    <>
      <section className='relative mt-[-14.31rem] w-[54.125rem] sm:mx-auto xsm:mt-[-4.31rem] xsm:w-full xsm:px-[1rem]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-[2.5rem] xsm:space-y-[1.5rem]'
          >
            <BasicInfoSection
              control={form.control}
              setValue={setValue}
              defaultCalling={defaultCalling}
              t={t}
            />
            <div className='rounded-[1.25rem] bg-white p-[2.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:p-[2.375rem_1.125rem_1.125rem_1.125rem]'>
              <h3 className='mb-[2rem] font-optima text-brown heading3 xsm:mb-[1.5rem] xsm:heading1'>
                {t('thong_tin_khac')}
              </h3>
              <div className='mb-[1.75rem]'>
                <p className='mb-[0.5rem] text-greyscaletext-800 body16-m'>
                  {t('quoc_gia_ban_quan_tam')}
                  <span className='ml-2 text-xs tracking-[-0.015rem] text-greyscaletext-800/60'>
                    ({t('chon_toi_da_3_quoc_gia')})
                  </span>
                </p>
                <NationButtons
                  nations={uniqueNations}
                  selected={selectedNations}
                  onChange={(next) => {
                    setSelectedNations(next)
                    setValue('nation', next.join(','), {shouldValidate: true})
                  }}
                />
              </div>
              {/* nation selection replaced by buttons above */}
              <OtherInfoSlidersSection
                otherInformation={otherInformation}
                valueBudget={valueBudget}
                setValueBudget={setValueBudget}
                valuePossibility={valuePossibility}
                setValuePossibility={setValuePossibility}
                valueTotalAssets={valueTotalAssets}
                setValueTotalAssets={setValueTotalAssets}
                valueAge={valueAge}
                setValueAge={setValueAge}
                valueNumberOfChildren={valueNumberOfChildren}
                setValueNumberOfChildren={setValueNumberOfChildren}
              />
              <EducationAndManagementSection
                control={form.control}
                setValue={setValue}
                uniqueEducationLevels={uniqueEducationLevels}
                uniqueManagementExperiences={uniqueManagementExperiences}
                uniqueInvestmentPurpose={uniqueInvestmentPurpose}
                isMobile={isMobile}
                t={t}
                dataPopupMb={dataPopupMb}
                setDataPopupMb={setDataPopupMb}
                textEducationlevel={textEducationlevel}
                setTextEducationlevel={setTextEducationlevel}
                textManagementexperience={textManagementexperience}
                setTextManagementexperience={setTextManagementexperience}
              />
              <div className='mt-[1.75rem] flex w-full items-center sm:space-x-[1.5rem] xsm:mt-[1.5rem] xsm:flex-col'>
                <LanguageProficiency
                  control={form.control}
                  setValue={setValue}
                  watch={watch}
                  isMobile={isMobile}
                  t={t}
                  dataPopupMb={dataPopupMb}
                  setDataPopupMb={setDataPopupMb}
                />
              </div>

              <div className='mb-[1.5rem] h-[0.0625rem] w-full bg-[rgba(0,0,0,0.10)]'></div>
              <Button
                className='flex h-[3rem] w-full items-center justify-center gap-0 space-x-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'
                type='submit'
                disabled={isPending}
              >
                <p className='text-white body-14-m'>
                  {t('xem_ket_qua_chuong_trinh')}
                </p>
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
      {appraisalResponse?.programs && (
        <section ref={sectionRef}>
          <ProgramResult appraisalResponse={appraisalResponse} />
        </section>
      )}
      {errorField && (
        <div className='my-[2rem] text-center text-brown body-14-m'>
          {t('hien_tai_chua_co_chuong_trinh_phu_hop')}
        </div>
      )}
    </>
  )
}
