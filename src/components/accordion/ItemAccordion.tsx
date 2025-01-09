'use client'

import IConAdd from '@/components/accordion/IConAdd'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion'
import { useEffect, useState } from 'react'

export default function ItemAccordion() {
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
            {new Array(5).fill(0).map((e, index) => (
                <AccordionItem key={index} value={'item-' + index} className="border-b-0">
                    <AccordionTrigger className="p-0 [&_svg]:hidden hover:no-underline [&_.iconadd_path]:data-[state=closed]:stroke-[#333333] [&_.path-2]:data-[state=open]:rotate-0">
                        <p className="body16-s xsm:body-14-s bg-[linear-gradient(98deg,#95502F_41.26%,#F5C178_97.06%)] background_clip--text">Có những chương trình định cư Canada nào phổ biến?</p>
                        <IConAdd className="iconadd size-[1.25rem] !block object-contain xsm:ml-[1rem]" />
                    </AccordionTrigger>
                    <AccordionContent className="body-14 tracking-[-0.00875rem] mt-[0.75rem] pb-0">
                        <div className="w-full h-[0.0625rem] bg-[#B9B9B9] mb-[0.75rem]"></div>
                        <div className="[&_p]:body-14 [&_p]:text-[rgba(18,18,18,0.87)]">
                            <p>
                                Chương trình Express Entry: Dành cho lao động tay nghề cao.
                                Chương trình Đề cử Tỉnh bang (PNP): Các tỉnh bang đề cử ứng viên dựa trên nhu cầu kinh tế địa phương.
                                Chương trình Định cư diện Đầu tư và Doanh nhân: Dành cho nhà đầu tư, chủ doanh nghiệp.
                                Chương trình Định cư diện Du học: Hỗ trợ sinh viên quốc tế chuyển đổi sang thường trú nhân sau khi học xong.
                                Chương trình Bảo lãnh Gia đình: Cho phép công dân hoặc thường trú nhân Canada bảo lãnh thân nhân sang định cư.
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
