import ContactV2 from '@/components/ContactV2/ContactV2'
import FormInternationalJourney from '@/components/ContactV2/FormInternationalJourney'
import {
  AdvantagesBenefits,
  IAdvantagesBenefitsProps,
} from '@/components/advantages-benefits'
import { Breadcrumb } from '@/components/breadcrumb'
import { IWhyChooseUsProps, WhyChooseUs } from '@/components/why-choose-us'
import {
  Banner,
  IBannerProps,
} from '@/sections/detail-settlement-programs/banner'
import {
  IProcessStepsProps,
  ProcessSteps,
} from '@/sections/detail-settlement-programs/process-steps'
import {
  IProgramBenefitsProps,
  ProgramBenefits,
} from '@/sections/detail-settlement-programs/program-benefits'
import {
  IProgramEligibilityProps,
  ProgramEligibility,
} from '@/sections/detail-settlement-programs/program-eligibility'
import {
  IProgramOverviewProps,
  ProgramOverview,
} from '@/sections/detail-settlement-programs/program-overview'
import {
  ISuccessStoryShareProps,
  SuccessStoryShare,
} from '@/sections/detail-settlement-programs/success-story-share'
import ImmigrationFAQ from '@/sections/immigration/faq/ImmigrationFAQ'
import { immigration } from '@/types/dataAcfImmigration.interface'
import { Term } from '@/types/dataAppraisal.interface'
import { FC } from 'react'
interface IDetailSettlementProgramsProps {
  post_title: string
  banner: IBannerProps
  program_overview: IProgramOverviewProps
  advantages_benefits: IAdvantagesBenefitsProps
  program_benefits: IProgramBenefitsProps
  program_eligibility: IProgramEligibilityProps
  why_choose_us: IWhyChooseUsProps
  process_steps: IProcessStepsProps
  story_share: ISuccessStoryShareProps
  acfNation: immigration
  dataTaxonomies: Term[]
  faq: any //eslint-disable-line
}

const DetailSettlementPrograms: FC<IDetailSettlementProgramsProps> = ({
  post_title,
  banner,
  program_overview,
  advantages_benefits,
  program_benefits,
  program_eligibility,
  why_choose_us,
  process_steps,
  story_share,
  acfNation,
  dataTaxonomies,
  faq,
}) => {

  const PropProcessSteps = {
    title_section: process_steps?.title || '',
    description: process_steps?.description || '',
    timeline: process_steps?.steps || [],
  }
  // console.log(acfNation)
  return (
    <main className='bg-background'>
      <Banner {...banner}>
      {
        acfNation && (
          <Breadcrumb
          items={[
            {label: 'Trang chủ', href: '/'},
            {
              label: `Các chương trình định cư ${acfNation?.name}`,
              href: `/${acfNation?.name}`,
            },
            {label: `${post_title}`, href: '/'},
          ]}
        />
        )
      }
      </Banner>
      <ProgramOverview {...program_overview} />
      <AdvantagesBenefits {...advantages_benefits} />
      <ProgramBenefits {...program_benefits} />
      <ProgramEligibility {...program_eligibility} />
      <ProcessSteps {...PropProcessSteps} />
      <WhyChooseUs {...why_choose_us} />
      <SuccessStoryShare {...story_share} />
      <ImmigrationFAQ
        dataFAQ={acfNation?.acf?.faq_nation}
        flag={acfNation?.acf?.flag}
        listFAQ={faq}
      />
      <ContactV2>
        <FormInternationalJourney dataNationSettlement={dataTaxonomies} />
      </ContactV2>
    </main>
  )
}

export default DetailSettlementPrograms
