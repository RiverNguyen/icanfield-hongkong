import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/sections/detail-property-australia/project-location/accordion'
import { IDataAcfDetailAustralia } from '@/types/dataAcfDetailAustralia.interface'
import { useTranslations } from 'next-intl'

const ProjectLocation = ({
	accordions,
	description,
	iframe_google_map,
}: IDataAcfDetailAustralia['acf']['location']) => {
	const t = useTranslations('')
	return (
		<div className='space-y-8 rounded-[1.25rem] bg-white p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] xsm:space-y-6 xsm:p-0 xsm:shadow-none'>
			<div className='space-y-5 xsm:space-y-6'>
				<h2 className='font-optima font-medium text-Phase-1-Brown heading3 xsm:text-xl xsm:font-semibold xsm:leading-[1.3] xsm:tracking-[-0.025rem]'>
					{t('vi_tri_du_an')}
				</h2>
				<p className='text-greyscaletext-400 body16-r55 xsm:body-14'>
					{description}
				</p>
			</div>
			<div
				className='h-[27.875rem] w-full overflow-hidden rounded-2xl xsm:h-[28.125rem] xsm:rounded-xl xsm:border xsm:border-[#BCBCBC] [&>iframe]:h-full [&>iframe]:w-full'
				dangerouslySetInnerHTML={{ __html: iframe_google_map || '' }}
			></div>
			<div className='rounded-2xl bg-[#FAFAFA] px-7 py-8 xsm:px-5 xsm:py-4'>
				<Accordion
					type='single'
					collapsible
					className='w-full space-y-10 xsm:space-y-[1.875rem]'
				>
					{Array.isArray(accordions) &&
						accordions.map((accordion, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
							>
								<AccordionTrigger className='bg-greyscaletext-body bg-clip-text text-transparent body16-s xsm:body-14-s [&[data-state=open]]:bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)]'>
									{accordion.title}
								</AccordionTrigger>
								<AccordionContent>{accordion.content}</AccordionContent>
							</AccordionItem>
						))}
				</Accordion>
			</div>
		</div>
	)
}

export default ProjectLocation
