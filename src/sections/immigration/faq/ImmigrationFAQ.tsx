/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemAccordion from '@/components/accordion/ItemAccordion'
import ButtonBrown from '@/components/button/ButtonBrown'
import ImageV2 from '@/components/image/ImageV2'
import {dataFAQ, dataListFAQ} from '@/types/dataAcfImmigration.interface'
import {useTranslations} from 'next-intl'

export default function ImmigrationFAQ({
  dataFAQ,
  flag,
  listFAQ,
}: {
  dataFAQ: dataFAQ
  flag: {url: string; alt: string}
  listFAQ?: dataListFAQ[]
}) {
  const t = useTranslations()
  return (
    <section className='flex pb-[6rem] pt-[11.25rem] section-container sm:items-center sm:space-x-[5rem] xsm:flex-col xsm:space-y-[1.5rem] xsm:p-[2.5rem_1rem]'>
      <div className='relative w-[41.875rem] rounded-[1.5rem] bg-white shadow-[0px_2px_30px_0px_rgba(224,224,224,0.08)] sm:h-[37.5rem] xsm:w-full'>
        <ImageV2
          className='absolute left-[1.63rem] top-0 size-[40.25rem] object-contain xsm:left-[1rem] xsm:size-[19.4375rem]'
          width={644}
          height={644}
          alt=''
          src={'/imgs/immigration/immigrationfaq/mask_group.webp'}
        />
        <div className='relative z-10 mb-[3.25rem] flex items-center space-x-[2.5rem] p-[2.5rem] pb-0 xsm:mb-[1.75rem] xsm:space-x-[1.25rem] xsm:p-[1rem] xsm:pb-0'>
          <div className='size-[6.25rem] rounded-[100%] border-[6px] border-solid border-[rgba(0,0,0,0.10)] xsm:size-[4.375rem] xsm:border-[4.2px]'>
            <ImageV2
              className='size-full rounded-[100%] object-contain'
              width={100}
              height={100}
              alt={flag?.alt}
              src={flag?.url}
            />
          </div>
          <div className='space-y-[0.62rem] xsm:space-y-[0.5rem]'>
            <p className='tracking-[0] text-brown body16-s xsm:text-[0.75rem] xsm:font-semibold xsm:leading-[1.5] xsm:tracking-[-0.015rem]'>
              {t('dinh_cu_de_dang_cung')}
            </p>
            <ImageV2
              className='h-[4.9rem] w-[15.94838rem] object-contain xsm:h-[3.5rem] xsm:w-[11.39169rem]'
              width={100}
              height={100}
              alt={dataFAQ?.settle?.alt}
              src={dataFAQ?.settle?.url}
            />
          </div>
        </div>
        <div className='relative z-10 mb-[1.81rem] p-[0_2.5rem] xsm:mb-[1rem] xsm:p-[0_1rem]'>
          <div className='rounded-[0.75rem] bg-[rgba(246,246,244,0.80)] p-[1.5rem] xsm:p-[1rem]'>
            <div className='space-y-[0.5rem]'>
              <p className='font-optima text-brown heading5 xsm:body16-m'>
                {dataFAQ?.number_of_successes?.title}
              </p>
              <p className='text-bodytext body16 xsm:body-14'>
                {dataFAQ?.number_of_successes?.describe}
              </p>
            </div>
            <div className='my-[1.12rem] h-[0.0625rem] w-full bg-[rgba(0,0,0,0.10)]'></div>
            <div className='space-y-[0.5rem]'>
              <p className='font-optima text-brown heading5 xsm:body16-m'>
                {dataFAQ?.standard_rate?.title}
              </p>
              <p className='text-bodytext body16 xsm:body-14'>
                {dataFAQ?.standard_rate?.describe}
              </p>
            </div>
          </div>
        </div>
        <div className='relative z-10 flex border-t-[1px] border-solid border-[rgba(0,0,0,0.10)] p-[1.75rem_2.5rem_2.5rem_2.5rem] sm:items-center sm:justify-between xsm:flex-col xsm:space-y-[0.5rem] xsm:p-[1rem]'>
          <p className='w-[18.875rem] font-medium tracking-[-0.00875rem] text-greyscaletext-600 sub-14 xsm:w-full xsm:sub-12-m'>
            {dataFAQ?.label}
          </p>
          <ButtonBrown
            link={'/lien-he'}
            title={dataFAQ?.contact_consulting?.title}
            target={dataFAQ?.contact_consulting?.target}
          />
        </div>
      </div>
      <div className='flex-1 xsm:py-[1.5rem]'>
        <h2 className='mb-[2.5rem] font-optima text-brown heading1 xsm:mb-[1.5rem]'>
          {dataFAQ?.faq?.title}
        </h2>
        <ItemAccordion listFAQ={listFAQ ? listFAQ : dataFAQ?.faq?.list_faq} />
      </div>
    </section>
  )
}
