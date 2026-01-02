export interface dataAcfBanner {
  images_background_pc: {
    url: string
    alt: string
  }
  images_background_mb: {
    url: string
    alt: string
  }
  we_are: {
    title: string
    image_about_us: {
      url: string
      alt: string
    }
  }
  label_group: string
  decscripts: string
}

export interface dataMission {
  label: string
  title: string
  decscripts: string
  parameter: {
    successful_settlement: {
      title: string
      data: number
    }
    study_abroad_successfully: {
      title: string
      data: number
    }
    investing_in_foreign_real_estate: {
      title: string
      data: number
    }
    global_partner: {
      title: string
      data: number
    }
  }
}

export interface dataAcfPioneeringMissionItem {
  title: string
  decscripts: string
  image: {
    url: string
    alt: string
  }
}

export interface dataAcfPioneeringMission {
  title: string
  decscripts: string
  list_item_mission: [
    dataAcfPioneeringMissionItem
  ]
}

export interface IExpertTeamPropsItem {
  image: {
    url: string
    alt: string
    link: string
  }
  name: string
  position: string
  describe: string
  link? : string
}

export interface IExpertTeamProps {
  title: string
  list_slider: [IExpertTeamPropsItem]
}
