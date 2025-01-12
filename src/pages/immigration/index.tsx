import BannerImmigration from '@/sections/immigration/banner/BannerImmigration'
import DossierAppraisal from '@/sections/immigration/dossier-appraisal/DossierAppraisal'
import ImmigrationFAQ from '@/sections/immigration/faq/ImmigrationFAQ'
import Programme from '@/sections/immigration/programme/Programme'
import Strengths from '@/sections/immigration/strengths/Strengths'
import {dataPrograms, immigration} from '@/types/dataAcfImmigration.interface'
import dynamic from 'next/dynamic'
const CanadaMap = dynamic(() => import('@/sections/immigration/map'), {
  ssr: false, // Nếu component không cần server-side rendering
  loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
})
import {Suspense} from 'react'

export default function Immigration({
  dataImmigration,
  dataPrograms,
  slug,
}: {
  dataImmigration: immigration
  dataPrograms: dataPrograms
  slug: string
}) {
  return (
    <main className='bg-background'>
      <BannerImmigration
        name={dataImmigration?.name}
        dataAcf={dataImmigration?.acf?.banner}
      />
      <CanadaMap />
      <Strengths dataStrength={dataImmigration?.acf?.characteristic} />
      <Suspense fallback={<div>Loading...</div>}>
        <Programme
          slug={slug}
          dataPrograms={dataPrograms}
        />
      </Suspense>
      <ImmigrationFAQ />
      <DossierAppraisal />
      {/* <RelatedArticles /> */}
    </main>
  )
}
