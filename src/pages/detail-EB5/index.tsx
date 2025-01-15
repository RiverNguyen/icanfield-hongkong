import ProjectInvestorDeveloper from '@/sections/detail-eb5/project-investor-developer'
import {projectInvestorDeveloperProps} from '@/sections/detail-eb5/project-investor-developer/constants'
import ProjectLocation from '@/sections/detail-eb5/project-location'
import {projectLocationProps} from '@/sections/detail-eb5/project-location/constants'
import ProjectOverview from '@/sections/detail-eb5/project-overview'
import {projectOverviewProps} from '@/sections/detail-eb5/project-overview/constants'
import {Banner} from '@/sections/detail-settlement-programs/banner'
import {Breadcrumb} from '@/components/breadcrumb'
import CapitalStructure from '@/components/chart/CapitalStructure'
import {ProcessSteps} from '@/sections/detail-settlement-programs/process-steps'

const fakeData = {
  title: 'Cấu trúc vốn EB-5 an toàn',
  capital_source: [
    {
      browser: 'Vốn chủ đầu tư',
      visitors: 37.1,
      fill: '9E5431',
    },
    {
      browser: 'Vốn vay EB-5',
      visitors: 70.4,
      fill: 'E0C06C',
    },
    {
      browser: 'Vốn từ khoản vay cao cấp',
      visitors: 44.8,
      fill: 'BC9247',
    },
  ],
}
const fakeDataStep = {
  title: 'Tiến trình dự án',
  description:
    'Palm Springs Hotel được triển khai với lộ trình rõ ràng, cam kết đảm bảo đúng tiến độ để mang đến sự an tâm cho các nhà đầu tư.',
  steps: [
    {
      title: 'Khởi công dự án',
      description:
        'Chuẩn bị hồ sơ, Luật sư di trú sẽ đại diện nộp đơn định cư I-526E và hồ sơ chứng minh nguồn tiền lên Sở di trú USCIS.',
      image: {
        ID: 506,
        id: 506,
        title: 'image',
        filename: 'image-scaled.webp',
        filesize: 113108,
        url: 'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-scaled.webp',
        link: 'https://cms.icanfield.okhub-tech.com/settlement-program/settlement-program-1-awesome-youve-been-using-contact-form-cfdb7-for-more-than-1-week-may-we-ask-you-to-give-it-a-5-star-rating-on-wordpress-ok-you-deserved-it-i-already-did-no-not-good-e-11/image-2/',
        alt: '',
        author: '1',
        description: '',
        caption: '',
        name: 'image-2',
        status: 'inherit',
        uploaded_to: 386,
        date: '2025-01-10 07:01:15',
        modified: '2025-01-10 07:01:15',
        menu_order: 0,
        mime_type: 'image/webp',
        type: 'image',
        subtype: 'webp',
        icon: 'https://cms.icanfield.okhub-tech.com/wp-includes/images/media/default.png',
        width: 2560,
        height: 991,
        sizes: {
          thumbnail:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-150x150.webp',
          'thumbnail-width': 150,
          'thumbnail-height': 150,
          medium:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-300x116.webp',
          'medium-width': 300,
          'medium-height': 116,
          medium_large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-768x297.webp',
          'medium_large-width': 768,
          'medium_large-height': 297,
          large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1024x396.webp',
          'large-width': 1024,
          'large-height': 396,
          '1536x1536':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1536x594.webp',
          '1536x1536-width': 1536,
          '1536x1536-height': 594,
          '2048x2048':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2048x793.webp',
          '2048x2048-width': 2048,
          '2048x2048-height': 793,
        },
      },
    },
    {
      title: 'Xây dựng phần thô',
      description:
        'Chúng tôi hỗ trợ chuẩn bị hồ sơ đầy đủ và nộp đến cơ quan có thẩm quyền theo yêu cầu chương trình định cư.',
      image: {
        ID: 475,
        id: 475,
        title: 'd-process-steps-item',
        filename: 'd-process-steps-item-scaled.webp',
        filesize: 123520,
        url: 'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-scaled.webp',
        link: 'https://cms.icanfield.okhub-tech.com/story-share/anh-nguyen-van-minh/d-process-steps-item/',
        alt: '',
        author: '1',
        description: '',
        caption: '',
        name: 'd-process-steps-item',
        status: 'inherit',
        uploaded_to: 468,
        date: '2025-01-10 04:33:56',
        modified: '2025-01-10 04:33:56',
        menu_order: 0,
        mime_type: 'image/webp',
        type: 'image',
        subtype: 'webp',
        icon: 'https://cms.icanfield.okhub-tech.com/wp-includes/images/media/default.png',
        width: 2560,
        height: 991,
        sizes: {
          thumbnail:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-150x150.webp',
          'thumbnail-width': 150,
          'thumbnail-height': 150,
          medium:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-300x116.webp',
          'medium-width': 300,
          'medium-height': 116,
          medium_large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-768x297.webp',
          'medium_large-width': 768,
          'medium_large-height': 297,
          large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-1024x396.webp',
          'large-width': 1024,
          'large-height': 396,
          '1536x1536':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-1536x594.webp',
          '1536x1536-width': 1536,
          '1536x1536-height': 594,
          '2048x2048':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/d-process-steps-item-2048x793.webp',
          '2048x2048-width': 2048,
          '2048x2048-height': 793,
        },
      },
    },
    {
      title: 'Hoàn thiện nội thất',
      description:
        'Chuẩn bị hồ sơ, Luật sư di trú sẽ đại diện nộp đơn định cư I-526E và hồ sơ chứng minh nguồn tiền lên Sở di trú USCIS.',
      image: {
        ID: 507,
        id: 507,
        title: 'image',
        filename: 'image-1-scaled.webp',
        filesize: 108132,
        url: 'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-scaled.webp',
        link: 'https://cms.icanfield.okhub-tech.com/settlement-program/settlement-program-1-awesome-youve-been-using-contact-form-cfdb7-for-more-than-1-week-may-we-ask-you-to-give-it-a-5-star-rating-on-wordpress-ok-you-deserved-it-i-already-did-no-not-good-e-11/image-3/',
        alt: '',
        author: '1',
        description: '',
        caption: '',
        name: 'image-3',
        status: 'inherit',
        uploaded_to: 386,
        date: '2025-01-10 07:02:15',
        modified: '2025-01-10 07:02:15',
        menu_order: 0,
        mime_type: 'image/webp',
        type: 'image',
        subtype: 'webp',
        icon: 'https://cms.icanfield.okhub-tech.com/wp-includes/images/media/default.png',
        width: 2560,
        height: 991,
        sizes: {
          thumbnail:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-150x150.webp',
          'thumbnail-width': 150,
          'thumbnail-height': 150,
          medium:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-300x116.webp',
          'medium-width': 300,
          'medium-height': 116,
          medium_large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-768x297.webp',
          'medium_large-width': 768,
          'medium_large-height': 297,
          large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-1024x396.webp',
          'large-width': 1024,
          'large-height': 396,
          '1536x1536':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-1536x594.webp',
          '1536x1536-width': 1536,
          '1536x1536-height': 594,
          '2048x2048':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-1-2048x793.webp',
          '2048x2048-width': 2048,
          '2048x2048-height': 793,
        },
      },
    },
    {
      title: 'Hoàn thiện & Vận hành',
      description:
        'Chuẩn bị hồ sơ, Luật sư di trú sẽ đại diện nộp đơn định cư I-526E và hồ sơ chứng minh nguồn tiền lên Sở di trú USCIS.',
      image: {
        ID: 509,
        id: 509,
        title: 'image',
        filename: 'image-2.webp',
        filesize: 484816,
        url: 'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2.webp',
        link: 'https://cms.icanfield.okhub-tech.com/settlement-program/settlement-program-1-awesome-youve-been-using-contact-form-cfdb7-for-more-than-1-week-may-we-ask-you-to-give-it-a-5-star-rating-on-wordpress-ok-you-deserved-it-i-already-did-no-not-good-e-11/image-4/',
        alt: '',
        author: '1',
        description: '',
        caption: '',
        name: 'image-4',
        status: 'inherit',
        uploaded_to: 386,
        date: '2025-01-10 07:03:34',
        modified: '2025-01-10 07:03:34',
        menu_order: 0,
        mime_type: 'image/webp',
        type: 'image',
        subtype: 'webp',
        icon: 'https://cms.icanfield.okhub-tech.com/wp-includes/images/media/default.png',
        width: 784,
        height: 1080,
        sizes: {
          thumbnail:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2-150x150.webp',
          'thumbnail-width': 150,
          'thumbnail-height': 150,
          medium:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2-218x300.webp',
          'medium-width': 218,
          'medium-height': 300,
          medium_large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2-768x1058.webp',
          'medium_large-width': 768,
          'medium_large-height': 1058,
          large:
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2-743x1024.webp',
          'large-width': 743,
          'large-height': 1024,
          '1536x1536':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2.webp',
          '1536x1536-width': 784,
          '1536x1536-height': 1080,
          '2048x2048':
            'https://cms.icanfield.okhub-tech.com/wp-content/uploads/2025/01/image-2.webp',
          '2048x2048-width': 784,
          '2048x2048-height': 1080,
        },
      },
    },
  ],
}
const DetailEB5 = () => {
  return (
    <div className='mx-auto max-w-[100rem] bg-background'>
      <Banner
        title_line_1='DỰ ÁN EB-5'
        title_line_2='Palm Springs Hotel'
        description='Chương trình mở ra cơ hội tuyệt vời cho các nhà đầu tư nước ngoài và gia đình của họ.'
        backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
        className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
        background_pc={{
          ID: 1,
          id: 1,
          title: 'string',
          filename: 'string',
          filesize: 1,
          url: '/imgs/detail-EB5/banner.webp',
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
            {label: 'Home', href: '/'},
            {label: 'Chi tiết dự án EB-5', href: '#'},
          ]}
        />
      </Banner>
      <ProjectOverview {...projectOverviewProps} />
      <CapitalStructure dataCapitalStructure={fakeData} />
      <ProcessSteps {...fakeDataStep} />
      <ProjectLocation {...projectLocationProps} />
      <ProjectInvestorDeveloper {...projectInvestorDeveloperProps} />
    </div>
  )
}
export default DetailEB5
