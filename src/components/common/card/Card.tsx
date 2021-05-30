import React from 'react'
import { Link } from 'src/components/common/link'
import Img from 'gatsby-image'
import { GetExcerpt } from 'src/utils/formatting'
import css from './card.module.scss'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import { useIntl } from 'gatsby-plugin-intl'

interface CardProps {
  title: string
  description?: string
  imageUrl?: any
  linkUrl?: string
  expandLink?: boolean
  date?: Date
  metadata?: string[]
  className?: string
}

export const Card = React.forwardRef((props: CardProps, ref: any) => {
  const intl = useIntl()
  let className = css['card']

  if (props.className) className = `${props.className} ${className}`
  if (props.expandLink) className = `${css['expand-link']} ${className}`
  if (props.imageUrl) className = `${className} ${css['img']}`

  // RTD entire card as a link
  const link =
    props.expandLink || !props.linkUrl ? (
      props.title
    ) : (
      <Link className="hover-underline" to={props.linkUrl}>
        {props.title}
      </Link>
    )

  const image = (() => {
    if (!props.imageUrl) return null

    const isGatsbyOptimized = typeof props.imageUrl !== 'string'

    if (isGatsbyOptimized) {
      return (
        <div className={css['img-wrapper']}>
          <Img className={css['img']} fluid={props.imageUrl} />
        </div>
      )
    }

    return (
      <div className={css['img-wrapper']}>
        <img alt={props.title} className={`${css['img']} ${css['not-gatsby']}`} src={props.imageUrl} />
      </div>
    )
  })()

  const cardContent = (
    <>
      {image}

      <div className={css['body']}>
        <p className={css['title']}>{link}</p>
        {props.description && (
          <p className={css['text']} dangerouslySetInnerHTML={{ __html: GetExcerpt(props.description) }} />
        )}

        <div className={css['bottom-section']}>
          {props.metadata && (
            <div className={css['metadata']}>
              {props.metadata.map((text, index) => (
                <small key={props.title + '_' + index}>{text}</small>
              ))}
            </div>
          )}

          {props.linkUrl && (
            <Link to={props.linkUrl} className={css['read-more']}>
              {intl.formatMessage({ id: 'readmore' })}
              <IconArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  )

  if (props.expandLink && props.linkUrl) {
    return (
      <Link className={className} to={props.linkUrl}>
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={className} ref={ref}>
      {cardContent}
    </div>
  )
})
