import {IDataAcfDetailHR} from '@/types/dataAcfDetailHR.interface'
import Image from 'next/image'

export default function OurPeopleOurVoice({
  our_people_our_voice,
}: {
  our_people_our_voice: IDataAcfDetailHR['acf']['our_people_our_voice']
}) {
  return (
    <section className='w-full flex-col items-center justify-center gap-[3.75rem] px-[5rem] py-[6.25rem] xsm:px-[1rem] xsm:pb-[2.5rem] xsm:pt-[2rem]'>
      <div className='flex items-start gap-[4.5rem] self-stretch rounded-[1.5rem] py-[1.25rem] pl-[1.25rem] pr-[2.5rem] xsm:flex-col xsm:gap-[1.5rem] xsm:p-0'>
        <div className='flex flex-1 flex-col items-start justify-center gap-[3rem] rounded-[2rem] xsm:gap-[1.5rem]'>
          <Image
            src={'/icons/detail-hr/our-people-our-voice/quote.svg'}
            alt={'Quote'}
            width={65}
            height={75}
            className='h-[4.0625rem] w-[4.0625rem] object-cover xsm:h-[3.41538rem] xsm:w-[3rem]'
          />
          <div className='flex flex-col items-start gap-[0.625rem] self-stretch xsm:gap-[0.5rem]'>
            <h2 className='self-stretch font-optima text-[3rem] font-semibold leading-[120%] tracking-[-0.06rem] text-[#5C321E] xsm:text-[1.5rem] xsm:leading-[130%] xsm:tracking-[-0.045rem]'>
              {our_people_our_voice?.name}
            </h2>
            <p className='xsm:tracking-0 text-[0.875rem] font-normal leading-[150%] tracking-[-0.00875rem] text-[#95502F] xsm:text-[0.75rem]'>
              {our_people_our_voice?.position}
            </p>
          </div>
          <div className='flex flex-col gap-[1.5rem] xsm:gap-[1rem]'>
            <div
              dangerouslySetInnerHTML={{
                __html: our_people_our_voice?.quote || '' ,
              }}
              className='text-[1.375rem] font-normal leading-[150%] tracking-[-0.0275rem] text-[#5C5C5C] xsm:text-[1rem] xsm:tracking-[-0.02rem] [&>p>strong]:font-semibold [&>p>strong]:text-[#151515]'
            ></div>
            <p className='text-right font-optima text-[1.5rem] font-medium leading-[140%] tracking-[-0.03rem] text-[#5C321E] xsm:text-[1rem] xsm:tracking-[-0.02rem]'>
              {our_people_our_voice?.signature}
            </p>
          </div>
        </div>
        <Image
          src={our_people_our_voice?.image?.url}
          alt={our_people_our_voice?.image?.alt}
          width={our_people_our_voice?.image?.width}
          height={our_people_our_voice?.image?.height}
          className='h-[33.92625rem] flex-1 rounded-[1rem] object-cover xsm:h-[17.79313rem]'
        />
      </div>
    </section>
  )
}
