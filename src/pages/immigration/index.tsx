import BannerImmigration from '@/sections/immigration/banner/BannerImmigration'
import DossierAppraisal from '@/sections/immigration/dossier-appraisal/DossierAppraisal'
import ImmigrationFAQ from '@/sections/immigration/faq/ImmigrationFAQ'
import Programme from '@/sections/immigration/programme/Programme'
import Strengths from '@/sections/immigration/strengths/Strengths'

const fakedataStrengths = [
  {
    title: 'giáo dục và đào tạo',
    label: 'chất lượng hàng đầu',
    decscript:
      'Canada nổi tiếng toàn cầu với các trường đại học danh giá và chương trình đào tạo chất lượng cao, tạo nền tảng vững chắc cho sự nghiệp và tương lai của người học. Bằng cấp được công nhận quốc tế.',
    img_bg: {
      url: '/imgs/immigration/strengths/d-bg1.webp',
      alt: '',
    },
    img_icon: {
      url: '/icons/immigration/strengths/d-icon.svg',
      alt: '',
    },
  },
  {
    title: 'Phúc lợi xã hội và y tế',
    label: 'tiên tiến và phát triển bậc nhất',
    decscript:
      'Canada nổi tiếng toàn cầu với các trường đại học danh giá và chương trình đào tạo chất lượng cao, tạo nền tảng vững chắc cho sự nghiệp và tương lai của người học. Bằng cấp được công nhận quốc tế.',
    img_bg: {
      url: '/imgs/immigration/strengths/d-bg2.webp',
      alt: '',
    },
    img_icon: {
      url: '/icons/immigration/strengths/d-icon.svg',
      alt: '',
    },
  },
  {
    title: 'cơ hội việc làm - đầu tư',
    label: 'nhiều cơ hội thăng tiến',
    decscript:
      'Thị trường lao động Canada rộng mở với nhiều ngành nghề hấp dẫn và cơ hội phát triển. Chính phủ khuyến khích đầu tư và khởi nghiệp, tạo điều kiện thuận lợi cho người nhập cư.',
    img_bg: {
      url: '/imgs/immigration/strengths/d-bg1.webp',
      alt: '',
    },
    img_icon: {
      url: '/icons/immigration/strengths/d-icon.svg',
      alt: '',
    },
  },
  {
    title: 'Chính trị và xã hội',
    label: 'ổn định và an toàn',
    decscript:
      'Canada có nền chính trị ổn định, xã hội an toàn và thân thiện. Chỉ số an toàn và hạnh phúc ở mức cao, mang đến cuộc sống bình yên cho người dân và người nhập cư.',
    img_bg: {
      url: '/imgs/immigration/strengths/d-bg2.webp',
      alt: '',
    },
    img_icon: {
      url: '/icons/immigration/strengths/d-icon.svg',
      alt: '',
    },
  },
  {
    title: 'Thiên nhiên - môi trường',
    label: 'tuyệt đẹp và trong lành',
    decscript:
      'Canada sở hữu nhiều cảnh quan thiên nhiên hùng vĩ và đa dạng, môi trường sống trong lành và chất lượng không khí tốt, lý tưởng cho cuộc sống tuowng lai và nghỉ dưỡng.',
    img_bg: {
      url: '/imgs/immigration/strengths/d-bg1.webp',
      alt: '',
    },
    img_icon: {
      url: '/icons/immigration/strengths/d-icon.svg',
      alt: '',
    },
  },
]
export default function Immigration() {
  return (
    <main className='bg-background'>
      <BannerImmigration />
      <Strengths dataStrength={fakedataStrengths} />
      <Programme />
      <ImmigrationFAQ />
      <DossierAppraisal />
      {/* <RelatedArticles /> */}
    </main>
  )
}
