import {ProjectOverviewProps} from '@/sections/detail-property-australia/project-overview'

const info = [
  {
    name: 'Diện tích',
    value: 'Từ 56m2 - 102m2',
    icon: '/imgs/detail-property/area-v2.webp',
  },
  {
    name: 'Giá bán',
    value: 'Từ 584.000 AUD (khoảng 9.8 tỉ đồng)',
    icon: '/imgs/detail-property/price-v2.webp',
  },
  {
    name: 'Chủ đầu tư',
    value: 'Far East Consortium',
    icon: '/imgs/detail-property/investor-v2.webp',
  },
  {
    name: 'Pháp lý',
    value: 'Người Việt Nam sử hữu vĩnh viễn',
    icon: '/imgs/detail-property/legal-v2.webp',
  },
]

export const projectOverviewProps: ProjectOverviewProps = {
  name: 'West Side Place',
  location: '250 Spencer Street, Melbourne, Victoria, Australia',
  product: '1PN - 3PN',
  quantity: {
    title: 'Bao gồm 04 tòa tháp với hơn 2,600 căn hộ đã hoàn thiện',
    items: [
      'Tòa A – 81 tầng: 600 căn hộ & Tòa B – 65 tầng: 520 căn hộ',
      'Tòa The Park Release - 71 tầng: 684 căn hộ & Tòa The Gold Release - 69 tầng: 853 căn hộ',
    ],
  },
  description: [
    'West Side Place là dự án phức hợp cao cấp gồm 4 tòa căn hộ và khách sạn nổi tiếng hàng đầu thế giới Ritz-Carlton. Được mệnh danh là trái tim thành phố Melbourne, West Side Place mang đến nơi sống đẳng cấp với những giá trị xứng tầm cư dân tinh hoa.',
    'Căn hộ cao cấp West Side Place là sự lựa chọn lý tưởng dành cho những khách hàng Việt có con đang sinh sống và học tập tại Melbourne - Úc, cũng như đáp ứng tiêu chí đầu tư dài hạn, tích trữ tài sản của khách hàng muốn sở hữu vĩnh viễn bất động sản tại Úc.',
  ],
  images: [
    '/imgs/detail-property/d-project-1.webp',
    '/imgs/detail-property/d-project-2.webp',
    '/imgs/detail-property/d-project-3.webp',
  ],
  info,
}
