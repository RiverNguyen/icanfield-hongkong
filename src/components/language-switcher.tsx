'use client'

/**
 * Language Switcher Component
 *
 * Features:
 * - Shows current language with flag
 * - Dropdown with all available languages
 * - Preserves current path when switching languages
 * - Uses shadcn UI components (Popover, Button)
 *
 * Usage:
 * <LanguageSwitcher />
 */

import {useLocale} from 'next-intl'
import {Languages} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import Link from 'next/link'

interface ILanguageSwitcher {
  [key: string]: {
    slug: string
  }
}

interface LanguageSwitcherProps {
  data?: ILanguageSwitcher
}

type LanguageItem = {
  code: string
  name: string
  slug?: string
  flag?: string
}

const defaultLanguages: LanguageItem[] = [
  {code: 'zh', name: '中文', flag: '🇹🇼'},
  {code: 'zh-cn', name: '简体中文', flag: '🇨🇳'},
  {code: 'en', name: 'English', flag: '🇺🇸'},
]

// Helper function to generate language URL
const generateLanguageUrl = (language: LanguageItem): string => {
  if (language.code === 'zh') {
    return language.slug ? `/${language.slug}` : `/${language.code}`
  }
  return language.slug
    ? `/${language.code}/${language.slug}`
    : `/${language.code}`
}

export default function LanguageSwitcher({data}: LanguageSwitcherProps) {
  const locale = useLocale()

  // Merge API data with default languages
  const languages: LanguageItem[] = defaultLanguages.map((language) => {
    const apiData = data?.[language.code]
    return {
      ...language,
      ...(apiData && {
        name: language.name,
        slug: apiData.slug,
      }),
    }
  })

  const currentLanguage = languages.find((lang) => lang.code === locale)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-2'
        >
          <Languages className='h-4 w-4' />
          <span className='hidden sm:inline'>
            {currentLanguage?.flag || '🏳️'}
          </span>
          <span className='md:inline hidden'>{currentLanguage?.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='z-[1000] w-48 bg-white p-2'>
        <div className='space-y-1'>
          {languages.map((language) => (
            <Link
              href={generateLanguageUrl(language)}
              key={language.code}
            >
              <Button
                variant={locale === language.code ? 'default' : 'ghost'}
                className='w-full justify-start gap-2'
              >
                <span>{language.flag || '🏳️'}</span>
                <span>{language.name}</span>
                {locale === language.code && (
                  <span className='ml-auto text-xs'>✓</span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
