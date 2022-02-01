import React from 'react'
import css from './thumbnail-block.module.scss'
import trackIcon from './track-icon.png'

export const ThumbnailBlock = (props: any) => {
  let className = css['container']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <div data-type="thumbnail-block-image" className={css['thumbnail-container']}>
        <img src={trackIcon} alt="track" />
      </div>
      <div data-type="thumbnail-block-content" className={css['children']}>
        {props.children}
      </div>
    </div>
  )
}
