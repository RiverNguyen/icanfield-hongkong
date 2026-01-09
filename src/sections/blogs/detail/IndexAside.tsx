'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function IndexAside({ htmlString }: { htmlString: string }) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sections = document.querySelectorAll('h2, h3')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.025 }
    )
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const headingRegex = /<(h2|h3)[^>]*>(.*?)<\/\1>/g
  const headings: { text: string; id: string; level: string }[] = []
  let match
  let index = 1

  while ((match = headingRegex.exec(htmlString)) !== null) {
    headings.push({
      text: match[2].trim(),
      id: `section-${index}`,
      level: match[1] // h2 or h3
    })
    index++
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 200,
        behavior: 'smooth'
      })
    }
  }

  return (
    <ul className='pl-[1.75rem] xsm:pl-[1.25rem] sm:list-disc space-y-[1.5rem] xsm:space-y-[0.25rem] sm:border-l-[0.25rem] sm:border-solid sm:border-[rgba(107,54,0,0.11)] ul_auto'>
      {headings?.map((content: { text: string; id: string; level: string }, index: number) => (
        <li
          key={index}
          className={cn(
            'transition-all cursor-pointer !text-[1rem] [&_span]:!text-[1rem] xsm:[&_span]:!text-[0.75rem] !font-medium tracking-[-0.01rem] xsm:!text-[0.75rem]',
            content.level === 'h3' && 'pl-4 list-none !text-[#ad6903]', // Indent h3 and remove list style
            activeSection === content.id
              ? '!text-[#ad6903] !font-medium [&_*]:!text-[#ad6903]'
              : '!text-[#ad6903] xsm:!text-[#ad6903] [&_*]:!text-[#ad6903]'
          )}
        >
          <Link
            href={`#${content.id}`}
            onClick={(e) => {
              e.preventDefault()
              handleScroll(content.id)
            }}
            className={cn(
              'transition-all !text-[1rem] font-medium [&_strong]:font-medium tracking-[-0.01rem] [&_span]:!text-[1rem] xsm:[&_span]:!text-[0.75rem] xsm:text-orangetext-800  xsm:!text-[0.75rem] xsm:font-medium xsm:tracking-[-0.0075rem]',
              activeSection === content.id
                ? '!text-[#ad6903] [&_*]:!text-[#ad6903]'
                : '!text-[#ad6903] [&_*]:!text-[#ad6903]'
            )}
            dangerouslySetInnerHTML={{ __html: content?.text || '' }}
          />
        </li>
      ))}
    </ul>
  )
}