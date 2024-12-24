"use client"
import ImageV2 from "@/components/image/ImageV2";
import { useEffect, useRef, useState } from "react";
import './style.css'
import { cn } from "@/lib/utils";
import ImageBanner from "@/sections/aboutus/banner/ImageBanner";
import useIsMobile from "@/hooks/useIsMobile";
import ImageBannerMb from "@/sections/aboutus/banner/ImageBannerMb";

export default function BannerAboutus() {
    const [activeInterFace, setActiveInterFace] = useState<boolean>(false)
    const ref = useRef<HTMLSelectElement>(null)
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
    return <section ref={ref} className="relative w-full h-[100vh] overflow-hidden z-10">
        {isMobile ? 
            <ImageBannerMb className="w-full h-[100vh]" />
        : 
            <ImageBanner className="w-full h-[100vh] scale-[1.025]" />
        }
        <ImageV2 
            className={cn(activeInterFace && 'active__plane' ,"transition-all w-[24.98719rem] h-[16.69144rem] absolute object-cover top-[15.87rem] left-[12.93rem] xsm:w-[10.14275rem] xsm:h-[6.31106rem] xsm:top-[21.31rem] xsm:left-[-0.29rem] xsm:rotate-[-5.462deg]")} 
            alt="" 
            width={399} 
            height={267} 
            src={'/imgs/about-us/may_bay.webp'}
        />
        <div className={cn(activeInterFace && 'active__about' ,"transition-all sm:translate-y-[100%] sm:opacity-0 absolute z-10 top-[13.87rem] sm:right-[11.94rem] xsm:top-[4.44rem] xsm:left-[50%] xsm:translate-x-[-50%] space-y-[1.5rem] xsm:space-y-[1rem] xsm:w-[18.25rem]")}>
            <p className="font-optima text-white text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem] xsm:text-[1.75rem] xsm:font-semibold xsm:tracking-[-0.035rem]">Chúng tôi là</p>
            <ImageV2 
                className="w-[33.6875rem] h-[10.35025rem] xsm:w-[18.25rem] xsm:h-[5.60719rem] object-contain"
                alt="" 
                width={539} 
                height={165} 
                src={'/imgs/about-us/d-name-icanfield.png'}
            />
            <h1 className="fixed top-[-100%] opacity-0">Icanfield Việt Nam</h1>
        </div>
        <div className={cn(activeInterFace && 'active__content' ,"transition-all sm:translate-y-[100%] sm:opacity-0 absolute left-[5rem] bottom-[3rem] w-[41.625rem] space-y-[1.19rem] xsm:bottom-0 xsm:left-[50%] xsm:translate-x-[-50%] xsm:p-[2.5rem_1rem] xsm:w-full xsm:space-y-[1rem]")}>
            <span className="text-brown font-optima text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.09rem] xsm:text-[1.25rem] xsm:tracking-[-0.025rem] xsm:leading-[1.2]">Tập đoàn Di trú Hàng đầu <br/> Khu vực Châu Á - Thái Bình Dương</span>
            <div className="text-greyscaletext-800 body-14 tracking-[-0.00875rem]">
                <p>
                    Là thành viên của iCanfield Group, iCanfield Vietnam tự hào cung cấp dịch vụ tư vấn đầu tư quốc tế và định cư toàn cầu theo mô hình One-Stop Shop.
                    <br/>
                    Chúng tôi đồng hành cùng các nhà đầu tư Việt Nam, giúp tối ưu hóa thời gian và chi phí, đồng thời mang lại hiệu quả đầu tư vượt trội. Chúng tôi đồng hành cùng các nhà đầu tư Việt Nam, giúp tối ưu hóa thời gian và chi phí, đồng thời mang lại hiệu quả đầu tư vượt trội. 
                </p>
            </div>
        </div>
    </section>
}