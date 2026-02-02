import fetchData from '@/fetch/fetchData'
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const locales = ['', '/en', '/es']
  const lastModified = new Date()

  // Fetch dữ liệu với delay nhẹ để tránh ảnh hưởng TBT
  const slugPosst = await fetchData({
    api: '/slugs?post_type=post',
    fallback: [],
  })
  const slugSettlement = await fetchData({
    api: '/slugs?post_type=settlement-program',
    fallback: [],
  })
  // Các trang tĩnh
  const fixedPages = locales.flatMap((locale) =>
    [
      '',
      '/news',
      '/dinh-cu-canada',
      '/dinh-cu-uc',
      '/dinh-cu-my',
      '/dinh-cu-chau-au',
      '/dinh-cu-caribe',
      '/about-us',
      '/contact',
      '/australian-real-estate',
      '/EB5',
      '/immigration-application-assessment',
      '/passport',
      '/compare-programs',
    ].map((path) => ({
      url: `${baseUrl}${locale}${path}`,
      lastModified,
      priority: path === '' ? 1 : 0.9,
    })),
  )

  // Các trang động
  const dynamicPages = []
  if (slugPosst.length > 0) {
    dynamicPages.push(
      ...slugPosst.map((post: string) => ({
        url: `${baseUrl}/news/${post}`,
        lastModified,
        priority: 0.8,
      })),
    )
  }

  if (slugSettlement.length > 0) {
    dynamicPages.push(
      ...slugSettlement.map((settlement: { slug: string; nation?: string[] }) => ({
        url: `${baseUrl}/${settlement.nation?.[0] || 'chuong-trinh-dinh-cu'}/${settlement.slug}`,
        lastModified,
        priority: 0.8,
      })),
    )
  }

  return [...fixedPages, ...dynamicPages]
}
