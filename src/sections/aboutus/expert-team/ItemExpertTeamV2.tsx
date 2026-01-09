import {cn} from '@/lib/utils'

export default function ItemExpertTeamV2({
  srcImage,
  index,
  className,
}: {
  srcImage: string
  index: number
  className?: string
  }) {

  return (
    <div
      className={cn(
        'item-expert-team relative h-[38.125rem] w-[16.125rem] transition-all duration-700 xsm:h-[20.94319rem] xsm:w-full',
        className,
      )}
    >
      <svg
        className='human-photo absolute bottom-0 left-0 h-auto w-full object-contain'
        width={477}
        height={613}
        viewBox='0 0 477 613'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <path
          className='human-photo-path'
          d='M272.666 588.649C336.907 568.377 391.327 537.89 427.371 504.908C463.296 472.035 481.462 436.177 471.728 405.328C461.993 374.48 426.536 355.543 378.251 349.243C329.805 342.922 267.742 349.192 203.502 369.463C139.261 389.734 84.8405 420.222 48.7967 453.204C12.8719 486.077 -5.2941 521.935 4.44023 552.783C14.1746 583.631 49.6315 602.569 97.9174 608.869C146.363 615.189 208.426 608.92 272.666 588.649Z'
          fill='url(#paint0_linear_884_29267)'
          stroke='url(#paint1_linear_884_29326)'
          strokeWidth={3.55833}
        />
        <path
          className='path-svg xsm:scale-[1] '
          fillRule='evenodd'
          clipRule='evenodd'
          d='M454.762 41.5371H22.4831V485.376C6.00841 508.613 -0.38438 524.858 6.13542 552.519C24.9391 612.108 144.029 627.646 272.13 587.223C400.23 546.8 488.833 465.725 470.03 406.135C467.163 397.051 461.966 388.991 454.762 381.997V42.5371Z'
          fill={`url(#pattern1_884_29326${index})`}
        />
        <defs>
          <pattern
            id={'pattern1_884_29326' + index}
            patternContentUnits='objectBoundingBox'
            width={1}
            height={1}
          >
            <use
              xlinkHref={`#image1_884_29326${index}`}
              transform='matrix(0.000767469 0 0 0.000634518 -0.22142 0)'
            />
          </pattern>
          <linearGradient
            id='paint0_linear_884_29267'
            x1={-4.14318}
            y1={158.995}
            x2={280.317}
            y2={248.255}
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0.45}
              stopColor='#95502F'
            />
            <stop
              offset={1}
              stopColor='#F5C178'
            />
          </linearGradient>
          <linearGradient
            id='paint0_linear_884_29326'
            x1={204.037}
            y1={371.16}
            x2={272.131}
            y2={586.952}
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#F7EAD2' />
            <stop
              offset={1}
              stopColor='white'
            />
          </linearGradient>
          <linearGradient
            id='paint1_linear_884_29326'
            x1={-51.4189}
            y1={369.852}
            x2={488.233}
            y2={368.985}
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0.164}
              stopColor='#95502F'
            />
            <stop
              offset={1}
              stopColor='#F5C178'
            />
          </linearGradient>
          <image
            id={'image1_884_29326' + index}
            width={1880}
            height={1498}
            className='scale-[1.05]'
            href={srcImage || ''}
          />
        </defs>
      </svg>
    </div>
  )
}
