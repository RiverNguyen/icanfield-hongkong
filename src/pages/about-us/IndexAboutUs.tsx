import AwardsCertifications, { IAwardsCertificationsProps } from '@/sections/aboutus/awards-certifications'
import awardsCertifications from '@/sections/aboutus/awards-certifications/constants'
import BannerAboutus from '@/sections/aboutus/banner/BannerAboutus'
import Mission from '@/sections/aboutus/banner/Mission'
import ExpertTeam from '@/sections/aboutus/expert-team'
import {OfficeMap} from '@/sections/aboutus/office-map'
import officeMap from '@/sections/aboutus/office-map/constants'
import PioneeringMission from '@/sections/aboutus/pioneering-mission/PioneeringMission'
import { IExpertTeamProps, dataAcfBanner, dataAcfPioneeringMission, dataMission } from '@/types/dataAcfAboutus.interface'

interface dataAcf {
  banner_about_us: dataAcfBanner
  icanfields_mission: dataMission
  pioneering_mission: dataAcfPioneeringMission
  elite_team_of_experts_creating_a_successful_journey: IExpertTeamProps
  awards_certifications: IAwardsCertificationsProps
}
const IndexAboutUs = ({dataAcf}: {dataAcf: dataAcf}) => {
  return (
    <>
      <BannerAboutus dataAcfBanner={dataAcf?.banner_about_us} />
      <Mission dataMission={dataAcf?.icanfields_mission} />
      <PioneeringMission dataAcfPioneeringMission={dataAcf?.pioneering_mission} />
      <OfficeMap {...officeMap} />
      <ExpertTeam dataExpertTeam={dataAcf?.elite_team_of_experts_creating_a_successful_journey}/>
      <AwardsCertifications 
        background={dataAcf?.awards_certifications?.background}
        items={dataAcf?.awards_certifications?.items}
        logo={dataAcf?.awards_certifications?.logo}
        title={dataAcf?.awards_certifications?.title}
      />
    </>
  )
}

export default IndexAboutUs
