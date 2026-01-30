const ChevronRight = ({className}: {className?: string}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
  >
    <path
      d='M10 8L14 12L10 16'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default ChevronRight
