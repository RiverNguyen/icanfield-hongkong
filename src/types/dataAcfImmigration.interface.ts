export interface dataStrength {
    title: string
    label: string
    describe: string
    bacground: {
        url: string
        alt: string
    }
    icon: {
        url: string
        alt: string
    }
}

export interface dataBanner { 
    label: string
    image_pc: {
        alt: string
        url: string
    }
    image_mb: {
        alt: string
        url: string
    }
}

export interface dataAcf { 
    banner: dataBanner
    characteristic: dataStrength[]
}

export interface immigration {
    name: string
    acf: dataAcf
}

export interface information {
    investment_level: {
        title: string
        value: string
    }
    review_time: {
        title: string
        from: string
        to: string
    }
}
export interface interest { 
    amount_of_benefits: string
    title_interest:{
        title: string
    }[]
}
export interface dataProgramsAcf { 
    id: number
    title: string
    slug: string
    featured_image: string
    acf: {
        information: information
        interest: interest
    }
}
export interface dataPrograms { 
    success: boolean
    data: dataProgramsAcf[]
    pagination: {
        current_page: number
        per_page: number
        total_posts: number
        total_pages: number
    }
}
