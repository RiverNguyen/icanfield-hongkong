import fetchDataACF from '@/fetch/fetchDataACF'
import DiverseAmenities from '@/sections/detail-property-australia/diverse-amenities'
import FAQForm, {
  FAQFormMobile,
} from '@/sections/detail-property-australia/faq-form'
import ProjectLocation from '@/sections/detail-property-australia/project-location'
import fetchData from '@/fetch/fetchData'
import ProjectOther from '@/sections/detail-property-australia/project-other'
import ProjectOverview from '@/sections/detail-property-australia/project-overview'

import Slider, {SliderMobile} from '@/sections/detail-property-australia/slider'
import {IDataAcfDetailAustralia} from '@/types/dataAcfDetailAustralia.interface'
import {notFound} from 'next/navigation'
import getMetadata from '@/fetch/getMetadata'
import metadataValues from '@/utils/metadataValues'
import {redirect} from 'next/navigation'
import Header from '@/layout/header'

// ✅ ISR + Dynamic params - an toàn cho build
export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({params}: {params: {slug: string}}) {
  const res = await getMetadata(`/australia-real-estat?slug=${params.slug}`)
  return metadataValues(Array.isArray(res) ? res[0] : res)
}

export async function generateStaticParams() {
  // ✅ Timeout 5s - tránh treo build
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const tours = await fetchData({
      api: '/slugs?post_type=australia-real-estat',
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

const page = async ({
  params: {slug, locale},
}: {
  params: {slug: string; locale: 'zh' | 'zh-cn' | 'en'}
}) => {
  const [data, dataLocation] = await Promise.all([
    fetchDataACF({
      api: `/australia-real-estat?slug=${slug}&acf_format=standard&lang=${locale}`,
      option: {
        next: {revalidate: 10},
      },
    }),
    fetchData({
      api: `/australian-location?lang=${locale}`,
      option: {
        next: {revalidate: 10},
      },
    }),
  ])

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
    api: '/language-switcher/australia-real-estat/' + locale + '/' + slug,
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
  const dataLanguageSwitcherLocal = {
    zh: {
      slug: 'australian-real-estate',
    },
    'zh-cn': {
      slug: 'australian-real-estate',
    },
    en: {
      slug: 'australian-real-estate',
    },
  }
  console.log('dataLanguageSwitcher', dataLanguageSwitcher)
  if (dataLanguageSwitcher) {
    Object.keys(dataLanguageSwitcherLocal).forEach((key) => {
      dataLanguageSwitcherLocal[key as 'zh' | 'zh-cn' | 'en'].slug +=
        '/' + dataLanguageSwitcher[key as 'zh' | 'zh-cn' | 'en']?.slug
    })
  }
  console.log('dataLanguageSwitcherLocal', dataLanguageSwitcherLocal)
  if (data?.length <= 0) return notFound()
  const {id, title, acf, content} = data?.[0] as IDataAcfDetailAustralia
  if (!id || !title || !acf || !content) {
    redirect('/')
  }
  return (
    <>
      <Header
        data={dataHeader?.data}
        dataFooter={dataFooter.data}
        dataPopup={dataPopup?.data}
        languageSwitcher={dataLanguageSwitcherLocal}
      />
      <div className='bg-background pb-[6.35rem] xsm:bg-white xsm:pb-12'>
        <Slider
          {...acf.banner}
          title={title.rendered}
          className='xsm:hidden'
        />
        <SliderMobile
          {...acf.banner}
          title={title.rendered}
          className='hidden xsm:block'
        />
        <section className='mt-[5.75rem] flex items-start space-x-[2.6875rem] section-container xsm:mt-8'>
          <div className='w-[60.8125rem] space-y-[2.875rem] xsm:w-full xsm:space-y-8'>
            <ProjectOverview content={content.rendered} />
            <ProjectLocation {...acf.location} />
            <DiverseAmenities {...acf.diverse_amenities} />
          </div>
          <div className='sticky top-[6.44rem] flex-1 xsm:hidden'>
            <FAQForm dataLocation={dataLocation} />
          </div>
        </section>
        <FAQFormMobile dataLocation={dataLocation} />
        <ProjectOther id={id} />
      </div>
    </>
  )
}
export default page
