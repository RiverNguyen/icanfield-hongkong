import BannerImmigration from '@/sections/immigration/banner/BannerImmigration'
import DossierAppraisal from '@/sections/immigration/dossier-appraisal/DossierAppraisal'
import ImmigrationFAQ from '@/sections/immigration/faq/ImmigrationFAQ'
import Programme from '@/sections/immigration/programme/Programme'
import Strengths from '@/sections/immigration/strengths/Strengths'
import { immigration } from '@/types/dataAcfImmigration.interface'

export default function Immigration({dataImmigration}: {dataImmigration: immigration}) {
  return (
    <main className="bg-background">
      <BannerImmigration
        name={dataImmigration?.name}
        dataAcf={dataImmigration?.acf?.banner}
      />
      <Strengths dataStrength={dataImmigration?.acf?.characteristic} />
      <Programme />
      <ImmigrationFAQ />
      <DossierAppraisal />
      {/* <RelatedArticles /> */}
    </main>
  )
}
