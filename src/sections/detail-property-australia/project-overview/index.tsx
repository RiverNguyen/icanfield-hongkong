import {useTranslations} from 'next-intl'

const ProjectOverview = ({content}: {content: string}) => {
  const t = useTranslations()
  return (
    <div className='rounded-[1.25rem] bg-white p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-8 xsm:p-0 xsm:shadow-none'>
      <h2 className='font-optima font-medium text-Phase-1-Brown heading3 xsm:text-xl xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
        {t('tong_quan_du_an')}
      </h2>
      <div
        className='mt-[1.88rem] text-[#5C5C5C] xsm:mt-4 xsm:text-[0.875rem] xsm:leading-[1.5] xsm:tracking-[-0.0175rem] [&_img]:my-[2.25rem] [&_img]:rounded-[1rem] [&_img]:object-cover xsm:[&_img]:min-h-[13.9375rem] [&_li]:mt-[0.88rem] [&_p]:mt-[0.88rem] [&_p]:text-[1rem] [&_p]:leading-[1.5] [&_p]:tracking-[-0.02rem] [&_strong]:text-[#121212] [&_ul]:list-inside [&_ul]:list-disc [&_ul_li]:marker:text-[#121212]'
        dangerouslySetInnerHTML={{__html: content || ''}}
      ></div>
    </div>
  )
}
export default ProjectOverview
