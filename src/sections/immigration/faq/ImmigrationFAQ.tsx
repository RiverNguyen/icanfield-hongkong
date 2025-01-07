/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemAccordion from "@/components/accordion/ItemAccordion";
import ButtonBrown from "@/components/button/ButtonBrown";
import IConArrow from "@/components/icon/IConArrow";
import ImageV2 from "@/components/image/ImageV2";
import Link from "next/link";

export default function ImmigrationFAQ() {
    return (
        <section className="flex xsm:flex-col sm:items-center section-container pt-[11.25rem] pb-[6rem] xsm:p-[2.5rem_1rem] sm:space-x-[5rem] xsm:space-y-[1.5rem]">
            <div className="relative w-[41.875rem] xsm:w-full sm:h-[37.5rem] rounded-[1.5rem] bg-white shadow-[0px_2px_30px_0px_rgba(224,224,224,0.08)]">
                <ImageV2 
                    className="size-[40.25rem] xsm:size-[19.4375rem] object-contain absolute left-[1.63rem] xsm:left-[1rem] top-0"
                    width={644}
                    height={644}
                    alt="" 
                    src={'/imgs/immigration/immigrationfaq/mask_group.webp'} 
                />
                <div className="relative z-10 p-[2.5rem] xsm:p-[1rem] xsm:pb-0 pb-0 flex items-center space-x-[2.5rem] xsm:space-x-[1.25rem] mb-[3.25rem] xsm:mb-[1.75rem]">
                    <div className="size-[6.25rem] xsm:size-[4.375rem] rounded-[100%] border-[6px] xsm:border-[4.2px] border-solid border-[rgba(0,0,0,0.10)]">
                        <ImageV2 
                            className="size-full rounded-[100%] object-contain"
                            width={100}
                            height={100}
                            alt="" 
                            src={'/imgs/immigration/immigrationfaq/d-image-canada.webp'}  
                        />
                    </div>
                    <div className="space-y-[0.62rem] xsm:space-y-[0.5rem]">
                        <p className="text-brown body16-s tracking-[0] xsm:mb12-s">Định cư dễ dàng cùng</p>
                        <ImageV2 
                            className="w-[15.94838rem] xsm:w-[11.39169rem] xsm:h-[3.5rem] h-[4.9rem] object-contain"
                            width={100}
                            height={100}
                            alt="" 
                            src={'/imgs/immigration/immigrationfaq/d-contact-form-logo.svg'}  
                        />
                    </div>
                </div>
                <div className="relative z-10 p-[0_2.5rem] xsm:p-[0_1rem] mb-[1.81rem] xsm:mb-[1rem]">
                    <div className="p-[1.5rem] xsm:p-[1rem] rounded-[0.75rem] bg-[rgba(246,246,244,0.80)]">
                        <div className="space-y-[0.5rem]">
                            <p className="text-brown heading5 font-optima xsm:body16-m">365+ Gia đình thành công định cư Canada</p>
                            <p className="body16 text-bodytext xsm:body-14">Chúng tôi đã giúp hàng nghìn khách hàng đặt chân đến vùng đất hứa với dịch vụ uy tín và chuyên nghiệp.</p>
                        </div>
                        <div className="my-[1.12rem] w-full h-[0.0625rem] bg-[rgba(0,0,0,0.10)]"></div>
                        <div className="space-y-[0.5rem]">
                            <p className="text-brown heading5 font-optima xsm:body16-m">365+ Gia đình thành công định cư Canada</p>
                            <p className="body16 text-bodytext xsm:body-14">Chúng tôi đã giúp hàng nghìn khách hàng đặt chân đến vùng đất hứa với dịch vụ uy tín và chuyên nghiệp.</p>
                        </div>
                    </div>
                </div>
                <div className="xsm:space-y-[0.5rem] relative z-10 flex xsm:flex-col sm:items-center sm:justify-between p-[1.75rem_2.5rem_2.5rem_2.5rem] xsm:p-[1rem] border-t-[1px] border-solid border-[rgba(0,0,0,0.10)]">
                    <p className="w-[18.875rem] xsm:w-full sub-14 tracking-[-0.00875rem] font-medium text-greyscaletext-600 xsm:sub-12-m">Hãy để chúng tôi giúp bạn biến giấc mơ Canada thành hiện thực.</p>
                    <ButtonBrown
                        link="/" 
                        title="Xem chi tiết" 
                    />
                </div>
            </div>
            <div className="flex-1 xsm:py-[1.5rem]">
                <h2 className="text-brown heading1 mb-[2.5rem] xsm:mb-[1.5rem] font-optima">Giải đáp các thắc mắc cho bạn</h2>
                <ItemAccordion />
            </div>
        </section>
    )
}