import React, { Dispatch, SetStateAction, useState } from 'react'
import css from './filter.module.scss'
import { Dropdown } from 'src/components/common/dropdown'
import IconFilter from 'src/assets/icons/filter.svg'

export type FilterOptions = {
  filters: {
    text: string
    value: any
  }[]
  filterFunction: (currentFilter?: string) => any[]
}

type FilterState = {
  collapsed?: boolean
  options: FilterOptions
  activeFilter: string
  setActiveFilter: Dispatch<SetStateAction<string>>
}

export const useFilter = (options: FilterOptions | undefined) => {
  const [activeFilter, setActiveFilter] = React.useState(options?.filters[0].value)

  if (!options) return [[], null] as [any[], null]

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
    <div className={`${css['filter']} ${props.collapsed ? css['collapsed'] : ''}`}>
      <Dropdown
        className={css['dropdown']}
        customIcon={IconFilter}
        options={props.options.filters}
        value={props.activeFilter}
        onChange={nextValue => props.setActiveFilter(nextValue)}
      />

      <div className={css['inline']}>
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
    </div>
  )
}
