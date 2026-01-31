'use client'

import ImageV2 from '@/components/image/ImageV2'
import {Term} from '@/types/dataAppraisal.interface'

export default function NationButtons({
  nations,
  selected,
  onChange,
  max = 3,
}: {
  nations: Term[]
  selected: string[]
  onChange: (next: string[]) => void
  max?: number
}) {
  return (
    <div className='grid grid-cols-4 gap-[0.5rem]'>
      {nations.map((e: Term) => {
        const slug = e?.slug || ''
        const isSelected = selected.includes(slug)
        return (
          <button
            type='button'
            aria-pressed={isSelected}
            onClick={() => {
              const exists = selected.includes(slug)
              let next: string[]
              if (exists) {
                next = selected.filter((s) => s !== slug)
              } else {
                if (selected.length >= max) return
                next = [...selected, slug]
              }
              onChange(next)
            }}
            className={
              'm flex items-center rounded-[0.5rem] border p-[0.75rem_1rem] ' +
              (isSelected ? 'border-transparent bg-background' : 'border-[rgba(0,0,0,0.10)]')
            }
            key={slug}
          >
            {e?.flag && (
              <ImageV2
                src={e?.flag}
                alt={e?.name}
                width={48}
                height={48}
                className='mr-2 h-[1.25rem] w-[1.25rem] rounded-full object-cover'
              />
            )}
            {e?.name}
          </button>
        )
      })}
    </div>
  )
}

