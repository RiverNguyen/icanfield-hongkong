import ImageV2 from '@/components/image/ImageV2'
import FormConnect from '@/sections/homepage/form-homepage/FormConnect'

const FormHomepage = () => {
  return (
    <section className='flex h-[100vh] xsm:h-max relative bg-[linear-gradient(180deg,#F6F6F4_0%,#FAF8F1_100%)]'>
      <div className='relative w-[57rem] h-full xsm:hidden'>
        <ImageV2
          alt=''
          width={912}
          height={825}
          src={'/imgs/homepage/section-ketnoi/banner-formlh.webp'}
          className='xsm:hidden absolute bottom-[-10rem] w-[57rem] h-[51.5625rem] object-cover'
        />
      </div>
      <ImageV2
        alt=''
        width={912}
        height={825}
        src={'/imgs/homepage/section-ketnoi/bg-sectionform.webp'}
        className='xsm:hidden absolute right-0 bottom-0 h-[44rem] w-[81.5rem] object-cover'
      />
      <FormConnect />
    </section>
  )
}

export default FormHomepage
