import { Media } from "@/types/image.interface"

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
}

export interface Taxonomies {
  nation: Term[]
  educationLevel: Term[]
  managementExperience: Term[]
  foreignLanguageProficiency: Term[]
}

export interface valueFilterPost {
    nation: string
    languageproficiency: string
    educationlevel: string
    managementexperience: string
    estimatedInvestmentBudget: string
    possibilityOfResidence: string
    totalAssets: string
    age: string
    numberOfChildren: string
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
    posts: []
    pagination: dataPostFilter_pagination
}
