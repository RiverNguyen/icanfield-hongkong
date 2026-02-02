import IndexDetailBlog from '@/views/detail-blog'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import fetchData from '@/fetch/fetchData'
import Header from '@/layout/header'

interface LanguageSwitcherItem {
  slug: string
}

// ✅ ISR + Dynamic params - KHÔNG sập build
export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetadata(`/posts?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}

export async function generateStaticParams({
  params,
}: {
  params: {slug: string; locale: string}
}) {
  const {locale} = await params

  // ✅ Timeout 5s - tránh treo build
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
  const tours = await fetchData({
      api: '/slugs?post_type=post&lang=' + locale,
      option: {
        signal: controller.signal,
      },
  })

    clearTimeout(timeoutId)

    // ✅ Validate data & limit slug
    if (!Array.isArray(tours)) {
      console.warn('generateStaticParams: API không trả về array')
      return []
    }

    // ✅ Chỉ build 200 page, phần còn lại ISR
    return tours.slice(0, 200).map((tour: string[]) => ({
    slug: tour,
  }))
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('generateStaticParams failed:', error)
    // ✅ KHÔNG throw - cứu build
    return []
  }
}
export default async function page({
  params,
}: {
  params: {slug: string; locale: string}
}) {
  const {locale, slug} = await params
  const requestFooter = {
    api: '/footer-options?acf_format=standard&lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestHeader = {
    api: '/header-options?acf_format=standard&lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestPopup = {
    api: '/form-all-page?lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestLanguageSwitcher = {
    api: '/language-switcher/post-posts/' + locale + '/' + slug,
    option: {
      next: {revalidate: 60},
    },
  }

  // ✅ Fetch footer, header, popup song song
  const [dataFooter, dataHeader, dataPopup] = await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
  ])

  // ✅ Language switcher fetch riêng, có lỗi cũng không crash page
  let dataLanguageSwitcher = {}
  try {
    dataLanguageSwitcher = await fetchData(requestLanguageSwitcher)
  } catch (error) {
    console.warn('language-switcher fetch failed, using empty object:', error)
  }
  const [data] = await Promise.all([
    fetchData({
      api: '/blogs/' + locale + '/' + slug,
      option: {
        next: {revalidate: 10},
      },
    }),
  ])
  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={Object.fromEntries(
          Object.entries(
            dataLanguageSwitcher as Record<string, LanguageSwitcherItem>,
          ).map(([lang, item]) => [
            lang,
            {
              ...item,
              slug: 'blogs/' + item.slug,
            },
          ]),
        )}
      />{' '}
      <IndexDetailBlog dataDetailBlog={data} />
    </>
  )
}
