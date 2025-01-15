import {Breadcrumb} from '@/components/breadcrumb'
import ProjectTransparency from '@/components/project-transparency'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import TeaEB5Section from '@/sections/EB5/eb5-tea-sections'
import OutstandingProjectEB5 from '@/sections/EB5/outstanding-projects'
import {Suspense} from 'react'
// import PioneeringValues from '@/sections/EB5/pioneering-values'
import dynamic from 'next/dynamic'
const PioneeringValues = dynamic(
  () => import('@/sections/EB5/pioneering-values'),
  {
    ssr: false, // Nếu component không cần server-side rendering
    loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
  },
)
import React from 'react'

const PageEB5 = () => {
  return (
    <main className='bg-background'>
      <Banner
        title_line_1='ĐẦU TƯ EB-5 AN TOÀN'
        title_line_2='Định Cư Mỹ Dễ Dàng'
        description='Chương trình mở ra cơ hội tuyệt vời cho các nhà đầu tư nước ngoài và gia đình của họ.'
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)86.12%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 1,
          url: '/imgs/EB5/Banner/d-bg.webp',
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
            {label: 'Blogs', href: '#'},
          ]}
        />
      </Banner>
      <TeaEB5Section />
      <PioneeringValues />
      <Suspense fallback={<p>Loading...</p>}>
        <OutstandingProjectEB5 />
      </Suspense>
      <ProjectTransparency />
      <WrapperConnectUs />
    </main>
  )
}

export default PageEB5
