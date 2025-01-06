import ImageV2 from '@/components/image/ImageV2'
import ItemPioneering from '@/sections/aboutus/pioneering-mission/ItemPioneering'
import {dataAcfPioneeringMission} from '@/types/dataAcfAboutus.interface'

export default function PioneeringMission({
  dataAcfPioneeringMission,
}: {
  dataAcfPioneeringMission: dataAcfPioneeringMission
}) {
  return (
    <section className='w-full bg-background pt-[5rem]'>
      <div className='w-full sm:sticky sm:top-[100vh] xsm:relative'>
        <ImageV2
          className='absolute left-0 h-[100vh] w-full sm:top-[-100vh] xsm:top-0 xsm:hidden'
          width={1600}
          height={788}
          alt=''
          src={'/imgs/about-us/pioneering-mission/bg-pioneering-mission.webp'}
        />
        <ImageV2
          className='absolute left-0 top-0 h-[25rem] w-full sm:hidden'
          width={1600}
          height={788}
          alt=''
          src={'/imgs/about-us/pioneering-mission/bg-pioneering-missionMB.png'}
        />
      </div>
      <div className='flex xsm:flex-col-reverse'>
        <div className='space-y-[1.5rem] p-[6.5rem_4rem_2.5rem_5rem] xsm:p-[2.5rem_1rem]'>
          {Array.isArray(dataAcfPioneeringMission?.list_item_mission) &&
            dataAcfPioneeringMission?.list_item_mission?.map((e, index) => (
              <ItemPioneering
                key={index}
                index={index}
                data={e}
              />
            ))}
        </div>
        <div className='sticky top-[3rem] h-[43.75rem] flex-1 space-y-[2rem] p-[6.5rem_7.5rem_6.5rem_3.5rem] xsm:top-[3.75rem] xsm:hidden xsm:p-[4rem_1rem_1.5rem_1rem]'>
          <h2
            dangerouslySetInnerHTML={{__html: dataAcfPioneeringMission?.title}}
            className='heading1 font-optima font-semibold text-brown'
          ></h2>
          <div
            dangerouslySetInnerHTML={{
              __html: dataAcfPioneeringMission?.decscripts,
            }}
            className='[&_p]:body16 space-y-[0.75rem] [&_p]:tracking-[-0.02rem] [&_p]:text-greyscaletext-400'
          ></div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: dataAcfPioneeringMission?.decscripts,
          }}
          className='[&_p]:body-14 space-y-[1rem] px-[1rem] sm:hidden [&_p]:tracking-[-0.00875rem] [&_p]:text-greyscaletext-body'
        ></div>
        <div className='sticky top-0 z-10 flex-1 bg-background p-[6.5rem_7.5rem_6.5rem_3.5rem] sm:hidden xsm:top-[3.75rem] xsm:p-[1rem_1rem_1.5rem_1rem]'>
          <h2
            dangerouslySetInnerHTML={{__html: dataAcfPioneeringMission?.title}}
            className='heading1 text-brown'
          ></h2>
        </div>
      </div>
    </section>
  )
}
