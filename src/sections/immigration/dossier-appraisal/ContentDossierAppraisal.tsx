import ButtonBrown from "@/components/button/ButtonBrown";
import ImageV2 from "@/components/image/ImageV2";

export default function ContentDossierAppraisal() {
    return (
        <div className="xsm:px-[1rem] relative z-10 sm:mt-[7.13rem] sm:mr-[11.63rem] space-y-[2.19rem] xsm:space-y-[1.5rem] w-[35.9375rem] xsm:w-full">
            <div className="xsm:mx-auto relative w-[35.37519rem] h-[9.63756rem] xsm:w-[18.125rem] xsm:h-[4.49931rem]">
                <ImageV2 
                    className="size-full object-contain"
                    width={566}
                    height={154}
                    alt="" 
                    src={'/imgs/immigration/immigrationfaq/d-logotext-iCanfield.svg'} 
                />
                <p className="absolute bottom-0 right-0 font-optima text-[1.375rem] xsm:text-[0.702rem] sm:tracking-[0.02806rem] text-brown leadinh-[1.3] tracking-[-0.055rem]">
                    Vươn xa với tương lai bền vững
                </p>
            </div>
            <p className="body-14 text-greyscaletext-800">
                Cùng chúng tôi mở ra cánh cửa đến với những cơ hội định cư và đầu tư quốc tế. Với đội ngũ chuyên gia hàng đầu, iCanfield không chỉ mang đến những giải pháp chiến lược mà còn giúp bạn khám phá những điểm đến lý tưởng và tận dụng tối đa giá trị đầu tư.
            </p>
            <ButtonBrown 
                link="/" 
                title="Thẩm định hồ sơ" 
                className="w-max p-[0.5rem_0.75rem_0.5rem_1.5rem]"
            />
        </div>
    )
}