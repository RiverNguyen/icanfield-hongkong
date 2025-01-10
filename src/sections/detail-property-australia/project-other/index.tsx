import ImageV2 from '@/components/image/ImageV2'

const ProjectOther = () => {
  return (
    <section className='section-container mt-[6.25rem] xsm:mt-8'>
      <div className='flex w-full items-end justify-between'>
        <h1 className='heading1 font-optima font-semibold tracking-[-0.045rem] text-orangetext-900 xsm:text-2xl xsm:leading-[1.2]'>
          Các dự án khác
        </h1>
        <button className='flex h-[3rem] items-center justify-center rounded-[0.5rem] bg-btn-gradient px-[0.75rem] pl-[1.5rem] xsm:hidden'>
          <span className='body14 font-medium -tracking-[0.0175rem] text-white'>
            Xem tất cả
          </span>
          <ImageV2
            src='/icons/arrow-right.svg'
            width={50}
            height={50}
            alt=''
            className='ml-2 h-6 w-6 object-cover'
          />
        </button>
      </div>
      <div className='mt-8'>{/* other project */}</div>
    </section>
  )
}
export default ProjectOther
