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
        name: 'China',
        label: 'China',
        flag: '/imgs/about-us/office-map/Australia.png',
      },
    ],
    [
      {
        name: 'Australia',
        label: 'Australia',
        flag: '/imgs/about-us/office-map/Australia.png',
      },
    ],
    [
      {
        name: 'Vietnam',
        label: 'Vietnam',
        flag: '/imgs/about-us/office-map/vietnam.png',
      },
    ],
    [
      {
        name: 'Canada',
        label: 'Canada',
        flag: '/imgs/about-us/office-map/Canada.png',
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
      {
        name: 'Estonia',
        flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Denmark',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Ireland',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Lithuania',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Finland',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'United Kingdom',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Iceland',
        // flag: '/imgs/about-us/office-map/eu.png',
        label: 'EU',
      },
      {
        name: 'Latavia',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Nauy',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
      {
        name: 'Sweden',
        // flag: '/imgs/about-us/office-map/eu.png',
      },
    ],
  ],
}
export default officeMap
