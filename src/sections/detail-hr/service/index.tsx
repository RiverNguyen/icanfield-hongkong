'use client'
import React from 'react'
import { IDataAcfDetailHR } from '@/types/dataAcfDetailHR.interface'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css'
import './style.css'
import useIsMobile from '@/hooks/useIsMobile'
import { Swiper, SwiperSlide } from 'swiper/react'
import ServiceItem from './service-item'
import { remToPx } from '@/utils/remToPx'
import { useTranslations } from 'next-intl'

export default function Service({
	service,
}: {
	service: IDataAcfDetailHR['acf']['service_list']
}) {
	const isMobile = useIsMobile()
	const t = useTranslations('')
	return (
		<section className='relative rounded-t-[4rem] bg-white px-20 pb-[22.5rem] pt-[6.25rem] xsm:rounded-t-[1.5rem] xsm:px-4 xsm:pb-[23.125rem] xsm:pt-8'>
			{!isMobile && (
				<Image
					src={'/imgs/detail-hr/service/service-bg-deco.webp'}
					alt='Deco'
					width={1932}
					height={963}
					className='absolute left-0 top-[10.63625rem] w-[calc(70.5rem-10.125rem)] object-cover xsm:hidden'
				/>
			)}
			<div className='relative mb-16 flex items-start justify-between xsm:mb-6 xsm:flex-col'>
				<h2
					dangerouslySetInnerHTML={{ __html: service?.title || '' }}
					className='font-optima text-Phase-1-Brown heading1 xsm:mb-3 xsm:w-full xsm:[&>p]:inline'
				></h2>
				<div className='w-[46.375rem] text-base font-normal leading-[155%] text-greyscaletext-body xsm:w-full xsm:text-sm xsm:leading-[150%] xsm:tracking-[-0.00875rem]'>
					<div
						dangerouslySetInnerHTML={{ __html: service?.description || '' }}
						className='service space-y-3.5 xsm:space-y-2.5'
					></div>
				</div>
			</div>
			<div className='relative mb-10 flex items-center justify-between xsm:mb-5'>
				<h3
					dangerouslySetInnerHTML={{ __html: service?.sub_title || '' }}
					className='text-Phase-1-Brown heading2 xsm:tracking-[-0.025rem]'
				></h3>
				<Link
					href='#'
					className='h-12 space-x-2 rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] py-2 pl-6 pr-3 text-sm font-medium leading-[150%] tracking-[-0.0175rem] text-white flex-center xsm:hidden'
				>
					<span>{t('tim_hieu_them')}</span>
					<Image
						src={'/icons/arrow-right.svg'}
						alt='Arrow Right'
						width={24}
						height={24}
						className='size-6 object-cover'
					/>
				</Link>
			</div>
			{!isMobile && (
				<Swiper
					slidesPerView={3}
					spaceBetween={remToPx(1.5)}
					grabCursor
				>
					{Array.isArray(service?.service) &&
						service.service.map((service) => (
							<SwiperSlide key={service.id}>
								<ServiceItem service={service} />
							</SwiperSlide>
						))}
				</Swiper>
			)}

			{isMobile && (
				<div className='relative mb-[2.13rem] flex flex-col space-y-4'>
					{Array.isArray(service?.service) &&
						service.service.map((service) => (
							<ServiceItem
								key={service.id}
								service={service}
							/>
						))}
				</div>
			)}

			<div className='flex-center sm:hidden'>
				<Link
					href='#'
					className='h-12 space-x-2 rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] py-2 pl-6 pr-3 text-sm font-medium leading-[150%] tracking-[-0.0175rem] text-white flex-center'
				>
					<span>{t('tim_hieu_them')}</span>
					<Image
						src={'/icons/arrow-right.svg'}
						alt='Arrow Right'
						width={24}
						height={24}
						className='size-6 object-cover'
					/>
				</Link>
			</div>
		</section>
	)
}
