import React from 'react'
import css from './video-card.module.scss'
import { BasicCard } from 'src/components/common/card'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { Playlist } from 'src/types/Playlist'

interface Props {
  video: ArchiveVideo
  playlist?: Playlist
  showDescription?: boolean
  className?: string
  slide?: Boolean
  size?: 'big' | 'sm'
  horizontal?: boolean
  vertical?: boolean
  compact?: boolean
}

export function getVideoId(video: ArchiveVideo): string {
  let videoId = video.youtubeUrl ?? ''
  videoId = videoId.replace('https://youtu.be/', '')
  videoId = videoId.replace('https://www.youtube.com/embed/', '')
  videoId = videoId.replace('https://www.youtube.com/watch?v=', '')
  videoId = videoId.replace('https://studio.youtube.com/video/', '')
  videoId = videoId.replace('&feature=youtu.be', '')
  videoId = videoId.replace('/edit', '')

  return videoId
}

export const VideoCard = (props: Props) => {
  let className = css['video-card']

  if (props.className) className += ` ${props.className}`
  if (props.slide) className += ` ${css['slide']}`
  if (props.size) className += ` ${css[props.size]}`
  if (props.horizontal) className += ` ${css['horizontal']}`
  if (props.vertical) className += ` ${css['force-vertical']}`
  if (props.compact) className += ` ${css['compact']}`

  function getWatchUrl() {
    let url = `${props.video.slug}`

    if (props.playlist) {
      url += `?playlist=${props.playlist.title}`
    }

    return url
  }

  return (
    <BasicCard className={className} expandLink linkUrl={getWatchUrl()} allowDrag>
      {/* Need the wrapper so we can constrain the aspect div */}
      <div className={css['aspect-wrapper']}>
        <div className="aspect">
          <img
            src={`https://img.youtube.com/vi/${getVideoId(props.video)}/maxresdefault.jpg`}
            alt={`${props.video.title} preview`}
            placeholder="blurred"
          />
        </div>
      </div>
      <div className={css['body']}>
        <div className={css['top']}>
          <p className={css['title']}>{props.video.title}</p>
          {props.showDescription && <p className={css['description']}>{props.video.description}</p>}
        </div>

        <div className={css['bottom']}>
          <div>
            <p className={`${css['speakers']} font-xs bold`}>{props.video.speakers.join(', ').toUpperCase()}</p>
            {!props.compact && <p className="font-xxs">{props.video.type}</p>}
          </div>

          <div className="label sm">Devcon {props.video.edition}</div>
        </div>
      </div>
    </BasicCard>
  )
}
