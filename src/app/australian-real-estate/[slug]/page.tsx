import DiverseAmenities from '@/sections/detail-property-australia/diverse-amenities'
import { diverseAmenitiesProps } from '@/sections/detail-property-australia/diverse-amenities/constants'
import FAQForm, {
    FAQFormMobile,
} from '@/sections/detail-property-australia/faq-form'
import ProjectLocation from '@/sections/detail-property-australia/project-location'
import { projectLocationProps } from '@/sections/detail-property-australia/project-location/constants'
import ProjectOther from '@/sections/detail-property-australia/project-other'
import ProjectOverview from '@/sections/detail-property-australia/project-overview'
import { projectOverviewProps } from '@/sections/detail-property-australia/project-overview/constants'
import Slider, { SliderMobile } from '@/sections/detail-property-australia/slider'
import { sliderProps } from '@/sections/detail-property-australia/slider/contants'

const page = () => {
  return (
    <div className='bg-background pb-[6.35rem] xsm:bg-white xsm:pb-12'>
      <Slider
        {...sliderProps}
        className='xsm:hidden'
      />
      <SliderMobile
        {...sliderProps}
        className='hidden xsm:block'
      />
      <section className='section-container mt-[5.75rem] flex items-start space-x-[2.6875rem] xsm:mt-8'>
        <div className='w-[60.8125rem] space-y-[2.875rem] xsm:w-full xsm:space-y-8'>
          <ProjectOverview {...projectOverviewProps} />
          <ProjectLocation {...projectLocationProps} />
          <DiverseAmenities {...diverseAmenitiesProps} />
        </div>
        <div className='sticky top-[6.44rem] flex-1 xsm:hidden'>
          <FAQForm />
        </div>
      </section>
      <FAQFormMobile />
      <ProjectOther />
    </div>
  )
}
export default page
