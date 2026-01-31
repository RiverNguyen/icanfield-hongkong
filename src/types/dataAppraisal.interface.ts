import {dataProgramsAcf} from '@/types/dataAcfImmigration.interface'
import {Media} from '@/types/image.interface'

export interface filterAppraisal {
  icon: {
    url: string
  }
  title: string
  from: number
  to: number
  unit: string
}

export interface bannerEvaluation {
  images: Media
  images_mb: Media
  title_line_1: string
  title_line_2: string
  description: string
}

export interface filterValue {
  icon: string
  title: string
  from: number
  to: number
  unit: string
  step: number
}

// Alias for backward compatibility
export type valueFilter = filterValue

export interface filter {
  estimated_investment_budget: filterValue
  possibility_of_residence: filterValue
  total_assets: filterValue
  age: filterValue
  number_of_children: filterValue
}

export interface dataAppraisal {
  filter_value: filter
  banner_evaluation: bannerEvaluation
}

export interface Term {
  id: number
  name: string
  slug: string
  description: string
  flag?: string
}

export interface Taxonomies {
  nation: Term[]
  educationLevel: Term[]
  managementExperience: Term[]
  foreignLanguageProficiency: Term[]
  investmentPurpose: Term[]
}

export interface valueFilterPost {
  nation: string
  callingcode?: string
  languageproficiency: string
  educationlevel: string
  managementexperience: string
  estimatedInvestmentBudget: string
  possibilityOfResidence: string
  totalAssets: string
  age: string
  numberOfChildren: string
  languageproficiency_score?: string | null
  page?: string
  perPage?: string
}

export interface dataPostFilter_pagination {
  total: number
  perPage: number
  currentPage: number
  totalPages: number
}

export interface dataPostFilter {
  status: boolean
  posts: dataProgramsAcf[]
  pagination: dataPostFilter_pagination
}

// ==== New Appraisal API Response Interfaces ====

export interface ExplanationDetail {
  user_days?: number
  required_days?: number
  user?: string | string[]
  score?: number
  user_asset?: number
  required_asset?: number
  user_level?: string
  user_priority?: number
  required_priority?: number
  experience_years?: number
  required_language?: string
  age?: number
  preferred?: {
    min?: number
    max?: number
  }
}

export interface Explanation {
  key: string
  status: 'pass' | 'fail' | 'info' | 'soft' | 'hard'
  hardFail?: boolean
  detail?: ExplanationDetail
  message_key: string
  s_score?: number
  contribution?: number
  message?: string
  purpose_score?: number
  label?: string
}

export interface AppraisalProgram {
  id: number
  title: string
  excerpt: string
  slug: string
  featured_image: string
  nation: string
  status_key: 'not_fit' | 'fit' | 'potential' | string
  status_message: string
  score: number
  explanations: Explanation[]
}

export interface AppraisalResponse {
  programs: AppraisalProgram[]
  pagination: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}
