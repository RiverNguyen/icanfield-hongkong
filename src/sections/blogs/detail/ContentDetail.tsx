"use client"

import Share from "@/components/share/Share";
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
    <div className="w-[58.3125rem] xsm:w-full">
      {!isMobile && (
        <h1 className="font-optima text-orangetext-900 text-[2rem] font-semibold leading-[1.3] tracking-[-0.02rem] mb-[2.9rem]">
          Chương trình thẻ thường trú nhân Malta (MPRP) sẽ tăng phí từ ngày
          01/01/2025 – Những điều nhà đầu tư cần biết
        </h1>
      )}
      <div
        className="flex-1 [&_h2]:mb-[1000px] [&_h2]:content-h2 [&_img]:content-img [&_p]:content-p [&_span]:content-span [&_ul]:content-ul [&_ul_li]:content-ul--li [&_strong]:content-strong [&_ol]:content-ol [&_ol_li]:content-ol--li"
        dangerouslySetInnerHTML={{ __html: htmlWithIds }}
      ></div>
      <div className="h-[0.0625rem] w-full bg-[rgba(0,0,0,0.04)] my-[1.5rem]"></div>
      <div className="flex items-center justify-between w-full">
        <Share className="[&>p]:hidden"/>
        <p className="text-end w-full text-orangetext-900 body16-s xsm:text-[0.875rem] xsm:font-semibold xsm:tracking-[-0.00875rem] xsm:leading-[1.5]">
          Đăng bởi Admin
        </p>
      </div>
    </div>
  );
}
