import {WhyChooseUs} from '@/components/why-choose-us'
import whyChooseUs from '@/components/why-choose-us/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'
import {ProgramOverview} from '@/sections/detail-settlement-programs/program-overview'
import programOverview from '@/sections/detail-settlement-programs/program-overview/constants'

export const DetailSettlementPrograms = () => {
  return (
    <>
      <Banner {...bannerSettlementPrograms} />
      <ProgramOverview {...programOverview} />
      <WhyChooseUs {...whyChooseUs} />
    </>
  )
}
