"use client";

import ImageV2 from "@/components/image/ImageV2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ItemBlog from "@/components/itemBlog";
import { Pagination } from 'swiper/modules';

export default function RelatedArticles() {
  return (
    <section className="pb-[11.31rem] xsm:pb-[2rem] pt-[1.5rem]">
      <div className="section-container xsm:mb-[1.5rem] flex items-center justify-between">
        <p className="font-optima heading1 text-orangetext-900">
          Các bài viết liên quan
        </p>
        <div className="xsm:hidden flex items-center space-x-[0.75rem]">
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
      <div className="xsm:hidden section-container h-[0.0625rem] bg-[#E7E7E7] my-[2rem]"></div>
      <Swiper
        speed={800}
        navigation={{
          nextEl: ".related-articles__next",
          prevEl: ".related-articles__prev",
        }}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation,Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
        }}
        className="mySwiper !px-[5rem] xsm:!px-[1rem] [&_.swiper-pagination]:pagination [&_.swiper-pagination-bullet]:pagination-bullet [&_.swiper-pagination-bullet-active]:pagination-bullet--active"
      >
        {new Array(10).fill(0).map((e, index) => (
          <SwiperSlide key={index} className="sm:!w-[28.35rem] sm:mr-[2rem] sm:last:mr-0">
            <ItemBlog />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
