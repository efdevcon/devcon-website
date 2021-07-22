import React from 'react'
import { InputForm } from 'src/components/common/input-form'
import IconSearch from 'src/assets/icons/search.svg'
import css from './search.module.scss'

export const Search = (props: any) => {
  let className = css['search-foldout']

  if (props.open) {
    className += ` ${css['open']}`
  }

  // Just hardcoded for now
  const results = [
    <div className={css['result']}>
      <IconSearch />
      <p>Ethereum in 25 minutes</p>
    </div>,
    <div className={css['result']}>
      <IconSearch />
      <p>Ethereum in 25 minutes</p>
    </div>,
    <div className={css['result']}>
      <IconSearch />
      <p>Ethereum in 25 minutes</p>
    </div>,
  ]

  return (
    <div className={className}>
      <div className={`${css['content']}`}>
        <InputForm
          placeholder="Search (NOT FUNCTIONAL)"
          icon={IconSearch}
          className={css['search-input']}
          transparentMode
        />

        <div className={css['results']}>
          <p className="text-uppercase font-xs bold">Suggested</p>

          {results}
        </div>
      </div>
    </div>
  )
}
