import { Locale } from 'next-intl'
export const getLocaleSlug = (locale: Locale) => {
	return { zh: '', 'zh-cn': '/zh-cn', en: '/en' }[locale]
}
