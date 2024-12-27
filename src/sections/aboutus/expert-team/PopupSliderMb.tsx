import ImageV2 from "@/components/image/ImageV2";
import { cn } from "@/lib/utils";
import ItemExpertTeam from "@/sections/aboutus/expert-team/ItemExpertTeam";

type DataType = {
  name: string;
  position: string;
  srcimage: string;
  content: string;
};
export default function PopupSliderMb({
  toggleMB,
  setToggleMB,
  data,
  index,
}: {
  toggleMB: boolean;
  setToggleMB: (value: boolean) => void;
  data: DataType;
  index: number;
}) {
  return (
    <>
      <div
        onClick={() => {
          setToggleMB(false);
        }}
        className={cn(
          "fixed inset-0 bg-[#00000054] z-[39] transition-all duration-1000",
          toggleMB
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none z-[-10]"
        )}
      ></div>
      <div
        className={cn(
          "transition-all duration-700 fixed z-40 bottom-0 left-0 w-[23.4375rem] h-[37.5rem] p-[1rem_1rem_2.5rem_1rem] rounded-[1rem_1rem_0rem_0rem] bg-white",
          toggleMB ? "translate-y-0" : "translate-y-[100%]"
        )}
      >
        <div className="overflow-hidden overflow-y-auto scrollbar-hidden h-[37.5rem]">
          <p className="text-brown heading2 font-optima font-semibold">
            {data?.name}
          </p>
          <p className="mt-[0.38rem] text-orangetext-500 text-[0.75rem] font-medium tracking-[-0.015rem]">
            {data?.position}
          </p>
          <ItemExpertTeam
            className="xsm:mx-auto xsm:w-[16.87925rem] xsm:h-[19.59588rem] [&_svg]:xsm:h-[19.59588rem] xsm:before:absolute xsm:before:bg-white xsm:before:w-full xsm:before:h-[0.1rem] xsm:before:top-[1.3rem] xsm:before:z-10"
            index={index}
            srcImage={data?.srcimage}
          />
          <div className="mt-[1.5rem] [&_p]:body-14 [&_p]:text-bodytext">
            <p>{data?.content}</p>
          </div>
        </div>
        <div
          onClick={() => {
            setToggleMB(false);
          }}
          className="absolute top-[1.25rem] right-[1rem]"
        >
          <ImageV2
            className="size-[1.5rem] object-contain"
            width={24}
            height={24}
            alt=""
            src={"/icons/close.svg"}
          />
        </div>
      </div>
    </>
  );
}
