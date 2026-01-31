'use client'

/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import {useEffect, useState} from 'react'
import {Input} from '@/components/ui/input'
import ImageV2 from '@/components/image/ImageV2'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import {ICLoading} from '@/sections/blogs/connect-us/FormConnectUs'
import {DEFAULT_COUNTRY_SELECT} from './constants'
import {UseFormSetValue} from 'react-hook-form'
import {useTranslations} from 'next-intl'

type CountryOption = {
  callingCode: string
  name: string
  flag?: string
}

// disable unused var warnings for typed function param names in this file
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PhoneInput({
  value,
  setValue,
  defaultCalling,
  locale,
}: {
  value?: string
  setValue: UseFormSetValue<Record<string, unknown>>
  defaultCalling?: string
  locale?: string
}) {
  const [selectedCalling, setSelectedCalling] = useState<string>(
    defaultCalling || '',
  )
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>('')
  const [countrySearch, setCountrySearch] = useState<string>('')
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([])
  const [isCountryLoading, setIsCountryLoading] = useState<boolean>(false)
  const t = useTranslations()

  // derive from incoming value on mount/update
  useEffect(() => {
    if (!value) return
    const root = value.match(/^\+\d+/)
    if (root) {
      setSelectedCalling(root[0])
      setPhoneNumberInput(value.replace(/^\+\d+/, ''))
    } else {
      setPhoneNumberInput(value)
    }
  }, [value])

  async function loadLocalCountries(): Promise<void> {
    if (countryOptions.length > 0 || isCountryLoading) return
    setIsCountryLoading(true)
    try {
      type CountryRaw = {
        idd?: {root?: string; suffixes?: string[]}
        name?: {common?: string}
        flags?: {svg?: string; png?: string}
      }
      const mod = await import('./restcountries.json')
      const data: CountryRaw[] = (mod && mod.default) || mod
      const mapped = data
        .map((c) => {
          const root = c?.idd?.root ?? ''
          const suffix =
            Array.isArray(c?.idd?.suffixes) && c.idd!.suffixes!.length > 0
              ? c.idd!.suffixes![0]
              : ''
          const callingCode = root + (suffix ?? '')
          return {
            callingCode: callingCode || '',
            name: c?.name?.common ?? '',
            flag: c?.flags?.svg ?? c?.flags?.png,
          }
        })
        .filter((c) => Boolean(c.callingCode))
      const dedup = Array.from(
        new Map(mapped.map((m) => [m.callingCode, m])).values(),
      )
      setCountryOptions(dedup.sort((a, b) => a.name.localeCompare(b.name)))
    } catch {
      // ignore
    } finally {
      setIsCountryLoading(false)
    }
  }

  useEffect(() => {
    // update form fields separately: calling code and phone number
    try {
      // avoid validating on mount/initial sync to prevent immediate error messages
      setValue('callingcode', selectedCalling, {shouldValidate: false})
      setValue('phone', phoneNumberInput, {shouldValidate: false})
    } catch {
      // ignore if setValue not available
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCalling, phoneNumberInput])

  const selectedCountryForDisplay = (() => {
    const found = countryOptions.find((x) => x.callingCode === selectedCalling)
    if (found) return found
    try {
      const defaults = DEFAULT_COUNTRY_SELECT as {
        [k: string]: {
          idd?: {root?: string; suffixes?: string[]}
          name?: {common?: string}
          flags?: {svg?: string; png?: string}
        }
      }
      const raw = (defaults[locale as string] ?? defaults['en']) as {
        idd?: {root?: string; suffixes?: string[]}
        name?: {common?: string}
        flags?: {svg?: string; png?: string}
      }
      const root = raw?.idd?.root ?? ''
      const suffix =
        Array.isArray(raw?.idd?.suffixes) && raw.idd!.suffixes!.length > 0
          ? raw.idd!.suffixes![0]
          : ''
      const defaultCalling = root + (suffix ?? '')
      if (defaultCalling === selectedCalling) {
        return {
          callingCode: defaultCalling,
          name: raw?.name?.common ?? '',
          flag: raw?.flags?.svg ?? raw?.flags?.png,
        }
      }
    } catch {
      // ignore
    }
    return undefined
  })()

  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <div className='flex w-full items-center gap-2'>
      <div className='w-[30%]'>
        <Popover
          open={popoverOpen}
          onOpenChange={(o) => {
            setPopoverOpen(o)
            if (o) loadLocalCountries()
          }}
        >
          <PopoverTrigger asChild>
            <button
              type='button'
              className='flex h-[3rem] w-full items-center justify-start rounded-[0.75rem] bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem]'
              aria-expanded={popoverOpen}
            >
              {selectedCountryForDisplay ? (
                <div className='flex items-center gap-2'>
                  {selectedCountryForDisplay.flag && (
                    <ImageV2
                      src={selectedCountryForDisplay.flag}
                      alt={selectedCountryForDisplay.name}
                      width={48}
                      height={48}
                      className='h-[1rem] w-[1.25rem] object-cover'
                    />
                  )}
                  <span>{selectedCountryForDisplay.callingCode}</span>
                </div>
              ) : (
                <span className='text-greyscaletext-200'>{t('chon_ma_quoc_gia')}</span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align='start'
            className='w-[24rem] rounded-[0.5rem] bg-white p-0 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.20)]'
          >
            {isCountryLoading ? (
              <div className='flex items-center justify-center py-4'>
                <ICLoading />
              </div>
            ) : (
              <Command className='min-h-[8rem]'>
                <CommandInput
                  placeholder={t('tim_kiem')}
                  value={countrySearch}
                  onValueChange={(val: string) => setCountrySearch(val)}
                />
                <CommandList>
                  <CommandEmpty>{t('khong_co_ket_qua')}</CommandEmpty>
                  <CommandGroup>
                    {countryOptions
                      .filter((c) => {
                        const q = countrySearch.trim().toLowerCase()
                        if (!q) return true
                        return (
                          c.name.toLowerCase().includes(q) ||
                          c.callingCode.toLowerCase().includes(q)
                        )
                      })
                      .map((c) => (
                        <CommandItem
                          key={c.callingCode}
                          onSelect={() => {
                            setSelectedCalling(c.callingCode)
                            try {
                              setValue('callingcode', c.callingCode, {
                                shouldValidate: true,
                              })
                            } catch {
                              // ignore
                            }
                            setPopoverOpen(false)
                          }}
                        >
                          <div className='flex items-center gap-2'>
                            {c.flag && (
                              <ImageV2
                                src={c.flag}
                                alt={c.name}
                                width={48}
                                height={48}
                                className='h-[1rem] w-[1.25rem] object-cover'
                              />
                            )}
                            <span>
                              {c.callingCode} {c.name}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className='relative flex-1'>
        <Input
          placeholder=''
          value={phoneNumberInput}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '')
            setPhoneNumberInput(digits)
            try {
              setValue('phone', digits, {shouldValidate: true})
            } catch {
              // ignore
            }
          }}
          className='h-[3rem] rounded-[0.75rem] border-none bg-[#F6F6F6] p-[0.75rem_0.5rem_0.75rem_1rem]'
        />
        {!phoneNumberInput && (
          <p className='pointer-events-none absolute left-[1rem] top-[0.75rem] text-greyscaletext-200 body16'>
            Phone
          </p>
        )}
      </div>
    </div>
  )
}
