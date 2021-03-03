import React, { useState } from 'react'
import css from './filter.module.scss'

interface FilterProps {
  onFilter?: (value: string) => void
}

export function Filter(props: FilterProps) {
  const editions = ['0', '1', '2', '3', '4', '5']
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
      {editions.map(i => {
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
