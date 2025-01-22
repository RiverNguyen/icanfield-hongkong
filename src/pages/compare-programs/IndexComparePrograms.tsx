import ContactV2 from '@/components/ContactV2/ContactV2'
import FormInternationalJourney from '@/components/ContactV2/FormInternationalJourney'
import { Breadcrumb } from '@/components/breadcrumb'
import Programs from '@/sections/compare-programs/Programs'
import { Banner } from '@/sections/detail-settlement-programs/banner'
import { DataItem, acfPage } from '@/types/comparePrograms.interface'
import { Term } from '@/types/dataAppraisal.interface'

const IndexComparePrograms = ({
  dataNationSettlement,
  dataPage,
  dataPrograms
}: {
  dataNationSettlement: Term[]
  dataPage: acfPage
  dataPrograms: DataItem[]
}) => {
  return (
    <main className='bg-[#F6F6F4]'>
      <Banner
        title_line_1={dataPage?.banner_compare_programs_acf?.clone_banner?.title_line_1}
        title_line_2={dataPage?.banner_compare_programs_acf?.clone_banner?.title_line_2}
        description={dataPage?.banner_compare_programs_acf?.clone_banner?.description}
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)_86.12%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 59961081,
          url: dataPage?.banner_compare_programs_acf?.clone_banner?.background_pc?.url,
          link: 'string',
          alt: dataPage?.banner_compare_programs_acf?.clone_banner?.background_pc?.alt,
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1000,
          date: 'string',
          modified: 'string',
          menu_order: 1000,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1000,
          height: 1000,
        }}
        background_mb={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 59961081,
          url: dataPage?.banner_compare_programs_acf?.clone_banner?.background_pc?.url,
          link: 'string',
          alt: dataPage?.banner_compare_programs_acf?.clone_banner?.background_pc?.alt,
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1000,
          date: 'string',
          modified: 'string',
          menu_order: 1000,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1000,
          height: 1000,
        }}
      >
        <Breadcrumb
          items={[
            {label: 'Trang chủ', href: '/'},
            {label: 'So sánh chương trình', href: ''},
          ]}
        />
      </Banner>
      <section className='relative z-[21] bg-background sm:mt-[-2rem] pt-[6.44rem] xsm:pt-[2.5rem] h-fit w-full sm:rounded-[2.5rem_2.5rem_0rem_0rem] xsm:!max-w-full xsm:px-0'>
        <h2 className='section-container font-optima text-Phase-1-Brown heading1 xsm:px-[1rem] xsm:text-[1.5rem] xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.045rem]'>
          So sánh các chương trình định cư
        </h2>
        <span className='section-container mb-[4rem] mt-[1rem] block font-normal text-greyscaletext-body body16-r55 xsm:mb-[2rem] xsm:mt-[0.75rem] xsm:px-[1rem] xsm:body-14'>
          Chọn chương trình và so sánh giữa các chương trình
        </span>
        <Programs programs={dataPrograms} dataTitleCompare={dataPage?.title_compare}/>
      </section>
      <ContactV2>
        <FormInternationalJourney
          dataNationSettlement={dataNationSettlement}
        />
      </ContactV2>
    </main>
  )
}

export default IndexComparePrograms
