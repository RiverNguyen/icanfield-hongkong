import {AdvantagesBenefits} from '@/components/advantages-benefits'
import advantagesBenefits from '@/components/advantages-benefits/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'
import {SuccessStoryShare} from '@/sections/detail-settlement-programs/success-story-share'
import successStoryShare from '@/sections/detail-settlement-programs/success-story-share/constants'

export const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <AdvantagesBenefits {...advantagesBenefits} />
      <SuccessStoryShare {...successStoryShare} />
    </>
  )
}
