import ImageV2 from '@/components/image/ImageV2'
import Link from 'next/link'

export type ContactInfoProps = {
  addres: {
    title: string
    description: {
      title: string
      url: string
      target: string
    }
    icon: string
  }
  email: {
    title: string
    description: {
      title: string
      url: string
      target: string
    }
    icon: string
  }
  phone: {
    title: string
    description: {
      title: string
      url: string
      target: string
    }
    icon: string
  }
  urlIFame: string
}

const ContactInfo = ({addres, email, phone, urlIFame}: ContactInfoProps) => {
  return (
    <section className='section-container xsm:mt-[0rem] xsm:bg-background relative z-[11]'>
      <div className='flex justify-between xsm:flex-col xsm:space-y-6'>
        <div
          className='flex h-[8.6875rem] items-start space-x-4 xsm:h-auto'
        >
          <div className='rounded-xl bg-[#A19790]/15 p-5 xsm:p-[0.83331rem]'>
            <ImageV2
              src={addres?.icon}
              alt=''
              width={64}
              height={64}
              className='h-8 w-8 xsm:size-[1.33331rem] object-cover'
            />
          </div>
          <div className='min-w-[15rem] max-w-[30rem] xsm:flex-1'>
            <h3 className='heading6 font-semibold text-greyscaletext-300 xsm:text-base'>
              {addres?.title}
            </h3>
            <Link
              href={addres?.description?.url || "#"}
              target={addres?.description?.target}
              className='mt-1 text-xl font-bold leading-normal text-Phase-1-Brown xsm:text-[1.125rem]'
            >
              {addres?.description?.title}
            </Link>
          </div>
        </div>
        <div
          className='flex h-[8.6875rem] items-start space-x-4 xsm:h-auto'
        >
          <div className='rounded-xl bg-[#A19790]/15 p-5 xsm:p-[0.83331rem]'>
            <ImageV2
              src={email?.icon}
              alt=''
              width={64}
              height={64}
              className='h-8 w-8 xsm:size-[1.33331rem] object-cover'
            />
          </div>
          <div className='min-w-[15rem] max-w-[30rem] xsm:flex-1'>
            <h3 className='heading6 font-semibold text-greyscaletext-300 xsm:text-base'>
              {email?.title}
            </h3>
            <Link
              href={'mailto:' + email?.description?.url || ''}
              target={email?.description?.target}
              className='mt-1 text-xl font-bold leading-normal text-Phase-1-Brown xsm:text-[1.125rem]'
            >
              {email?.description?.title}
            </Link>
          </div>
        </div>
        <div
          className='flex h-[8.6875rem] items-start space-x-4 xsm:h-auto'
        >
          <div className='rounded-xl bg-[#A19790]/15 p-5 xsm:p-[0.83331rem]'>
            <ImageV2
              src={phone?.icon}
              alt=''
              width={64}
              height={64}
              className='h-8 w-8 xsm:size-[1.33331rem] object-cover'
            />
          </div>
          <div className='min-w-[15rem] max-w-[30rem] xsm:flex-1'>
            <h3 className='heading6 font-semibold text-greyscaletext-300 xsm:text-base'>
              {phone?.title}
            </h3>
            <Link
              href={'tel:' + phone?.description?.url || '#'}
              target={phone?.description?.target}
              className='mt-1 text-xl font-bold leading-normal text-Phase-1-Brown xsm:text-[1.125rem]'
            >
              {phone?.description?.title}
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-6 h-[28.125rem] overflow-hidden rounded-xl border border-[#BCBCBC] xsm:mt-8 z-[11] relative'>
        <iframe
          width='100%'
          height='100%'
          src={urlIFame + '&output=embed'}
        ></iframe>
      </div>
    </section>
  )
}
export default ContactInfo
