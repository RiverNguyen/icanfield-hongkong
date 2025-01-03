'use client'
import ImageV2 from '@/components/image/ImageV2'
import {cn} from '@/lib/utils'
import {IDataMedia} from '@/sections/homepage/banner'
import {Media} from '@/types/image.interface'
import {convertToIframe} from '@/utils/convertToIframe'
import {FC, useEffect, useRef, useState} from 'react'
import ReactPlayer, {ReactPlayerProps} from 'react-player'
export interface IProgramOverviewProps {
  title: string
  description: string
  media: IDataMedia & {
    thumbnail: Media
  }
}

export const ProgramOverview: FC<IProgramOverviewProps> = ({
  title,
  description,
  media,
}) => {
  const playerRef = useRef<ReactPlayer>(null)
  const [playerProps, setPlayerProps] = useState<ReactPlayerProps>({
    loop: false,
    muted: true,
    playing: false,
    controls: true,
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePlay = () => {
    setPlayerProps({...playerProps, playing: true})
  }
  const handlePause = () => {
    setPlayerProps({...playerProps, playing: false})
  }
  return (
    <section className='relative min-h-[26rem] bg-background pb-[1.45rem] sm:h-[52.81rem] xsm:mb-[-5.1rem] xsm:px-[1rem]'>
      <div className='mx-auto flex translate-y-[-18.5rem] flex-col overflow-hidden rounded-[1.25rem_1.25rem_0rem_0rem] p-[1.5rem_1rem_2rem] sm:min-h-[51.3125rem] sm:max-w-[90rem] sm:rounded-[2rem] sm:bg-[linear-gradient(180deg,#FFF_24%,rgba(255,255,255,0.00)_90%)] sm:p-[4rem_4rem_5rem] xsm:translate-y-[-3.625rem] xsm:bg-white/70'>
        <div className='absolute left-0 top-0 h-full w-full blur-[25px] sm:hidden xsm:bg-white/70'></div>
        <ImageV2
          src={'/imgs/detail-settlement-programs/mask_group.webp'}
          alt='mask_group'
          width={1312 * 2}
          height={738 * 2}
          className='absolute right-0 top-0 h-[25.9375rem] w-[63.875rem] object-contain xsm:hidden'
        />
        <h2 className='heading1 relative font-optima font-semibold text-brown'>
          {title}
        </h2>
        <p className='body16-r55 relative m-[1rem_0_1.5rem] max-w-[46.5rem] text-greyscaletext-body sm:m-[1.5rem_0_3.31rem] xsm:text-[0.875rem]'>
          {description}
        </p>
        <div className='relative h-[10.93363rem] self-center overflow-hidden rounded-[1rem] sm:h-[46.125rem] sm:w-[82rem] xsm:rounded-[0.5rem]'>
          <div className='banner-video absolute left-0 top-0 h-full w-full overflow-hidden rounded-bl-[0.5rem] rounded-br-[0.5rem] xsm:relative'>
            {isClient &&
              (media.type === 'upload' ? (
                <ReactPlayer
                  ref={playerRef}
                  url={media[media.type].url}
                  width='100%'
                  height='100%'
                  className='!h-full !w-full object-cover [&__video]:object-cover'
                  {...playerProps}
                  //   onPlay={handlePlay}
                  //   onPause={handlePause}
                  onEnded={handlePause}
                />
              ) : (
                <ReactPlayer
                  ref={playerRef}
                  url={convertToIframe(media)}
                  width='100%'
                  height='100%'
                  className='!h-full !w-full object-cover [&_div_iframe]:object-cover'
                  {...playerProps}
                  //   onPlay={handlePlay}
                  //   onPause={handlePause}
                  onEnded={handlePause}
                />
              ))}
          </div>
          <ImageV2
            src={media.thumbnail.url}
            alt={media.thumbnail.alt}
            width={media.thumbnail.width ? media.thumbnail.width : 1312 * 2}
            height={media.thumbnail.height ? media.thumbnail.height : 738 * 2}
            className={cn(
              'absolute left-0 top-0 h-full w-full object-cover transition-all',
              {
                'invisible opacity-0': playerProps.playing,
              },
            )}
          />
          <div
            className={cn(
              'absolute left-0 top-0 block h-full w-full bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)] transition-all',
              {
                'invisible opacity-0': playerProps.playing,
              },
            )}
          ></div>
          <button
            onClick={handlePlay}
            className={cn(
              'absolute left-1/2 top-1/2 size-[2rem] -translate-x-1/2 -translate-y-1/2 transition-all sm:size-[4.5rem]',
              {
                'invisible opacity-0': playerProps.playing,
              },
            )}
          >
            <PlayBtn className='h-full w-full' />
          </button>
        </div>
      </div>
    </section>
  )
}

function PlayBtn({className}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={72}
      height={72}
      viewBox='0 0 72 72'
      fill='none'
      className={className}
    >
      <g filter='url(#filter0_b_2330_71590)'>
        <rect
          width={72}
          height={72}
          rx={36}
          fill='white'
          fillOpacity={0.3}
        />
        <path
          d='M51.5 33.4019C53.5 34.5566 53.5 37.4434 51.5 38.5981L30.5 50.7224C28.5 51.8771 26 50.4338 26 48.1244L26 23.8756C26 21.5662 28.5 20.1229 30.5 21.2776L51.5 33.4019Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_b_2330_71590'
          x={-13}
          y={-13}
          width={98}
          height={98}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            floodOpacity={0}
            result='BackgroundImageFix'
          />
          <feGaussianBlur
            in='BackgroundImageFix'
            stdDeviation={6.5}
          />
          <feComposite
            in2='SourceAlpha'
            operator='in'
            result='effect1_backgroundBlur_2330_71590'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_backgroundBlur_2330_71590'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}
