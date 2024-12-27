import AwardsCertifications from '@/sections/aboutus/awards-certifications'
import awardsCertifications from '@/sections/aboutus/awards-certifications/constants'
import BannerAboutus from '@/sections/aboutus/banner/BannerAboutus'
import Mission from '@/sections/aboutus/banner/Mission'
import {ExpertTeam} from '@/sections/aboutus/expert-team'
import {OfficeMap} from '@/sections/aboutus/office-map'
import officeMap from '@/sections/aboutus/office-map/constants'
import PioneeringMission from '@/sections/aboutus/pioneering-mission/PioneeringMission'

const IndexAboutUs = () => {
  return (
    <>
      <BannerAboutus />
      <Mission />
      <PioneeringMission />
      <OfficeMap {...officeMap} />
      <ExpertTeam
        name='John Doe'
        position='CEO'
        srcimage='/path/to/image.jpg'
        content='John has over 20 years of experience in the industry.'
      />
      <AwardsCertifications {...awardsCertifications} />
    </>
  )
}

export default IndexAboutUs
