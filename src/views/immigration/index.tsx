import BannerImmigration from '@/sections/immigration/banner/BannerImmigration'
import {dataPrograms, immigration} from '@/types/dataAcfImmigration.interface'
import dynamic from 'next/dynamic'

import {useTranslations} from 'next-intl'
import {Suspense} from 'react'
import {DataItem} from '@/types/blogs.interface'
import {Data} from '@/sections/immigration/map'

interface ImmigrationProps {
  dataImmigration: immigration
  dataPrograms: dataPrograms
  slug: string
  postRelate: DataItem[]
  dataMap: Data
}

const Immigration: React.FC<ImmigrationProps> = ({
  dataImmigration,
  dataPrograms,
  slug,
  postRelate,
  dataMap,
}) => {
  const t = useTranslations()
  const CanadaMap = dynamic(() => import('@/sections/immigration/map'), {
    ssr: false,
    loading: () => <p>{t('dang_tai_ban_do')}</p>,
  })
  const Strengths = dynamic(
    () => import('@/sections/immigration/strengths/Strengths'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_diem_manh')}</p>,
    },
  )
  const Programme = dynamic(
    () => import('@/sections/immigration/programme/Programme'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_chuong_trinh')}</p>,
    },
  )
  const ImmigrationFAQ = dynamic(
    () => import('@/sections/immigration/faq/ImmigrationFAQ'),
    {
      ssr: false,
      loading: () => <p>{t('dang_tai_hoi_dap')}</p>,
    },
  )
  const DossierAppraisal = dynamic(
    () => import('@/sections/immigration/dossier-appraisal/DossierAppraisal'),
    {
      ssr: true,
      loading: () => <p>{t('dang_tai_danh_gia_ho_so')}</p>,
    },
  )
  const RelatedArticles = dynamic(
    () => import('@/sections/blogs/detail/RelatedArticles'),
    {
      ssr: true,
      loading: () => <p>{t('dang_tai_bai_viet')}</p>,
    },
  )
  return (
    <main className='bg-background'>
      <BannerImmigration
        name={dataImmigration?.name}
        dataAcf={dataImmigration?.acf?.banner}
      />
      <CanadaMap
        slug={slug}
        data={dataMap}
      />
      <Strengths dataStrength={dataImmigration?.acf?.characteristic} />
      <Suspense fallback={<div>{t('dang_tai')}</div>}>
        <Programme
          name={dataImmigration?.name}
          slug={slug}
          dataPrograms={dataPrograms}
          imgBg={dataImmigration?.acf?.banner?.image_list_program?.url}
        />
      </Suspense>
      <ImmigrationFAQ
        dataFAQ={dataImmigration?.acf?.faq_nation}
        flag={dataImmigration?.acf?.flag}
      />
      <DossierAppraisal
        dataDossierAppraisal={dataImmigration?.acf?.reach_far}
      />
      <RelatedArticles
        className='relative z-10 rounded-[4rem_4rem_0rem_0rem] bg-background pb-[6.5rem] pt-[5rem] shadow-[0px_-20px_40px_0px_rgba(0,0,0,0.03)] xsm:rounded-[1.5rem_1rem_2rem_1rem] xsm:pt-[1.5rem]'
        dataRelatedPosts={postRelate}
      />
    </main>
  )
}
export default Immigration
