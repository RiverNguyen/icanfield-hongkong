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
