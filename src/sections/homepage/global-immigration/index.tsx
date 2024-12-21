import ImageV2 from "@/components/image/ImageV2";
import CountNumber from "@/sections/homepage/global-immigration/CountNumber";

const GlobalImmigration = () => {
    return (
        <section className="h-[80.75rem] relative">
            <div className="xsm:hidden">
                <ImageV2 
                    className="xsm:hidden z-50 w-full h-[69.375rem] object-cover absolute bottom-[5.75rem] left-0" 
                    src={'/imgs/homepage/globalImmigration/bg-aboutus.png'} 
                    alt="" 
                    width={1600} 
                    height={1110} 
                />
                <ImageV2 
                    className="xsm:hidden z-[9] w-[49.179rem] h-[48.78456rem] object-cover absolute top-[-2.16rem] left-[-11rem]" 
                    src={'/imgs/homepage/globalImmigration/bg-house.webp'} 
                    alt="" 
                    width={786} 
                    height={780} 
                />
                <ImageV2 
                    className="xsm:hidden z-10 w-[31.3125rem] h-[42.625rem] object-cover absolute top-[9.62rem] left-[6.31rem]" 
                    src={'/imgs/homepage/globalImmigration/statue.webp'} 
                    alt="" 
                    width={501} 
                    height={682} 
                />
                <ImageV2 
                    className="xsm:hidden z-[9] w-[45.83781rem] h-[45.83781rem] object-cover absolute top-[18.15rem] left-[16.11rem]" 
                    src={'/imgs/homepage/globalImmigration/bridge.webp'} 
                    alt="" 
                    width={733} 
                    height={733} 
                />
                <ImageV2 
                    className="xsm:hidden z-[51] w-[25.16263rem] h-[30.9725rem] object-cover absolute top-[30.69rem] right-[12.37rem]" 
                    src={'/imgs/homepage/globalImmigration/familyv2.webp'} 
                    alt="" 
                    width={378} 
                    height={534} 
                />
                <ImageV2 
                    className="xsm:hidden w-full h-[55.6875rem] object-cover absolute top-0 left-0"
                    src={'/imgs/homepage/globalImmigration/bg-city.png'}
                    alt=""
                    width={1600}
                    height={700}
                />
                {/* <div className="xsm:hidden absolute w-full h-[55.6875rem] opacity-[0.5] top-0 left-0 bg-[linear-gradient(0deg,rgba(92,50,30,0.10)_0%,#5C321E_100%)]"></div> */}
            </div>
            <div className="sm:absolute z-[55] sm:top-[5rem] sm:right-[6.37rem] xsm:w-full xsm:px-[1rem] xsm:pt-[2.5rem]">
                <h2 className="mb-[1rem] xsm:mb-[0.75rem] w-[39.1875rem] xsm:w-full text-brown font-optima heading1 font-semibold xsm:tracking-[-0.045rem]">ICanfield tiên phong kiến tạo lộ trình định cư toàn cầu</h2>
                <p className="w-[33.0625rem] xsm:w-full body16 xsm:body-14 text-greyscaletext-body">Với 12+ năm kinh nghiệm, iCanfield tự hào là cầu nối giúp hàng nghìn gia đình hiện thực hóa giấc mơ định cư nước ngoài</p>
                <div className="mt-[3rem] xsm:mt-[2.5rem] grid grid-cols-2 gap-[2.5rem] xsm:gap-[1.5rem]">
                    <div>
                        <div className="flex space-x-[0.69rem] xsm:space-x-[0.39rem] items-end">
                            <CountNumber number={12} suffix="+"/>
                            <p className="uppercase sub-12 leading-[1.4] tracking-[-0.0075rem] font-semibold text-brown xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]">NĂM <br/> kinh nghiệm</p>
                        </div>
                        <div className="w-full h-[0.0625rem] xsm:h-[0.03456rem] opacity-[0.1] bg-black my-[0.5rem]"></div>
                        <p className="text-greyscaletext-400 body16-m xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem]">Tư vấn Đầu tư định cư Quốc tế</p>
                    </div>
                    <div>
                        <div className="flex space-x-[0.69rem] xsm:space-x-[0.39rem] items-end">
                            <CountNumber number={2100} suffix="+"/>
                            <p className="uppercase sub-12 leading-[1.4] tracking-[-0.0075rem] font-semibold text-brown xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]">HỒ SƠ <br/> khách hàng</p>
                        </div>
                        <div className="w-full h-[0.0625rem] xsm:h-[0.03456rem] opacity-[0.1] bg-black my-[0.5rem]"></div>
                        <p className="text-greyscaletext-400 body16-m xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem]">Đầu tư, định cư và du học thành công</p>
                    </div>
                    <div>
                        <div className="flex space-x-[0.69rem] xsm:space-x-[0.39rem] items-end">
                            <CountNumber number={25} suffix="+"/>
                            <p className="uppercase sub-12 leading-[1.4] tracking-[-0.0075rem] font-semibold text-brown xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]">NĂM <br/> kinh nghiệm</p>
                        </div>
                        <div className="w-full h-[0.0625rem] xsm:h-[0.03456rem] opacity-[0.1] bg-black my-[0.5rem]"></div>
                        <p className="text-greyscaletext-400 body16-m xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem]">Đội ngũ cộng sự luật sư</p>
                    </div>
                    <div>
                        <div className="flex space-x-[0.69rem] xsm:space-x-[0.39rem] items-end">
                            <CountNumber number={12} suffix="+"/>
                            <p className="uppercase sub-12 leading-[1.4] tracking-[-0.0075rem] font-semibold text-brown xsm:text-[0.5625rem] xsm:tracking-[0.00563rem]">Dự án <br/> đầu tư</p>
                        </div>
                        <div className="w-full h-[0.0625rem] xsm:h-[0.03456rem] opacity-[0.1] bg-black my-[0.5rem]"></div>
                        <p className="text-greyscaletext-400 body16-m xsm:sub-12 xsm:font-medium xsm:tracking-[-0.015rem]">Thành công và sinh lời cao</p>
                    </div>
                </div>
            </div>
            <div className="sm:hidden mt-[0.875rem]">
                <ImageV2 
                    className="w-full h-[27.8125rem] object-cover sm:hidden"
                    src={'/imgs/homepage/globalImmigration/bg-mb.png'} 
                    alt=""
                    height={445}
                    width={345}
                />
            </div>
        </section>
    );
};

export default GlobalImmigration;