import React from 'react'
import IconMinus from 'assets/icons/minus.svg'
import IconPlus from 'assets/icons/plus.svg'
import css from './accordion.module.scss'
import { AccordionItem } from './types'

interface AccordionProps {
  items: AccordionItem[]
}

const Accordion = (props: AccordionProps) => {
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({})

  return (
    <ul className={css['accordion']}>
      {props.items.map((item: AccordionItem) => {
        let className = css['accordion-item']

        const selected = open[item.title]

        if (selected) className += ` ${css['open']}`

        return (
          <li
            key={item.title}
            onClick={() => {
              const nextOpenState = {
                ...open,
                [item.title]: !selected,
              }

              setOpen(nextOpenState)
            }}
            className={className}
          >
            <div className={css['header']}>
              <p className={css['title']}>{item.title}</p>
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
