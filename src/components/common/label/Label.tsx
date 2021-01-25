import React, { ReactNode } from 'react'
import css from './label.module.scss'

enum LabelTypes {
  warning = 'warning',
  success = 'success',
  error = 'error',
  neutral = 'neutral',
}

type LabelProps = {
  type?: LabelTypes
  className: string
  children?: ReactNode
  style?: {
    [key: string]: string
  }
}

export const Label = (props: LabelProps) => {
  let className = css['label']

  if (props.className) className += ` ${props.className}`

  switch (props.type) {
    case 'success':
    case 'error':
    case 'warning': {
      className += ` ${css[props.type]}`
    }
  }

  return (
    <div className={className} style={props.style}>
      {props.children}
    </div>
  )
}
