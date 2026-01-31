/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import useStore from '@/app/(store)/store'
import ICSearch from '@/components/icon/ICSearch'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { JSON_TYPE } from '@/types/passport'
import countryList from '@/sections/passport/research/countrylist.json'
import countryListZh from '@/sections/passport/research/countrylist_zh_full.json'
import countryListZhCn from '@/sections/passport/research/countrylist_zh_cn_full.json'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { useLocale, useTranslations } from 'next-intl'

interface ICountry {
	code: string
	name: string
}

type Item = {
	name: string
	[key: string]: any
}


const ListCountry = ({ data }: any) => {
	const t = useTranslations('')
	const locale = useLocale()
	const router = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()

	const tabs = [
		{
			label: t('tat_ca'),
			color: JSON_TYPE.DEFAULT,
		},
		{
			label: t('mien_thi_thuc'),
			color: JSON_TYPE.FREE,
		},
		{
			label: t('thi_thuc_nhap_canh_tai_san_bay'),
			color: JSON_TYPE.AIRPORT,
		},
		{
			label: t('yeu_cau_thi_thuc'),
			color: JSON_TYPE.REQUIRED,
		},
	]

	const [baseData, setBaseData] = useState<any[]>([])
	const [dataLatest, setDataLatest] = useState<any[]>([])
	const { showCountry, setShowCountry } = useStore((state) => state)

	const [search, setSearch] = useState('')
	const debounced = useDebounceCallback(setSearch, 500)

	const [tab, setTab] = useState(0)

	const countries = useMemo(() => {
		return locale === 'zh'
			? (countryListZh as any[])
			: locale === 'zh-cn'
				? (countryListZhCn as any[])
				: (countryList as any[])
	}, [locale])

	const countryNameByCode = useMemo(() => {
		const map = new Map<string, string>()
		for (const c of countries || []) {
			if (c?.code && c?.name) map.set(String(c.code).toUpperCase(), String(c.name))
		}
		return map
	}, [countries])

	const localizeItem = (item: any) => {
		const code = String(item?.code || '').toUpperCase()
		const localizedName = countryNameByCode.get(code)
		return {
			...item,
			name: localizedName || item?.name || '',
		}
	}

	useEffect(() => {
		if (window.innerWidth < 640 && showCountry) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}
	}, [showCountry])

	useEffect(() => {
		if (tab === 0) {
			setBaseData(
				[
					...(data?.visa_free_access || []),
					...(data?.visa_on_arrival || []),
					...(data?.visa_required || []),
				].map(localizeItem),
			)
		} else if (tab === 1) {
			setBaseData([...(data?.visa_free_access || [])].map(localizeItem))
		} else if (tab === 2) {
			setBaseData([...(data?.visa_on_arrival || [])].map(localizeItem))
		} else if (tab === 3) {
			setBaseData([...(data?.visa_required || [])].map(localizeItem))
		}
	}, [tab, data, countryNameByCode])

	useEffect(() => {
		if (search) {
			setDataLatest(handleSearch(baseData, search))
		} else {
			setDataLatest(baseData)
		}
	}, [search, baseData])

	const handleSearch = (array: Item[], searchTerm: string): Item[] => {
		if (!searchTerm.trim()) return array

		const normalizedSearchTerm = searchTerm.trim().toLowerCase()

		return array.filter((item) =>
			item.name.toLowerCase().includes(normalizedSearchTerm),
		)
	}

	const handleChangePassport = (code: string) => {
		const paramNew = new URLSearchParams(searchParams ?? '')
		paramNew.set('postal', code)
		router.push(pathName + '?' + paramNew.toString(), {
			scroll: false,
		})
	}

	return (
		<>
			<div
				onClick={() => {
					setShowCountry(false)
				}}
				className={cn(
					'pointer-events-none fixed left-0 top-0 z-[50] size-full bg-black/50 opacity-0 transition-all duration-700 sm:hidden',
					showCountry && 'pointer-events-auto opacity-100',
				)}
			></div>
			<div
				className={cn(
					'pointer-events-none absolute left-0 top-0 z-[51] size-full bg-white p-[1.5rem] opacity-0 transition-all duration-300 ease-in-out xsm:fixed xsm:bottom-0 xsm:left-0 xsm:top-[unset] xsm:h-[72vh] xsm:translate-y-[110%] xsm:rounded-[1rem_1rem_0rem_0rem] xsm:p-0 xsm:pb-[1.5rem] xsm:pt-[1.5rem] xsm:duration-500',
					showCountry && 'pointer-events-auto opacity-100 xsm:translate-y-0',
				)}
			>
				<div className='mb-[1.5rem] flex w-full sm:h-[3rem] sm:items-center sm:justify-between xsm:mb-[1rem] xsm:flex-col'>
					<div className='hidden-scrollbar flex w-fit space-x-[1.75rem] xsm:w-full xsm:overflow-x-auto xsm:px-[1rem]'>
						{tabs.map((item, index) => (
							<button
								onClick={() => setTab(index)}
								key={index}
								className={cn(
									'before: relative flex h-[2.5rem] w-fit items-center whitespace-nowrap text-black/60 transition-all duration-200 body16-m before:absolute before:bottom-0 before:left-0 before:w-0 before:border-b-[2px] before:border-solid before:border-[#95502F] before:text-[#95502F] before:transition-all before:duration-300',
									index === tab && 'text-[#95502F] before:w-full',
								)}
							>
								{item.label}
							</button>
						))}
					</div>
					<div className='relative flex h-[3rem] w-[16.9375rem] flex-shrink-0 items-center rounded-[0.5rem] bg-[#f3f3f3] xsm:mx-auto xsm:mt-[1rem] xsm:w-[calc(100%-2rem)]'>
						<Input
							name='search'
							placeholder={t('tim_kiem_quoc_gia')}
							className='w-full border-none bg-transparent pl-[3rem] pr-[0.5rem] text-greyscaletext-800 shadow-none outline-none body-14-m'
							onChange={(e) => debounced(e.target.value)}
							autoComplete='off'
						/>
						<ICSearch
							className={cn(
								'absolute left-[1rem] top-1/2 size-[1.5rem] -translate-y-1/2',
								search && '[&>path]:stroke-black',
							)}
						/>
					</div>
				</div>
				<ScrollArea className='h-[31.4rem] w-full xsm:h-[26rem]'>
					{Array.isArray(dataLatest) &&
						dataLatest.map((item: ICountry, index: number) => (
							<div
								className='relative h-fit w-full xsm:px-[1rem]'
								key={index}
							>
								<button
									onClick={() => handleChangePassport(item.code)}
									className='flex h-[3.5rem] w-full items-center justify-between border-b border-solid border-[rgba(0,0,0,0.10)] lg:hover:bg-greyscaletext-100/50 xsm:h-[3rem]'
								>
									<span className='inline-block flex-1 text-start font-semibold !tracking-[-0.02rem] !text-[#121212DE] body16-s xsm:-tracking-[-0.0175rem] xsm:body-14-s'>
										{item.name}
									</span>
									<div
										style={{
											backgroundColor:
												tab === 0 ? '#3F2214' : tabs?.[tab]?.color,
										}}
										className='flex h-[2.0625rem] items-center justify-center whitespace-nowrap rounded-[0.5rem] px-[1rem] tracking-[-0.0175rem] text-white body-14-m'
									>
										{tabs?.[tab]?.label}
									</div>
								</button>
							</div>
						))}
				</ScrollArea>
			</div>
		</>
	)
}

export default ListCountry
