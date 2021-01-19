import React, { ReactNode } from 'react'
import css from './label.module.scss'

enum LabelTypes {
  'warning',
  'success',
  'error',
  'neutral',
}

type LabelProps = {
  type?: LabelTypes
  children?: ReactNode
  style?: {
    [key: string]: string
  }
}

export const Label = (props: LabelProps) => {
  let className = css['label']

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
