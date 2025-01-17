import {Media} from '@/types/image.interface'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDataAcfDetailAustralia {
  id: number
  title: {
    rendered: string
  }
  slug: string
  content: {
    rendered: string
  }
  acf: {
    banner: {
      location: string
      info: {
        area: string
        price: string
        investor: string
        legal: string
        [key: string]: string
      }
      slide_banner: {
        type: 'video' | 'image'
        image: Media
        video: string
      }[]
    }
    location: {
      description: string
      iframe_google_map: string
      accordions: {
        title: string
        content: string
      }[]
    }
    diverse_amenities: {
      description: string
      utilities: {item: string}[]
      slide_room: {
        name_room: string
        image_room: Media
      }[]
    }
  }
  featured_media: Media | null
  ['key']?: any
}
