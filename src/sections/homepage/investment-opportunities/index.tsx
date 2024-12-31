'use client'
import ImageV2 from '@/components/image/ImageV2'
import ArrowRight from '@/components/svg/ArrowRight'
import {cn} from '@/lib/utils'
import {Media} from '@/types/image.interface'
import Link from 'next/link'
import {FC, useEffect, useRef, useState} from 'react'
import './style.css'

export interface IInvestmentOpportunities {
  data: {items: IItemInvestmentOpportunities[]; subtitle: string; title: string}
}

export const InvestmentOpportunities: FC<IInvestmentOpportunities> = ({
  data,
}) => {
  const {items, subtitle, title} = data
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const ref = useRef<HTMLSelectElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (ref.current) ref.current.classList.add('active')
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )
    if (ref.current) observer.observe(ref.current)
  }, [])
  return (
    <section
      ref={ref}
      className='investment-opportunities'
    >
      <div className='flex flex-col items-center p-[2.5rem_1rem_1.5rem] sm:sticky sm:top-0 sm:h-[15.06rem] sm:p-[1.25rem_0_0]'>
        <span className='investment-opportunities__subtitle sub-12 translate-y-[15.62rem] font-medium uppercase text-greyscaletext-400 opacity-0 sm:font-semibold'>
          {subtitle}
        </span>
        <h2 className='investment-opportunities__title heading1 m-[0.75rem_0_0] text-center font-optima font-semibold text-brown sm:m-[0.94rem_0_4.5rem] sm:max-w-[52.75rem] sm:translate-y-[29.38rem]'>
          {title}
        </h2>
      </div>
      <div className='investment-opportunities__content relative w-full translate-y-[47.32rem] opacity-0'>
        {items.map((item, index) => (
          <ItemInvestmentOpportunities
            {...item}
            key={index}
            itemKey={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  )
}

export interface IItemInvestmentOpportunities {
  title: string
  description: string
  image: Media
  link: string
  background_pc: Media
  background_mb: Media
}

interface IItemInvestmentOpportunitiesProps
  extends IItemInvestmentOpportunities {
  itemKey: number
  activeIndex: number
  setActiveIndex: (index: number) => void
}

function ItemInvestmentOpportunities({
  background_pc,
  background_mb,
  description,
  image,
  link,
  title,
  itemKey,
  activeIndex,
  setActiveIndex,
}: IItemInvestmentOpportunitiesProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth > 640) return
    if (!spanRef.current || !pRef.current) return
    if (itemKey === activeIndex) {
      pRef.current.style.maxHeight = '0px'
      pRef.current.style.maxHeight = `${spanRef.current.offsetHeight + 30}px`
    } else {
      pRef.current.style.maxHeight = '0px'
    }
  }, [activeIndex])

  return (
    <div
      className={cn(
        'shadow-[0px_-64px_60px_0px_rgba(3, 33, 7, 0.02);] sticky top-0 min-h-[24.68rem] overflow-hidden rounded-[1.5rem_1.5rem_0rem_0rem;] bg-[linear-gradient(180deg,#F8F6F3_12%,#E8E0D3_85.5%)] py-[2rem] sm:rounded-none sm:bg-[linear-gradient(180deg,#E8E0D3_31.97%,#F7F6F1_83.45%)] sm:shadow-[0px_-64px_80px_0px_rgba(3,33,7,0.04)]',
        {
          'rounded-none sm:top-[15.06rem] sm:min-h-[34.1875rem]': itemKey == 0,
          'sm:top-[20.68rem] sm:min-h-[28.375rem]': itemKey == 1,
          'sm:top-[26.3rem] sm:min-h-[22.4rem]': itemKey == 2,
        },
      )}
    >
      <ImageV2
        className='absolute bottom-0 left-0 right-0 top-0 size-full object-cover xsm:hidden'
        src={background_pc.url}
        alt={background_pc.alt}
        width={background_pc.width * 2}
        height={background_pc.height * 2}
      />
      <ImageV2
        className='absolute bottom-0 left-0 right-0 h-[38.56rem] w-full object-cover sm:hidden'
        src={background_mb.url}
        alt={background_mb.alt}
        width={background_mb.width * 2}
        height={background_mb.height * 2}
      />
      <div className='relative mx-auto flex flex-col items-center sm:max-w-[82rem] sm:flex-row sm:items-stretch'>
        <ImageV2
          className='h-[12.5rem] w-[17.24138rem] object-cover sm:h-[18.125rem] sm:w-[25rem]'
          src={image.url}
          alt={image.alt}
          width={image.width * 2}
          height={image.height * 2}
        />
        <div className='p-[2.5rem_1rem_1.25rem] sm:ml-[10rem] sm:space-y-[1.75rem] sm:p-0'>
          <h3
            onClick={() => {
              const index = itemKey == activeIndex ? -1 : itemKey
              setActiveIndex(index)
            }}
            className='relative z-10 flex items-center justify-between font-optima text-[1.25rem] font-medium leading-[2.275rem] tracking-[-0.0325rem] text-brown sm:text-[1.625rem]'
          >
            {title}
            <ImageV2
              className={cn(
                'ml-[0.5rem] inline-block size-[1.5rem] transition-transform duration-300 ease-in-out sm:hidden',
                itemKey === activeIndex ? 'rotate-0' : 'rotate-180',
              )}
              alt='chevron-up'
              src={'/icons/chevron-up.svg'}
              width={24 * 2}
              height={24 * 2}
            />
          </h3>
          <p className='my-[0.75rem] h-[0.0625rem] w-full bg-[rgba(112,115,124,0.22)] sm:bg-[linear-gradient(90deg,rgba(112,115,124,0.22)_24.3%,rgba(112,115,124,0.00)_82.57%)]'></p>
          <p
            ref={pRef}
            className='overflow-hidden transition-all duration-300 ease-in-out xsm:max-h-0'
          >
            <span
              ref={spanRef}
              className='text-[1rem] leading-[150%] text-greyscaletext-900 xsm:text-[0.875rem]'
            >
              {description}
            </span>
          </p>
          <Link
            className='flex h-[3rem] items-center justify-center rounded-[0.5rem] p-[0.5rem_0.75rem_0.5rem_1.5rem] sm:inline-flex sm:justify-start sm:bg-btn-gradient xsm:mt-8 xsm:border xsm:border-Text-Text-Grey-Disable'
            href={link}
          >
            <span className='body-14-m text-bodytext sm:text-white'>
              Tìm hiểu thêm
            </span>
            <ArrowRight className='ml-[0.5rem] size-[1.5rem] text-bodytext sm:text-white xsm:translate-y-[-2px]' />
          </Link>
        </div>
      </div>
    </div>
  )
}
