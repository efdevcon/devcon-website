import { Link } from 'gatsby'
import React from 'react'
import { GetExcerpt } from 'src/utils/formatting'
import css from './Card.module.scss'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'

interface CardProps {
  title: string
  description?: string
  imageUrl?: string
  linkUrl?: string
  metadata?: string[]
}

export function Card(props: CardProps) {
  const body = (
    <>
      {props.imageUrl && <img src={props.imageUrl} className={css['card-img']} alt={props.title} />}
      <div className={css['card-body']}>
        <h4 className={css['card-title']}>{props.title}</h4>
        {props.description && <p className={css['card-text']}>{GetExcerpt(props.description)}</p>}
        <div className={css['card-meta']}>
          {props.metadata && props.metadata.map((text, index) => <small key={props.title + '_' + index}>{text}</small>)}
          {props.linkUrl && <IconArrowRight />}
        </div>
      </div>
    </>
  )

  if (props.linkUrl) {
    return (
      <Link to={props.linkUrl} className={css['card']}>
        {body}
      </Link>
    )
  }

  return <div className={css['card']}>{body}</div>
}
