export const filterOptions = [
  {
    label: 'Quốc gia quan tâm',
    key: 'nation',
    icon: '/icons/homepage/banner/filter-nation.svg',
    selected: 'Cannda',
    children: [
      {label: 'Cannda', slug: 'cannda', key: 'nation'},
      {label: 'USA', slug: 'usa', key: 'nation'},
      {label: 'UK', slug: 'uk', key: 'nation'},
      {label: 'France', slug: 'france', key: 'nation'},
      {label: 'Germany', slug: 'germany', key: 'nation'},
      {label: 'Italy', slug: 'italy', key: 'nation'},
      {label: 'Spain', slug: 'spain,key:nation'},
    ],
  },
  {
    label: 'Mục đích đầu tư',
    key: 'investment-purpose',
    icon: '/icons/homepage/banner/filter-widgets.svg',
    selected: 'Có thêm quốc tịch',
    children: [
      {
        label: 'Có thêm quốc tịch',
        slug: 'co-them-quoc-tich',
        key: 'investment-purpose',
      },
      {label: 'Định cư', slug: 'dinh-cu', key: 'investment-purpose'},
      {label: 'Đầu tư', slug: 'dau-tu', key: 'investment-purpose'},
      {label: 'Kinh doanh', slug: 'kinh-doanh', key: 'investment-purpose'},
      {label: 'Du lịch', slug: 'du-lich', key: 'investment-purpose'},
    ],
  },
  {
    label: 'Ngân sách dự kiến',
    key: 'expected-budget',
    icon: '/icons/homepage/banner/filter-budget.svg',
    selected: '500,000 USD',
    children: [
      {label: '500,000 USD', slug: '500k-usd', key: 'expected-budget'},
      {label: '1,000,000 USD', slug: '1m-usd', key: 'expected-budget'},
      {label: '2,000,000 USD', slug: '2m-usd', key: 'expected-budget'},
      {label: '3,000,000 USD', slug: '3m-usd', key: 'expected-budget'},
      {label: '5,000,000 USD', slug: '5m-usd', key: 'expected-budget'},
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
