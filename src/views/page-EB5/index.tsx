import { Breadcrumb } from '@/components/breadcrumb'
import ProjectTransparency, {
	IProjectTransparencyProps,
} from '@/components/project-transparency'
import WrapperConnectUs from '@/sections/blogs/connect-us/WrapperConnectUs'
import {
	Banner,
	IBannerProps,
} from '@/sections/detail-settlement-programs/banner'
import TeaEB5Section, {
	ITeaEB5SectionItemProps,
} from '@/sections/EB5/eb5-tea-sections'
import OutstandingProjectEB5, {
	IOutstandingProjectEB5Props,
} from '@/sections/EB5/outstanding-projects'
import { FC, Suspense } from 'react'
// import PioneeringValues from '@/sections/EB5/pioneering-values'
import { ICountry } from '@/components/LeafletMap'
import FormConnectUs from '@/sections/blogs/connect-us/FormConnectUs'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
const PioneeringValues = dynamic(
	() => import('@/sections/EB5/pioneering-values'),
	{
		ssr: false, // Nếu component không cần server-side rendering
		loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
	},
)

interface IPageEB5Props {
	data: {
		clone_banner: IBannerProps
		eb_5_projects_field_incentive_zones: ITeaEB5SectionItemProps[]
		safety_standards: IProjectTransparencyProps['data']
		listItems: IOutstandingProjectEB5Props['listItems']
		categories: IOutstandingProjectEB5Props['categories']
		dataMap: IOutstandingProjectEB5Props['dataMap']
		section_map: {
			title: string
			description: string
			data_state_usa: ICountry[]
		}
	}
}

const PageEB5: FC<IPageEB5Props> = ({ data }) => {
	const t = useTranslations()

	return (
		<main className='bg-background'>
			<Banner
				{...data?.clone_banner}
				backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)86.12%)]'
				className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
			>
				<Breadcrumb
					items={[
						{ label: t('trang_chu'), href: t('trang_chu_breadcrumb') },
						{ label: t('du_an_eb5'), href: '/' },
					]}
				/>
			</Banner>
			<TeaEB5Section data={data?.eb_5_projects_field_incentive_zones} />
			<PioneeringValues
				data={data?.section_map}
				dataMap={data?.dataMap || []}
			/>
			<Suspense fallback={<p>Loading...</p>}>
				<OutstandingProjectEB5
					listItems={data?.listItems}
					categories={data?.categories}
				/>
			</Suspense>
			<ProjectTransparency data={data?.safety_standards} />
			<WrapperConnectUs>
				<FormConnectUs />
			</WrapperConnectUs>
		</main>
	)
}

export default PageEB5
