import React from 'react'
import { Link } from 'gatsby'
import { Link as LinkType } from 'src/types/Link'

interface LinkProps {
  link: LinkType
  lang: string
  className?: string
}

export function LinkComponent(props: LinkProps) {
  if (props.link.type === 'page') {
    return (
      <Link className={props.className} to={props.link.url.replace(':lang', props.lang)}>
        {props.link.title}
      </Link>
    )
  }

  return <a href={props.link.url}>{props.link.title}</a>
}
