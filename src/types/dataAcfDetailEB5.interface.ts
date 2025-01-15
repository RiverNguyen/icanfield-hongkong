import {Media} from '@/types/image.interface'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDataAcfDetailEB5 {
  id: number
  title: {
    rendered: string
  }
  slug: string
  acf: {
    eb5_projects_detail_information: {
      type: string
      project_scale: string
      eb5_capital_ratio: string
      jobs_created: string
    }
    eb5_projects_detail_banner: {
      banner_desktop: Media
      banner_mobile: Media
      title_line_1: string
      title_line_2: string
      description: string
    }
    eb5_projects_detail_outstanding: {
      thumbnail: Media
      title: string
      subtitle: string
    }[]
    eb5_projects_detail_overview: {
      title_section: string
      description: string
      album: Media[]
    }
    eb5_projects_detail_capital: {
      title_section: string
      total_capital: string
      investors_capital: {
        title: string
        convert_percent: string
      }
      capital_from_senior_loans: {
        title: string
        convert_percent: string
      }
      'eb-5_loan_capital': {
        title: string
        convert_percent: string
      }
    }
    eb5_projects_detail_progress: {
      title_section: string
      description: string
      timeline: {
        specific_time: string
        title: string
        content: string
        thumbnail: Media
      }[]
    }
    eb5_projects_detail_location: {
      title_section: string
      description: string
      subtitle: string
      description_subtitle: string
      google_map: Media
      prime_location: {
        thumbnail: Media
        title: string
        description: string
      }[]
    }
    eb5_projects_detail_quality: {
      title_section: string
      description: string
      investor: {
        name: string
        logo: Media
        years_of_experience: string
        project_completed: string
        job_creation: string
        description: string
      }
      development: {
        description: string
        logos: Media[]
      }
    }
  }
  ['key']?: any
}
