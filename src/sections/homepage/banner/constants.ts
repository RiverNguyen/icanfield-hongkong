export const filterOptions = [
  {
    label: 'Quốc gia quan tâm',
    key: 'nation',
    icon: '/icons/homepage/banner/filter-nation.svg',
    selected: 'Cannda',
    children: [
      {label: 'Cannda', slug: 'cannda'},
      {label: 'USA', slug: 'usa'},
      {label: 'UK', slug: 'uk'},
      {label: 'France', slug: 'france'},
      {label: 'Germany', slug: 'germany'},
      {label: 'Italy', slug: 'italy'},
      {label: 'Spain', slug: 'spain'},
    ],
  },
  {
    label: 'Mục đích đầu tư',
    key: 'purpose',
    icon: '/icons/homepage/banner/filter-widgets.svg',
    selected: 'Có thêm quốc tịch',
    children: [
      {label: 'Có thêm quốc tịch', slug: 'co-them-quoc-tich'},
      {label: 'Định cư', slug: 'dinh-cu'},
      {label: 'Đầu tư', slug: 'dau-tu'},
      {label: 'Kinh doanh', slug: 'kinh-doanh'},
      {label: 'Du lịch', slug: 'du-lich'},
    ],
  },
  {
    label: 'Ngân sách dự kiến',
    key: 'budget',
    icon: '/icons/homepage/banner/filter-budget.svg',
    selected: '500,000 USD',
    children: [
      {label: '500,000 USD', slug: '500k-usd'},
      {label: '1,000,000 USD', slug: '1m-usd'},
      {label: '2,000,000 USD', slug: '2m-usd'},
      {label: '3,000,000 USD', slug: '3m-usd'},
      {label: '5,000,000 USD', slug: '5m-usd'},
    ],
  },
]
export const dataVideo = {
  url: '/videos/homepage/banner/banner.mp4',
  type: 'upload',
}
export const bannerDataImage = [
  '/imgs/homepage/banner/d-slide1.jpg',
  '/imgs/homepage/banner/d-slide2.jpg',
  '/imgs/homepage/banner/d-slide3.jpg',
]
