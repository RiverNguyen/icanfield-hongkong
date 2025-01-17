import ImageV2 from '@/components/image/ImageV2'

export type ContactInfoProps = {
  items: {
    title: string
    description: string
    icon: string
  }[]
  urlIFame: string
}

const ContactInfo = ({items, urlIFame}: ContactInfoProps) => {
  return (
    <section className='section-container mt-16 xsm:mt-8'>
      <div className='flex justify-between xsm:flex-col xsm:space-y-6'>
        {items.map((item, index) => (
          <div
            className='flex h-[8.6875rem] items-start space-x-4 xsm:h-auto'
            key={index}
          >
            <div className='rounded-xl bg-[#A19790]/15 p-5'>
              <ImageV2
                src={item.icon}
                alt=''
                width={64}
                height={64}
                className='h-8 w-8 object-cover'
              />
            </div>
            <div className='min-w-[15rem] max-w-[30rem] xsm:flex-1'>
              <h3 className='heading6 font-semibold text-greyscaletext-300 xsm:text-base'>
                {item.title}
              </h3>
              <p className='mt-1 text-xl font-bold leading-normal text-Phase-1-Brown xsm:text-[1.125rem]'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 h-[28.125rem] overflow-hidden rounded-xl border border-[#BCBCBC] xsm:mt-8'>
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
