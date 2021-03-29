import React, { useState } from 'react'
import css from './filter.module.scss'

interface FilterProps {
  filters: string[]
  onFilter?: (value: string) => void
}

export function Filter(props: FilterProps) {
  const defaultValue = props.filters[0]
  const [filter, setFilter] = useState(defaultValue)

  function onFilter(value: string) {
    setFilter(value)

    if (props.onFilter) props.onFilter(value)
  }

  return (
    <div className={css['container']}>
      {props.filters.map(i => {
        return (
          <p
            key={'archive_filter_' + i}
            onClick={() => onFilter(i)}
            className={filter === i ? css['active-filter'] : undefined}
          >
            {i}
          </p>
        )
      })}
    </div>
  )
}
