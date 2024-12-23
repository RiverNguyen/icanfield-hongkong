import {INewsFlowProps} from '@/sections/homepage/news-homepage'

const newFlow: INewsFlowProps = {
  title: 'Điểm hội tụ dòng chảy tin tức',
  taxonomies: [
    {
      title: 'Tin tức mới nhất',
      slug: 'tin-tuc-moi-nhat',
    },
    {
      title: 'Sự kiện',
      slug: 'su-kien',
    },
    {
      title: 'Tin báo chí',
      slug: 'tin-bao-chi',
    },
    {
      title: 'Tin khác',
      slug: 'tin-khac',
    },
  ],
  itemsNews: [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
    },
  ],
  itemsNewsFeatured: [
    {
      title:
        'Khám phá các quốc gia có chính sách định cư tay nghề tốt nhất, cơ hội phát triển sự nghiệp.',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
      articleLogo: {
        src: '/imgs/homepage/news-flow/d-article-logo.webp',
        alt: 'news',
      },
    },
    {
      title:
        'Khám phá các quốc gia có chính sách định cư tay nghề tốt nhất, cơ hội phát triển sự nghiệp.',
      image: {
        src: '/imgs/homepage/news-flow/d-news-featured.webp',
        alt: 'news',
      },
      date: '2021-09-10',
      link: '#',
      articleLogo: {
        src: '/imgs/homepage/news-flow/d-article-logo.webp',
        alt: 'news',
      },
    },
  ],
}

export default newFlow
