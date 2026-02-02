import ContactV2 from '@/components/ContactV2/ContactV2'
import FormInternationalJourney from '@/components/ContactV2/FormInternationalJourney'
import {Breadcrumb} from '@/components/breadcrumb'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import FormAppraisal from '@/sections/document-appraisal/FormAppraisal'
import {Taxonomies, dataAppraisal} from '@/types/dataAppraisal.interface'
import {useTranslations} from 'next-intl'

export default function DocumentAppraisal({
  data,
  dataTaxonomies,
  defaultCalling,
}: {
  data: dataAppraisal
  dataTaxonomies: Taxonomies
  defaultCalling?: string
}) {
  const t = useTranslations()
  return (
    <main className='bg-background'>
      <Banner
        title_line_1={data?.banner_evaluation?.title_line_1}
        title_line_2={data?.banner_evaluation?.title_line_2}
        description={data?.banner_evaluation?.description}
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
        className='xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={data?.banner_evaluation?.images}
        background_mb={data?.banner_evaluation?.images_mb}
      >
        <Breadcrumb
          items={[
            {label: t('trang_chu'), href: t('slug')},
            {label: t('tham_dinh_ho_so'), href: ''},
          ]}
        />
      </Banner>
      <FormAppraisal
        dataTaxonomies={dataTaxonomies}
        otherInformation={data?.filter_value}
        defaultCalling={defaultCalling}
      />
      <ContactV2>
        <FormInternationalJourney
          dataNationSettlement={dataTaxonomies?.nation}
        />
      </ContactV2>
    </main>
  )
}
