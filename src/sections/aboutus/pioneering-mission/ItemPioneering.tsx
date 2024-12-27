import ImageV2 from "@/components/image/ImageV2";
import './style.css'

export default function ItemPioneering({index}: {index: number}) {
    return <div
        className="item__pioneering group relative overflow-hidden w-[43.85rem] xsm:w-full h-[25rem] xsm:h-[11.875rem] xsm:rounded-[0.75rem] rounded-[1.5rem] bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.03)] xsm:shadow-[0px_1.938px_4.845px_0px_rgba(0,0,0,0.03)]"
    >
        <ImageV2
            className="xsm:hidden pointer-events-none w-[31rem] h-[25rem] absolute bottom-0 right-0"
            height={400}
            width={496}
            alt=""  
            src={'/imgs/about-us/pioneering-mission/Image-container.png'} 
        />
        <ImageV2
            className="transition-all duration-700 w-[4.0625rem] h-[3.5625rem] absolute left-[2.08rem] top-[1.38rem] z-[9] group-hover:opacity-[0.25] xsm:w-[1.875rem] xsm:h-[1.5rem] xsm:left-[0.88rem] xsm:top-[0.75rem] xsm:opacity-[0.25]"
            height={57}
            width={65}
            alt=""  
            src={'/icons/about-us/pioneering-mission/comma.svg'} 
        />
        <div className="relative z-10 p-[3rem_1rem_2rem_3rem] xsm:p-[1.25rem_0rem_1rem_1.25rem] h-full w-[29.4375rem] xsm:w-[16.25rem] flex flex-col justify-between">
            <div className="[&_p]:sub-24S [&_strong]:sub-24S xsm:[&_p]:text-[0.8125rem] xsm:[&_strong]:text-[0.8125rem] xsm:[&_p]:tracking-[0.00813rem] [&_p]:text-greyscaletext-200 [&_strong]:text-greyscaletext-900 [&_p]:transition-all [&_p]:delay-300 [&_strong]:transition-all [&_strong]:delay-300 group-hover:[&_p]:text-white group-hover:[&_strong]:text-white group-hover:[&_strong]:font-normal xsm:[&_strong]:font-medium xsm:[&_strong]:text-white xsm:[&_p]:text-white xsm:[&_p]:font-medium xsm:[&_p]:leading-[1.5]">
                <p>Chúng tôi đặt khách hàng làm trọng tâm, <strong>đồng hành với sự chân thành</strong> và nỗ lực cao nhất.</p>
            </div>
            <p className="text-brown font-optima text-[2.5rem] font-semibold tracking-[-0.05rem] xsm:heading2 xsm:font-semibold xsm:text-white group-hover:text-white group-hover:font-semibold transition-all duration-700 delay-300">{index + 1}. Tận Tâm</p>
        </div>
        {/* <div className="transition-all duration-700 size-full group-hover:bg-[#D9D9D9] xsm:bg-[#D9D9D9] absolute left-0 top-0 opacity-[0.1] z-[8]"></div> */}
        <ImageV2
            className="transition-all duration-700 size-full absolute left-0 top-0 object-cover clip_path z-[7]"
            height={400}
            width={708}
            alt=""  
            src={'/imgs/about-us/pioneering-mission/d-imgitem.jpg'} 
        />
    </div>
}