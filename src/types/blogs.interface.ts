/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Category {
  id: number
  name: string
  slug: string
  taxonomy: string
  primary?: boolean
}

export interface SortOption {
  name: string
  value: string
  orderBy: string
}

export interface DataItem {
  id: number
  category: Category[]
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: any
}

export interface ApiResponse {
  success: boolean
  total: number
  totalPages: number
  page: number
  limit: number
  data: DataItem[]
}

export interface ApiAcfBannerBlogsPage {
  title_line_1: string
  title_line_2: string
  description: string
  background: {
    alt: string
    url: string
  }
}

export interface IFeaturedNewsItem {
  categories: string[]
  title: string
  excerpt: string
  backgroundImage: string
  link: string
  date: string
  slug: string
}

export interface ApiAcfFeaturedNewsBlogsPage {
  title: string
  featured_news_blogs_page: IFeaturedNewsItem[]
}

export interface ApiAcfPage {
  banner_blogs_page: ApiAcfBannerBlogsPage
  featured_news: ApiAcfFeaturedNewsBlogsPage
  featured_news_blogs_page: IFeaturedNewsItem[]
}

