import React, { useState } from 'react'
import css from './filter.module.scss'

interface FilterProps {
  filters: string[]
  onFilter?: (value: string) => void
}

export function Filter(props: FilterProps) {
  const [filter, setFilter] = useState('')

  function onFilter(value: string) {
    setFilter(value)

    if (props.onFilter) props.onFilter(value)
  }

  return (
    <div className={css['container']}>
      <p onClick={() => onFilter('')} className={filter === '' ? css['active-filter'] : undefined}>
        All
      </p>
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
