import AwardsCertifications from '@/sections/aboutus/awards-certifications'
import awardsCertifications from '@/sections/aboutus/awards-certifications/constants'
import BannerAboutus from '@/sections/aboutus/banner'
import Mission from '@/sections/aboutus/banner/Mission'
import {ExpertTeam} from '@/sections/aboutus/expert-team'

const IndexAboutUs = () => {
  return (
    <>
      <BannerAboutus />
      <Mission />
      <AwardsCertifications {...awardsCertifications} />
      <ExpertTeam />
    </>
  )
}

export default IndexAboutUs
