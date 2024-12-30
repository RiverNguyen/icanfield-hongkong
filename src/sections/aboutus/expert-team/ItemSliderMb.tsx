import ImageV2 from "@/components/image/ImageV2";
import ItemExpertTeam from "@/sections/aboutus/expert-team/ItemExpertTeam";
interface IExpertTeamProps {
  name: string;
  position: string;
  srcimage: string;
  content: string;
}
export default function ItemSliderMb({
  data,
  index,
  setToggleMB,
  setIdActivePopupMB,
}: {
  data: IExpertTeamProps;
  index: number;
  setToggleMB: (value: boolean) => void;
  setIdActivePopupMB: (value: number) => void;
}) {
  return (
    <div className="p-[0rem_1rem_1rem_1rem] w-[17rem] rounded-[1rem] bg-white">
      <ItemExpertTeam
        className="xsm:before:absolute xsm:before:bg-white xsm:before:w-full xsm:before:h-[0.2rem] xsm:before:top-[2.9rem] xsm:before:z-10"
        index={index}
        srcImage={data?.srcimage}
      />
      <p className="text-brown heading2 font-semibold mt-[1.5rem]">
        {data?.name}
      </p>
      <p className="text-orangetext-500 sub-12 font-medium tracking-[-0.015rem] mb-[0.5rem] mt-[0.38rem]">
        {data?.position}
      </p>
      <div
        onClick={() => {
          setToggleMB(true);
          setIdActivePopupMB(index);
        }}
        className="p-[0.5rem_0.75rem_0.5rem_1rem] space-x-[0.5rem] flex-center rounded-[0.5rem] border-[1px] border-solid border-[rgba(18,18,18,0.16)]"
      >
        <p className="text-[0.875rem] font-medium tracking-[-0.0175rem] text-greyscaletext-body">
          Xem hồ sơ
        </p>
        <ImageV2
          width={24}
          height={24}
          alt="arow"
          src={"/icons/homepage/footer/icon-arow.svg"}
          className="size-[1.5rem] object-contain filter brightness-[100] invert-[100]"
        />
      </div>
    </div>
  );
}
