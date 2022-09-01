import Image from 'next/image'
import React from 'react'
import css from './thumbnail-block.module.scss'
import trackIcon from './track-icon.png'

type ThumbnailBlock = {
  children: any
  className?: string
  thumbnailAlt?: string
  thumbnailSubtext?: string
}

export const ThumbnailBlock = (props: ThumbnailBlock) => {
  let className = css['container']

  if (props.className) className += ` ${props.className}`

  if (props.thumbnailSubtext) className += ` ${css['with-subtext']}`

  return (
    <div className={className}>
      <div data-type="thumbnail-block-image" className={css['thumbnail-container']}>
        <Image src={trackIcon} width="56px" height="56px" alt={props.thumbnailAlt || 'thumbnail'} />
        {props.thumbnailSubtext && <p className={css['thumbnail-text']}>{props.thumbnailSubtext}</p>}
      </div>
      <div data-type="thumbnail-block-content" className={css['children']}>
        {props.children}
      </div>
    </div>
  )
}
