export interface Term {
  name: string
  slug: string
  key: string
}

export interface FilterData {
  'investment-purpose': Term[]
  'expected-budget': Term[]
  nation: Term[]
}

export interface ApiResponse {
  status: number
  success: boolean
  message: string
  data: FilterData
}
