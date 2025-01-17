'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {IDataAcfDetailEB5} from '@/types/dataAcfDetailEB5.interface'
import {Media} from '@/types/image.interface'
import {FC, memo, useEffect, useRef, useState} from 'react'

export interface IProcessStepsProps {
  title?: string
  description?: string
  steps?: IProcessStepItem[]
}

const progressDuration = 20000 // Total duration for all steps

export const ProcessSteps: FC<
  IDataAcfDetailEB5['acf']['eb5_projects_detail_progress']
> = ({title_section, description, timeline}) => {
  const [currentStep, setCurrentStep] = useState(0) // Current step index
  const [progressArray, setProgressArray] = useState(
    Array(timeline?.length || 0).fill(0),
  ) // Progress for each step

  const [scrollPercent, setScrollPercent] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current // Phần tử section
      if (!section) return

      const sectionHeight = section.offsetHeight // Chiều cao section
      const sectionTop = section.getBoundingClientRect().top // Tọa độ so với viewport
      const viewportHeight = window.innerHeight // Chiều cao của viewport

      // Tính toán phần trăm cuộn
      let scrollProgress = 0
      if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
        const distanceScrolled = viewportHeight - sectionTop
        scrollProgress = Math.min(
          Math.max((distanceScrolled / sectionHeight) * 100, 0),
          100,
        )
      }

      setScrollPercent(parseFloat(scrollProgress.toFixed(2))) // Giới hạn 2 chữ số thập phân
    }

    // Lắng nghe sự kiện cuộn
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // Dọn sự kiện khi component bị hủy
  }, [])

  const stepDuration = timeline?.length ? progressDuration / timeline.length : 0 // Duration for each step

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setProgressArray((prevProgress) => {
        const newProgress = [...prevProgress]
        if (newProgress[currentStep] < 100) {
          newProgress[currentStep] += 1 // Increase progress by 1% each time
        }

        // If step is complete, move to next step or reset to 0
        if (newProgress[currentStep] >= 100) {
          newProgress[currentStep] = 0
          setCurrentStep((prevStep) => (prevStep + 1) % (timeline?.length || 1)) // Loop to the first step
        }
        return newProgress
      })
    }, stepDuration / 100) // Update progress every interval to reach 100% for each step

    return () => clearInterval(intervalRef) // Cleanup on component unmount or step change
  }, [currentStep, stepDuration])

  return (
    <section
      ref={sectionRef}
      className='relative bg-background sm:p-[2.5rem_0_6rem] xsm:px-[1rem]'
    >
      <div className='mx-auto flex justify-between sm:max-w-[90rem] xsm:mb-[1.62rem] xsm:flex-col'>
        <h2 className='font-optima font-semibold text-brown heading1'>
          {title_section || 'Process Steps'}
        </h2>
        <p className='text-bodytext sm:max-w-[37.9375rem] sm:text-greyscaletext-700 sm:body16 xsm:mt-[1rem] xsm:body-14'>
          {description || 'Follow these steps to get your settlement program'}
        </p>
      </div>
      <div className='mx-auto mt-[4rem] flex max-w-[90rem] space-x-[3.21rem] transition-all duration-800 xsm:hidden'>
        {timeline &&
          timeline.map((step, index) => (
            <ProcessStepItem
              key={index}
              step={index + 1}
              {...step}
              progress={progressArray[index]}
              isActive={index === currentStep}
              setStep={() => {
                setCurrentStep(index)
                setProgressArray((prevProgress) => prevProgress.fill(0))
              }}
            />
          ))}
      </div>
      <div className='relative space-y-[4rem] sm:hidden'>
        {timeline &&
          timeline.map((step, index) => (
            <ProcessStepItemMb
              key={index}
              step={index + 1}
              {...step}
            />
          ))}
        <div className='absolute left-1/2 top-0 !mt-0 h-full w-[1px] -translate-x-1/2 bg-black/10'>
          <div
            style={{
              height: `${scrollPercent}%`,
              transition: 'height 0.6s linear 0.2s',
            }}
            className='absolute left-0 top-0 w-full bg-brown'
          ></div>
        </div>
      </div>
    </section>
  )
}

interface IProcessStepItem {
  specific_time: string
  title: string
  content: string
  thumbnail: Media
}

interface IProcessStepItemProps extends IProcessStepItem {
  step: number
  isActive: boolean
  progress: number
  setStep: () => void
}

export const ProcessStepItem: FC<IProcessStepItemProps> = ({
  title,
  specific_time,
  content,
  thumbnail,
  isActive,
  progress,
  setStep,
}) => {
  // console.log(specific_time)
  const textContentRef = useRef<HTMLParagraphElement | null>(null)
  const textContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!textContentRef.current || !textContainerRef.current) {
      return
    }
    if (isActive) {
      const contentHeight = textContentRef.current.offsetHeight
      textContainerRef.current.style.maxHeight = contentHeight + 'px'
    } else {
      textContainerRef.current.style.maxHeight = '0px'
    }
  }, [isActive])
  return (
    <div
      className={cn(
        'flex h-[29.2rem] w-[12.25rem] flex-col transition-all duration-800',
        {
          'w-[43.625rem]': isActive,
        },
      )}
    >
      <div className='flex items-center'>
        <span
          onClick={setStep}
          className={cn(
            'mr-[1.5rem] min-w-[6.125rem] cursor-pointer rounded-[6.96094rem] border border-greyscaletext-700/60 p-[0.4375rem_0.75rem] text-center font-semibold uppercase !leading-none text-greyscaletext-700/60 body16',
            {'border-brown bg-brown text-[#F3F3F3]': isActive},
          )}
        >
          {specific_time}
        </span>
        <div className='relative h-[0.07031rem] w-full flex-1 overflow-hidden rounded-full bg-black/10'>
          <span
            style={{
              width: `${progress && progress + 10}%`,
              transition: 'width 0.15s linear',
            }}
            className='absolute left-0 top-0 z-10 block h-full bg-[linear-gradient(98deg,#95502F_41.26%,#885103_97.06%)]'
          />
        </div>
      </div>
      <h3
        className={cn(
          'mt-[1.5rem] text-[1.5rem] font-bold leading-[1.3] tracking-[-0.03rem] text-bodytext',
          {
            'text-brown': isActive,
            'text-[1.75rem]': isActive,
          },
        )}
      >
        {title || ''}
      </h3>
      <div
        ref={textContainerRef}
        className={cn(
          'mt-[1rem] max-h-0 overflow-hidden opacity-0 transition-all duration-800',
          {
            'duration-0': !isActive,
            'opacity-100': isActive,
          },
        )}
      >
        <p
          ref={textContentRef}
          className='line-clamp-3'
        >
          {content}
        </p>
      </div>
      <ImageV2
        src={thumbnail?.url || ''}
        alt={thumbnail?.alt || ''}
        width={thumbnail?.width || 1000}
        height={thumbnail?.height || 1000}
        className='mt-auto block h-[16.875rem] w-full rounded-[1.125rem] object-cover transition-all duration-800'
      />
    </div>
  )
}

interface IProcessStepItemMbProps extends IProcessStepItem {
  step: number
}

const ProcessStepItemMb: FC<IProcessStepItemMbProps> = memo(
  ({specific_time, content, thumbnail, step, title}) => {
    return (
      <div
        className={cn('flex', {
          'flex-row-reverse': step % 2 === 0,
        })}
      >
        <ImageV2
          src={thumbnail?.url || ''}
          alt={thumbnail?.alt || ''}
          width={thumbnail?.width || 1000}
          height={thumbnail?.height || 1000}
          className={cn(
            'sticky top-[3.75rem] size-[10rem] rounded-[0.5rem] object-cover',
            {
              'ml-[1.5rem]': step % 2 === 0,
              'mr-[1.5rem]': step % 2 === 1,
            },
          )}
        />
        <div className='flex-1'>
          <span className='inline-block rounded-[1.375rem] bg-brown p-[0.4375rem_0.75rem] text-[0.75rem] font-semibold uppercase text-[#F3F3F3]'>
            {specific_time}
          </span>
          <div
            className={cn(
              'mt-[0.75rem] font-bold leading-[1.5] text-brown body16',
              {
                'text-right': step % 2 === 0,
                'text-left': step % 2 === 1,
              },
            )}
            dangerouslySetInnerHTML={{__html: title || ''}}
          ></div>
          <p
            className={cn(
              'mt-[0.62rem] text-[0.75rem] leading-[1.5] text-greyscaletext-600',
              {
                'text-right': step % 2 === 0,
                'text-left': step % 2 === 1,
              },
            )}
          >
            {content}
          </p>
        </div>
      </div>
    )
  },
)

ProcessStepItemMb.displayName = 'ProcessStepItemMb'
