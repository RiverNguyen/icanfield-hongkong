import { ContactInfoProps } from '@/sections/contact/contact-info'

export const contactInfoProps: ContactInfoProps = {
  urlIFame:
    'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed',
  items: [
    {
      title: 'Địa chỉ',
      description:
        'Tầng 12, Tòa nhà President Place 93 Nguyễn Du, P. Bến Nghé, Quận 1, TP.HCM',
      icon: '/icons/contact/house.svg',
    },
    {
      title: 'Email',
      description: 'contact@icanfield.com',
      icon: '/icons/contact/email.svg',
    },
    {
      title: 'Phone',
      description: '028 3822 0285',
      icon: '/icons/contact/phone.svg',
    },
  ],
}
