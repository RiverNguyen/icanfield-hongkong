import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProcessSteps} from '@/sections/detail-settlement-programs/process-steps'
import processSteps from '@/sections/detail-settlement-programs/process-steps/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'

const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <ProcessSteps {...processSteps} />
    </>
  )
}
export default DetailSettlementPrograms
