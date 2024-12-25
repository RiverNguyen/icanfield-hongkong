import AwardsCertifications from '@/sections/aboutus/awards-certifications'
import awardsCertifications from '@/sections/aboutus/awards-certifications/constants'
import BannerAboutus from '@/sections/aboutus/banner/BannerAboutus'
import Mission from '@/sections/aboutus/banner/Mission'

const IndexAboutUs = () => {
  return (
    <>
      <BannerAboutus />
      <Mission />
      <AwardsCertifications {...awardsCertifications} />
    </>
  )
}

export default IndexAboutUs
