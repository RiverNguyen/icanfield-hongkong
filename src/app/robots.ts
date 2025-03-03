export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/', // Không cho phép lập chỉ mục bất kỳ trang nào
    },
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
  }
}