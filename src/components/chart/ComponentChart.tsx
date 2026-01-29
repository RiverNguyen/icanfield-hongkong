'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { LabelList, Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

interface chartData {
	browser: string
	visitors: number
	fill: string
	index: number
}
interface ItemCapital {
	convert_percent: string
	title: string
	_index?: number
}
export function ComponentChart({
	isInterView,
	dataCapitalSource,
}: {
	isInterView: boolean
	dataCapitalSource: ItemCapital[]
}) {
	const isMobile = useIsMobile()
	const [chartData, setChartData] = useState<chartData[]>()
	const [chartConfig, setChartConfig] = useState<ChartConfig>({})
	const [mainIndex, setMainIndex] = useState<number>(0)
	const [secondaryIndex, setSecondaryIndex] = useState<number>(1)

	const t = useTranslations()

	const initChart = [
		{
			fill: '#9E5431',
			title: t('von_tu_chu_dau_tu'),
		},
		{
			fill: '#BC9247',
			title: t('von_tu_khoan_vay_cao_cap'),
		},
		{
			fill: '#E0C06C',
			title: t('von_vay_eb5'),
		},
	]
	useEffect(() => {
		const capitalWithIndex = dataCapitalSource?.map(
			(item: ItemCapital, index: number) => {
				const chartIndex = item._index ?? index
				return {
					browser: initChart[chartIndex]?.title ?? item.title,
					visitors: Number(item.convert_percent),
					fill: initChart[chartIndex]?.fill ?? '#BC9247',
					index: chartIndex,
				}
			},
		)
		if (capitalWithIndex) {
			// Sắp xếp theo visitors giảm dần
			const sortedByVisitors = [...capitalWithIndex].sort(
				(a, b) => b.visitors - a.visitors,
			)
			// Lấy item có visitors lớn nhất và lớn thứ hai
			const largestVisitor = sortedByVisitors[0] || null
			const secondLargestVisitor = sortedByVisitors[1] || null
			setChartData(capitalWithIndex)
			if (largestVisitor) setMainIndex(largestVisitor.index) // index active chính
			if (secondLargestVisitor) setSecondaryIndex(secondLargestVisitor.index) // index active phụ
		}
		// Tạo config cho biểu đồ từ dữ liệu
		const newChartConfig: ChartConfig = capitalWithIndex.reduce((acc, item) => {
			acc[item.browser] = {
				label: item.browser,
				color: item.fill,
			}
			return acc
		}, {} as ChartConfig)
		setChartConfig(newChartConfig)
	}, [dataCapitalSource])
	if (!isInterView) {
		return (<div>loading...</div>)
	}
	const mainOuterRadius = isMobile ? 30 : 40
	const secondaryOuterRadius = isMobile ? 15 : 20
	return (
		<Card className='flex size-[40.5rem] flex-col border-none shadow-none xsm:h-[18.75rem] xsm:w-full'>
			<CardContent className='flex-1 p-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square'
				>
					<PieChart>
						{isInterView && (
							<>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											className='[&>div>div>div>span]:ml-[0.5rem] [&>div>div>div>span]:block'
											hideLabel
										/>
									}
								/>
								<Pie
									data={chartData}
									dataKey='visitors'
									nameKey='browser'
									innerRadius={0}
									strokeWidth={0}
									activeIndex={[mainIndex, secondaryIndex]} // Active hai index
									activeShape={(props: PieSectorDataItem) => {
										const { outerRadius = 0, payload } = props
										const index = payload?.index // Lấy index từ payload
										let adjustedOuterRadius = outerRadius
										if (index === mainIndex) {
											adjustedOuterRadius += mainOuterRadius // Bán kính lớn hơn cho index chính
										} else if (index === secondaryIndex) {
											adjustedOuterRadius += secondaryOuterRadius // Bán kính nhỏ hơn cho index phụ
										}
										return (
											<Sector
												{...props}
												outerRadius={adjustedOuterRadius}
											/>
										)
									}}
								>
									<LabelList
										width={90}
										dataKey='browser'
										className='fill-background [&_tspan]:pointer-events-none [&_tspan]:text-white [&_tspan]:sub-24B [&_tspan]:xsm:body-14-b'
										stroke='none'
										formatter={(value: keyof typeof chartConfig) =>
											chartConfig[value]?.label
										}
									/>
								</Pie>
							</>
						)}
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
