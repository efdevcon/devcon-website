import React, { createRef, useEffect, useState } from 'react'
import css from './dropdown.module.scss'
import IconArrowDropdown from 'src/assets/icons/arrow_drop_down.svg'

interface FilterProps {
  filters: string[]
  onFilter?: (value: string) => void
}

export function Dropdown(props: FilterProps) {
  const defaultValue = props.filters[0]
  const [filter, setFilter] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const ref = createRef()

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside, open])

  function handleClickOutside(e: any) {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false)
    }
  }

  function onFilter(value: string) {
    setFilter(value)
    setOpen(false)

    if (props.onFilter) props.onFilter(value)
  }

  return (
    <div className={css['container']} ref={ref}>
      <span role="button" className={css['link']} onClick={() => setOpen(!open)}>
        {filter}
        <span className={css['icon']}>
          <IconArrowDropdown />
        </span>
      </span>

      {open && (
        <ul className={css['dropdown']}>
          {props.filters.map(i => {
            return (
              <li key={'archive_filter_' + i} onClick={() => onFilter(i)}>
                <span className={filter === i ? css['active-filter'] : undefined}>{i}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
