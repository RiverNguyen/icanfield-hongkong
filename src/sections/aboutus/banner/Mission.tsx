"use client"
import ImageV2 from "@/components/image/ImageV2";
import { cn } from "@/lib/utils";
import CountNumber from "@/sections/homepage/global-immigration/CountNumber";
import { useEffect, useRef, useState } from "react";
import './style.css'
import useIsMobile from "@/hooks/useIsMobile";

export default function Mission() {
    const [activeInterFace, setActiveInterFace] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile();
    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              if (ref.current) {
                  setActiveInterFace(true)
                  observer.disconnect()
                }
            }
          },
          {
            threshold: 0.1,
          },
        )
        if (ref.current) observer.observe(ref.current)
    }, [])
    return <section className="relative h-[100.25rem] xsm:h-[56.375rem]">
        <ImageV2 
            className="w-full h-[82rem] xsm:h-[62.5rem] object-contain xsm:object-cover translate-y-[-16rem] opacity-[0.8]"
            alt="" 
            width={1600} 
            height={1300} 
            src={'/imgs/about-us/BG-sky.png'} 
        />
        <div ref={ref} className="z-20 w-full h-[64.9375rem] xsm:h-[21.4375rem] absolute bottom-0">
            <ImageV2 
                className="object-cover size-full xsm:hidden"
                alt="" 
                width={1600} 
                height={1300} 
                src={'/imgs/about-us/bg-house.png'} 
            />
            <ImageV2 
                className="object-cover size-full sm:hidden"
                alt="" 
                width={1600} 
                height={1300} 
                src={'/imgs/about-us/bg-houseMBv3.webp'} 
            />
        </div>
        <ImageV2 
            className="z-20 w-full h-[24.0625rem] xsm:h-auto object-cover absolute bottom-[-14rem] xsm:bottom-[-4.7rem] left-0"
            alt="" 
            width={1600} 
            height={1300} 
            src={'/imgs/about-us/silk-strip.png'} 
        />
        <div className={cn(activeInterFace ? 'mission__fadein' : "","xsm:w-full transition-all sm:translate-y-[100%] sm:opacity-0 z-10 absolute left-[50%] translate-x-[-50%] bottom-[3.5rem] xsm:px-[1rem] xsm:bottom-[2.5rem]")}>
            <div className="space-y-[0.625rem] xsm:space-y-[0.5rem] flex flex-col items-center mb-[2.5rem]">
                <span className="text-greyscaletext-400 body16 font-semibold xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem]">SỨ MỆNH CỦA ICANFIELD</span>
                <h2 className="text-center w-[55.875rem] xsm:w-full font-optima text-brown text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] xsm:heading1">Dịch chuyển nụ cười, kiến tạo thịnh vượng Đầu tư định cư quốc tế là chìa khoá mở ra điều kỳ diệu cho tương lai.</h2>
            </div>
            <div className="xsm:p-[1.5rem_1rem] flex flex-col items-center justify-start w-[74.75rem] xsm:w-full h-[60rem] xsm:h-[38.5rem] rounded-[2.5rem] opacity-[0.95] bg-[linear-gradient(180deg,rgba(220,157,96,0.92)_-18.75%,rgba(123,87,53,0.50)_54.27%,rgba(255,255,255,0.45)_63.95%)]">
                <p className="sm:mt-[2.44rem] mb-[2rem] w-[49.3125rem] xsm:w-full text-center text-textwhitetest text-[2.25rem] font-semibold leading-[1.2] tracking-[-0.045rem] xsm:heading2">iCanfield – Cam kết mang đến cho bạn giải pháp đầu tư & định cư phù hợp nhất.</p>
                <div className="flex sm:space-x-[6rem] xsm:grid xsm:grid-cols-2 xsm:gap-[2rem]">
                    <div className="flex flex-col items-center">
                        <CountNumber 
                            interFace={!activeInterFace}
                            delay={isMobile ? 0 : 900}
                            number={1520} 
                            suffix="+" 
                            className={{
                                suffixClass:'text-white text-[1.875rem] font-bold',
                                numberClass:'text-white',
                            }}
                            />
                        <div className="w-full h-[0.0625rem] opacity-[0.4] bg-white my-[0.5rem]"></div>
                        <p className="text-white body16-m xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem]">Định cư thành công</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CountNumber 
                            interFace={!activeInterFace}
                            delay={isMobile ? 0 : 900}
                            number={365} 
                            suffix="+" 
                            className={{
                                suffixClass:'text-white text-[1.875rem] font-bold',
                                numberClass:'text-white',
                            }}
                            />
                        <div className="w-full h-[0.0625rem] opacity-[0.4] bg-white my-[0.5rem]"></div>
                        <p className="text-white body16-m">Định cư thành công</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CountNumber 
                            interFace={!activeInterFace}
                            delay={isMobile ? 0 : 900}
                            number={250} 
                            suffix="+" 
                            className={{
                                suffixClass:'text-white text-[1.875rem] font-bold',
                                numberClass:'text-white',
                            }}
                            />
                        <div className="w-full h-[0.0625rem] opacity-[0.4] bg-white my-[0.5rem]"></div>
                        <p className="text-white body16-m">Định cư thành công</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CountNumber 
                            interFace={!activeInterFace}
                            delay={isMobile ? 0 : 900}
                            number={90} 
                            suffix="+" 
                            className={{
                                suffixClass:'text-white text-[1.875rem] font-bold',
                                numberClass:'text-white',
                            }}
                            />
                        <div className="w-full h-[0.0625rem] opacity-[0.4] bg-white my-[0.5rem]"></div>
                        <p className="text-white body16-m">Định cư thành công</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
}