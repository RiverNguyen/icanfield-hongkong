/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ImageV2 from '@/components/image/ImageV2'
import Image from 'next/image'
import { FilterOption } from '@/types/bannerFilter.interface'
import { convertToIframe } from '@/utils/convertToIframe'
import React, { useEffect, useRef, useState } from 'react'
import { FilterData } from './bannerHp.interface'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { filterOptions } from './constants'
const LazyReactPlayer = React.lazy(() => import('react-player'))
import { Suspense } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { getLocaleSlug } from '@/utils/localeSlug'
export interface IDataMedia {
	type: 'upload' | 'youtube' | 'tiktok' | 'slide'
	[key: string]: any
}
export interface IBannerHomepageProps {
	data: IDataMedia
}
const BannerHomepage = ({
	data,
	dataFilter,
}: {
	data: IDataMedia
	dataFilter: FilterData
}) => {
	const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])
	const isSelecting = useRef(false)
	const [openPopupFilter, setOpenPopupFilter] = React.useState(false)
	const [keyFilter, setKeyFilter] = React.useState('')
	const [selectedItems, setSelectedItems] = useState<{
		[key: number]: { label: string; slug: string; key: string }
	}>([])
	const t = useTranslations()
	const locale = useLocale() as 'zh' | 'zh-cn' | 'en'
	const slugLocale = getLocaleSlug(locale)
	//handle update FilterOption when dataFilter
	const [filterOptionsLastest, setFilterOptionsLastest] = useState(
		filterOptions({ locale }),
	)

	useEffect(() => {
		const updatedFilterOptions = filterOptions({ locale }).map((option) => {
			const dataKey = dataFilter[option.key as keyof FilterData]
			if (dataKey) {
				return {
					...option,
					children: dataKey.map((item) => ({
						label: item.name,
						slug: item.slug,
						key: option.key,
					})),
				}
			}
			return option
		})
		setFilterOptionsLastest(updatedFilterOptions)
	}, [])
	useEffect(() => { }, [filterOptionsLastest])
	const [openFilters, setOpenFilters] = React.useState<boolean[]>([])

	useEffect(() => {
		// Đảm bảo mảng trạng thái mở/đóng luôn khớp với số lượng filter
		setOpenFilters(new Array(filterOptionsLastest.length).fill(false))
	}, [filterOptionsLastest.length])

	const toggleDropdown = (index: number) => {
		setOpenFilters(
			(prev) => prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)), // Đảo trạng thái của filter được click
		)
	}
	//handle click outside filter
	const handleSelect = (
		filterIndex: number,
		selectedValue: { label: string; slug: string; key: string },
	) => {
		// Đánh dấu trạng thái đang chọn
		isSelecting.current = true

		// Cập nhật item đã chọn
		setSelectedItems((prev) => ({
			...prev,
			[filterIndex]: selectedValue,
		}))

		// Đóng dropdown của filter hiện tại
		setOpenFilters((prev) =>
			prev.map((isOpen, i) => (i === filterIndex ? false : isOpen)),
		)

		// Reset trạng thái sau khi tất cả cập nhật hoàn thành
		setTimeout(() => {
			isSelecting.current = false
		}, 0) // Tăng thời gian lên 200ms để chắc chắn tất cả trạng thái được ổn định
	}
	//handle click outside filter
	const handleClickOutside = (e: MouseEvent) => {
		if (isSelecting.current) return // Nếu đang chọn thì không xử lý
		if (
			dropdownRefs.current.every(
				(ref) => ref && !ref.contains(e.target as Node),
			)
		) {
			setOpenFilters(new Array(filterOptionsLastest.length).fill(false)) // Đóng tất cả dropdown
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])
	//handle click popup filter
	const handleClickPopupFilter = (key: string) => {
		setKeyFilter(key)
		setOpenPopupFilter(true)
	}
	const currentFilter = filterOptionsLastest.find(
		(filter) => filter.key === keyFilter,
	)
	//handle Search
	const toCamelCase = (str: string) => {
		return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase())
	}

	const searchFilter = () => {
		// console.log('search', selectedItems)

		const queryString = Object.values(selectedItems)
			.map((item) => {
				const camelCaseKey = toCamelCase(item.key)
				return `${camelCaseKey}=${item.slug}`
			})
			.join('&')

		// Tạo URL đầy đủ
		const redirectUrl = `${slugLocale}/search-results?${queryString}`
		// console.log('Redirecting to:', redirectUrl)

		// Chuyển hướng
		window.location.href = redirectUrl
	}
	return (
		<section className='relative mt-[6.44rem] h-[42.8125rem] w-full xsm:mt-[2.25rem] xsm:h-[33.06rem] xsm:bg-background'>
			<h1 className='hidden'>iCcanfield</h1>
			{data.type != 'slide' ? (
				<div className='banner-video absolute left-0 top-0 h-full w-full overflow-hidden rounded-bl-[0.5rem] rounded-br-[0.5rem] xsm:relative xsm:h-[14.625rem]'>
					{data.type === 'upload' ? (
						<Suspense fallback={<div>Loading...</div>}>
							<LazyReactPlayer
								url={data[data.type].url || ''}
								playing
								loop
								muted
								preload='none'
								playsinline
								width='100%'
								height='100%'
								className='!h-full !w-full object-cover [&__video]:object-cover'
							/>
						</Suspense>
					) : data.type === 'tiktok' ? (
						<iframe
							src={`${convertToIframe(data) || ''}`}
							width='100%'
							height='100%'
							frameBorder='0'
							allowFullScreen
							className='!h-full !w-full object-cover'
						></iframe>
					) : (
						<LazyReactPlayer
							url={convertToIframe(data) || ''}
							playing
							loop
							playsinline
							muted
							preload='none'
							width='100%'
							height='100%'
							className='!h-full !w-full object-cover [&_div_iframe]:object-cover'
						/>
					)}
				</div>
			) : (
				<div className='absolute left-0 top-0 z-[0] h-full w-full xsm:relative xsm:h-[14.625rem]'>
					<Swiper
						autoplay={{
							delay: 3500,
							disableOnInteraction: false,
						}}
						effect='fade'
						loop={true}
						speed={800}
						modules={[Autoplay, EffectFade]}
						className='mySwiper !h-full'
					>
						{data[data.type].map(
							(
								item: { url: string; alt: string; width: number; height: number },
								index: number,
							) => (
								<SwiperSlide
									key={index}
									className='!h-full'
								>
									<ImageV2
										src={item.url || ''}
										alt={item.alt}
										width={item.width * 2 || 40}
										height={item.height * 2 || 40}
										className='h-full w-full object-cover'
									/>
								</SwiperSlide>
							),
						)}
					</Swiper>
				</div>
			)}
			<div className='overlay pointer-events-none absolute z-[1] h-full w-full bg-[linear-gradient(180deg,rgba(150,146,142,0.00)_55.02%,#96928E_95.27%)] opacity-[0.24] xsm:hidden'></div>
			{data?.logo && (
				<ImageV2
					src={data.logo.url || ''}
					alt={data.logo.alt}
					width={data.logo.width * 2 || 40}
					height={data.logo.height * 2 || 40}
					className='pointer-events-none absolute left-1/2 top-[17.31rem] z-[2] h-[6.76769rem] w-[22.02719rem] -translate-x-1/2 object-contain xsm:hidden'
				/>
			)}
			<div className='banner-filter absolute bottom-[3.81rem] left-1/2 z-[2] flex h-[4.19rem] w-[71.5rem] -translate-x-1/2 rounded-[0.75rem] bg-[#fff] xsm:hidden'>
				<div className='h-full w-[0.75rem] rounded-bl-[0.75rem] rounded-tl-[0.75rem] bg-[linear-gradient(180deg,#95502F_20.03%,#F5C178_100%)]'></div>
				<div className='flex w-full items-end justify-between p-[0.5rem]'>
					<div className='flex flex-1 items-center justify-between'>
						{filterOptionsLastest.map((item, filterIndex) => (
							<React.Fragment key={filterIndex}>
								<div
									className={`flex h-full w-full cursor-pointer flex-wrap items-center self-end rounded-[0.5rem] bg-white px-3 py-2 transition-all duration-300 ${!openFilters[filterIndex] ? 'hover:bg-[rgba(60,8,8,0.08)]' : ''}`}
									onClick={() => toggleDropdown(filterIndex)}
								>
									<div
										className={`flex ${!openFilters[filterIndex] ? '' : 'mb-2 border-b-[0.0625rem] border-[rgba(0,0,0,0.10)] pb-2'} w-full`}
										ref={(el) => {
											dropdownRefs.current[filterIndex] = el
										}}
									>
										<div className='mr-[0.75rem] flex items-center justify-center rounded-[0.5rem] bg-[rgba(18,18,18,0.08)] p-[0.62rem]'>
											<Image
												src={item?.icon || ''}
												alt='icon'
												width={40}
												height={40}
												loading='lazy'
												className='size-[1.25rem] object-contain'
											/>
										</div>
										<div className='flex flex-1 flex-col justify-between'>
											<span
												className={`text-[0.625rem] font-medium leading-[150%] text-greyscaletext-100 transition-all duration-500 ${openFilters[filterIndex] ? 'translate-y-[0.8rem] text-[0.75rem]' : ''}`}
											>
												{item?.label}
											</span>
											<div className='flex cursor-pointer items-center justify-between'>
												<span
													className={`text-Phase-1-Brown1 line-clamp-1 text-[1rem] font-medium leading-[1.5] tracking-[0.02rem] transition-all duration-500 ${openFilters[filterIndex] ? '-translate-y-[5rem] translate-x-full opacity-0' : 'translate-x-0 translate-y-0 opacity-100'}`}
												>
													{selectedItems[filterIndex]?.label ||
														t('click_de_chon')}
												</span>
												<ImageV2
													src='/icons/homepage/banner/arrow-down.svg'
													alt='arrow'
													width={40}
													height={40}
													className={`size-[1.125rem] object-contain transition-transform duration-300 ${openFilters[filterIndex]
														? '-translate-y-[0.5rem] -rotate-180'
														: 'rotate-0'
														}`}
												/>
											</div>
										</div>
									</div>
									<div
										className={
											'dropdown-filter flex w-full flex-col overflow-hidden transition-[height] duration-500'
										}
										style={{
											height: openFilters[filterIndex]
												? `${item?.children.length * 40}px`
												: '0',
										}}
									>
										{item?.children.map((child, childIndex) => (
											<p
												key={childIndex}
												className='line-clamp-1 cursor-pointer rounded-[0.5rem] px-3 py-2 text-[0.875rem] font-medium leading-[1.5] tracking-[-0.00875rem] text-Phase-1-Brown hover:bg-[rgba(60,8,8,0.08)]'
												onClick={(e) => {
													e.stopPropagation()
													handleSelect(filterIndex, {
														label: child.label,
														slug: child.slug,
														key: item.key,
													})
												}}
											>
												{child?.label}
											</p>
										))}
									</div>
								</div>
								{filterIndex < filterOptionsLastest.length - 1 && (
									<div className='line mx-[0.5rem] h-[2.75rem] w-[0.0625rem] rounded-[0.1875rem] bg-[rgba(0,0,0,0.10)]'></div>
								)}
							</React.Fragment>
						))}
					</div>
					<button
						className='ml-2 flex h-full flex-shrink-0 items-center justify-center rounded-[0.5rem] bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)] px-[2rem]'
						onClick={searchFilter}
					>
						<ImageV2
							src='/icons/homepage/banner/search.svg'
							alt='filter'
							width={40}
							height={40}
							className='mr-[0.62rem] size-[1.5rem] object-contain'
						/>
						<span className='text-[1rem] font-semibold leading-[1.5] text-white'>
							{t('tim_kiem')}
						</span>
					</button>
				</div>
			</div>
			<div className='banner-filter-mb mx-auto flex w-[21.4375rem] -translate-y-[1.5rem] flex-col rounded-[0.75rem] bg-white p-4 shadow-[0px_-8px_60px_0px_rgba(3,33,7,0.08)] sm:hidden'>
				<div className='flex h-full flex-1 flex-col items-center justify-between'>
					{filterOptionsLastest.map((item: FilterOption, index: number) => (
						<React.Fragment key={index}>
							<div
								className='flex h-full w-full cursor-pointer rounded-[0.5rem] transition-all duration-300'
								onClick={() => handleClickPopupFilter(item?.key)}
							>
								<div className='mr-[0.75rem] flex items-center justify-center rounded-[0.5rem] bg-[rgba(18,18,18,0.08)] p-[0.62rem]'>
									<ImageV2
										src={item?.icon || ''}
										alt='icon'
										width={40}
										height={40}
										className='size-[1.25rem] object-contain'
									/>
								</div>
								<div className='flex flex-1 flex-col justify-between'>
									<span
										className={
											'text-[0.625rem] font-medium leading-[150%] text-greyscaletext-100'
										}
									>
										{item?.label}
									</span>
									<div className='flex cursor-pointer items-center justify-between'>
										<span className='line-clamp-1 text-[1rem] font-medium leading-[1.5] tracking-[0.02rem] text-Phase-1-Brown'>
											{selectedItems[index]?.label || t('click_de_chon')}
										</span>
										<ImageV2
											src='/icons/homepage/banner/arrow-down.svg'
											alt='arrow'
											width={40}
											height={40}
											className='size-[1.125rem] object-contain'
										/>
									</div>
								</div>
							</div>
							{index < filterOptionsLastest.length - 1 && (
								<div className='line my-4 h-[0.0625rem] w-full rounded-[0.1875rem] bg-[rgba(0,0,0,0.10)]'></div>
							)}
						</React.Fragment>
					))}
				</div>
				<button
					className='mt-4 flex h-full flex-shrink-0 items-center justify-center rounded-[0.5rem] bg-[linear-gradient(95deg,#95502F_-4.54%,#F5C178_95.42%)] py-3'
					onClick={searchFilter}
				>
					<ImageV2
						src='/icons/homepage/banner/search.svg'
						alt='filter'
						width={40}
						height={40}
						className='mr-[0.62rem] size-[1.5rem] object-contain'
					/>
					<span className='text-[0.875rem] font-semibold leading-[1.5] text-white'>
						{t('tim_kiem')}
					</span>
				</button>
			</div>
			<div
				className={`popup-filter fixed left-0 top-0 z-[51] h-full w-full bg-transparent sm:hidden ${openPopupFilter ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
			>
				<div
					className='overlay-popup-filter absolute left-0 top-0 z-[1] h-full w-full bg-[rgba(0,0,0,0.16)]'
					onClick={() => {
						setOpenPopupFilter(false)
					}}
				></div>
				<div
					className={`absolute bottom-0 left-0 z-10 flex h-[19.6rem] w-full flex-col rounded-tl-[1rem] rounded-tr-[1rem] bg-white p-4 pb-[2.5rem] transition-all duration-300 ${openPopupFilter ? 'translate-y-0' : 'translate-y-full'
						}`}
				>
					<div className='flex w-full items-center justify-between space-x-[0.5rem] border-b-[1px] border-[#EBEBEB] pb-4'>
						<div className='flex items-center'>
							<div className='mr-2 flex items-center justify-center rounded-[0.5rem] bg-[rgba(18,18,18,0.08)] p-[0.5rem]'>
								<ImageV2
									src={
										currentFilter?.icon ||
										'/icons/homepage/banner/filter-nation.svg'
									}
									width={40}
									height={40}
									alt='icon'
									onClick={() => setOpenPopupFilter(false)}
									className='size-[1rem] object-contain'
								/>
							</div>
							<span className='text-[0.875rem] font-medium leading-[1.4] tracking-[-0.0175rem]'>
								{currentFilter?.label}
							</span>
						</div>
						<ImageV2
							src={'/icons/homepage/header/close-popup.svg'}
							width={40}
							height={40}
							alt='close-popup'
							onClick={() => setOpenPopupFilter(false)}
							className='size-[1.5rem] cursor-pointer object-contain'
						/>
					</div>
					<div className='h-[15rem] overflow-y-auto'>
						{currentFilter?.children.map((child) => (
							<div
								key={child.slug}
								className='tracking-[-0.00875rem text-brown] cursor-pointer border-b-[1px] border-[#EBEBEB] px-3 py-4 text-[0.875rem] leading-[1.5]'
								onClick={() => {
									handleSelect(
										filterOptionsLastest.findIndex(
											(filter) => filter.key === keyFilter,
										),
										{ ...child, key: child.key || '' },
									)
									setOpenPopupFilter(false)
								}}
							>
								{child.label}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default BannerHomepage
