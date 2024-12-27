import {IOfficeMapProps} from '@/sections/aboutus/office-map'

const officeMap: IOfficeMapProps = {
  title: 'Văn Phòng iCanfield Luôn Sẵn Sàng Phục Vụ Bạn',
  subtitle: 'KẾT NỐI TOÀN CẦU',
  description:
    'Là thành viên ICCRC với hơn 30 năm kinh nghiệm, ông Stephen đã hỗ trợ thành công 3,600 gia đình định cư Canada. Mạng lưới 1,400 đối tác toàn cầu của ông là lợi thế lớn giúp khách hàng đạt mục tiêu.',
  info: [
    {
      title: 'Quốc gia và vùng lãnh thổ',
      label: '06+',
      icon: {
        src: '/imgs/about-us/office-map/d-flag.svg',
        alt: 'Location',
      },
    },
    {
      title: 'Văn phòng trên toàn cầu',
      label: '06+',
      icon: {
        src: '/imgs/about-us/office-map/d-houseLine.svg',
        alt: 'Phone',
      },
    },
    {
      title: 'Hỗ trợ giải đáp kịp thời mọi thắc mắc',
      label: '24/7',
      icon: {
        src: '/imgs/about-us/office-map/d-time-check.svg',
        alt: 'Phone',
      },
    },
  ],
  countries: [
    [
      {
        name: 'Canada',
        label: 'Canada',
        flag: '/imgs/about-us/office-map/Canada.png',
      },
    ],
    [
      {
        name: 'Australia',
        label: 'ÚC',
        flag: '/imgs/about-us/office-map/Australia.png',
      },
    ],
    [
      {
        name: 'Vietnam',
        label: 'Việt Nam',
        flag: '/imgs/about-us/office-map/vietnam.png',
      },
    ],

    [
      {
        name: 'Caribe',
        label: 'Caribe',
        flag: '/imgs/about-us/office-map/Caribe.png',
      },
    ],
    [
      // Mảng các nước EU
      {
        name: 'Germany',
        label: 'EU',
        flag: '/imgs/homepage/header/eu-flag2.png',
      },
      {
        name: 'France',
      },
      {
        name: 'Italy',
      },
      {
        name: 'Spain',
      },
      {
        name: 'Netherlands',
      },
      {
        name: 'Sweden',
      },
    ],
    [
      {
        name: 'United States of America',
        label: 'Mỹ',
        flag: '/imgs/homepage/header/d-america-flag.jpg',
      },
    ],
  ],
}
export default officeMap
