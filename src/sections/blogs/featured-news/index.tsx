'use client'

import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import Calendar from '@/components/svg/Calendar'
import { cn } from '@/lib/utils'
import { IFeaturedNewsItem } from '@/types/blogs.interface'
import Link from 'next/link'
import { FC, useRef } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
	Autoplay,
	Controller,
	EffectFade,
	Navigation,
	Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as ISwiper } from 'swiper/types'
import './style.css'
import { useLocale, useTranslations } from 'next-intl'
import { getLocaleSlug } from '@/utils/localeSlug'

export interface IFeaturedNewsProps {
	title: string
	items: IFeaturedNewsItem[]
}
export const FeaturedNews: FC<IFeaturedNewsProps> = ({ title, items }) => {
	// console.log('FeaturedNews', items)
	return (
		<section className='mx-auto mt-[3rem] max-w-[90rem] px-[1rem] sm:mt-[5rem] sm:px-0'>
			<h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown xsm:text-[1.5rem] xsm:leading-[1.3] xsm:-tracking-[0.045rem]'>
				{title}
			</h2>
			<FeaturedNewSlidePC
				items={items}
				className='xsm:hidden'
			/>
			<FeaturedNewSlideMobile
				items={items}
				className='sm:hidden'
			/>
		</section>
	)
}

function FeaturedNewSlidePC({
	items,
	className,
}: {
	items: IFeaturedNewsItem[]
	className?: string
}) {
	const swiper1Ref = useRef<ISwiper | null>(null)
	const swiper2Ref = useRef<ISwiper | null>(null)
	const progressRef = useRef<HTMLDivElement>(null)
	const isSyncing = useRef(false) // Cờ để ngăn vòng lặp vô hạn
	const t = useTranslations()

	const handleSlideChange1 = () => {
		if (swiper1Ref.current && swiper2Ref.current && !isSyncing.current) {
			isSyncing.current = true // Đánh dấu đang đồng bộ
			const realIndex = swiper1Ref.current.realIndex
			swiper2Ref.current.slideTo(realIndex)
			isSyncing.current = false // Đặt lại sau khi hoàn thành
		}
	}

	const handleSlideChange2 = () => {
		if (swiper1Ref.current && swiper2Ref.current && !isSyncing.current) {
			isSyncing.current = true // Đánh dấu đang đồng bộ
			const realIndex = swiper2Ref.current.realIndex
			swiper1Ref.current.slideTo(realIndex)
			isSyncing.current = false // Đặt lại sau khi hoàn thành
		}
	}

	const locale = useLocale()
	const slug = getLocaleSlug(locale)
	return (
		<div
			className={cn('relative overflow-hidden rounded-[1.25rem]', className)}
		>
			<Swiper
				allowTouchMove={false}
				onSlideChange={handleSlideChange1}
				effect='fade'
				loop={true}
				speed={700}
				spaceBetween={0}
				onSwiper={(swiper) => (swiper1Ref.current = swiper)} // Lưu tham chiếu
				controller={{ control: swiper2Ref.current }} // Liên kết với swiper2
				modules={[EffectFade, Navigation, Controller]}
				className='image-swiper h-[34.625rem]'
			>
				{items?.map((item, idx) => (
					<SwiperSlide key={idx}>
						<ImageV2
							src={item.backgroundImage || ''}
							alt={item.title}
							width={1434 * 2 || 40}
							height={554 * 2 || 40}
							className='absolute left-0 top-0 h-full w-full object-cover'
						/>
						<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(183deg,rgba(63,34,20,0.00)_10.25%,#000_119.74%)]'></div>
						<div className='absolute bottom-[1.5rem] left-[4.54rem] space-y-[1.34rem] text-white'>
							<div className='flex items-center'>
								<span className='mr-[1.34rem] rounded-[0.33625rem] bg-white px-[0.6725rem] text-[0.78456rem] font-medium leading-[174.857%] tracking-[-0.02019rem] text-brown flex-center'>
									{Array.isArray(item?.categories) &&
										item.categories.map((item) => item).join(', ')}
								</span>
								<Calendar className='mr-[0.22rem] size-[0.89663rem]' />
								<span className='text-[0.78456rem] leading-[114.286%]'>
									{item?.date}
								</span>
							</div>
							<h3
								dangerouslySetInnerHTML={{ __html: item.title }}
								className='max-w-[40.9375rem] font-optima text-[2.24156rem] font-medium leading-[1.2] tracking-[-0.05606rem]'
							/>
							<Link
								href={`${slug}/blogs/${item?.slug}`}
								className='inline-flex items-center rounded-[0.5rem] border border-white/25 p-[0.84rem_0.75rem_0.84rem_1.5rem] transition hover:bg-white hover:text-brown'
							>
								<span>{t('chi_tiet_bai_viet')}</span>
								<ArrowRight className='ml-[0.5rem] size-[1.5rem]' />
							</Link>
						</div>
					</SwiperSlide>
				))}
				<div
					ref={progressRef}
					className='absolute bottom-0 left-0 z-10 h-[0.8125rem] w-0 translate-y-1/2 rounded-[1rem] bg-[linear-gradient(98deg,#B56641_41.26%,#F5C178_97.06%)] transition ease-linear'
				></div>
			</Swiper>
			<Swiper
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				onAutoplayTimeLeft={(swiper, time, progress) => {
					// Hiển thị tiến trình hoặc thời gian còn lại
					if (progressRef.current) {
						progressRef.current.style.width = `${100 - progress * 100}%`
					}
				}}
				navigation={{
					nextEl: '.swiper-content__next',
					prevEl: '.swiper-content__prev',
				}}
				speed={600}
				pagination={true}
				onSlideChange={handleSlideChange2}
				centeredSlides={true}
				spaceBetween={25}
				direction={'vertical'}
				onSwiper={(swiper) => (swiper2Ref.current = swiper)} // Lưu tham chiếu
				controller={{ control: swiper1Ref.current }} // Liên kết với swiper1
				loop={true}
				slidesPerView='auto'
				modules={[Autoplay, Navigation, Pagination, Controller]}
				className='swiper-content !absolute right-[2.51rem] top-[5.62rem] !z-20 !size-[20rem] !overflow-visible text-white'
			>
				{items?.map((item, idx) => (
					<SwiperSlide
						className='!h-[5rem] !pr-[2.7rem]'
						key={idx}
					>
						<span>{idx < 10 ? '0' + (idx + 1) : idx + 1}</span>
						<p
							className='line-clamp-3'
							dangerouslySetInnerHTML={{ __html: item.excerpt }}
						></p>
					</SwiperSlide>
				))}
				<div className='pointer-events-none absolute bottom-0 right-[-0.5rem] top-0 z-20 flex flex-col justify-between sm:items-center'>
					<button className='swiper-content__prev group size-[2.75rem] rounded-[100%] transition-all flex-center hover:bg-[rgba(220,220,220)]'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='22'
							height='23'
							viewBox='0 0 22 23'
							fill='none'
							className='size-[1.75rem] translate-y-[-0.1rem] group-hover:brightness-[100] group-hover:invert-[100] group-hover:filter'
						>
							<path
								d='M11.5586 8.44098L18.4766 14.7359C18.6198 14.8648 18.6914 15.0295 18.6914 15.23C18.6914 15.4306 18.6198 15.5953 18.4766 15.7242C18.319 15.8674 18.1328 15.939 17.918 15.939C17.7031 15.939 17.5241 15.8674 17.3809 15.7242L11 9.94489L4.61914 15.7242C4.47591 15.8674 4.29687 15.939 4.08203 15.939C3.86719 15.939 3.68099 15.8674 3.52344 15.7242C3.38021 15.5953 3.30859 15.4306 3.30859 15.23C3.30859 15.0295 3.38021 14.8648 3.52344 14.7359L10.4414 8.44098C10.599 8.29775 10.7852 8.22614 11 8.22614C11.2148 8.22614 11.401 8.29775 11.5586 8.44098Z'
								fill='white'
								fillOpacity='0.7'
							/>
						</svg>
					</button>
					<button className='swiper-content__next group size-[2.75rem] rounded-[100%] transition-all flex-center hover:bg-[rgba(220,220,220)]'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='22'
							height='23'
							viewBox='0 0 22 23'
							fill='none'
							className='size-[1.75rem] translate-y-[0.2rem] group-hover:brightness-[100] group-hover:invert-[100] group-hover:filter'
						>
							<path
								d='M10.4414 14.559L3.52344 8.2641C3.38021 8.13519 3.30859 7.97048 3.30859 7.76996C3.30859 7.56944 3.38021 7.40473 3.52344 7.27582C3.68099 7.13259 3.86719 7.06098 4.08203 7.06098C4.29688 7.06098 4.47591 7.13259 4.61914 7.27582L11 13.0551L17.3809 7.27582C17.5241 7.13259 17.7031 7.06097 17.918 7.06097C18.1328 7.06097 18.319 7.13259 18.4766 7.27582C18.6198 7.40472 18.6914 7.56944 18.6914 7.76996C18.6914 7.97048 18.6198 8.13519 18.4766 8.2641L11.5586 14.559C11.401 14.7023 11.2148 14.7739 11 14.7739C10.7852 14.7739 10.599 14.7023 10.4414 14.559Z'
								fill='white'
								fillOpacity='0.7'
							/>
						</svg>
					</button>
				</div>
			</Swiper>
			<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 bg-[linear-gradient(90deg,rgba(63,34,20,0.00)_59.16%,rgba(65,33,18,0.28)_70.87%,rgba(66,32,16,0.55)_84.12%,#200D05_102.35%)]'></div>
		</div>
	)
}

function FeaturedNewSlideMobile({
	items,
	className,
}: {
	items: IFeaturedNewsItem[]
	className?: string
}) {
	const t = useTranslations()

	const locale = useLocale()
	const slug = getLocaleSlug(locale)
	return (
		<div className={className}>
			<div className='relative overflow-hidden rounded-[1.25rem]'>
				<Swiper
					effect='fade'
					loop={true}
					speed={700}
					spaceBetween={0}
					modules={[EffectFade, Pagination]}
					pagination={{
						clickable: true,
						el: '.featured-news__slide-nav--mobile',
					}}
					className='image-swiper featured-news__slide h-[34.625rem]'
				>
					{items?.map((item, idx) => (
						<SwiperSlide key={idx}>
							<ImageV2
								src={item.backgroundImage || ''}
								alt={item.title}
								width={1434 * 2 || 40}
								height={554 * 2 || 40}
								className='absolute left-0 top-0 h-full w-full object-cover'
							/>
							<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(182deg,rgba(63,34,20,0.00)_28.99%,#000_107.39%)]'></div>
							<div className='absolute bottom-[1.25rem] left-[1.5rem] right-[2.5rem] space-y-[1rem] text-white'>
								<div className='flex items-center'>
									<span className='mr-[1.34rem] rounded-[0.33625rem] bg-white px-[0.6725rem] text-[0.625rem] font-medium leading-[174.857%] tracking-[-0.02019rem] text-brown'>
										{Array.isArray(item?.categories) &&
											item.categories.map((item) => item).join(', ')}
									</span>
									<Calendar className='mr-[0.22rem] size-[0.89663rem]' />
									<span className='text-[0.75rem] leading-[114.286%]'>
										{item?.date}
									</span>
								</div>
								<h3 className='font-optima text-[1.125rem] font-medium leading-[1.2] tracking-[-0.05606rem]'>
									{item.title}
								</h3>
								<Link
									href={`${slug}/blogs/${item?.slug}`}
									className='inline-flex items-center py-[0.2rem]'
								>
									<span className='text-[0.75rem] font-medium leading-[1.5] tracking-[-0.015re]'>
										{t('chi_tiet_bai_viet')}
									</span>
									<ArrowRight className='ml-[0.5rem] size-[1.5rem]' />
								</Link>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className='featured-news__slide-nav--mobile'></div>
		</div>
	)
}
