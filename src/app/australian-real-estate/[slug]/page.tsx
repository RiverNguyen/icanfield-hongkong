import fetchDataACF from '@/fetch/fetchDataACF'
import DiverseAmenities from '@/sections/detail-property-australia/diverse-amenities'
import FAQForm, {
  FAQFormMobile,
} from '@/sections/detail-property-australia/faq-form'
import ProjectLocation from '@/sections/detail-property-australia/project-location'

import ProjectOther from '@/sections/detail-property-australia/project-other'
import ProjectOverview from '@/sections/detail-property-australia/project-overview'

import Slider, {SliderMobile} from '@/sections/detail-property-australia/slider'
import {IDataAcfDetailAustralia} from '@/types/dataAcfDetailAustralia.interface'
import {notFound} from 'next/navigation'

const page = async ({params: {slug}}: {params: {slug: string}}) => {
  const data = await fetchDataACF({
    api: `/australia-real-estat?slug=${slug}&acf_format=standard`,
    option: {
      revalidate: 10,
    },
  })
  if (data?.length <= 0) return notFound()
  const {id, title, acf, content} = data?.[0] as IDataAcfDetailAustralia
  return (
    <div className='bg-background pb-[6.35rem] xsm:bg-white xsm:pb-12'>
      <Slider
        {...acf.banner}
        title={title.rendered}
        className='xsm:hidden'
      />
      <SliderMobile
        {...acf.banner}
        title={title.rendered}
        className='hidden xsm:block'
      />
      <section className='mt-[5.75rem] flex items-start space-x-[2.6875rem] section-container xsm:mt-8'>
        <div className='w-[60.8125rem] space-y-[2.875rem] xsm:w-full xsm:space-y-8'>
          <ProjectOverview content={content.rendered} />
          <ProjectLocation {...acf.location} />
          <DiverseAmenities {...acf.diverse_amenities} />
        </div>
        <div className='sticky top-[6.44rem] flex-1 xsm:hidden'>
          <FAQForm />
        </div>
      </section>
      <FAQFormMobile />
      <ProjectOther id={id} />
    </div>
  )
}
export default page
