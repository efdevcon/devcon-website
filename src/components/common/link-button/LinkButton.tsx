import React from 'react'
import css from './link-button.module.scss'
import { Link } from '../link'
import { Button } from '../button'

export const LinkButton = (props: any) => {
    let className = css['link-button']
    if (props.className) className += ` ${props.className}`

  return (
    <Link className={className} {...props}>
        <Button className={className} {...props}>
            {props.children}
        </Button>
    </Link>
  )
}

