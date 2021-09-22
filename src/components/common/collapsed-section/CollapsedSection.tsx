import React, { useState } from 'react'
import css from './collapsed.module.scss'
import ChevronDown from 'src/assets/icons/chevron-down.svg'
import ChevronUp from 'src/assets/icons/chevron-up.svg'

interface SectionProps {
  title?: string
  children?: any
}

export const CollapsedSectionHeader = (props: any) => {
  return (
    <div className={css['header']} onClick={() => props.setOpen(!props.open)}>
      {props.children}

      <div className={css['icon']}>{props.open ? <ChevronUp /> : <ChevronDown />}</div>
    </div>
  )
}

export const CollapsedSectionContent = (props: any) => {
  const ref = React.useRef<any>()
  const locked = React.useRef<any>()

  // Set the size to 0px immediately (it's closed to begin with)
  React.useLayoutEffect(() => {
    ref.current.style.setProperty('--contentHeight', `0px`)
  }, [])

  React.useEffect(() => {
    if (props.open) {
      ref.current.style.setProperty('--contentHeight', `${ref.current.scrollHeight}px`)
    } else {
      locked.current = true

      // Can't animate from auto to 0px:
      // Have to stagger the content height changes to move element height from "auto" => natural size (in exact px) => 0px
      // Have to "lock" so the transition event handler doesn't re-trigger while this occurs
      ref.current.style.setProperty('--contentHeight', `${ref.current.scrollHeight}px`)

      setTimeout(() => {
        ref.current.style.setProperty('--contentHeight', `0px`)

        locked.current = false
      }, 10)
    }
  }, [props.open])

  React.useEffect(() => {
    if (props.open) {
      // Set height to auto when the transition completes - this allows the content to change size after it becomes visible (just to prevent some edge cases)
      const handler = () => {
        if (locked.current) return

        ref.current.style.setProperty('--contentHeight', `auto`)
      }

      const el = ref.current

      el.addEventListener('transitionend', handler)

      return () => {
        el.removeEventListener('transitionend', handler)
      }
    }
  }, [props.open])

  return (
    <div ref={ref} className={css['content']}>
      {props.children}
    </div>
  )
}

export function CollapsedSection(props: SectionProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={css['container']}>
      {React.Children.map(props.children, child => {
        if (child && child.type.name === 'CollapsedSectionHeader') return React.cloneElement(child, { open, setOpen })

        return React.cloneElement(child, { open })
      })}
    </div>
  )
}
