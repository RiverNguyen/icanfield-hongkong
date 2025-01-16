/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ProjectInvestorDeveloper from '@/sections/detail-eb5/project-investor-developer'
// import {projectInvestorDeveloperProps} from '@/sections/detail-eb5/project-investor-developer/constants'
import ProjectLocation from '@/sections/detail-eb5/project-location'
// import {projectLocationProps} from '@/sections/detail-eb5/project-location/constants'
import ProjectOverview from '@/sections/detail-eb5/project-overview'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import {Breadcrumb} from '@/components/breadcrumb'
import CapitalStructure from '@/components/chart/CapitalStructure'
import {ProcessSteps} from '@/sections/detail-settlement-programs/process-steps'
import {IDataAcfDetailEB5} from '@/types/dataAcfDetailEB5.interface'

const DetailEB5 = ({data}: {data: IDataAcfDetailEB5}) => {
  if (!data || !data.acf) {
    return <div>Error: Data or ACF is undefined</div>
  }
  const {acf, title} = data
  return (
    <div className='mx-auto max-w-[100rem] bg-background'>
      <Banner
        title_line_1={acf?.eb5_projects_detail_banner.title_line_1}
        title_line_2={acf?.eb5_projects_detail_banner.title_line_2}
        description={acf?.eb5_projects_detail_banner.description}
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={acf?.eb5_projects_detail_banner.banner_desktop}
        background_mb={acf?.eb5_projects_detail_banner.banner_mobile}
      >
        <Breadcrumb
          items={[
            {label: 'Trang chủ', href: '/'},
            {label: title.rendered, href: '#'},
          ]}
        />
      </Banner>
      <ProjectOverview
        outstanding={acf?.eb5_projects_detail_outstanding}
        overview={acf?.eb5_projects_detail_overview}
      />
      <CapitalStructure
        dataCapitalStructure={acf?.eb5_projects_detail_capital}
      />
      <ProcessSteps {...acf?.eb5_projects_detail_progress} />
      <ProjectLocation {...acf?.eb5_projects_detail_location} />
      <ProjectInvestorDeveloper {...acf?.eb5_projects_detail_quality} />
    </div>
  )
}
export default DetailEB5
