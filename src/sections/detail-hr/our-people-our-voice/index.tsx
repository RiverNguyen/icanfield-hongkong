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
        <div className='flex shrink-0 flex-grow basis-0 flex-col items-start justify-center gap-[3rem] rounded-[2rem] xsm:gap-[1.5rem] xsm:self-stretch'>
          <svg
            className='h-[4.0625rem] w-[4.0625rem] xsm:h-[3.41538rem] xsm:w-[3rem]'
            xmlns='http://www.w3.org/2000/svg'
            width='65'
            height='75'
            viewBox='0 0 65 75'
            fill='none'
          >
            <path
              d='M65 18.2001L63.5255 29.1314C59.9212 28.8963 57.1361 29.5232 55.1701 31.012C53.2042 32.5009 51.8935 34.5774 51.2382 37.2417C50.5829 39.9059 50.46 42.9228 50.8696 46.2923H65V74.6196H37.845V43.9415C37.845 34.695 40.1386 27.7209 44.7259 23.0192C49.3951 18.2393 56.1531 16.6329 65 18.2001ZM27.155 18.2001L25.6805 29.1314C22.0762 28.8963 19.2911 29.5232 17.3251 31.012C15.3592 32.5009 14.0485 34.5774 13.3932 37.2417C12.7379 39.9059 12.615 42.9228 13.0246 46.2923H27.155V74.6196H0V43.9415C0 34.695 2.29364 27.7209 6.88091 23.0192C11.5501 18.2393 18.3081 16.6329 27.155 18.2001Z'
              fill='#EEEDE6'
            />
          </svg>
          <div className='flex flex-col items-start gap-[0.625rem] self-stretch xsm:gap-[0.5rem]'>
            <h2 className='self-stretch font-optima text-[3rem] font-semibold not-italic leading-[120%] tracking-[-0.06rem] text-[#5C321E] xsm:text-[1.5rem] xsm:leading-[130%] xsm:tracking-[-0.045rem]'>
              {our_people_our_voice?.name}
            </h2>
            <p className='xsm:tracking-0 self-stretch text-[0.875rem] font-normal not-italic leading-[150%] tracking-[-0.00875rem] text-[#95502F] xsm:text-[0.75rem]'>
              {our_people_our_voice?.position}
            </p>
          </div>
          <div className='flex flex-col items-end justify-center gap-[1.5rem] self-stretch xsm:gap-[1rem]'>
            <div
              dangerouslySetInnerHTML={{__html: our_people_our_voice?.quote}}
              className='flex flex-col items-start gap-[0.625rem] self-stretch text-[1.375rem] font-normal not-italic leading-[150%] tracking-[-0.0275rem] text-[#5C5C5C] xsm:text-[1rem] xsm:tracking-[-0.02rem] [&>p>strong]:font-semibold [&>p>strong]:text-[#151515]'
            ></div>
            <p className='self-stretch text-right font-optima text-[1.5rem] font-medium not-italic leading-[140%] tracking-[-0.03rem] text-[#5C321E] xsm:text-[1rem] xsm:tracking-[-0.02rem]'>
              {our_people_our_voice?.signature}
            </p>
          </div>
        </div>

        <Image
          src={our_people_our_voice?.image?.url}
          alt={our_people_our_voice?.image?.alt}
          width={our_people_our_voice?.image?.width}
          height={our_people_our_voice?.image?.height}
          className='h-[33.92625rem] flex-shrink-0 flex-grow basis-0 rounded-[1rem] object-cover xsm:h-[17.79313rem]'
        />
      </div>
    </section>
  )
}
