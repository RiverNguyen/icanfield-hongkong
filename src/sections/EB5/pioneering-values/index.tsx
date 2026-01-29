'use client'
import ImageV2 from '@/components/image/ImageV2'
import React from 'react'
import { LeafletMapCountries } from '@/components/LeafletMapCountries'
import customGeoJson from './usa.geo.json'
import { states } from '@/sections/EB5/pioneering-values/constants'
import { FeatureCollection } from 'geojson'
import 'leaflet/dist/leaflet.css'
import { ICountry } from '@/components/LeafletMap'
import { useTranslations } from 'next-intl'

// Map Chinese location names to English for GeoJSON matching (US states)
const mapChineseToEnglishUSLocation = (name: string): string => {
	const locationMap: { [key: string]: string } = {
		'纽约': 'New York', '紐約': 'New York',
		'俄亥俄州': 'Ohio', '俄亥俄': 'Ohio',
		'加利福尼亚': 'California', '加州': 'California', '加利福尼亞': 'California', '加利福尼亞州': 'California',
		'德克萨斯': 'Texas', '德州': 'Texas', '德克薩斯': 'Texas', '德克薩斯州': 'Texas',
		'佛罗里达': 'Florida', '佛州': 'Florida', '佛羅里達': 'Florida', '佛羅里達州': 'Florida',
		'华盛顿': 'Washington', '華盛頓': 'Washington', '华盛顿州': 'Washington', '華盛頓州': 'Washington',
		'乔治亚': 'Georgia', '佐治亚': 'Georgia', '喬治亞': 'Georgia', '喬治亞州': 'Georgia',
		'伊利诺伊': 'Illinois', '伊利諾伊': 'Illinois', '伊利诺伊州': 'Illinois',
		'亚利桑那': 'Arizona', '亞利桑那': 'Arizona', '亚利桑那州': 'Arizona',
		'内华达': 'Nevada', '內華達': 'Nevada', '内华达州': 'Nevada', '拉斯维加斯': 'Nevada',
		'密苏里': 'Missouri', '密蘇里': 'Missouri', '密苏里州': 'Missouri',
		'威斯康星': 'Wisconsin', '威斯康星州': 'Wisconsin', '威斯康辛': 'Wisconsin',
		'怀俄明': 'Wyoming', '懷俄明': 'Wyoming', '怀俄明州': 'Wyoming',
		'阿拉斯加': 'Alaska', '阿拉斯加州': 'Alaska',
		'夏威夷': 'Hawaii', '夏威夷州': 'Hawaii',
		'宾夕法尼亚': 'Pennsylvania', '賓夕法尼亞': 'Pennsylvania', '宾州': 'Pennsylvania',
		'马萨诸塞': 'Massachusetts', '馬薩諸塞': 'Massachusetts', '麻省': 'Massachusetts',
		'新泽西': 'New Jersey', '新澤西': 'New Jersey', '新泽西州': 'New Jersey',
		'弗吉尼亚': 'Virginia', '維吉尼亞': 'Virginia', '弗吉尼亚州': 'Virginia',
		'路易斯安那': 'Louisiana', '路易斯安那州': 'Louisiana',
		'田纳西': 'Tennessee', '田納西': 'Tennessee', '田纳西州': 'Tennessee',
		'科罗拉多': 'Colorado', '科羅拉多': 'Colorado', '科罗拉多州': 'Colorado',
		'明尼苏达': 'Minnesota', '明尼蘇達': 'Minnesota', '明尼苏达州': 'Minnesota',
		'北卡罗来纳': 'North Carolina', '北卡': 'North Carolina', '北卡羅來納': 'North Carolina',
		'南卡罗来纳': 'South Carolina', '南卡': 'South Carolina', '南卡羅來納': 'South Carolina',
	}
	return locationMap[name] ?? name
}

const PioneeringValues = ({
	data,
	dataMap,
}: {
	data: {
		title: string
		description: string
		data_state_usa: ICountry[]
	}
	dataMap: {
		slug: string
		location_name: string
		count: number
		location_name_en?: string
	}[]
}) => {
	const [isZoomInClick, setIsZoomInClick] = React.useState(false)
	const [isZoomOutClick, setIsZoomOutClick] = React.useState(false)
	const [isOpenPopup, setIsOpenPopup] = React.useState(false)

	// Normalize dataMap: ensure location_name_en for GeoJSON matching when API returns Chinese names
	const normalizedDataMap = React.useMemo(() => {
		if (!dataMap || !Array.isArray(dataMap)) return []
		return dataMap.map((item) => ({
			...item,
			location_name_en: item.location_name_en || mapChineseToEnglishUSLocation(item.location_name),
		}))
	}, [dataMap])

	const handleZoomIn = () => {
		setIsZoomInClick(!isZoomInClick)
	}
	const handleZoomOut = () => {
		setIsZoomOutClick(!isZoomOutClick)
	}
	const handleTogglePopup = () => {
		setIsOpenPopup(!isOpenPopup)
	}
	const convertedData = data?.data_state_usa.map((item: ICountry) => [item])
	const t = useTranslations()
	return (
		<section className='bg-background pt-[3rem] sm:-translate-y-[3rem]'>
			<div className='relative flex items-end justify-between overflow-hidden pb-[2.75rem] section-container xsm:flex-col xsm:items-start xsm:pb-[1.72rem]'>
				<h2
					className='flex-1 [&_p]:font-optima [&_p]:text-[3rem] [&_p]:font-semibold [&_p]:leading-[1.2] [&_p]:tracking-[-0.06rem] [&_p]:text-Phase-1-Brown xsm:[&_p]:text-[1.25rem]'
					dangerouslySetInnerHTML={{ __html: data?.title || '' }}
				></h2>
				<p className='z-10 w-[34.3125rem] text-[1rem] font-medium leading-[1.5] tracking-[-0.02rem] text-greyscaletext-400 xsm:mt-4 xsm:w-full xsm:text-[0.875rem] xsm:leading-[1.5] xsm:tracking-[-0.00875rem]'>
					{data?.description}
				</p>
				<ImageV2
					src={'/imgs/EB5/Pioneering-values/bg-city2.webp'}
					alt='Pioneering Values'
					width={800}
					height={533}
					className='pointer-events-none absolute bottom-[-4rem] right-[1.5rem] h-[20.3125rem] w-[30.3125rem] object-cover xsm:bottom-[-5rem] xsm:right-0 xsm:opacity-40'
				/>
			</div>
			<div
				className='bg-white p-4 sm:hidden'
				onClick={handleTogglePopup}
			>
				<div className='flex w-full items-center justify-between rounded-[0.5rem] bg-[#EEE] px-4 py-3'>
					<span className='text-[0.875rem] font-medium leading-[1.5] tracking-[-0.00875rem] text-greyscaletext-body'>
						{t('cac_khu_vuc_du_an_eb5')}
					</span>
					<ImageV2
						src={'/icons/EB5/pioneering-values/arrow.svg'}
						alt='Arrow'
						width={40}
						height={40}
						className='size-[1.5rem] object-cover'
					/>
				</div>
			</div>

			<div className='relative h-[41.5rem] w-full overflow-hidden rounded-[1.25rem] bg-white section-container xsm:h-[20.4rem] xsm:w-full xsm:rounded-none'>
				<LeafletMapCountries
					countries={convertedData}
					dataCountry={normalizedDataMap}
					mapJson={customGeoJson as FeatureCollection}
					className='!absolute !z-[1] !h-full !w-full !overflow-hidden !bg-transparent'
					borderCountries='#B6B3A7'
					zoomDesktop={4.2}
					zoomMobile={2.4}
					isZoomClick={false}
					isControlZoom={true}
					isZoomInClick={isZoomInClick}
					isZoomOutClick={isZoomOutClick}
				/>
				<div className='absolute bottom-[2.69rem] left-[2.38rem] z-[11] flex flex-col space-y-[0.88rem] xsm:hidden'>
					<button
						onClick={handleZoomIn}
						className='flex size-[1.5rem] items-center justify-center rounded-[0.375rem] bg-[rgba(183,143,116,0.24)]'
					>
						<ImageV2
							src={'/icons/homepage/map-discover/plus.svg'}
							alt='Zoom in'
							width={200}
							height={200}
							className='size-[0.75rem] object-cover'
						/>
					</button>
					<button
						onClick={handleZoomOut}
						className='flex size-[1.5rem] items-center justify-center rounded-[0.375rem] bg-[rgba(183,143,116,0.24)]'
					>
						<ImageV2
							src={'/icons/homepage/map-discover/minus.svg'}
							alt='Zoom out'
							width={200}
							height={200}
							className='size-[0.75rem] object-cover'
						/>
					</button>
				</div>
			</div>
			<div
				className={`fixed bottom-0 left-0 z-[51] flex h-screen w-screen items-end justify-end transition-all duration-300 sm:hidden ${isOpenPopup ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
			>
				<div
					className='absolute h-full w-full bg-[rgba(0,0,0,0.16)]'
					onClick={handleTogglePopup}
				></div>
				<div
					className={`durantion-500 absolute bottom-0 left-0 z-10 h-[70vh] w-full bg-white p-4 transition-all ${isOpenPopup ? 'translate-y-0' : 'translate-y-full'}`}
				>
					<div
						className='mx-auto w-fit pb-[2rem]'
						onClick={handleTogglePopup}
					>
						<div className='mx-auto h-[0.25rem] w-[3rem] rounded-full bg-[rgba(0,0,0,0.10)]'></div>
					</div>
					<div className='grid h-full grid-cols-2 gap-3 overflow-y-auto pb-8'>
						{states.map((stateGroup, index) => {
							const state = stateGroup[0] // Lấy đối tượng trạng thái đầu tiên từ mảng con
							return (
								<div
									key={index}
									className='flex flex-col items-start justify-start rounded-[0.5rem] bg-background p-3'
								>
									<span className='mb-2 block w-full border-b-[1px] border-[rgba(0,0,0,0.10)] pb-2'>
										{state?.label || t('ten_quoc_gia')}
									</span>
									<div className='flex items-center justify-center'>
										<div className='flex items-center justify-center rounded-[0.5rem] bg-primary-brown p-3'>
											<ImageV2
												src='/icons/EB5/pioneering-values/project.svg'
												className='size-[1.01563rem] object-cover'
												width={50}
												height={50}
												alt='Project-icon'
											/>
										</div>
										<div className='ml-4 flex flex-col'>
											<span className='text-[1.5rem] font-normal leading-[1.25] text-greentext'>
												{state?.projectNumber || 1}
											</span>
											<span className='text-[0.875rem] leading-[1.41] tracking-[-0.00875rem] text-tagtext'>
												{t('du_an_eb5')}
											</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

export default PioneeringValues
