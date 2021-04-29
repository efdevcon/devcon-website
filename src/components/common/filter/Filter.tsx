import React, { Dispatch, SetStateAction, useState } from 'react'
import css from './filter.module.scss'
import { Dropdown } from 'src/components/common/dropdown'

type FilterOptions = {
  filters: {
    text: string
    value: any
  }[]
  filterFunction: (currentFilter?: string) => any[]
}

type FilterState = {
  options: FilterOptions
  activeFilter: string
  setActiveFilter: Dispatch<SetStateAction<string>>
}

export const useFilter = (options: FilterOptions) => {
  const [activeFilter, setActiveFilter] = React.useState(options.filters[0].value)

  const filterState: FilterState = {
    options,
    activeFilter,
    setActiveFilter,
  }

  const filteredData = options.filterFunction(activeFilter)

  return [filteredData, filterState] as [any[], FilterState]
}

export const Filter = (props: FilterState) => {
  return (
    <>
      <Dropdown
        className={css['dropdown']}
        options={props.options.filters}
        value={props.activeFilter}
        onChange={nextValue => props.setActiveFilter(nextValue)}
      />

      <div className={css['filter']}>
        {props.options.filters.map(i => {
          return (
            <p
              key={i.value}
              onClick={() => props.setActiveFilter(i.value)}
              className={props.activeFilter === i.value ? css['active-filter'] : undefined}
            >
              {i.text}
            </p>
          )
        })}
      </div>
    </>
  )
}
