"use client";

import ImageV2 from "@/components/image/ImageV2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import IndexDetailBlog from "@/pages/detail-blog";

export default function RelatedArticles() {
  return (
    <section className="section-container">
      <div className="flex items-center justify-between">
        <p className="font-optima heading1 text-orangetext-900">
          Các bài viết liên quan
        </p>
        <div className="flex items-center space-x-[0.75rem]">
          <button className="related-articles__prev h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center">
            <ImageV2
              className="size-[1.5rem] object-cover"
              alt=""
              width={1053}
              height={685}
              src={"/icons/arrow-right-brown.svg"}
            />
          </button>
          <button className="related-articles__next h-[2.5rem] w-[2.5rem] rounded-[1.5rem] bg-[rgba(245,193,120,0.20)] flex-center">
            <ImageV2
              className="size-[1.5rem] rotate-180 object-cover"
              alt=""
              width={1053}
              height={685}
              src={"/icons/arrow-right-brown.svg"}
            />
          </button>
        </div>
      </div>
      <div className="w-full h-[0.0625rem] bg-[#E7E7E7] my-[2rem]"></div>
      <Swiper
        speed={800}
        navigation={{
          nextEl: ".related-articles__next",
          prevEl: ".related-articles__prev",
        }}
        slidesPerView={'auto'}
        modules={[Navigation]}
        className="mySwiper"
      >
        {new Array(10).fill(0).map((e, index) => (
          <SwiperSlide key={index}></SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
