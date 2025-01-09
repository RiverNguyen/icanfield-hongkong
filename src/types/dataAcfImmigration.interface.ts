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
