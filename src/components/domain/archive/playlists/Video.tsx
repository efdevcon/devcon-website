import React from 'react'
import css from './video.module.scss'
import { BasicCard } from 'src/components/common/card'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

interface Props {
<<<<<<< HEAD
  video: ArchiveVideo
  className?: string
  slide?: boolean
  big?: boolean
  horizontal?: boolean
=======
    video: ArchiveVideo
    showDescription?: boolean
    className?: string
    slide?: boolean
    big?: boolean
    horizontal?: boolean
>>>>>>> f9bdc04d2ac54f11254a79238bf0b99777986705
}

export const Video = (props: Props) => {
  let className = css['video-card']

  if (props.className) className += ` ${props.className}`
  if (props.slide) className += ` ${css['slide']}`
  if (props.big) className += ` ${css['big']}`
  if (props.horizontal) className += ` ${css['horizontal']}`

  function getVideoId() {
    let videoId = props.video.youtubeUrl ?? ''
    videoId = videoId.replace('https://youtu.be/', '')
    videoId = videoId.replace('https://www.youtube.com/embed/', '')
    videoId = videoId.replace('https://www.youtube.com/watch?v=', '')
    videoId = videoId.replace('https://studio.youtube.com/video/', '')
    videoId = videoId.replace('&feature=youtu.be', '')
    videoId = videoId.replace('/edit', '')

    return videoId
  }

  return (
    <BasicCard className={className} expandLink linkUrl={`/archive/watch${props.video.slug}?playlist=test`} allowDrag>
      {/* Need the wrapper so we can constrain the aspect div */}
      <div className={css['aspect-wrapper']}>
        <div className="aspect">
          <img
            src={`https://img.youtube.com/vi/${getVideoId()}/maxresdefault.jpg`}
            alt={`${props.video.title} preview image`}
            placeholder="blurred"
          />
        </div>
      </div>
      <div className={css['body']}>
        <h4 className={css['title']}>{props.video.title}</h4>
        {props.showDescription && <p className={css['description']}>{props.video.description}</p>}
        <p className={css['speakers']}>{props.video.speakers.join(', ').toUpperCase()}</p>
        <p className="font-xs">{props.video.type}</p>
      </div>
    </BasicCard>
  )
}
