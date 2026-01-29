/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import 'swiper/css'

import ICLocation from '@/components/icon/ICLocation'
import ICWatch from '@/components/icon/ICWatch'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import ImageV2 from '@/components/image/ImageV2'
// import {ItemOfficeData} from '@/sections/homepage/map-discover/dataMap.interface'
import { ImageHeader } from '@/types/dataHeader.interface'
import { ItemMap } from '@/pages/about-us/IndexAboutUs'
import { useTranslations } from 'next-intl'

type PopupMarkerProps = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	countrySelected: string | null
	flagSelected: string | null
	dataOfficeSelected: ItemMap
}

const PopupMarker = ({
	open,
	setOpen,
	countrySelected,
	flagSelected,
	dataOfficeSelected,
}: PopupMarkerProps) => {
	const t = useTranslations()
	// console.log('dataOfficeSelected', dataOfficeSelected)
	const swiperRef = useRef<SwiperType | null>(null)
	const handleNextSlide = () => {
		swiperRef.current?.slideNext()
	}
	const handlePrevSlide = () => {
		swiperRef.current?.slidePrev()
	}
	return (
		<div
			className={cn(
				'invisible fixed bottom-0 left-0 right-0 z-[55] rounded-[1rem_1rem_0rem_0rem] bg-white p-[1rem_1rem_2.5rem_1rem] opacity-50 transition-all duration-500 ease-in-out sm:bottom-[1.5rem] sm:left-[-1rem] sm:h-fit sm:w-[25rem] sm:-translate-x-full sm:rounded-[1rem] sm:p-[1.15rem] xsm:right-0 xsm:translate-y-full',
				open &&
				'visible opacity-100 sm:left-[1.5rem] sm:translate-x-0 xsm:translate-y-0',
			)}
		>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<div
						className={
							'relative flex size-[1.75rem] rounded-[50%] bg-[#B08E61] shadow-[1px_2px_6px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px] xsm:size-[1.35rem]'
						}
					>
						<div className='absolute bottom-0 left-0 z-[1] h-full w-full rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,rgba(255,255,255,0.00)58%,rgba(255,255,255,0.70)97.11%)]'></div>
						<ImageV2
							src={flagSelected || ''}
							alt={'Canada'}
							width={200}
							height={200}
							className='absolute left-1/2 top-1/2 z-0 size-[1.5rem] -translate-x-1/2 -translate-y-1/2 scale-[1.05] rounded-[50%] xsm:left-0 xsm:top-0 xsm:size-[1.25rem] xsm:translate-x-[1px] xsm:translate-y-[1px] xsm:scale-[1]'
						/>
					</div>
					<span className='ml-[0.5rem] text-[0.875rem] font-semibold leading-normal tracking-[-0.00875rem] text-greyscaletext-body'>
						{t('van_phong_tai')} {countrySelected}
					</span>
				</div>
				<button
					className='flex size-[1.5rem] items-center justify-center'
					onClick={() => setOpen(false)}
				>
					<ICX className='size-[0.75rem]' />
				</button>
			</div>
			<div className='relative my-[1rem] h-fit w-full'>
				<Swiper
					slidesPerView={1}
					spaceBetween={16}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper
					}}
					className='!h-[14.625rem] w-full rounded-[0.75rem]'
				>
					{dataOfficeSelected?.gallery?.map((item: ImageHeader, index: number) => (
						<SwiperSlide key={index}>
							<Image
								className='size-full rounded-[0.75rem] object-cover'
								src={item.url}
								alt={item.alt}
								width={360}
								height={235}
								quality={90}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className='absolute bottom-[0.75rem] right-[0.75rem] z-10 flex space-x-[0.5rem]'>
					<button
						onClick={handlePrevSlide}
						className='flex size-[2.5rem] items-center justify-center rounded-full bg-white transition-all duration-100 active:scale-95'
					>
						<ICArrow className='size-[1.5rem]' />
					</button>
					<button
						onClick={handleNextSlide}
						className='flex size-[2.5rem] items-center justify-center rounded-full bg-white transition-all duration-100 active:scale-95'
					>
						<ICArrow className='size-[1.5rem] rotate-180' />
					</button>
				</div>
			</div>
			<p className='mb-[1rem] text-[1rem] font-normal leading-normal tracking-[-0.02rem] text-bodytext'>
				{dataOfficeSelected?.description}
			</p>
			<div className='flex items-center'>
				<ICLocation className='mr-[0.5rem] size-[1.5rem] flex-shrink-0' />
				<span className='text-[1rem] font-medium leading-normal tracking-[-0.02rem] text-greyscaletext-300'>
					{dataOfficeSelected?.location}
				</span>
			</div>
			<div className='mb-[1rem] mt-[0.62rem] flex items-center'>
				<ICWatch className='mr-[0.5rem] size-[1.5rem] flex-shrink-0' />
				<span className='text-[1rem] font-medium leading-normal tracking-[-0.02rem] text-greyscaletext-300'>
					{dataOfficeSelected?.office_time}
				</span>
			</div>
			<Link
				href={dataOfficeSelected?.link || ''}
				target='_blank'
				className='group flex h-[3rem] w-full items-center justify-center rounded-[0.5rem] border border-solid border-[rgba(18,18,18,0.16)] transition-all duration-200 lg:hover:border-none lg:hover:bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)]'
			>
				<span className='text-[0.875rem] font-medium leading-normal tracking-[-0.0175rem] text-greyscaletext-body transition-all duration-200 lg:group-hover:text-white'>
					{t('xem_tren_ban_do')}
				</span>
				<ICArrow className='ml-[0.5rem] size-[1.5rem] flex-shrink-0 rotate-180 transition-all duration-200 lg:group-hover:[&_path]:stroke-white' />
			</Link>
		</div>
	)
}

export default PopupMarker

const ICX = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='14'
			height='14'
			viewBox='0 0 14 14'
			fill='none'
			className={className}
		>
			<path
				d='M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13'
				stroke='#5D6065'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const ICArrow = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			className={className}
		>
			<path
				d='M17 12H7M7 12L11 8M7 12L11 16'
				stroke='#5C321E'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
