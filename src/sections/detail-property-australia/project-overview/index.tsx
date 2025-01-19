const ProjectOverview = ({content}: {content: string}) => {
  return (
    <div className='rounded-[1.25rem] bg-white p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-8 xsm:p-0 xsm:shadow-none'>
      <h2 className='font-optima font-medium text-Phase-1-Brown heading3 xsm:text-xl xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
        Tổng quan dự án
      </h2>
      <div
      className='mt-[1.88rem] [&_p]:text-[1rem] [&_p]:leading-[1.5] [&_img]:rounded-[1rem] xsm:[&_img]:min-h-[13.9375rem] [&_img]:object-cover [&_strong]:text-[#121212] [&_ul_li]:marker:text-[#121212] [&_ul]:list-disc [&_ul]:list-inside [&_p]:tracking-[-0.02rem] [&_p]:mt-[0.88rem] [&_li]:mt-[0.88rem] text-[#5C5C5C] xsm:mt-4 xsm:text-[0.875rem] xsm:leading-[1.5] xsm:tracking-[-0.0175rem] '
        dangerouslySetInnerHTML={{__html: content}}
      ></div>
    </div>
  )
}
export default ProjectOverview
