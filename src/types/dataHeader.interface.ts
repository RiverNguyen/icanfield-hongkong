
export interface dataHeader {
  logo: ImageHeader
  logo_mb: ImageHeader
  consulting_phone_number: string
  news_business: {
    label: string
    link: string
    outstanding_news: OutstandingPost[]
  }
  events: {
    label: string
    link: string
  }
  settlement_news: {
    label: string
    link: string
  }
  contact: {
    label: string
    link: string
  }
  language: {
    languages: Language[]
  }
  settlement_programs: {
    list_of_program: Program[]
  }
  other_programs: {
    program_list: ChildProgram[]
    label: string
  }
  icanfield_handbook: {
    label: string
    link: string
  }
  support_customer: {
    label: string
    list_support: ChildProgram[]
  }
}
export interface ImageHeader {
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: {
    thumbnail: string
    thumbnailWidth: number
    thumbnailHeight: number
    medium: string
    mediumWidth: number
    mediumHeight: number
    mediumLarge: string
    mediumLargeWidth: number
    mediumLargeHeight: number
    large: string
    largeWidth: number
    largeHeight: number
    size1536x1536: string
    size1536x1536Width: number
    size1536x1536Height: number
    size2048x2048: string
    size2048x2048Width: number
    size2048x2048Height: number
  }
}
export interface OutstandingPost {
  ID: number
  post_author: string
  post_date: string
  post_date_gmt: string
  post_content: string
  post_title: string
  post_excerpt: string
  post_status: string
  comment_status: string
  ping_status: string
  post_password: string
  post_name: string
  to_ping: string
  pinged: string
  post_modified: string
  post_modified_gmt: string
  post_content_filtered: string
  post_parent: number
  guid: string
  menu_order: number
  post_type: string
  post_mime_type: string
  comment_count: string
  filter: string
}
export interface Language {
  image_flag: ImageHeader
  label: string
}
export interface ChildProgram {
  label: string
  link: string
  image: ImageHeader
}

export interface Program {
  label: string
  link: string
  childrens: ChildProgram[] | false
  background_mobile: ImageHeader
  count :string
}
