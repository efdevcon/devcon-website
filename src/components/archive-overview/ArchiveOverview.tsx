import React, { useState } from 'react'
import css from './archive.module.scss'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { scrollLock } from 'src/components/layouts/horizontal-layout/HorizontalLayout'

interface ArchiveProps {
  videos: Array<ArchiveVideo>
  filter?: string
}

export function ArchiveOverview(props: ArchiveProps) {
  const initialVideo = props.videos[0]?.url ?? ''
  const [selectedVideo, setSelectedVideo] = useState(initialVideo)

  const filtered = React.useMemo(() => {
    return props.filter === '' || props.filter === 'All'
      ? props.videos
      : props.videos
          .filter(i => i.category?.toLowerCase() === props.filter?.toLowerCase())
          .sort((a, b) => a.title.localeCompare(b.title))
  }, [props.filter, props.videos])

  return (
    <div className={css['container']}>
      <div className={css['player']}>
        <div className={css['wrapper']}>
          <iframe
            title="Road to Devon video player"
            className={css['video-iframe']}
            src={selectedVideo}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
      <div className={css['list']} {...scrollLock}>
        {filtered &&
          filtered.map((video: ArchiveVideo) => {
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
