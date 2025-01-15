'use client'

import IConAdd from '@/components/accordion/IConAdd'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { dataListFAQ } from '@/types/dataAcfImmigration.interface'
import { useEffect, useState } from 'react'

export default function ItemAccordion({listFAQ}: {listFAQ: dataListFAQ[]}) {
    const [open, setOpen] = useState<string>('item-0')
    useEffect(() => {
        setOpen('item-0')
      }, [])
    return (
        <Accordion
            value={open}
            onValueChange={setOpen}
            type="single"
            collapsible
            className="space-y-[2.5rem] xsm:space-y-[1.5rem]"
        >
            {listFAQ && listFAQ?.map((e: dataListFAQ, index: number) => (
                <AccordionItem key={index} value={'item-' + index} className="border-b-0">
                    <AccordionTrigger className="[&_.title-accordion]:data-[state=closed]:text-greyscaletext-body [&_.title-accordion]:data-[state=open]:bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] p-0 [&_svg]:hidden hover:no-underline [&_.iconadd_path]:data-[state=closed]:stroke-[#333333] [&_.path-2]:data-[state=open]:rotate-0">
                        <p className="flex-1 title-accordion body16-s xsm:body-14-s bg-greyscaletext-body background_clip--text">
                            {e?.question}
                        </p>
                        <IConAdd className="iconadd size-[1.25rem] !block object-contain xsm:ml-[1rem]" />
                    </AccordionTrigger>
                    <AccordionContent className="body-14 tracking-[-0.00875rem] mt-[0.75rem] pb-0">
                        <div className="w-full h-[0.0625rem] bg-[#B9B9B9] mb-[0.75rem]"></div>
                        <div
                            dangerouslySetInnerHTML={{__html: e?.reply}}
                            className="[&_p]:body-14 [&_p]:text-[rgba(18,18,18,0.87)]"
                        >
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
