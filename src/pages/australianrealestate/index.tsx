import ContactV2 from '@/components/ContactV2/ContactV2'
import FormInternationalJourney from '@/components/ContactV2/FormInternationalJourney'
import {
  AdvantagesBenefits,
  IAdvantagesBenefitsProps,
} from '@/components/advantages-benefits'
import { Breadcrumb } from '@/components/breadcrumb'
import ProjectTransparency, {
  IItemInvestmentOpportunities,
} from '@/components/project-transparency'
import { WhyChooseUs } from '@/components/why-choose-us'
import Benefits from '@/sections/australian-real-estate/Benefits'
// import {benefitsProps} from '@/sections/australian-real-estate/constants'
import { ICountry } from '@/components/LeafletMap'
import { IItemAustralia } from '@/components/itemAustralia/itemAustralia.interface'
import { BenefitsProps } from '@/sections/australian-real-estate/Benefits'
import OutstandingAustralia from '@/sections/australian-real-estate/OutstandingAustralia'
import RelatedArticles from '@/sections/blogs/detail/RelatedArticles'
import { Banner } from '@/sections/detail-settlement-programs/banner'
import { DataItem } from '@/types/blogs.interface'
import { Term } from '@/types/dataAppraisal.interface'
import { Media } from '@/types/image.interface'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const PioneeringValuesAustralia = dynamic(
  () => import('@/sections/australian-real-estate/section-map'),
  {
    ssr: false, // Nếu component không cần server-side rendering
    loading: () => <p>Loading Map Discover...</p>, // Thêm trạng thái loading
  },
)
const data = {
  listItems: {
    success: true,
    total: 9,
    totalPages: 1,
    page: 1,
    limit: 9,
    data: [
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
      {
        id: 1,
        location: [
          {
            id: 1,
            name: 'canada',
            slug: 'Canada',
            taxonomy: 'canada',
            primary: true,
          },
        ],
        slug: 'string',
        title: 'string',
        image: {
          ID: 88,
          id: 88,
          title: 'bacgroud',
          filename: 'sss',
          filesize: 59961081,
          url: '/imgs/detail-settlement-programs/d-advantages-benefits-bg.webp',
          link: 'string',
          alt: 'string',
          author: 'string',
          description: 'string',
          caption: 'string',
          name: 'string',
          status: 'string',
          uploaded_to: 1,
          date: 'string',
          modified: 'string',
          menu_order: 1,
          mime_type: 'string',
          type: 'string',
          subtype: 'string',
          icon: 'string',
          width: 1622,
          height: 800,
        },
        type: 'string',
        project_scale: 'string',
        eb5_capital_ratio: 1,
        jobs_created: 1,
        contact: 'string',
      },
    ],
  },
  categories: [
    {
      id: 1,
      name: 'Canada',
      slug: 'canada',
      taxonomy: '',
    },
    {
      id: 1,
      name: 'Canada',
      slug: 'canada',
      taxonomy: '',
    },
  ],
  safety_standards: {
    title: 'Quy trình đầu tư <br/> Bất động sản tại Úc',
    items: [
      {
        title: 'Chủ đầu tư và Tình trạng Xây dựng của Dự án',
        description:
          'Nghiên cứu kỹ lưỡng về khu vực, loại hình bất động sản và tiềm năng tăng trưởng.',
      },
      {
        title: 'Chủ đầu tư và Tình trạng Xây dựng của Dự án',
        description:
          'Nghiên cứu kỹ lưỡng về khu vực, loại hình bất động sản và tiềm năng tăng trưởng.',
      },
      {
        title: 'Chủ đầu tư và Tình trạng Xây dựng của Dự án',
        description:
          'Nghiên cứu kỹ lưỡng về khu vực, loại hình bất động sản và tiềm năng tăng trưởng.',
      },
      {
        title: 'Chủ đầu tư và Tình trạng Xây dựng của Dự án',
        description:
          'Nghiên cứu kỹ lưỡng về khu vực, loại hình bất động sản và tiềm năng tăng trưởng.',
      },
      {
        title: 'Chủ đầu tư và Tình trạng Xây dựng của Dự án',
        description:
          'Nghiên cứu kỹ lưỡng về khu vực, loại hình bất động sản và tiềm năng tăng trưởng.',
      },
    ],
    footer_title_left:
      '<p>Đầu tư hôm nay</p><p><strong>Bất động sản</strong></p>',
    footer_link_slug: '/',
    footer_content:
      'Đầu tư vào bất động sản Úc không chỉ là một quyết định tài chính, mà còn là bước đi vững chắc để bạn và gia đình tận hưởng một cuộc sống ổn định, an toàn và tràn đầy cơ hội phát triển.',
  },
}

const why_choose_us = {
  title: 'Vì sao lựa chọn chúng tôi',
  description:
    'Icanfield mở ra cánh cửa đến cuộc sống chất lượng, cơ hội phát triển toàn diện và môi trường lý tưởng cho cả gia đình bạn. Cùng khám phá những lợi thế vượt trội từ các chương trình định cư hàng đầu.',
  logo: {
    ID: 88,
    id: 88,
    title: 'bacgroud',
    filename: 'sss',
    filesize: 59961081,
    url: 'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-logo.webp',
    link: 'string',
    alt: 'string',

    author: 'string',
    description: 'string',
    caption: 'string',
    name: 'string',
    status: 'string',
    uploaded_to: 1,
    date: 'string',
    modified: 'string',
    menu_order: 1,
    mime_type: 'string',
    type: 'string',
    subtype: 'string',
    icon: 'string',
    width: 1622,
    height: 800,
  },
  items: [
    {
      title: 'Dịch vụ uy tín',
      description:
        'Với nhiều năm kinh nghiệm trong lĩnh vực di trú và định cư, iCanfield cam kết mang đến giải pháp tối ưu và đáng tin cậy cho bạn.',
    },
    {
      title: 'Hỗ trợ toàn diện',
      description:
        'Chúng tôi hỗ trợ từ tư vấn ban đầu, xử lý hồ sơ, đến hoàn thiện thủ tục, đảm bảo bạn luôn được chăm sóc chu đáo nhất.',
    },
    {
      title: 'Đa dạng lựa chọn',
      description:
        'Từ chương trình định cư, du học đến cơ hội đầu tư, iCanfield cung cấp nhiều giải pháp linh hoạt cho từng cá nhân và gia đình.',
    },
  ],
}
interface dataAcf {
  banner_australia: {
    clone_banner: {
      background_pc: Media
      background_mb: Media
      title_line_1: string
      title_line_2: string
      description: string
    }
  }
  benefits: BenefitsProps
  clone_advantages_benefits: IAdvantagesBenefitsProps
  list_programs: {
    title: string
  }
  investment_process_australia: {
    safety_standards: {
      title: string
      items: IItemInvestmentOpportunities[]
      footer_title_left: string
      footer_link_slug: string
      footer_content: string
    }
  }
  section_map: {
    title: string
    description: string
    data_state_usa: ICountry[]
  }
}

export default function AustralianRealEstate({
  dataNationSettlement,
  dataAcf,
  dataListPost,
  postRelate,
  dataMap
}: {
  dataNationSettlement: Term[]
  dataAcf: dataAcf
  dataListPost: {
    success: boolean
    total: number
    totalPages: number
    page: number
    limit: number
    data: IItemAustralia[]
    }
    postRelate: DataItem[]
    dataMap: {
      slug: string
      location_name: string
      count: number
    }[]

}) {
  const dataInvestment = {
    data: {...dataAcf?.investment_process_australia?.safety_standards},
  }
  return (
    <main className='bg-background'>
      <Banner
        title_line_1={dataAcf?.banner_australia.clone_banner.title_line_1}
        title_line_2={dataAcf?.banner_australia.clone_banner.title_line_2}
        description={dataAcf?.banner_australia.clone_banner.description}
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
        className='[&_.overlay2]:xsm:bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)_86.12%)] z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={
          dataAcf?.banner_australia.clone_banner.background_pc as Media
        }
        background_mb={
          dataAcf?.banner_australia.clone_banner.background_mb as Media
        }
      >
        <Breadcrumb
          items={[
            {label: 'Trang chủ', href: '/'},
            {label: 'Bất động sản Úc', href: '#'},
          ]}
        />
      </Banner>
      <Benefits {...dataAcf?.benefits} />
      <AdvantagesBenefits
        {...dataAcf?.clone_advantages_benefits}
        className={{
          headding:
            'flex-row justify-between section-container sm:max-w-[90rem] xsm:flex-col [&>p]:text-start [&>p]:sm:w-[29.375rem]',
          advantagesHeading:
            'flex w-[38.625rem] flex-col items-start xsm:w-full xsm:px-0 [&>div]:text-start',
        }}
      />
      <PioneeringValuesAustralia data={dataAcf?.section_map} dataMap={dataMap}/>
      <Suspense fallback={<p>Loading...</p>}>
        <OutstandingAustralia
          listItems={dataListPost}
          categories={data?.categories}
        />
      </Suspense>
      <ProjectTransparency
        data={dataInvestment?.data}
        fontSize='text-[2rem] [&_p]:text-[2rem] [&_p]:font-semibold [&_p]:leading-[1.2] [&_p]:tracking-[-0.06rem] [&_strong]:text-[5.625rem] [&_strong]:tracking-[-0.1125rem] xsm:!text-[1.5rem] xsm:[&_strong]:!text-[2.75rem] xsm:translate-y-[3rem]'
        linkImage='/imgs/EB5/projects-transparency/sydney2-w.webp'
        className='h-[92rem]'
      />
      <WhyChooseUs {...why_choose_us} />
      {postRelate?.length &&
        <RelatedArticles
          className='relative z-10 rounded-[0rem] xsm:pt-[1.5rem] bg-background pb-[6.5rem] pt-[5rem] shadow-[0px_-20px_40px_0px_rgba(0,0,0,0.03)] xsm:rounded-[1.5rem_1rem_2rem_1rem]'
          dataRelatedPosts={postRelate}
        />
      }
      <ContactV2>
        <FormInternationalJourney dataNationSettlement={dataNationSettlement} />
      </ContactV2>
    </main>
  )
}
