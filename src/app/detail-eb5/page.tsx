import ProjectInvestorDeveloper from '@/sections/detail-eb5/project-investor-developer'
import {projectInvestorDeveloperProps} from '@/sections/detail-eb5/project-investor-developer/constants'
import ProjectLocation from '@/sections/detail-eb5/project-location'
import {projectLocationProps} from '@/sections/detail-eb5/project-location/constants'
import ProjectOverview from '@/sections/detail-eb5/project-overview'
import {projectOverviewProps} from '@/sections/detail-eb5/project-overview/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import bannerSettlementPrograms from '@/sections/detail-settlement-programs/banner/constants'

const page = () => {
  return (
    <div className='mx-auto max-w-[100rem] bg-background'>
      <Banner {...bannerSettlementPrograms} />
      <ProjectOverview {...projectOverviewProps} />
      <ProjectLocation {...projectLocationProps} />
      <ProjectInvestorDeveloper {...projectInvestorDeveloperProps} />
    </div>
  )
}
export default page
