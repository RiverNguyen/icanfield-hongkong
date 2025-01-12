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

export interface dataListFAQ { 
    question: string
    reply: string
}

export interface dataFAQ { 
    settle: {
        alt: string
        url: string
    }
    number_of_successes: {
        title: string
        describe: string
    }
    standard_rate: {
        title: string
        describe: string
    }
    label: string
    contact_consulting: {
        title: string
        url: string
        target: string
    }
    faq: {
        title: string
        list_faq: dataListFAQ[]
    }
}

export interface dataReachFar { 
    logo: {
        alt: string
        url: string
    }
    describe: string
    document_appraisal: {
        title: string
        url: string
        target: string
    }
}

export interface dataAcf { 
    flag: {
        alt: string
        url: string
    }
    banner: dataBanner
    characteristic: dataStrength[]
    faq_nation: dataFAQ
    reach_far: dataReachFar
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

export interface SortOptionProgramme { 
    name: string
    value: string
}
