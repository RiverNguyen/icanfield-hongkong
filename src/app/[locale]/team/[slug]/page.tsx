import fetchData from '@/fetch/fetchData'
import getMetadata from '@/fetch/getMetadata'
import HRDetail from '@/views/detail-hr'
import metadataValues from '@/utils/metadataValues'
import {notFound} from 'next/navigation'
import Header from '@/layout/header'

export async function generateMetadata({
  params,
}: {
  params: {slug: string; locale: string}
}) {
  const res = await getMetadata(`/team?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}

export default async function page({
  params: {slug, locale},
}: {
  params: {slug: string; locale: string}
}) {
  const dataLanguageSwitcherLocal = {
    zh: {
      slug: 'team',
    },
    'zh-cn': {
      slug: 'team',
    },
    en: {
      slug: 'team',
    },
  }
  const data = await fetchData({
    api: `/team?slug=${slug}&lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  })
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
    api: '/language-switcher/team/' + locale + '/' + slug,
    option: {
      next: {revalidate: 60},
    },
    fallback: {},
  }
  const [dataFooter, dataHeader, dataPopup, dataLanguageSwitcher] =
    await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
      fetchData(requestLanguageSwitcher),
    ])
  if (data.code === 'not_found' || !data) {
    return notFound()
  }
  if (dataLanguageSwitcher) {
    Object.keys(dataLanguageSwitcherLocal).forEach((key) => {
      const nextSlug =
        dataLanguageSwitcher?.[key as 'zh' | 'zh-cn' | 'en']?.slug
      if (nextSlug) {
        dataLanguageSwitcherLocal[key as 'zh' | 'zh-cn' | 'en'].slug +=
          '/' + nextSlug
      }
    })
  }

  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcherLocal}
      />
      <HRDetail data={data} />
    </>
  )
}
