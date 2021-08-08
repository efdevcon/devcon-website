import React from 'react'
import css from './link-button.module.scss'
import { Button } from '../button'

export const LinkButton = (props: any) => {
    let className = css['link-button']
    if (props.className) className += ` ${props.className}`

  return (
    <Button className={className} {...props}>
        {props.children}
    </Button>
  )
}

