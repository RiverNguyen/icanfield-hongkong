'use client'

import ImageV2 from '@/components/image/ImageV2'
import useIsMobile from '@/hooks/useIsMobile'
import {
  AppraisalProgram,
  AppraisalResponse,
} from '@/types/dataAppraisal.interface'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {useRef, useState} from 'react'
import {useLocale} from 'next-intl'

// Status badge component
function StatusBadge({
  statusKey,
  message,
}: {
  statusKey: string
  message: string
}) {
  const isFit = statusKey === 'fit'
  const isNotFit = statusKey === 'not_fit'

  return (
    <div
      className={cn(
        'absolute right-[1rem] top-[1rem] z-10 rounded-[0.5rem] px-[0.75rem] py-[0.375rem] text-xs font-bold uppercase tracking-[-0.006rem]',
        isFit
          ? 'bg-green-100 text-green-700'
          : isNotFit
            ? 'bg-red-100 text-red-700'
            : 'bg-yellow-100 text-yellow-700',
      )}
    >
      {message || statusKey}
    </div>
  )
}

// Explanation item component
function ExplanationItem({
  explanation,
  t,
}: {
  explanation: AppraisalProgram['explanations'][0]
  t: (arg: string) => string
}) {
  const statusStyles = {
    pass: 'bg-green-50 border-green-200 text-green-800',
    fail: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    soft: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    hard: 'bg-red-50 border-red-200 text-red-800',
  }

  const statusIcon = {
    pass: '✓',
    fail: '✗',
    info: 'i',
    soft: '~',
    hard: '✗',
  }

  const statusLabel = {
    pass: t('dat'),
    fail: t('khong_dat'),
    info: t('thong_tin'),
    soft: t('mem'),
    hard: t('that_bai'),
  }

  const style =
    statusStyles[explanation.status as keyof typeof statusStyles] ||
    statusStyles.info
  const icon = statusIcon[explanation.status as keyof typeof statusIcon] || 'i'
  const label =
    statusLabel[explanation.status as keyof typeof statusLabel] ||
    explanation.status

  return (
    <div
      className={cn(
        'flex items-start gap-[0.75rem] rounded-[0.5rem] border p-[0.75rem]',
        style,
      )}
    >
      <span
        className={cn(
          'flex size-[1.5rem] items-center justify-center rounded-full text-xs font-bold',
          explanation.status === 'pass'
            ? 'bg-green-200 text-green-800'
            : explanation.status === 'fail' || explanation.status === 'hard'
              ? 'bg-red-200 text-red-800'
              : explanation.status === 'soft'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-blue-200 text-blue-800',
        )}
      >
        {icon}
      </span>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium uppercase tracking-[0.05em] text-opacity-80'>
            {t(explanation.key.replace(/_/g, ' '))}: {explanation.label}
          </span>
          <span className='text-xs font-bold'>{t(label)}</span>
        </div>
        {explanation.message && (
          <p className='mt-[0.25rem] text-sm'>{explanation.message}</p>
        )}
        {/* {explanation.contribution !== undefined && (
          <p className='mt-[0.25rem] text-xs opacity-70'>
            {t('diem_dong_gop')}: {explanation.contribution}
          </p>
        )} */}
      </div>
    </div>
  )
}

// Single program card component
function ProgramCard({
  program,
  t,
  isMobile,
}: {
  program: AppraisalProgram
  t: (arg: string) => string
  isMobile: boolean
}) {
  const locale = useLocale()
  const [showExplanations, setShowExplanations] = useState(false)

  // Calculate total contribution from passed explanations
  const passedContributions = program.explanations
    .filter((e) => e.status === 'pass' || e.status === 'soft')
    .reduce((sum, e) => sum + (e.contribution || 0), 0)
  const href = `${locale === 'zh' ? `/${program.nation}/${program.slug}` : `/${locale}/${program.nation}/${program.slug}`}`
  return (
    <div
      className={cn(
        'w-full self-start overflow-hidden rounded-[1.25rem] border-[0.8px] border-solid border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_4px_11.1px_0px_rgba(114,114,114,0.08)]',
        isMobile ? 'mb-[1rem]' : '',
      )}
    >
      {/* Image & Title Section */}
      <div className='relative'>
        <Link
          href={href}
          className='block h-[18.5625rem] w-full xsm:h-[14.25rem]'
        >
          <ImageV2
            className='size-full object-cover'
            width={464}
            height={297}
            alt={program.slug}
            src={program.featured_image}
          />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(92,50,30,0.00)_0.15%,rgba(40,14,2,0.90)_95.57%)]'></div>
        </Link>
        <StatusBadge
          statusKey={program.status_key}
          message={program.status_message}
        />
        <div className='absolute bottom-[1.5rem] left-[1.5rem] z-[11] xsm:bottom-[1rem] xsm:left-[1rem]'>
          <h3
            className='line-clamp-2 font-optima text-[2rem] font-medium leading-[1.1] text-white xsm:text-[1.5rem]'
            dangerouslySetInnerHTML={{__html: program.title}}
          ></h3>
        </div>
      </div>

      {/* Score Section */}
      <div className='flex items-center justify-between border-b border-gray-100 p-[1.25rem]'>
        <div>
          <p className='text-sm text-gray-500'>{t('diem_phu_hop')}</p>
          <p className='text-[1.5rem] font-bold text-brown'>
            {Math.round(program.score)}%
          </p>
        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-500'>{t('tong_diem')}</p>
          <p className='text-[1.5rem] font-bold text-orangetext-500'>
            {passedContributions}/ 100
          </p>
        </div>
      </div>

      {/* Explanations Toggle */}
      <div className='p-[1.25rem]'>
        <button
          onClick={() => setShowExplanations(!showExplanations)}
          className='flex w-full items-center justify-between text-brown transition-colors hover:text-brown/80'
        >
          <span className='font-medium'>{t('danh_gia_chi_tiet')}</span>
          <span
            className={cn(
              'transition-transform',
              showExplanations ? 'rotate-180' : '',
            )}
          >
            ▼
          </span>
        </button>

        {showExplanations && (
          <div className='mt-[1rem] space-y-[0.5rem]'>
            {program.explanations.map((explanation, index) => (
              <ExplanationItem
                key={index}
                explanation={explanation}
                t={t}
              />
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className='flex items-center justify-between border-t border-gray-100 p-[1.25rem]'>
        <Link
          // eslint-disable-next-line quotes
          href={`tel:+123456789`}
          className='flex items-center gap-[0.5rem] rounded-[1.875rem] bg-[#F4EEEA] px-[1rem] py-[0.875rem] transition-all hover:bg-[#e8e0da]'
        >
          <span className='text-brown body-14-m'>{t('lien_he_tu_van')}</span>
        </Link>
        <Link
          href={href}
          className='flex items-center gap-[0.5rem] rounded-[0.5rem] bg-[linear-gradient(97deg,#5C321E_-3.86%,#95502F_51.97%,#F5C178_117.18%)] px-[1.5rem] py-[0.5rem]'
        >
          <span className='text-white body-14-m'>{t('xem_chi_tiet')}</span>
          <span className='text-white'>-&gt;</span>
        </Link>
      </div>
    </div>
  )
}

export default function ProgramResult({
  appraisalResponse,
  t,
}: {
  appraisalResponse: AppraisalResponse
  t: (arg: string) => string
}) {
  const isMobile = useIsMobile()
  const elemtRef = useRef<HTMLDivElement>(null)

  if (!appraisalResponse) {
    return <div></div>
  }

  return (
    <div
      ref={elemtRef}
      className='mt-[3rem] section-container xsm:mb-[1rem]'
    >
      {/* Header */}
      <h3 className='mb-[2.12rem] w-full text-center text-brown heading2'>
        {t('ket_qua_chuong_trinh_cua_ban')}
      </h3>

      {/* Results count */}
      <p className='mb-[2rem] text-center text-gray-600 body16'>
        {t('tim_thay')} {appraisalResponse.programs.length}{' '}
        {appraisalResponse.programs.length === 1
          ? t('chuong_trinh_phu_hop')
          : t('cac_chuong_trinh_phu_hop')}
      </p>

      {/* Programs Grid */}
      <div className='grid grid-cols-3 gap-[1.5rem] xsm:grid-cols-1'>
        {appraisalResponse.programs.map((program: AppraisalProgram) => (
          <ProgramCard
            key={program.id}
            program={program}
            t={t}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* No results message */}
      {appraisalResponse.programs.length === 0 && (
        <div className='py-[3rem] text-center'>
          <p className='text-brown body16-m'>
            {t('hien_tai_chua_co_chuong_trinh_phu_hop')}
          </p>
          <p className='body14 mt-[0.5rem] text-gray-500'>
            {t('lien_he_voi_chung_toi_de_duoc_tu_van_them')}
          </p>
        </div>
      )}
    </div>
  )
}
