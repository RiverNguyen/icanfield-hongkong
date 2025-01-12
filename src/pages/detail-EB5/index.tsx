import ProjectInvestorDeveloper from '@/sections/detail-eb5/project-investor-developer'
import {projectInvestorDeveloperProps} from '@/sections/detail-eb5/project-investor-developer/constants'
import ProjectLocation from '@/sections/detail-eb5/project-location'
import {projectLocationProps} from '@/sections/detail-eb5/project-location/constants'
import ProjectOverview from '@/sections/detail-eb5/project-overview'
import {projectOverviewProps} from '@/sections/detail-eb5/project-overview/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import {Breadcrumb} from '@/components/breadcrumb'
import CapitalStructure from '@/components/chart/CapitalStructure'

const fakeData = {
  title: 'Cấu trúc vốn EB-5 an toàn',
  capital_source: [
    {
      browser: 'Vốn chủ đầu tư',
      visitors: 37.1,
      fill: '9E5431',
    },
    {
      browser: 'Vốn vay EB-5',
      visitors: 70.4,
      fill: 'E0C06C',
    },
    {
      browser: 'Vốn từ khoản vay cao cấp',
      visitors: 44.8,
      fill: 'BC9247',
    },
  ],
}
const DetailEB5 = () => {
  return (
    <div className='mx-auto max-w-[100rem] bg-background'>
      <Banner
        title_line_1='DỰ ÁN EB-5'
        title_line_2='Palm Springs Hotel'
        description='Chương trình mở ra cơ hội tuyệt vời cho các nhà đầu tư nước ngoài và gia đình của họ.'
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 1,
          url: '/imgs/detail-EB5/banner.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1000,
          date: 'string',
          modified: 'string',
          menu_order: 1000,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1000,
          height: 1000,
        }}
      >
        <Breadcrumb
          items={[
            {label: 'Home', href: '/'},
            {label: 'Chi tiết dự án EB-5', href: '#'},
          ]}
        />
      </Banner>
      <ProjectOverview {...projectOverviewProps} />
      <CapitalStructure dataCapitalStructure={fakeData} />
      <ProjectLocation {...projectLocationProps} />
      <ProjectInvestorDeveloper {...projectInvestorDeveloperProps} />
    </div>
  )
}
export default DetailEB5
