import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import PageBlogs from '@/pages/page-blogs'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import Header from '@/layout/header'

const PAGES = {
  zh: 7120,
  'zh-cn': 7148,
  en: 7150,
}

export async function generateMetadata({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'}
}) {
  const {locale} = await params
  const res = await getMetadata('/pages/' + PAGES[locale])
  return metadataValues(res)
}

const dataLanguageSwitcher = {
  zh: {
    slug: 'blogs',
  },
  'zh-cn': {
    slug: 'blogs',
  },
  en: {
    slug: 'blogs',
  },
}

const page = async ({params}: {params: {locale: 'zh' | 'zh-cn' | 'en'}}) => {
  const {locale} = await params
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

  const requestPosts = {
    api: endpoints.blog.list + `?page=1&limit=${LIMIT_POSTS}&lang=${locale}`,
    option: {
      next: {revalidate: 10},
    },
  }
  const outstandingPosts = {
    api: '/outstanding-post?lang=' + locale,
    option: {
      next: {revalidate: 10},
    },
  }
  const requestCategories = {
    api:
      endpoints.categories.list +
      '?_fields=id,name,slug,taxonomy&lang=' +
      locale,
    option: {
      next: {revalidate: 10},
    },
  }
  const requestPage = {
    api: `/pages/${PAGES[locale]}?acf_format=standard`,
    option: {
      next: {revalidate: 10},
    },
  }
  const [dataPosts, dataCategories, dataPage, outstandingData] =
    await Promise.all([
      fetchData(requestPosts),
      fetchDataACF(requestCategories),
      fetchDataACF(requestPage),
      fetchData(outstandingPosts),
    ])
  const [dataFooter, dataHeader, dataPopup] = await Promise.all([
    fetchData(requestFooter),
    fetchData(requestHeader),
    fetchData(requestPopup),
  ])
  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcher}
      />
      <PageBlogs
        dataPage={dataPage?.acf}
        dataPosts={dataPosts}
        dataCategories={dataCategories}
        outstandingData={outstandingData?.featured_news}
      />
    </>
  )
}

export default page
