
import BannerImmigration from '@/sections/immigration/banner/BannerImmigration'
import {dataPrograms, immigration} from '@/types/dataAcfImmigration.interface'
import dynamic from 'next/dynamic'
const CanadaMap = dynamic(() => import('@/sections/immigration/map'), {
  ssr: true, // Nếu component không cần server-side rendering
  loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
})
const Strengths = dynamic(
  () => import('@/sections/immigration/strengths/Strengths'),
  {
    ssr: true,
    loading: () => <p>Loading Strengths...</p>,
  },
)
const Programme = dynamic(
  () => import('@/sections/immigration/programme/Programme'),
  {
    ssr: true,
    loading: () => <p>Loading Programme...</p>,
  },
)
const ImmigrationFAQ = dynamic(
  () => import('@/sections/immigration/faq/ImmigrationFAQ'),
  {
    ssr: true,
    loading: () => <p>Loading Strengths...</p>,
  },
)
const DossierAppraisal = dynamic(
  () => import('@/sections/immigration/dossier-appraisal/DossierAppraisal'),
  {
    ssr: true,
    loading: () => <p>Loading Dossier Appraisal...</p>,
  },
)
const RelatedArticles = dynamic(
  () => import('@/sections/blogs/detail/RelatedArticles'),
  {
    ssr: true,
    loading: () => <p>Loading Related Articles...</p>,
  },
)
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
      <Suspense fallback={<div>Loading...</div>}>
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
