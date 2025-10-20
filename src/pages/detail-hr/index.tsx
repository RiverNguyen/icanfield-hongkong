import React from 'react'
import Achievements from '@/sections/detail-hr/archieverment'
import Banner from '@/sections/detail-hr/banner'
import FormContact from '@/sections/detail-hr/form-contact'
import Personnel from '@/sections/detail-hr/personnel'
import Reviews from '@/sections/detail-hr/reviews'
import Success from '@/sections/detail-hr/success'
import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'
import {Breadcrumb} from '@/components/breadcrumb'
import OurPeopleOurVoice from '@/sections/detail-hr/our-people-our-voice'
import Service from '@/sections/detail-hr/service'

export default function HRDetail({data}: {data: IDataAcfDetailHR}) {
  const title = data?.title
  const acf = data?.acf

  return (
    <main className='relative mt-[6.44rem] bg-background xsm:mt-[3.75rem]'>
      <Banner banner_background={acf?.banner_background}>
        <Breadcrumb
          items={[
            {label: 'Trang chủ', href: '/'},
            {label: 'Đội ngũ', href: '/doi-ngu'},
            {label: title, href: '#'},
          ]}
        />
      </Banner>
      <Personnel profile={acf?.profile} />
      <Achievements outstanding_achievements={acf?.outstanding_achievements} />
      <OurPeopleOurVoice our_people_our_voice={acf?.our_people_our_voice} />
      <Success success_story={acf?.success_story} />
      <Reviews testimonial={acf?.testimonial} />
      <Service service={acf?.service_list} />
      <FormContact title={acf?.title} />
    </main>
  )
}
