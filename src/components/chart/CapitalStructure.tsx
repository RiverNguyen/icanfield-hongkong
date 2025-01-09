"use client"

import { ComponentChart } from "@/components/chart/ComponentChart";
import useInterView from "@/hooks/useInterView";
import { dataAcfChart, datacapitalSource } from "@/types/dataAcfChart.interface";
import { Fragment } from "react";

export default function CapitalStructure({dataCapitalStructure}: {dataCapitalStructure: dataAcfChart}) {
   const {isVisible, elementRef} = useInterView({threshold: 0.1})
   const totalVisitors = dataCapitalStructure?.capital_source?.reduce((sum, item) => sum + item.visitors, 0);
    return (
        <section className="section-container sm:py-[3.62rem]">
            <h2 className="heading1 text-brown sm:mb-[2.5rem] xsm:mb-[1.5rem] xsm:py-[1rem]">{dataCapitalStructure?.title}</h2>
            <div ref={elementRef} className="xsm:flex-col-reverse xsm:flex xsm:items-center relative w-[68.3125rem] xsm:w-full sm:p-[4.5rem_5rem] rounded-[1.5rem] sm:bg-[linear-gradient(90deg,#FFF_57.87%,rgba(255,255,255,0.00)_90.37%)]">
                <div className="xsm:mt-[3.5rem] xsm:w-full xsm:p-[1rem] xsm:bg-white xsm:rounded-[1rem]">
                    <p className="heading3 text-[#254432] mb-[2rem] xsm:mb-[1rem] font-optima xsm:title18M">Tổng nguồn vốn: {totalVisitors?.toLocaleString("vi-VN")} triệu USD, bao gồm:</p>
                    <div className="w-[40rem] xsm:w-full p-[1.5rem] rounded-[1rem] bg-background xsm:rounded-[0.75rem] xsm:p-[1rem]">
                        {dataCapitalStructure?.capital_source?.map((e: datacapitalSource, index: number) => (
                            <Fragment key={index} >
                                <div className="flex xsm:flex-col sm:space-x-[1rem] xsm:space-y-[0.62rem] sm:items-end">
                                    <div className="flex w-[18.75rem] xsm:w-full items-center space-x-[0.75rem]">
                                        <div 
                                            style={{background: `#${e?.fill}`}}
                                            className="p-[0.75rem_1.25rem] xsm:p-[0.5rem_0.75rem] flex-center rounded-[0.5rem]"
                                        >
                                            <p className="sub-28B text-white xsm:text-[1.25rem] tracking-[-0.0125rem]">{(e?.visitors/totalVisitors*100).toFixed(1) + "%"}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="body-14 text-[#333] xsm:sub-12">{e?.browser}</p>
                                            <p className="text-brown sub-20B xsm:body16-b">{e?.visitors} triệu USD</p>
                                        </div>
                                    </div>
                                    <div className="relative sm:flex-1 xsm:w-full h-[0.5rem] xsm:h-[0.25rem] rounded-[0.375rem] bg-[rgba(0,0,0,0.10)]">
                                        <div 
                                            style={{width: `${(isVisible ? e?.visitors/totalVisitors*100 : 1).toFixed(0)}%`, background: `#${e?.fill}` }}
                                            className="h-full z-10 rounded-[0.375rem] transition-all duration-2000 absolute top-0 left-0"
                                        ></div>
                                    </div>
                                </div>
                                <div className="last:hidden my-[1.25rem] xsm:my-[1rem] w-full h-[1px] bg-[rgba(0,0,0,0.10)]"></div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="xsm:w-full sm:absolute sm:right-[-24.69rem] sm:top-[50%] sm:translate-y-[-50%]">
                    <ComponentChart isInterView={isVisible} dataCapitalSource={dataCapitalStructure?.capital_source}/>
                </div>
            </div>
        </section>
    )
}