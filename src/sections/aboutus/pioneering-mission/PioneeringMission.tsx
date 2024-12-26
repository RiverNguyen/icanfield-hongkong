import ImageV2 from "@/components/image/ImageV2";
import ItemPioneering from "@/sections/aboutus/pioneering-mission/ItemPioneering";

export default function PioneeringMission() {
    return <section className="w-full pt-[5rem] bg-background">
        <div className="sm:sticky sm:top-[100vh] w-full xsm:relative">
            <ImageV2 
                className="xsm:hidden w-full h-[100vh] absolute sm:top-[-100vh] xsm:top-0 left-0"
                width={1600} 
                height={788} 
                alt="" 
                src={'/imgs/about-us/pioneering-mission/bg-pioneering-mission.webp'} 
            />
            <ImageV2 
                className="w-full h-[25rem] absolute top-0 left-0 sm:hidden"
                width={1600} 
                height={788} 
                alt="" 
                src={'/imgs/about-us/pioneering-mission/bg-pioneering-missionMB.png'} 
            />
        </div>
        <div className="flex xsm:flex-col-reverse">
            <div className="p-[6.5rem_4rem_2.5rem_5rem] xsm:p-[2.5rem_1rem] space-y-[1.5rem]">
                {new Array(5).fill(0).map((e, index) => (
                    <ItemPioneering key={index} index={index} />
                ))}
            </div>
            <div className="xsm:hidden sticky top-0 xsm:top-[3.75rem] flex-1 p-[6.5rem_7.5rem_6.5rem_3.5rem] xsm:p-[4rem_1rem_1.5rem_1rem] h-[43.75rem] space-y-[2rem]">
                <h2 className="heading1 text-brown font-semibold">Sứ Mệnh Tiên Phong <br/> Giá Trị Dẫn Lối Thành Công</h2>
                <div className="[&_p]:text-greyscaletext-400 [&_p]:body16 [&_p]:tracking-[-0.02rem] space-y-[0.75rem]">
                    <p>
                        Tại iCanfield, chúng tôi tin rằng mỗi hành trình vươn tầm quốc tế đều bắt đầu từ sự tận tâm và tầm nhìn chiến lược. Với hơn 10 năm kinh nghiệm, sứ mệnh của chúng tôi là đồng hành cùng bạn hiện thực hóa giấc mơ toàn cầu bằng những giải pháp đầu tư, định cư và du học ưu việt nhất.
                    </p>
                    <p>
                        Không chỉ là đối tác đáng tin cậy, iCanfield cam kết mang lại giá trị bền vững và trải nghiệm vượt mong đợi, giúp bạn xây dựng một tương lai thịnh vượng, an toàn và hạnh phúc.
                    </p>
                </div>
            </div>
            <div className="sm:hidden px-[1rem] [&_p]:text-greyscaletext-body [&_p]:body-14 [&_p]:tracking-[-0.00875rem] space-y-[1rem]">
                <p>
                    Tại iCanfield, chúng tôi tin rằng mỗi hành trình vươn tầm quốc tế đều bắt đầu từ sự tận tâm và tầm nhìn chiến lược. Với hơn 10 năm kinh nghiệm, sứ mệnh của chúng tôi là đồng hành cùng bạn hiện thực hóa giấc mơ toàn cầu bằng những giải pháp đầu tư, định cư và du học ưu việt nhất.
                </p>
                <p>
                    Không chỉ là đối tác đáng tin cậy, iCanfield cam kết mang lại giá trị bền vững và trải nghiệm vượt mong đợi, giúp bạn xây dựng một tương lai thịnh vượng, an toàn và hạnh phúc.
                </p>
            </div>
            <div className="sm:hidden bg-background z-10 sticky top-0 xsm:top-[3.75rem] flex-1 p-[6.5rem_7.5rem_6.5rem_3.5rem] xsm:p-[1rem_1rem_1.5rem_1rem]">
                <h2 className="heading1 text-brown">Sứ Mệnh Tiên Phong <br/> Giá Trị Dẫn Lối Thành Công</h2>
            </div>
        </div>
    </section>
}
