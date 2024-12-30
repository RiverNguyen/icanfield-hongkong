import ImageV2 from '@/components/image/ImageV2'
import ItemPioneering from '@/sections/aboutus/pioneering-mission/ItemPioneering'

export default function PioneeringMission() {
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
          {new Array(5).fill(0).map((e, index) => (
            <ItemPioneering
              key={index}
              index={index}
            />
          ))}
        </div>
        <div className='sticky top-[3rem] h-[43.75rem] flex-1 space-y-[2rem] p-[6.5rem_7.5rem_6.5rem_3.5rem] xsm:top-[3.75rem] xsm:hidden xsm:p-[4rem_1rem_1.5rem_1rem]'>
          <h2 className='heading1 font-optima font-semibold text-brown'>
            Sứ Mệnh Tiên Phong <br /> Giá Trị Dẫn Lối Thành Công
          </h2>
          <div className='[&_p]:body16 space-y-[0.75rem] [&_p]:tracking-[-0.02rem] [&_p]:text-greyscaletext-400'>
            <p>
              Tại iCanfield, chúng tôi tin rằng mỗi hành trình vươn tầm quốc tế
              đều bắt đầu từ sự tận tâm và tầm nhìn chiến lược. Với hơn 10 năm
              kinh nghiệm, sứ mệnh của chúng tôi là đồng hành cùng bạn hiện thực
              hóa giấc mơ toàn cầu bằng những giải pháp đầu tư, định cư và du
              học ưu việt nhất.
            </p>
            <p>
              Không chỉ là đối tác đáng tin cậy, iCanfield cam kết mang lại giá
              trị bền vững và trải nghiệm vượt mong đợi, giúp bạn xây dựng một
              tương lai thịnh vượng, an toàn và hạnh phúc.
            </p>
          </div>
        </div>
        <div className='[&_p]:body-14 space-y-[1rem] px-[1rem] sm:hidden [&_p]:tracking-[-0.00875rem] [&_p]:text-greyscaletext-body'>
          <p>
            Tại iCanfield, chúng tôi tin rằng mỗi hành trình vươn tầm quốc tế
            đều bắt đầu từ sự tận tâm và tầm nhìn chiến lược. Với hơn 10 năm
            kinh nghiệm, sứ mệnh của chúng tôi là đồng hành cùng bạn hiện thực
            hóa giấc mơ toàn cầu bằng những giải pháp đầu tư, định cư và du học
            ưu việt nhất.
          </p>
          <p>
            Không chỉ là đối tác đáng tin cậy, iCanfield cam kết mang lại giá
            trị bền vững và trải nghiệm vượt mong đợi, giúp bạn xây dựng một
            tương lai thịnh vượng, an toàn và hạnh phúc.
          </p>
        </div>
        <div className='sticky top-0 z-10 flex-1 bg-background p-[6.5rem_7.5rem_6.5rem_3.5rem] sm:hidden xsm:top-[3.75rem] xsm:p-[1rem_1rem_1.5rem_1rem]'>
          <h2 className='heading1 text-brown'>
            Sứ Mệnh Tiên Phong <br /> Giá Trị Dẫn Lối Thành Công
          </h2>
        </div>
      </div>
    </section>
  )
}
