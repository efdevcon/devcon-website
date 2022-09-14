import Image from 'next/image'
import React from 'react'
import css from './thumbnail-block.module.scss'
import { getTrackImage, getTrackID } from 'components/domain/index/track-list/TrackList'

type ThumbnailBlock = {
  children: any
  className?: string
  track?: string
  unoptimized?: boolean
  thumbnail?: any
  thumbnailAlt?: string
  thumbnailSubtext?: string
  onMouseEnter?: any
}

export const ThumbnailBlock = (props: ThumbnailBlock) => {
  let className = css['container']

  if (props.className) className += ` ${props.className}`

  if (props.thumbnailSubtext) className += ` ${css['with-subtext']}`

  const trackID = getTrackID(props.track)

  if (trackID) className += ` ${css[trackID]}`

  const thumbnailSubtext = (() => {
    if (props.thumbnailSubtext) {
      return <p className={css['thumbnail-text']}>{props.thumbnailSubtext}</p>
    }

    return null
  })()

  const thumbnail = (() => {
    if (trackID) {
      return (
        <div data-type="thumbnail-block-image" className={css['thumbnail-container']}>
          {getTrackImage(trackID, css['thumbnail-svg'])}
          {thumbnailSubtext}
        </div>
      )
    }

    if (props.thumbnail) {
      return (
        <div data-type="thumbnail-block-image" className={css['thumbnail-container']}>
          <Image
            unoptimized={props.unoptimized} // Have to do this for images hosted on domains we don't know beforehand
            src={props.thumbnail}
            width="56px"
            height="56px"
            alt={props.track || props.thumbnailAlt || 'thumbnail'}
          />
          {thumbnailSubtext}
        </div>
      )
    }

    return null
  })()

  return (
    <div className={className} onMouseEnter={props.onMouseEnter}>
      {thumbnail}
      <div data-type="thumbnail-block-content" className={css['children']}>
        {props.children}
      </div>
    </div>
  )
}
