import RelatedArticles from '@/sections/blogs/detail/RelatedArticles'
import BannerImmigration from '@/sections/immigration/banner/BannerImmigration'
import DossierAppraisal from '@/sections/immigration/dossier-appraisal/DossierAppraisal'
import ImmigrationFAQ from '@/sections/immigration/faq/ImmigrationFAQ'
import Programme from '@/sections/immigration/programme/Programme'
import Strengths from '@/sections/immigration/strengths/Strengths'
import { DataItem } from '@/types/blogs.interface'
import { dataPrograms, immigration } from '@/types/dataAcfImmigration.interface'
import { Suspense } from 'react'

export default function Immigration({dataImmigration, dataPrograms, slug, postRelate}: {dataImmigration: immigration, dataPrograms: dataPrograms, slug: string, postRelate: DataItem[]}) {
  return (
    <main className="bg-background">
      <BannerImmigration
        name={dataImmigration?.name}
        dataAcf={dataImmigration?.acf?.banner}
      />
      <Strengths dataStrength={dataImmigration?.acf?.characteristic} />
      <Suspense fallback={<div>Loading...</div>}>
        <Programme slug={slug} dataPrograms={dataPrograms} />
      </Suspense>
      <ImmigrationFAQ
        dataFAQ={dataImmigration?.acf?.faq_nation}
        flag={dataImmigration?.acf?.flag}
      />
      <DossierAppraisal dataDossierAppraisal={dataImmigration?.acf?.reach_far} />
      <RelatedArticles
        className='relative bg-background z-10 shadow-[0px_-20px_40px_0px_rgba(0,0,0,0.03)] rounded-[4rem_4rem_0rem_0rem] pt-[5rem] pb-[6.5rem] xsm:rounded-[1.5rem_1rem_2rem_1rem]'
        dataRelatedPosts={postRelate}
      />
    </main>
  )
}
