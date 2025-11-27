export interface linkInterface {
    title: string
    url: string
    target: string
}

export interface contactInformatio {
    icon: string
    link: linkInterface
}

export interface dataFooter {
    title: string
    customer_support: linkInterface
    logo_footer: {
        url: string
        alt: string
    }
    contact_information: {
        title: string
        contact_information_repeater: contactInformatio[]
    }
    menu: {
        title: string
        menu_repeater: linkInterface[]
    }
    describe: string
    social: {
        icon: {
            url: string
            alt: string
        }
        link: string
    }[]
    watermark: string
}
