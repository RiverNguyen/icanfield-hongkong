import {Media} from './image.interface'

interface ILink {
  title: string
  url: string
  target: string
}

interface IAchievement {
  icon: Media
  description: string
}

export interface IPost {
  id: number
  slug: string
  title: string
  excerpt: string
  featured_image: string
  list_infomation: {label: string; value: string}[]
}

interface IFeedback {
  image: Media
  feedback: string
  signature: string
  link: ILink
}

export interface IService {
  id: number
  slug: string
  title: string
  excerpt: string
  featured_image: string
  nation: string[]
  acf: {
    information: {
      investment_level: {
        title: string
        value: string
      }
      review_time: {
        title: string
        from: string
        to: string
        difference: string
      }
      languages: {
        title: string
        language_required: string
      }
    }
    interest: {
      amount_of_benefits: number
      title_interest: string[]
    }
    invest: string
    order_settlement: string
  }
}

export interface IDataAcfDetailHR {
  id: number
  title: string
  slug: string
  content: string
  acf: {
    banner_background: Media
    profile: {
      name: string
      position: string
      short_description: string
      description: string
      avatar: Media
    }
    outstanding_achievements: {
      title: string
      background: Media
      list_achievements: IAchievement[]
    }
    our_people_our_voice: {
      name: string
      position: string
      quote: string
      signature: string
      image: Media
    }
    success_story: {title: string; list_post: IPost[]}
    testimonial: {title: string; feedback_list: IFeedback[]}
    service_list: {
      title: string
      description: string
      sub_title: string
      button: ILink
      service: IService[]
    }
    title: string
  }
}
