export default function IConAdd({className}: {className?: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={className}
        >
            <path
                className="transition-all"
                d="M15 10L5 10"
                stroke="url(#paint0_linear_3048_20464)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                className="path-2 rotate-90 translate-x-[1.05rem] xsm:translate-x-[1.2rem] transition-all"
                d="M15 10L5 10"
                stroke="url(#paint0_linear_3048_20464)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_3048_20464"
                    x1="15"
                    y1="9.65476"
                    x2="11.286"
                    y2="15.076"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0.45"
                        stopColor="#95502F"
                    />
                    <stop
                        offset="1"
                        stopColor="#F5C178"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}