import Image from 'next/image'
import React from 'react'
import css from './thumbnail-block.module.scss'
import trackIcon from './track-icon.png'
import { getTrackImage, getTrackID } from 'components/domain/index/track-list/TrackList'

type ThumbnailBlock = {
  children: any
  className?: string
  track?: string
  thumbnailAlt?: string
  thumbnailSubtext?: string
}

export const ThumbnailBlock = (props: ThumbnailBlock) => {
  let className = css['container']

  if (props.className) className += ` ${props.className}`

  if (props.thumbnailSubtext) className += ` ${css['with-subtext']}`

  const trackID = getTrackID(props.track)

  if (trackID) className += ` ${css[trackID]}`

  return (
    <div className={className}>
      <div data-type="thumbnail-block-image" className={css['thumbnail-container']}>
        {trackID ? (
          getTrackImage(trackID, css['thumbnail-svg'])
        ) : (
          // <Image
          //   src={getTrackImage(trackID) ||}
          //   width="56px"
          //   height="56px"
          //   alt={props.track || props.thumbnailAlt || 'thumbnail'}
          // />
          <Image src={trackIcon} width="56px" height="56px" alt={props.track || props.thumbnailAlt || 'thumbnail'} />
        )}
        {props.thumbnailSubtext && <p className={css['thumbnail-text']}>{props.thumbnailSubtext}</p>}
      </div>
      <div data-type="thumbnail-block-content" className={css['children']}>
        {props.children}
      </div>
    </div>
  )
}
