import React from 'react'
import SearchIcon from 'src/assets/icons/search.svg'

type InputProps = {
  onChange: () => any
  value: string | number | undefined
}

export const Input = (props: InputProps) => {
  return (
    <div label-for="input">
      <input id="input" type="text" value={props.value} onChange={props.onChange}></input>
    </div>
  )
}
