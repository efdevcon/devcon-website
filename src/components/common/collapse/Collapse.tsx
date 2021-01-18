import React, { useState } from 'react'
import css from './collapse.module.scss'

import IconArrowCollapse from 'src/assets/icons/arrow_collapse.svg'
import IconArrowDropdown from 'src/assets/icons/arrow_drop_down.svg'

interface CollapseProps {
  title: string
  body: string
  expanded?: boolean
}

export function Collapse(props: CollapseProps) {
  const [expanded, setExpanded] = useState(props.expanded || false)

  return (
    <div className={css['container']}>
      <div className={css[expanded ? 'active' : 'header']} onClick={() => setExpanded(!expanded)}>
        <span>{props.title}</span>
        {!expanded && <IconArrowDropdown />}
        {expanded && <IconArrowCollapse />}
      </div>
      {expanded && (
        <div className={css['body']}>
          <p dangerouslySetInnerHTML={{ __html: props.body }} />
        </div>
      )}
    </div>
  )
}
