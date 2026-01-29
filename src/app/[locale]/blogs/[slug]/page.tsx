import IndexDetailBlog from '@/views/detail-blog'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import fetchData from '@/fetch/fetchData'
import Header from '@/layout/header'

interface LanguageSwitcherItem {
  slug: string
}
export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetadata(`/posts?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}
export async function generateStaticParams() {
  // Gọi API để lấy tất cả các slug của các tour
  const tours = await fetchData({
    api: '/slugs?post_type=post',
  })
  // Trả về các tham số tĩnh
  return tours?.map((tour: string[]) => ({
    slug: tour,
  }))
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
  const [dataFooter, dataHeader, dataPopup, dataLanguageSwitcher] =
    await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
      fetchData(requestLanguageSwitcher),
    ])
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
