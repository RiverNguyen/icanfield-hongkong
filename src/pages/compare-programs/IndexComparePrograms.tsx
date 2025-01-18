import Programs from '@/sections/compare-programs/Programs'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import {Breadcrumb} from '@/components/breadcrumb'
import ContactV2 from '@/components/ContactV2/ContactV2'
import FormInternationalJourney from '@/components/ContactV2/FormInternationalJourney'
import {Term} from '@/sections/homepage/banner/bannerHp.interface'

const IndexComparePrograms = ({
  dataNationSettlement,
}: {
  dataNationSettlement: Term[]
}) => {
  return (
    <main className='bg-[#F6F6F4]'>
      <Banner
        title_line_1='So Sánh Chương Trình'
        title_line_2='Chọn Lộ Trình Phù Hợp'
        description='Tìm kiếm các chương trình định cư và Chọn giải pháp tối ưu để giấc mơ toàn cầu của bạn thành hiện thực.'
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 59961081,
          url: '/imgs/australianRealEstate/bg.webp',
          link: 'string',
          alt: 'string',
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
          url: '/imgs/australianRealEstate/bg_mb.webp',
          link: 'string',
          alt: 'string',
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
            {label: 'So sánh chương trình', href: '#'},
          ]}
        />
      </Banner>
      <section className='mt-[6.44rem] h-fit w-full rounded-[2.5rem_2.5rem_0rem_0rem] section-container xsm:!max-w-full xsm:px-0'>
        <h2 className='font-optima text-Phase-1-Brown heading1 xsm:px-[1rem] xsm:text-[1.5rem] xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.045rem]'>
          So sánh các chương trình định cư
        </h2>
        <span className='mb-[4rem] mt-[1rem] block font-normal text-greyscaletext-body body16-r55 xsm:mb-[2rem] xsm:mt-[0.75rem] xsm:px-[1rem] xsm:body-14'>
          Chọn chương trình và so sánh giữa các chương trình
        </span>
        <Programs />
        <ContactV2>
          <FormInternationalJourney
            dataNationSettlement={dataNationSettlement}
          />
        </ContactV2>
      </section>
    </main>
  )
}

export default IndexComparePrograms
