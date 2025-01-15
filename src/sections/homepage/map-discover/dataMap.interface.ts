import {ICountry} from '@/components/LeafletMap'
import { ImageHeader } from '@/types/dataHeader.interface'
// Định nghĩa kiểu dữ liệu cho đối tượng Nation
interface Nation {
  label: string
  name: string
  flag: string | false
}

// Định nghĩa kiểu dữ liệu cho từng phần tử trong map_data
interface MapDataItem {
  image_button: string
  data_nation: Nation[]
}

// Định nghĩa kiểu dữ liệu cho map_data
interface MapData {
  image_button: string
  data_nation: Nation[]
  slug: string
}

// Định nghĩa kiểu dữ liệu cho một bài viết
interface Post {
  ID: number
  title: string
  thumbnail: string
  slug: string
  information: Information
}
interface Information {
  investment_level: InvestmentLevel
  review_time: ReviewTime
  languages: Languages
}
interface InvestmentLevel {
  title: string
  value: string
}

// Định nghĩa kiểu dữ liệu cho review_time
interface ReviewTime {
  title: string
  from: string
  to: string
  difference: string
}

// Định nghĩa kiểu dữ liệu cho languages
interface Languages {
  title: string
  language_required: string
}
// Định nghĩa interface chính cho dữ liệu tổng thể
interface DataMapHomepage {
  map_data: MapData[]
  countries_data: ICountry[][] // Nếu cần cụ thể hơn, có thể định nghĩa kiểu cho countries_data
  posts: Post[]
  offices_data: ItemOfficeData[]
}
export interface ItemOfficeData {
  gallery_image: ImageHeader[]
  description:string
  location: string
  business_hours: string
  link_google_map: string
  slug: string
}
interface CountriesData {
  label: string
  name: string
  flag: string
}
export type {
  Nation,
  MapDataItem,
  MapData,
  Post,
  DataMapHomepage,
  CountriesData,
  Information,
}
