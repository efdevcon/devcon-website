import React, { useEffect, useState } from 'react'
import css from './archive.module.scss'
import { useIntl } from 'gatsby-plugin-intl'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

interface ArchiveProps {
  videos: Array<ArchiveVideo>
  defaultVideo?: string
  filter?: string
}

export function ArchiveOverview(props: ArchiveProps) {
  const intl = useIntl()
  const initialVideo = props.defaultVideo ?? props.videos[0]?.url ?? ''
  const [selectedVideo, setSelectedVideo] = useState(initialVideo)
  const [videos, setVideos] = useState(props.videos)

  useEffect(() => {
    if (props.filter && Number(props.filter) !== NaN) {
      const filtered = props.videos.filter(i => i.devcon === Number(props.filter))
      setVideos(filtered)
    } else {
      setVideos(props.videos)
    }
  }, [props.filter, props.videos])

  return (
    <div className={css['container']}>
      <div className={css['player']}>
        <iframe
          title="Devon Archive video player"
          className={css['video-iframe']}
          src={selectedVideo}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
      </div>
      <div className={css['list']}>
        {videos &&
          videos.map((video: ArchiveVideo) => {
            return (
              <div key={video.id} className={css['item']} onClick={() => setSelectedVideo(video.url)}>
                <span className={css['devcon']}>Devcon {video.devcon}</span>
                <span className={css['title']}>{video.title}</span>

                <span className={css['speakers']}>{video.speakers}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
