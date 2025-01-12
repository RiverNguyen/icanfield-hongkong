import {
  AdvantagesBenefits,
  IAdvantagesBenefitsProps,
} from '@/components/advantages-benefits'
import {IWhyChooseUsProps, WhyChooseUs} from '@/components/why-choose-us'
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
import {immigration} from '@/types/dataAcfImmigration.interface'
import {FC} from 'react'

interface IDetailSettlementProgramsProps {
  banner: IBannerProps
  program_overview: IProgramOverviewProps
  advantages_benefits: IAdvantagesBenefitsProps
  program_benefits: IProgramBenefitsProps
  program_eligibility: IProgramEligibilityProps
  why_choose_us: IWhyChooseUsProps
  process_steps: IProcessStepsProps
  story_share: ISuccessStoryShareProps
  acfNation: immigration
}

const DetailSettlementPrograms: FC<IDetailSettlementProgramsProps> = ({
  banner,
  program_overview,
  advantages_benefits,
  program_benefits,
  program_eligibility,
  why_choose_us,
  process_steps,
  story_share,
  acfNation,
}) => {
  return (
    <>
      <Banner {...banner} />
      <ProgramOverview {...program_overview} />
      <AdvantagesBenefits {...advantages_benefits} />
      <ProgramBenefits {...program_benefits} />
      <ProgramEligibility {...program_eligibility} />
      <WhyChooseUs {...why_choose_us} />
      <ProcessSteps {...process_steps} />
      <SuccessStoryShare {...story_share} />
      <ImmigrationFAQ
        dataFAQ={acfNation?.acf?.faq_nation}
        flag={acfNation?.acf?.flag}
      />
    </>
  )
}

export default DetailSettlementPrograms
