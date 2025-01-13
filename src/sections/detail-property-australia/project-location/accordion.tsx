'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import {cn} from '@/lib/utils'
import ImageV2 from '@/components/image/ImageV2'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...props}, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={className}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between pb-3 text-left text-sm font-medium transition-all hover:underline [&[data-state=closed]>#minus]:hidden [&[data-state=closed]>#plus]:block [&[data-state=open]>#minus]:block [&[data-state=open]>#plus]:hidden',
        className,
      )}
      {...props}
    >
      {children}
      <ImageV2
        src='/icons/minus.svg'
        alt=''
        width={50}
        height={50}
        id='minus'
        className='h-5 w-5 object-cover'
      />
      <ImageV2
        src='/icons/plus.svg'
        alt=''
        width={50}
        height={50}
        id='plus'
        className='h-5 w-5 object-cover'
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn('border-t border-[#B9B9B9] pb-4 pt-3', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent}
