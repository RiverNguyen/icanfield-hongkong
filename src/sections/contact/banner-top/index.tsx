import {Breadcrumb} from '@/components/breadcrumb'
import ImageV2 from '@/components/image/ImageV2'

export type BannerTopProps = {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
}

const BannerTop = ({title, description, image}: BannerTopProps) => {
  return (
    <div className='relative h-[100vh] w-full overflow-hidden xsm:h-[25rem] xsm:rounded-b-[1.25rem]'>
      <ImageV2
        width={3000}
        height={2000}
        src={image?.url}
        alt={image?.alt}
        className='absolute inset-0 h-full w-full object-center'
      />
      <div className='absolute inset-0 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_24.02%,rgba(0,0,0,0.00)_86.12%)] xsm:bg-[linear-gradient(26deg,rgba(0,0,0,0.70)_-19.37%,rgba(0,0,0,0.00)_128.25%)]' />
      <div className='relative z-10 mt-[6.4375rem]'>
        <div className='px-20 pt-6 xsm:hidden'>
          <Breadcrumb
            items={[
              {label: 'Trang chủ', href: '/'},
              {label: 'Liên hệ', href: '/contact'},
            ]}
          />
        </div>
        <div className='mt-[4.5rem] px-20 xsm:mt-16 xsm:px-4'>
          <h1 className='font-optima text-[5rem] font-medium uppercase leading-[1.2] tracking-[-0.1rem] text-white xsm:text-[2.375rem] xsm:tracking-[-0.0475rem]'>
            {title}
          </h1>
          <p className='mt-1 font-optima text-[3.25rem] font-medium capitalize leading-[1.2] tracking-[-0.065rem] text-white xsm:text-[1.625rem] xsm:leading-[1.3] xsm:tracking-[-0.0325rem]'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
export default BannerTop
