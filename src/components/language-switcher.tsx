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

const languages = [
  {code: 'zh', name: '中文', flag: '🇹🇼'},
  {code: 'zh-cn', name: '简体中文', flag: '🇨🇳'},
  {code: 'en', name: 'English', flag: '🇺🇸'},
]

export default function LanguageSwitcher() {
  const locale = useLocale()

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
          <span className='hidden sm:inline'>{currentLanguage?.flag}</span>
          <span className='md:inline hidden'>{currentLanguage?.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='z-[1000] w-48 bg-white p-2'>
        <div className='space-y-1'>
          {languages.map((language) => (
            <Link
              href={`/${language.code}`}
              key={language.code}
            >
              <Button
                key={language.code}
                variant={locale === language.code ? 'default' : 'ghost'}
                className='w-full justify-start gap-2'
              >
                <span>{language.flag}</span>
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
