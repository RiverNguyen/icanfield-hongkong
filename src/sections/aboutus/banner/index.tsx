"use client"
import ImageV2 from "@/components/image/ImageV2";
import { useEffect, useRef, useState } from "react";
import './style.css'
import { cn } from "@/lib/utils";

export default function BannerAboutus() {
    const [activeInterFace, setActiveInterFace] = useState<boolean>(false)
    const ref = useRef<HTMLSelectElement>(null)
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
    return <section ref={ref} className="relative">
        <ImageV2 
            className="w-full h-[100vh] object-cover" 
            alt="" 
            width={1600} 
            height={788} 
            src={'/imgs/about-us/hero_banner.webp'}
        />
        <ImageV2 
            className={cn(activeInterFace && 'active__plane' ,"transition-all w-[24.98719rem] h-[16.69144rem] absolute object-cover top-[15.87rem] left-[12.93rem]")} 
            alt="" 
            width={399} 
            height={267} 
            src={'/imgs/about-us/may_bay.webp'}
        />
        <div className={cn(activeInterFace && 'active__about' ,"transition-all translate-y-[100%] opacity-0 absolute z-10 top-[13.87rem] right-[11.94rem] space-y-[1.5rem]")}>
            <p className="font-optima text-white text-[3.25rem] font-medium leading-[1.2] tracking-[-0.065rem]">Chúng tôi là</p>
            <ImageV2 
                className="w-[33.6875rem] h-[10.35025rem] object-contain"
                alt="" 
                width={539} 
                height={165} 
                src={'/imgs/about-us/d-name-icanfield.png'}
            />
            <h1 className="fixed top-[-100%] opacity-0">Icanfield Việt Nam</h1>
        </div>
        <div className={cn(activeInterFace && 'active__content' ,"transition-all translate-y-[100%] opacity-0 absolute left-[5rem] bottom-[3rem] w-[41.625rem] space-y-[1.19rem]")}>
            <span className="text-brown font-optima text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.09rem]">Tập đoàn Di trú Hàng đầu <br/> Khu vực Châu Á - Thái Bình Dương</span>
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