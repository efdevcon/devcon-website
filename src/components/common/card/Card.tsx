import React from 'react'
import { Link } from 'src/components/common/link'
import { GetExcerpt } from 'src/utils/formatting'
import css from './card.module.scss'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'

interface CardProps {
  title: string
  description?: string
  imageUrl?: string
  linkUrl?: string
  date?: Date
  metadata?: string[]
}

// API of this component is still a bit up in the air
export const Card = (props: CardProps) => {
  let className = css['card']

  if (props.imageUrl) className = `${className} ${css['img']}`

  const link = props.linkUrl ? <Link to={props.linkUrl}>{props.title}</Link> : props.title

  return (
    <div className={className}>
      {props.imageUrl && (
        <div className={css['img-wrapper']}>
          <img src={props.imageUrl} className={css['img']} alt={props.title} />{' '}
        </div>
      )}

      <div className={css['body']}>
        <h4 className={css['title']}>{link}</h4>
        {props.description && <p className={css['text']}>{GetExcerpt(props.description)}</p>}

        <div className={css['bottom-section']}>
          {props.metadata && (
            <div className={css['metadata']}>
              {props.metadata.map((text, index) => (
                <small key={props.title + '_' + index}>{text}</small>
              ))}
            </div>
          )}

          {props.linkUrl && (
            <div className={css['read-more']}>
              <p>
                <Link to={props.linkUrl}>READ MORE</Link>
              </p>
              <Link to={props.linkUrl}>
                <IconArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
