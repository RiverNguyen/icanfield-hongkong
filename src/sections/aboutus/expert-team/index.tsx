"use client";
import { FC, useState } from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import { cn } from "@/lib/utils";
import ItemExpertTeam from "@/sections/aboutus/expert-team/ItemExpertTeam";
import ImageV2 from "@/components/image/ImageV2";
import ItemSliderMb from "@/sections/aboutus/expert-team/ItemSliderMb";
import PopupSliderMb from "@/sections/aboutus/expert-team/PopupSliderMb";
import useIsMobile from "@/hooks/useIsMobile";

interface IExpertTeamProps {
  name: string;
  position: string;
  srcimage: string;
  content: string;
}
interface IExpertTeamSwiper {
  realIndex: number;
  slides: {};
}
const fakedata = [
  {
    name: "Mr. jimmy1",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human-2.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
  {
    name: "Mr. jimmy2",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
  {
    name: "Mr. jimmy3",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human-2.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
  {
    name: "Mr. jimmy4",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human-2.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
  {
    name: "Mr. jimmy5",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
  {
    name: "Mr. jimmy6",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
  {
    name: "Mr. jimmy7",
    position: "Giám Đốc Điều Hành iCanfield Vietnam",
    srcimage: "/imgs/about-us/expert-team/human-2.webp",
    content:
      "Mr. Jimmy là Giám đốc Điều hành (CEO) của iCanfield Vietnam, với hơn 12 năm kinh nghiệm trong lĩnh vực tư vấn đầu tư, hoạch định tài chính và tư vấn di trú. Mr. Jimmy đã tốt nghiệp chuyên ngành Tài chính Đầu tư tại Đại học UTS, Australia (University of Technology, Sydney), và đã sinh sống, học tập và làm việc tại Úc hơn 7 năm trước khi trở về Việt Nam. Sau khi về nước, Mr. Jimmy đã bắt đầu tham gia các công việc về quản lý dự án và phát triển các dự án bất động sản trong nước và quốc tế. Bên cạnh đó, Mr. Jimmy cũng đảm nhận vai trò phát triển các sản phẩm đầu tư và định cư, xây dựng mối quan hệ sâu rộng với các luật sư và chủ đầu tư lớn trên thế giới. Với hơn 12 năm kinh nghiệm trong lĩnh vực di trú và định cư, Mr. Jimmy đã trực tiếp tư vấn cho hàng trăm nhà đầu tư và xử lý thành công 100% các hồ sơ đầu tư và định cư của khách hàng. Mr. Jimmy cam kết cung cấp các giải pháp toàn diện về di trú, giúp khách hàng không chỉ tối ưu hóa tài chính mà còn thực hiện thành công các kế hoạch định cư tại các quốc gia phát triển. Sự cam kết và kinh nghiệm của Mr. Jimmy đảm bảo mọi hồ sơ và nhu cầu của khách hàng đều được giải quyết nhanh chóng và hiệu quả, mang lại sự an tâm cho những người có kế hoạch xây dựng một tương lai toàn cầu.    ",
  },
];

export const ExpertTeam: FC<IExpertTeamProps> = ({}) => {
  const isMobile = useIsMobile();
  const [toggleMB, setToggleMB] = useState<boolean>(false);
  const [idActivePopupMB, setIdActivePopupMB] = useState<number>(0);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(1);
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
    const nextSlideIndex = (swiper.realIndex + 1) % swiper.slides.length;
    setNextIndex(nextSlideIndex);
  };
  return (
    <section className="relative pt-[5rem] pl-[5rem] pb-[10.75rem] xsm:pt-[4rem] xsm:pl-0 bg-[linear-gradient(180deg,rgba(255,244,228,0.50)_0%,rgba(249,245,240,0.80)_16.83%,#F6F6F4_50.9%)]">
      <h2 className="text-brown font-optima heading1 font-medium w-[44.3125rem] xsm:w-full xsm:px-[1rem] xsm:mb-[1.5rem]">
        Đội Ngũ Chuyên Gia Tinh Hoa Kiến Tạo Hành Trình Thành Công
      </h2>
      {!isMobile ? (
        <>
          <div className="absolute w-[61.5125rem] h-[42.87169rem] right-0 top-0">
            <ImageV2
              className="size-full object-cover"
              alt=""
              width={1053}
              height={685}
              src={"/imgs/about-us/expert-team/backgroud-team.webp"}
            />
          </div>
          <div id="expert-team" className="flex flex-col relative mt-[1.06rem]">
            <div className="overflow-hidden absolute left-0 top-[5.69rem] w-[36.625rem] h-[28rem] rounded-[1.5rem] bg-[linear-gradient(104deg,#FFF_58.51%,rgba(255,255,255,0.00)_74.37%)] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.03)]">
              {fakedata &&
                fakedata?.map((e: IExpertTeamProps, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "transition-all duration-500 absolute overflow-hidden overflow-y-auto scrollbar-hidden w-full h-[28rem] p-[2rem_12.75rem_1.56rem_2.5rem]",
                      activeIndex < i &&
                        "opacity-0 z-[-1] top-[7rem] duration-500",
                      activeIndex > i &&
                        "opacity-0 z-[-1] top-[-7rem] duration-1000",
                      activeIndex === i && "top-0 z-[1] duration-1000"
                    )}
                  >
                    <span className="text-brown heading4 font-semibold">
                      {e?.name}
                    </span>
                    <p className="text-orangetext-500 body-14 mt-[0.25rem] mb-[1.5rem]">
                      {e?.position}
                    </p>
                    <div className="[&_p]:body16 [&_p]:tracking-[-0.02rem] [&_p]:text-bodytext">
                      <p>{e?.content}</p>
                    </div>
                  </div>
                ))}
              <div className="absolute z-[1] bottom-0 left-0 h-[3rem] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_71.5%)]"></div>
            </div>
            <div className="flex items-center space-x-[0.75rem] absolute right-[5rem] top-[30%] translate-y-[-50%] z-10">
              <button className="expert-team__prev w-[2.5rem] h-[2.5rem] flex-center rounded-[1.5rem] bg-[rgba(245,193,120,0.20)]">
                <ImageV2
                  className="size-[1.5rem] object-cover"
                  alt=""
                  width={1053}
                  height={685}
                  src={"/icons/arrow-right-brown.svg"}
                />
              </button>
              <button className="expert-team__next w-[2.5rem] h-[2.5rem] flex-center rounded-[1.5rem] bg-[rgba(245,193,120,0.20)]">
                <ImageV2
                  className="size-[1.5rem] object-cover rotate-180"
                  alt=""
                  width={1053}
                  height={685}
                  src={"/icons/arrow-right-brown.svg"}
                />
              </button>
            </div>
            <Swiper
              speed={800}
              loop={true}
              slidesPerView={"auto"}
              className="!mr-0 h-[38.125rem] max-w-[72.125rem]"
              modules={[Navigation]}
              navigation={{
                nextEl: ".expert-team__next",
                prevEl: ".expert-team__prev",
              }}
              onSlideChange={handleSlideChange}
            >
              {fakedata?.map((e: IExpertTeamProps, index: number) => (
                <SwiperSlide
                  className={cn(
                    "!w-[29.18769rem] [&.swiper-slide-active_.item-expert-team]:w-[29.18769rem] [&.swiper-slide-next]:pl-[4rem] [&.swiper-slide-active_.path-svg]:scale-[1]",
                    nextIndex + 1 === index && "!translate-x-[-5rem]"
                  )}
                  key={index}
                >
                  <ItemExpertTeam index={index} srcImage={e?.srcimage} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <>
          <div className="px-[1rem] w-full overflow-hidden overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-[1rem] w-max">
              {fakedata?.map((e: IExpertTeamProps, index: number) => (
                <ItemSliderMb
                  key={index}
                  data={e}
                  index={index}
                  setToggleMB={setToggleMB}
                  setIdActivePopupMB={setIdActivePopupMB}
                />
              ))}
            </div>
          </div>
          <PopupSliderMb
            index={idActivePopupMB}
            data={fakedata[idActivePopupMB]}
            toggleMB={toggleMB}
            setToggleMB={setToggleMB}
          />
        </>
      )}
    </section>
  );
};
