"use client"
import ImageV2 from "@/components/image/ImageV2";
import useInterView from "@/hooks/useInterView";
import { cn } from "@/lib/utils";

export default function ContactV2({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const { isVisible, elementRef } = useInterView({ threshold: 0.4 })
    return (
        <section
            ref={elementRef}
            className='flex h-[100vh] xsm:h-max relative bg-[linear-gradient(180deg,#F6F6F4_0%,#FAF8F1_100%)]'
        >
            <div className='relative w-[57rem] h-full xsm:hidden'>
                <ImageV2
                    alt=''
                    width={912}
                    height={825}
                    src={'/imgs/homepage/section-ketnoi/banner-formlh.png'}
                    className={cn('xsm:hidden transition-all duration-700 absolute w-[57rem] h-[51.5625rem] object-cover',
                        isVisible ? 'bottom-[-10rem]' : 'bottom-[-21rem]'
                    )}
                />
            </div>
            <ImageV2
                alt=''
                width={912}
                height={825}
                src={'/imgs/homepage/section-ketnoi/bg-sectionform.png'}
                className='xsm:hidden absolute right-0 bottom-0 h-[44rem] w-[81.5rem] object-cover'
            />
            {children}
        </section>
    )
}
