import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProgramEligibility} from '@/sections/detail-settlement-programs/program-eligibility'
import programEligibility from '@/sections/detail-settlement-programs/program-eligibility/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'

export const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <ProgramEligibility {...programEligibility} />
    </>
  )
}
