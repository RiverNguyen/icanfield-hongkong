import Programs from '@/sections/compare-programs/Programs'

const IndexComparePrograms = () => {
  return (
    <main>
      <section className='mt-[6.44rem] h-fit w-full rounded-[2.5rem_2.5rem_0rem_0rem] bg-[#F6F6F4] section-container xsm:!max-w-full xsm:px-0'>
        <h2 className='text-Phase-1-Brown heading1 xsm:px-[1rem] xsm:font-semibold xsm:tracking-[-0.045rem]'>
          So sánh các chương trình định cư
        </h2>
        <span className='mb-[4rem] mt-[1rem] block font-normal text-greyscaletext-body body16-r55 xsm:mb-[2rem] xsm:mt-[0.75rem] xsm:px-[1rem]'>
          Chọn chương trình và so sánh giữa các chương trình
        </span>
        <Programs />
      </section>
    </main>
  )
}

export default IndexComparePrograms
