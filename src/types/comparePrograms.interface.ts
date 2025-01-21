export interface acfPage { 
  banner_compare_programs_acf: {
    clone_banner: {
      title_line_1: string
      title_line_2: string
      description: string
      background_pc: {
        url: string
        alt: string
      }
      background_mb: {
        url: string
        alt: string
      }
    }
  }
}

export interface Term {
  id: number
  name: string
  slug: string
  taxonomy: string
  primary_id: number | false
  primary: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  taxonomy: string
  primary: boolean
  flag: {
    alt: string
    url: string
  }
}

export interface Compare {
  [key: string]: string | undefined;
}

export interface DataItem {
  id: number
  category: Category[]
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  compare: Compare
}
