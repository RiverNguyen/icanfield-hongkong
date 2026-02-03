/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ItemBlog from '@/components/itemBlog'
import SkeletonItemBlog from '@/components/itemBlog/SkeletonItemBlog'
import { Pagination } from '@/components/pagination/Pagination'
import { fetcher } from '@/lib/swr'
import { LIMIT_POSTS } from '@/sections/blogs/constant'
import IndexSortAndSearchPosts from '@/sections/blogs/list-blogs/sort-and-search'
import IndexTabs from '@/sections/blogs/list-blogs/tab'
import {
	ApiResponse,
	Category,
	DataItem,
	SortOption,
} from '@/types/blogs.interface'
import endpoints from '@/utils/endpoints'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'

interface IProps {
	dataPosts: ApiResponse
	dataCategories: Category[]
}

const ListBlogs = ({ dataPosts, dataCategories }: IProps) => {
	const sectionRef = useRef<HTMLDivElement>(null)
	const searchParams = useSearchParams()
	const locale = useLocale()
	const t = useTranslations()
	const sortOptions = [
		{ name: t('tat_ca'), value: 'all', orderBy: 'all' },
		{ name: t('moi_nhat'), value: 'DESC', orderBy: 'date' },
		{ name: t('pho_bien_nhat'), value: 'ASC', orderBy: 'index' },
	]

	const categoryFromUrl = () => {
		const slug = searchParams?.get('category')
		if (!slug || slug === 'all') return null
		const normalize = (s: string) => s?.replace(/-/g, '_') ?? ''
		return (
			dataCategories.find(
				(c: Category) => normalize(c.slug) === normalize(slug),
			) ?? null
		)
	}

	const [selectedCategory, setSelectedCategory] = useState<Category>(() => {
		const fromUrl = categoryFromUrl()
		if (fromUrl) return fromUrl
		return dataCategories.length
			? dataCategories[0]
			: { id: 0, name: 'All', slug: 'all', taxonomy: '' }
	})
	const [search, setSearch] = useState<string>(
		() => searchParams?.get('search') ?? '',
	)
	const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(() => {
		const sort = searchParams?.get('sort')
		const orderby = searchParams?.get('orderby')
		const found = sortOptions.find(
			(o) => o.value === sort && o.orderBy === orderby,
		)
		return found ?? sortOptions[0]
	})
	const [currentPage, setCurrentPage] = useState<number>(() => {
		const p = searchParams?.get('page')
		const num = p ? parseInt(p, 10) : 1
		return Number.isFinite(num) && num > 0 ? num : 1
	})
	const [totalPage, setTotalPage] = useState<number>(dataPosts.totalPages || 1)

	function handleGetTaxonomy(categorySlug: string) {
		return dataCategories.find(
			(category: Category) => category.slug === categorySlug,
		)?.taxonomy
	}

	const query = useMemo(() => {
		if (!searchParams?.size) return null
		return `${endpoints.blog.list}?page=${currentPage}&limit=${LIMIT_POSTS}&lang=${locale}${selectedCategory.slug !== 'all' ? `&tax=${handleGetTaxonomy(selectedCategory.slug)}&${handleGetTaxonomy(selectedCategory.slug)}=${selectedCategory.slug}` : ''}${search ? `&s=${search}` : ''}${selectedSortOption.value !== sortOptions[0].value ? `&order=${selectedSortOption.value}` : ''}${selectedSortOption.orderBy !== sortOptions[0].orderBy ? `&orderby=${selectedSortOption.orderBy}` : ''}`
	}, [
		searchParams,
		currentPage,
		locale,
		selectedCategory.slug,
		search,
		selectedSortOption.value,
		selectedSortOption.orderBy,
	])

	const { data: posts, isLoading } = useSWR(query, fetcher, {
		revalidateIfStale: false,
		revalidateOnReconnect: false,
	})

	// Sync state from URL when searchParams change (e.g. back/forward, direct link)
	useEffect(() => {
		const slug = searchParams?.get('category')
		if (slug && slug !== 'all') {
			const normalize = (s: string) => s?.replace(/-/g, '_') ?? ''
			const cat = dataCategories.find(
				(c: Category) => normalize(c.slug) === normalize(slug),
			)
			if (cat) setSelectedCategory(cat)
		} else if (slug === 'all' || !slug) {
			setSelectedCategory(dataCategories[0])
		}
		const pageParam = searchParams?.get('page')
		const pageNum = pageParam ? parseInt(pageParam, 10) : 1
		if (Number.isFinite(pageNum) && pageNum > 0) setCurrentPage(pageNum)
	}, [searchParams, dataCategories])

	useEffect(() => {
		if (posts && searchParams?.size) {
			setTotalPage(posts.totalPages)
		}
	}, [posts])

	const dataLatest = useMemo(() => {
		return Array.isArray(posts?.data) ? posts?.data : dataPosts.data
	}, [searchParams, posts, dataPosts.data])
	return (
		<section
			ref={sectionRef}
			className='list-blogs mb-[6.75rem] pt-[6.75rem] section-container xsm:mb-[3.25rem] xsm:pt-[3rem]'
		>
			<h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-brown xsm:mb-[1rem] xsm:text-[1.5rem] xsm:leading-[1.3] xsm:-tracking-[0.045rem]'>
				{t('tin_tuc_khac')}
			</h2>
			<div className='list-blogs__filters relative z-20 mb-[2rem] flex sm:items-center sm:justify-between xsm:mb-[2.19rem] xsm:flex-col'>
				<IndexTabs
					categories={dataCategories}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<IndexSortAndSearchPosts
					placeholder={t('tim_kiem_trong_danh_sach')}
					sortOptions={sortOptions}
					search={search}
					selectedSortOption={selectedSortOption}
					setSearch={setSearch}
					setSelectedSortOption={setSelectedSortOption}
				/>
			</div>
			<div className='grid w-full grid-cols-3 gap-y-[4.5rem] sm:gap-x-[1.88rem] xsm:grid-cols-1 xsm:gap-y-[1.5rem]'>
				{isLoading ? (
					<>
						{Array(dataLatest?.length || 9)
							.fill(0)
							.map((item, index) => (
								<SkeletonItemBlog key={index} />
							))}
					</>
				) : (
					<>
						{Array.isArray(dataLatest) && dataLatest?.length > 0 ? (
							dataLatest.map((item: DataItem, index: number) => (
								<ItemBlog
									data={item}
									key={index}
								/>
							))
						) : (
							<div className='col-start-2 row-start-2 w-full text-center text-brown'>
								{t('chua_co_bai_viet')}
							</div>
						)}
					</>
				)}
			</div>
			<Pagination
				pageCurrent={currentPage}
				setCurrentPage={setCurrentPage}
				pageCount={totalPage}
				ref={sectionRef}
				className='mt-[1.38rem] xsm:mt-[1.75rem]'
			/>
		</section>
	)
}

export default ListBlogs
