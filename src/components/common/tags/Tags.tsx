import React from 'react'
import css from './tags.module.scss'
import { Tag } from 'src/types/Tag'
import { Link } from '../link'
import { useIntl } from 'gatsby-plugin-intl'

interface Props {
  items: Tag[]
  viewOnly?: boolean
  className?: string
}

export function Tags(props: Props) {
  const intl = useIntl()

  let className = css['tags']
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {props.items.map(item => {
        if (props.viewOnly) {
          return (
            <div key={item.slug} className="label bold">
              {item.title}
            </div>
          )
        } else {
          return (
            <Link key={item.slug} className="label bold" to={`/${item.lang}/search/?q=${item.title}`}>
              {item.title}
            </Link>
          )
        }
      })}
    </div>
  )
}
