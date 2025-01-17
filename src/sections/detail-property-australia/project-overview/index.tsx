const ProjectOverview = ({content}: {content: string}) => {
  return (
    <div className='rounded-[1.25rem] bg-white p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-8 xsm:p-0 xsm:shadow-none'>
      <h2 className='font-optima font-medium text-Phase-1-Brown heading3 xsm:text-xl xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
        Tổng quan dự án
      </h2>
      <div
        className='mt-[1.88rem]'
        dangerouslySetInnerHTML={{__html: content}}
      ></div>
    </div>
  )
}
export default ProjectOverview
