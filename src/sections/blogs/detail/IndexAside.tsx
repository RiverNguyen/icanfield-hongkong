'use client'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function IndexAside({htmlString}: {htmlString: string}) {
  const [activeSection, setActiveSection] = useState<string>('')
  useEffect(() => {
    const sections = document.querySelectorAll('h2')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {threshold: 0.025}, // Chỉ cần 0.01% section xuất hiện trong viewport là kích hoạt
    )
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g
  const h2Contents: {text: string; id: string}[] = []
  let match
  let index = 1
  while ((match = h2Regex.exec(htmlString)) !== null) {
    h2Contents.push({text: match[1].trim(), id: `section-${index}`}) // Gán ID cho mỗi mục lục
    index++
  }
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Cuộn đến phần tử và thêm offset (khoảng cách từ top)
      window.scrollTo({
        top: element.offsetTop - 200, // Khoảng cách từ top có thể điều chỉnh theo nhu cầu
        behavior: 'smooth', // Cuộn mượt mà
      })
    }
  }
  return (
    <ul className='pl-[1.75rem] xsm:pl-[1.25rem] sm:list-disc space-y-[1.5rem] xsm:space-y-[0.25rem] sm:border-l-[0.25rem] sm:border-solid sm:border-[rgba(107,54,0,0.11)] ul_auto'>
      {h2Contents?.map((content: {text: string; id: string}, index: number) => (
        <li
          key={index}
          className={cn(
            'transition-all cursor-pointer text-[1rem] font-medium tracking-[-0.01rem] xsm:text-[0.75rem]',
            activeSection === content.id
              ? 'text-orangetext-800'
              : 'text-[rgba(0,18,36,0.54)] xsm:text-orangetext-800',
          )}
        >
          <Link
            href={`#${content.id}`}
            onClick={(e) => {
              e.preventDefault() // Ngăn việc chuyển trang
              handleScroll(content.id) // Cuộn đến phần tử với ID tương ứng
            }}
            className={cn(
              'transition-all text-[1rem] font-medium tracking-[-0.01rem] xsm:text-orangetext-800 xsm:text-[0.75rem] xsm:font-medium xsm:tracking-[-0.0075rem]',
              activeSection === content.id
                ? 'text-orangetext-800'
                : 'text-[rgba(0,18,36,0.54)]',
            )}
            dangerouslySetInnerHTML={{__html: content?.text}}
          >
          </Link>
        </li>
      ))}
    </ul>
  )
}
