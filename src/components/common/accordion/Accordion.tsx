import React, { useState } from 'react'
import css from './accordion.module.scss'

import IconMinus from 'src/assets/icons/minus.svg'
import IconArrowCollapse from 'src/assets/icons/arrow_collapse.svg'
import IconArrowDropdown from 'src/assets/icons/arrow_drop_down.svg'
import { AccordionItem } from './AccordionItem'

interface AccordionProps { 
  title: string
  items: AccordionItem[]
  open: boolean
}

export function Accordion(props: AccordionProps) {
  const [opens, setOpens] = useState(props.items.map(i => props.open))

  function toggle(index: number) { 
    if (index === -1) {
      const newState = opens.includes(false) ? true : false;
      setOpens(props.items.map(i => newState))
    }
    else { 
      opens[index] = !opens[index];
      setOpens([...opens])
    }
  }

  return (
    <div>
      <div className={css['category']}>
        <h3>{props.title}</h3>
        <span role='button' className={css['collapse']} onClick={() => toggle(-1)}><IconMinus /></span>
      </div>

      {props.items.length > 0 && props.items.map((item, index) => {
        const open = opens[index];
        return (
          <div key={item.id} className={css['container']}>
            <div className={css[open ? 'active' : 'header']} onClick={() => toggle(index)}>
              <span>{item.title}</span>
              {!open && <IconArrowDropdown />}
              {open && <IconArrowCollapse />}
            </div>
            {open && (
              <div className={css['body']}>
                <p dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}