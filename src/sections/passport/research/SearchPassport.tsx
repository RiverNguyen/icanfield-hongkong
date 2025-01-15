/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {Check, ChevronsUpDown} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

import countryList from '@/sections/passport/research/countrylist.json'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import ICSearch from '@/components/icon/ICSearch'

const FormSchema = z.object({
  postal: z.string({
    required_error: 'Please select a country.',
  }),
})

interface IProps {
  setCodePostal: React.Dispatch<React.SetStateAction<string | null>>
}

const SearchPassport = ({setCodePostal}: IProps) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    const postal = searchParams?.get('postal')
    if (postal) {
      form.setValue('postal', postal)
    }
  }, [searchParams])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCodePostal(data.postal)

    const paramNew = new URLSearchParams(searchParams ?? '')

    paramNew.set('postal', data.postal)
    router.push(pathName + '?' + paramNew.toString(), {
      scroll: false,
    })
  }

  function handleFindCountry(postal: string) {
    const countryCurrent = countryList?.find(
      (item: any) => item.code === postal,
    )
    return countryCurrent?.name || 'Not found!'
  }
  return (
    <div className='rounded-[1.25rem] bg-white p-[1.5rem] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:p-[1rem]'>
      <h2 className='font-medium text-Phase-1-Brown heading3 xsm:text-[1.25rem] xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
        Tra cứu thông tin hộ chiếu
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex items-end sm:space-x-[0.5rem] xsm:flex-col xsm:space-y-[0.75rem]'
        >
          <FormField
            control={form.control}
            name='postal'
            render={({field}) => (
              <FormItem className='flex w-full flex-col space-y-0'>
                <FormLabel className='mb-[0.75rem] mt-[1.5rem] inline-block font-optima text-tagtext body-14-m xsm:my-[1rem] xsm:text-[-0.0175rem]'>
                  Quốc gia hộ chiếu
                </FormLabel>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'h-[3rem] w-[17.6875rem] justify-between rounded-[0.5rem] border-none bg-[#F6F6F6] outline-none xsm:h-[2.75rem] xsm:w-full',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? handleFindCountry(field.value)
                          : 'Chọn quốc gia'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[17.6875rem] bg-white p-0 xsm:w-[calc(100vw-4.2rem)]'>
                    <Command>
                      <CommandInput placeholder='Tìm kiếm quốc gia...' />
                      <CommandList>
                        <CommandEmpty>Không tìm thấy!</CommandEmpty>
                        <CommandGroup>
                          {countryList?.map((country: any) => (
                            <CommandItem
                              className='cursor-pointer lg:hover:bg-greyscaletext-50'
                              value={country?.code}
                              key={country?.name}
                              onSelect={() => {
                                form.setValue('postal', country?.code)
                                setOpen(false)
                              }}
                            >
                              {country?.name}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  country?.code === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type='submit'
            className='flex h-[3rem] flex-1 items-center justify-between rounded-[0.5rem] bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)] px-[1.5rem] xsm:h-[2.75rem] xsm:min-h-[2.75rem] xsm:w-full xsm:justify-center xsm:space-x-[0.62rem]'
          >
            <ICSearch className='size-[1.25rem] [&>path]:stroke-white' />
            <span className='whitespace-nowrap text-[0.875rem] font-medium leading-normal text-white'>
              Tra cứu
            </span>
          </button>
        </form>
      </Form>
    </div>
  )
}

export default SearchPassport
