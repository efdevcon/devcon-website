import React from 'react'
import IconMinus from 'assets/icons/chevron-up.svg'
import IconPlus from 'assets/icons/chevron-down.svg'
import css from './accordion.module.scss'
import { AccordionItem } from './types'

interface AccordionProps {
  items: AccordionItem[]
  dense?: boolean
}

const Accordion = (props: AccordionProps) => {
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({})

  let className = css['accordion']

  if (props.dense) className += ` ${css['dense']}`

  return (
    <ul className={className}>
      {props.items.map((item: AccordionItem) => {
        let className = css['accordion-item']

        const selected = open[item.id]

        if (selected) className += ` ${css['open']}`

        return (
          <li
            key={item.id}
            onClick={() => {
              const nextOpenState = {
                ...open,
                [item.id]: !selected,
              }

              setOpen(nextOpenState)
            }}
            className={className}
          >
            <div className={css['header']}>
              <span className={css['title']}>{item.title}</span>
              {selected ? <IconMinus /> : <IconPlus />}
            </div>
            <div className={css['content']}>{item.body}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default Accordion
