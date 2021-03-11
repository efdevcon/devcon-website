import React from 'react'
import { Link } from 'src/components/common/link'
import { GetExcerpt } from 'src/utils/formatting'
import css from './card.module.scss'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import { useIntl } from 'gatsby-plugin-intl'

interface CardProps {
  title: string
  description?: string
  imageUrl?: string
  linkUrl?: string
  date?: Date
  metadata?: string[]
  className?: string
}

export const Card = React.forwardRef((props: CardProps, ref: any) => {
  const intl = useIntl()
  let className = css['card']

  if (props.className) className = `${props.className} ${className}`
  if (props.imageUrl) className = `${className} ${css['img']}`

  // RTD entire card as a link
  const link = props.linkUrl ? <Link to={props.linkUrl}>{props.title}</Link> : props.title

  return (
    <a className={className} ref={ref} href={props.linkUrl} target="_blank" rel="noopener noreferrer">

      {props.imageUrl && (
        <div className={css['img-wrapper']}>
          <img src={props.imageUrl} className={css['img']} alt={props.title} />
        </div>
      )}

      <div className={css['body']}>
        <h4 className={css['title']}>{props.title}</h4>
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
                <span className={css['text-uppercase']}>
                  {intl.formatMessage({ id: 'readmore' })}
                </span>
              </p>
              <span>
                <IconArrowRight />
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  )
})
