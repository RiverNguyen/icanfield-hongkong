import {Media} from '@/types/image.interface'

export interface IItemAustralia {
  location: string
  slug: string
  title: string
  image: Media | null
  info: string[]
}
