import React, { ReactNode } from 'react'
import css from './list.module.scss'

export type ListProps = {
  className?: string
  children?: ReactNode
  style?: {
    [key: string]: string
  }
}

export const ListItem = (props: ListProps) => {
  let className = css['list-item']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className} style={props.style}>
      {props.children}
    </div>
  )
}

export const List = (props: ListProps) => {
  let className = css['list']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className} style={props.style}>
      {props.children}
    </div>
  )
}
