"use client"

import useIsMobile from "@/hooks/useIsMobile";

const addIdsToH2Tags = (htmlString: string) => {
  let index = 1;
  return htmlString.replace(/<h2[^>]*>/g, (match) => {
    return `${match.slice(0, -1)} id="section-${index++}">`;
  });
};
export default function ContentDetail({dataContent}: {dataContent: string}) {
  const isMobile = useIsMobile();
  const htmlWithIds = addIdsToH2Tags(dataContent);
  return (
    <div className="w-[58.3125rem]">
      {!isMobile && (
        <h1 className="font-optima text-orangetext-900 text-[2rem] font-semibold leading-[1.3] tracking-[-0.02rem] mb-[2.9rem]">
          Chương trình thẻ thường trú nhân Malta (MPRP) sẽ tăng phí từ ngày
          01/01/2025 – Những điều nhà đầu tư cần biết
        </h1>
      )}
      <div
        className="flex-1 [&_h2]:mb-[1000px] [&_h2]:content-h2 [&_img]:content-img [&_p]:content-p [&_span]:content-span [&_ul]:content-ul [&_strong]:content-strong"
        dangerouslySetInnerHTML={{ __html: htmlWithIds }}
      ></div>
      <div className="h-[0.0625rem] w-full bg-[rgba(0,0,0,0.04)] my-[1.5rem]"></div>
      <p className="text-end w-full text-orangetext-900 body16-s">
        Đăng bởi Admin
      </p>
    </div>
  );
}
