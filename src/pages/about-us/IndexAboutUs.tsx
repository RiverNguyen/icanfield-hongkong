import AwardsCertifications, {
  IAwardsCertificationsProps,
} from '@/sections/aboutus/awards-certifications'
import BannerAboutus from '@/sections/aboutus/banner/BannerAboutus'
import Mission from '@/sections/aboutus/banner/Mission'
import ExpertTeam from '@/sections/aboutus/expert-team'
import { IOfficeMapProps, OfficeMap } from '@/sections/aboutus/office-map'
import PioneeringMission from '@/sections/aboutus/pioneering-mission/PioneeringMission'
import {
  IExpertTeamProps,
  dataAcfBanner,
  dataAcfPioneeringMission,
  dataMission,
} from '@/types/dataAcfAboutus.interface'
import { ImageHeader } from '@/types/dataHeader.interface'
interface dataAcf {
  banner_about_us: dataAcfBanner
  icanfields_mission: dataMission
  pioneering_mission: dataAcfPioneeringMission
  elite_team_of_experts_creating_a_successful_journey: IExpertTeamProps
  awards_certifications: IAwardsCertificationsProps
  icanfield_office: IOfficeMapProps
  icanfield_office_map: ItemMap[]
}
export interface ItemMap {
  flag: string
  name: string
  label_x: string
  label_y: string
  gallery: ImageHeader[]
  description: string
  location: string
  office_time: string
  link: string
}

const IndexAboutUs = ({
  dataAcf,
}: {
  dataAcf: dataAcf
}) => {
  const officeMap: IOfficeMapProps = {
    description: dataAcf?.icanfield_office?.description,
    subtitle: dataAcf?.icanfield_office?.subtitle,
    title: dataAcf?.icanfield_office?.title,
    info: dataAcf?.icanfield_office?.info,
    countries: dataAcf?.icanfield_office_map,
  }
  return (
    <>
      <BannerAboutus dataAcfBanner={dataAcf?.banner_about_us} />
      <Mission dataMission={dataAcf?.icanfields_mission} />
      <PioneeringMission
        dataAcfPioneeringMission={dataAcf?.pioneering_mission}
      />
      <OfficeMap {...officeMap} />
      <ExpertTeam
        dataExpertTeam={
          dataAcf?.elite_team_of_experts_creating_a_successful_journey
        }
      />
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
