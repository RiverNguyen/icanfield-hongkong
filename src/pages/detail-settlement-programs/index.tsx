import {AdvantagesBenefits} from '@/components/advantages-benefits'
import advantagesBenefits from '@/components/advantages-benefits/constants'
import {WhyChooseUs} from '@/components/why-choose-us'
import whyChooseUs from '@/components/why-choose-us/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProcessSteps} from '@/sections/detail-settlement-programs/process-steps'
import processSteps from '@/sections/detail-settlement-programs/process-steps/constants'
import {ProgramBenefits} from '@/sections/detail-settlement-programs/program-benefits'
import programBenefits from '@/sections/detail-settlement-programs/program-benefits/constants'
import {ProgramEligibility} from '@/sections/detail-settlement-programs/program-eligibility'
import programEligibility from '@/sections/detail-settlement-programs/program-eligibility/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'
import {SuccessStoryShare} from '@/sections/detail-settlement-programs/success-story-share'
import successStoryShare from '@/sections/detail-settlement-programs/success-story-share/constants'

const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <AdvantagesBenefits {...advantagesBenefits} />
      <ProgramBenefits {...programBenefits} />
      <ProgramEligibility {...programEligibility} />
      <WhyChooseUs {...whyChooseUs} />
      <ProcessSteps {...processSteps} />
      <SuccessStoryShare {...successStoryShare} />
    </>
  )
}
export default DetailSettlementPrograms
