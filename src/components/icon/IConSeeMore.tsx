export default function IConSeeMore({className}: {className?: string}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="25" 
            viewBox="0 0 24 25" 
            fill="none"
            className={className}
        >
            <path 
                d="M1 1L12 12L23 1" 
                stroke="#5C321E" 
                strokeWidth="2"
            />
            <path 
                d="M1 12L12 23L23 12" 
                stroke="#5C321E" 
                strokeWidth="2"
            />
        </svg>
    )
}