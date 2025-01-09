import {AdvantagesBenefits} from '@/components/advantages-benefits'
import advantagesBenefits from '@/components/advantages-benefits/constants'
import {WhyChooseUs} from '@/components/why-choose-us'
import whyChooseUs from '@/components/why-choose-us/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProgramBenefits} from '@/sections/detail-settlement-programs/program-benefits'
import programBenefits from '@/sections/detail-settlement-programs/program-benefits/constants'
import {ProgramEligibility} from '@/sections/detail-settlement-programs/program-eligibility'
import programEligibility from '@/sections/detail-settlement-programs/program-eligibility/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'
import {SuccessStoryShare} from '@/sections/detail-settlement-programs/success-story-share'
import successStoryShare from '@/sections/detail-settlement-programs/success-story-share/constants'

export const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <WhyChooseUs {...whyChooseUs} />
      <ProgramBenefits {...programBenefits} />
      <AdvantagesBenefits {...advantagesBenefits} />
      <SuccessStoryShare {...successStoryShare} />
      <ProgramEligibility {...programEligibility} />
    </>
  )
}
