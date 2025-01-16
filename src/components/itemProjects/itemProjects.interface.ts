import {Media} from '@/types/image.interface'

interface Location {
  id: number
  name: string
  slug: string
  taxonomy: string
  primary: boolean
}

export interface IProject {
  id: number
  location: Location[]
  slug: string
  title: string
  image: Media
  type: string
  project_scale: number
  eb5_capital_ratio: number
  jobs_created: number
  contact: string
}
