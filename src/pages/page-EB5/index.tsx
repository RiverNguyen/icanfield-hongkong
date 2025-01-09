import {Breadcrumb} from '@/components/breadcrumb'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import TeaEB5Section from '@/sections/EB5/eb5-tea-sections'
import OutstandingProjectEB5 from '@/sections/EB5/outstanding-projects'
import PioneeringValues from '@/sections/EB5/pioneering-values'
import React from 'react'

const PageEB5 = () => {
  return (
    <main className='bg-background'>
      <Banner
        titleTop='ĐẦU TƯ EB-5 AN TOÀN'
        titleBottom='Định Cư Mỹ Dễ Dàng'
        description='Chương trình mở ra cơ hội tuyệt vời cho các nhà đầu tư nước ngoài và gia đình của họ.'
        backgroundOverlay='linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)86.12%)'
        className='xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem] z-20'
        backgroundImage={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 1,
          url: '/imgs/EB5/banner/d-bg.webp',
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
      <TeaEB5Section/>
      <PioneeringValues/>
      <OutstandingProjectEB5/>
    </main>
  )
}

export default PageEB5
