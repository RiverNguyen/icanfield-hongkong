import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProgramBenefits} from '@/sections/detail-settlement-programs/program-benefits'
import programBenefits from '@/sections/detail-settlement-programs/program-benefits/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'

export const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <ProgramBenefits {...programBenefits} />
    </>
  )
}
