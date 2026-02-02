import fetchData from '@/fetch/fetchData'
import fetchDataACF from '@/fetch/fetchDataACF'
import {LIMIT_POSTS} from '@/sections/blogs/constant'
import endpoints from '@/utils/endpoints'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import PageEB5Clone from '@/views/page-EB5/indexClone'
import Header from '@/layout/header'
export async function generateMetadata() {
  const res = await getMetadata('/pages/521')
  return metadataValues(res)
}
export default async function page({
  params,
}: {
  params: {locale: 'zh' | 'zh-cn' | 'en'; locationslug: string}
}) {
  //eslint-disable-line
  // console.log(slug)
  try {
    const requestFooter = {
      api: '/footer-options?acf_format=standard&lang=' + params.locale,
      option: {
        next: {revalidate: 60},
      },
    }
    const requestHeader = {
      api: '/header-options?acf_format=standard&lang=' + params.locale,
      option: {
        next: {revalidate: 60},
      },
    }
    const requestPopup = {
      api: '/form-all-page?lang=' + params.locale,
      option: {
        next: {revalidate: 60},
      },
    }

    const [dataFooter, dataHeader, dataPopup] = await Promise.all([
      fetchData(requestFooter),
      fetchData(requestHeader),
      fetchData(requestPopup),
    ])
    const req = [
      fetchDataACF({
        api: endpoints.eb5Project.page[params.locale],
        option: {
          next: {revalidate: 10},
        },
      }),
      fetchDataACF({
        api: endpoints.eb5Project.categories + `&lang=${params.locale}`,
        option: {
          next: {revalidate: 10},
        },
      }),
      fetchData({
        api:
          endpoints.eb5Project.list +
          `?tax=eb5-location&eb5-location=${params.locationslug}&page=1&limit=${LIMIT_POSTS}&lang=${params.locale}`,
        option: {
          next: {revalidate: 10},
        },
      }),
      fetchData({
        api: '/eb5-location?lang=' + params.locale,
        option: {
          next: {revalidate: 10},
        },
      }),
    ]

    const [page, categories, list, dataMap] = await Promise.all(req)
    if (page.status === 404) {
      return <div>{String('error')}</div>
    }
    const dataLanguageSwitcher = {
      zh: {
        slug: 'EB5',
      },
      'zh-cn': {
        slug: 'EB5',
      },
      en: {
        slug: 'EB5',
      },
    }
    return (
      <>
        <Header
          data={dataHeader?.data}
          dataFooter={dataFooter.data}
          dataPopup={dataPopup?.data}
          languageSwitcher={dataLanguageSwitcher}
        />
        <PageEB5Clone
          data={{
            ...page?.acf,
            listItems: list,
            categories: categories,
            dataMap: dataMap?.data,
          }}
        />
      </>
    )
  } catch {
    return <div>{String('error')}</div>
  }
}
